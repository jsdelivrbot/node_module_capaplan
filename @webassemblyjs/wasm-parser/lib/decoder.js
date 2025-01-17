"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;

var _errors = require("webassemblyjs/lib/errors");

var _leb = require("@webassemblyjs/leb128");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var t = require("@webassemblyjs/ast");

var _require = require("@webassemblyjs/helper-wasm-bytecode"),
    importTypes = _require.importTypes,
    symbolsByByte = _require.symbolsByByte,
    blockTypes = _require.blockTypes,
    tableTypes = _require.tableTypes,
    globalTypes = _require.globalTypes,
    limitHasMaximum = _require.limitHasMaximum,
    exportTypes = _require.exportTypes,
    types = _require.types,
    magicModuleHeader = _require.magicModuleHeader,
    valtypes = _require.valtypes,
    moduleVersion = _require.moduleVersion,
    sections = _require.sections;

var ieee754 = require("./ieee754");

var _require2 = require("./utf8"),
    utf8ArrayToStr = _require2.utf8ArrayToStr;
/**
 * FIXME(sven): we can't do that because number > 2**53 will fail here
 * because they cannot be represented in js.
 */


function badI32ToI64Conversion(value) {
  return {
    high: value < 0 ? -1 : 0,
    low: value >>> 0
  };
}

function toHex(n) {
  return "0x" + Number(n).toString(16);
}

function byteArrayEq(l, r) {
  if (l.length !== r.length) {
    return false;
  }

  for (var i = 0; i < l.length; i++) {
    if (l[i] !== r[i]) {
      return false;
    }
  }

  return true;
}

function decode(ab, opts) {
  var buf = new Uint8Array(ab);
  var getUniqueName = t.getUniqueNameGenerator();
  var offset = 0;

  function getPosition() {
    return {
      line: -1,
      column: offset
    };
  }

  function dump(b, msg) {
    if (opts.dump === false) return;
    var pad = "\t\t\t\t\t\t\t\t\t\t";
    var str = "";

    if (b.length < 5) {
      str = b.map(toHex).join(" ");
    } else {
      str = "...";
    }

    console.log(toHex(offset) + ":\t", str, pad, ";", msg);
  }

  function dumpSep(msg) {
    if (opts.dump === false) return;
    console.log(";", msg);
  }
  /**
   * TODO(sven): we can atually use a same structure
   * we are adding incrementally new features
   */


  var state = {
    elementsInFuncSection: [],
    elementsInExportSection: [],
    elementsInCodeSection: [],

    /**
     * Decode memory from:
     * - Memory section
     */
    memoriesInModule: [],

    /**
     * Decoded types from:
     * - Type section
     */
    typesInModule: [],

    /**
     * Decoded functions from:
     * - Function section
     * - Import section
     */
    functionsInModule: [],

    /**
     * Decoded tables from:
     * - Table section
     */
    tablesInModule: []
  };

  function isEOF() {
    return offset >= buf.length;
  }

  function eatBytes(n) {
    offset = offset + n;
  }

  function readBytes(numberOfBytes) {
    var arr = [];

    for (var i = 0; i < numberOfBytes; i++) {
      arr.push(buf[offset + i]);
    }

    return arr;
  }

  function readF64() {
    var bytes = readBytes(ieee754.NUMBER_OF_BYTE_F64);
    var buffer = Buffer.from(bytes);
    var value = ieee754.decode(buffer, 0, true, ieee754.SINGLE_PRECISION_MANTISSA, ieee754.NUMBER_OF_BYTE_F64);
    return {
      value: value,
      nextIndex: ieee754.NUMBER_OF_BYTE_F64
    };
  }

  function readF32() {
    var bytes = readBytes(ieee754.NUMBER_OF_BYTE_F32);
    var buffer = Buffer.from(bytes);
    var value = ieee754.decode(buffer, 0, true, ieee754.SINGLE_PRECISION_MANTISSA, ieee754.NUMBER_OF_BYTE_F32);
    return {
      value: value,
      nextIndex: ieee754.NUMBER_OF_BYTE_F32
    };
  }

  function readUTF8String() {
    var lenu32 = readU32();
    var len = lenu32.value;
    dump([len], "string length");
    eatBytes(lenu32.nextIndex);
    var bytes = readBytes(len);
    var value = utf8ArrayToStr(bytes);
    return {
      value: value,
      nextIndex: len
    };
  }
  /**
   * Decode an unsigned 32bits integer
   *
   * The length will be handled by the leb librairy, we pass the max number of
   * byte.
   */


  function readU32() {
    var bytes = readBytes(_leb.MAX_NUMBER_OF_BYTE_U32);
    var buffer = Buffer.from(bytes);
    return (0, _leb.decodeUInt32)(buffer);
  }
  /**
   * Decode a signed 32bits interger
   */


  function read32() {
    var bytes = readBytes(_leb.MAX_NUMBER_OF_BYTE_U32);
    var buffer = Buffer.from(bytes);
    return (0, _leb.decodeInt32)(buffer);
  }
  /**
   * Decode a signed 64bits integer
   */


  function read64() {
    var bytes = readBytes(_leb.MAX_NUMBER_OF_BYTE_U64);
    var buffer = Buffer.from(bytes);
    return (0, _leb.decodeInt64)(buffer);
  }

  function readU64() {
    var bytes = readBytes(_leb.MAX_NUMBER_OF_BYTE_U64);
    var buffer = Buffer.from(bytes);
    return (0, _leb.decodeUInt64)(buffer);
  }

  function readByte() {
    return readBytes(1)[0];
  }

  function parseModuleHeader() {
    if (isEOF() === true || offset + 4 > buf.length) {
      throw new Error("unexpected end");
    }

    var header = readBytes(4);

    if (byteArrayEq(magicModuleHeader, header) === false) {
      throw new _errors.CompileError("magic header not detected");
    }

    dump(header, "wasm magic header");
    eatBytes(4);
  }

  function parseVersion() {
    if (isEOF() === true || offset + 4 > buf.length) {
      throw new Error("unexpected end");
    }

    var version = readBytes(4);

    if (byteArrayEq(moduleVersion, version) === false) {
      throw new _errors.CompileError("unknown binary version");
    }

    dump(version, "wasm version");
    eatBytes(4);
  }

  function parseVec(cast) {
    var u32 = readU32();
    var length = u32.value;
    eatBytes(u32.nextIndex);
    dump([length], "number");

    if (length === 0) {
      return [];
    }

    var elements = [];

    for (var i = 0; i < length; i++) {
      var byte = readByte();
      eatBytes(1);
      var value = cast(byte);
      dump([byte], value);

      if (typeof value === "undefined") {
        throw new _errors.CompileError("Internal failure: parseVec could not cast the value");
      }

      elements.push(value);
    }

    return elements;
  } // Type section
  // https://webassembly.github.io/spec/binary/modules.html#binary-typesec


  function parseTypeSection(numberOfTypes) {
    var typeInstructionNodes = [];
    dump([numberOfTypes], "num types");

    for (var i = 0; i < numberOfTypes; i++) {
      var startLoc = getPosition();
      dumpSep("type " + i);
      var type = readByte();
      eatBytes(1);

      if (type == types.func) {
        dump([type], "func");
        var paramValtypes = parseVec(function (b) {
          return valtypes[b];
        });
        var params = paramValtypes.map(function (v) {
          return t.funcParam(
          /*valtype*/
          v);
        });
        var result = parseVec(function (b) {
          return valtypes[b];
        });
        var endLoc = getPosition();
        typeInstructionNodes.push(t.withLoc(t.typeInstructionFunc(params, result), endLoc, startLoc));
        state.typesInModule.push({
          params: params,
          result: result
        });
      } else {
        throw new Error("Unsupported type: " + toHex(type));
      }
    }

    return typeInstructionNodes;
  } // Import section
  // https://webassembly.github.io/spec/binary/modules.html#binary-importsec


  function parseImportSection(numberOfImports) {
    var imports = [];

    for (var i = 0; i < numberOfImports; i++) {
      dumpSep("import header " + i);
      var startLoc = getPosition();
      /**
       * Module name
       */

      var moduleName = readUTF8String();
      eatBytes(moduleName.nextIndex);
      dump([], "module name (".concat(moduleName.value, ")"));
      /**
       * Name
       */

      var name = readUTF8String();
      eatBytes(name.nextIndex);
      dump([], "name (".concat(name.value, ")"));
      /**
       * Import descr
       */

      var descrTypeByte = readByte();
      eatBytes(1);
      var descrType = importTypes[descrTypeByte];
      dump([descrTypeByte], "import kind");

      if (typeof descrType === "undefined") {
        throw new _errors.CompileError("Unknown import description type: " + toHex(descrTypeByte));
      }

      var importDescr = void 0;

      if (descrType === "func") {
        var indexU32 = readU32();
        var typeindex = indexU32.value;
        eatBytes(indexU32.nextIndex);
        dump([typeindex], "type index");
        var signature = state.typesInModule[typeindex];

        if (typeof signature === "undefined") {
          throw new _errors.CompileError("function signature not found (".concat(typeindex, ")"));
        }

        var id = t.identifier("".concat(moduleName.value, ".").concat(name.value));
        importDescr = t.funcImportDescr(id, signature.params, signature.result);
        state.functionsInModule.push({
          id: t.identifier(name.value),
          signature: signature,
          isExternal: true
        });
      } else if (descrType === "global") {
        importDescr = parseGlobalType();
      } else if (descrType === "table") {
        importDescr = parseTableType(i);
      } else if (descrType === "mem") {
        var memoryNode = parseMemoryType(0);
        state.memoriesInModule.push(memoryNode);
        importDescr = memoryNode;
      } else {
        throw new _errors.CompileError("Unsupported import of type: " + descrType);
      }

      var endLoc = getPosition();
      imports.push(t.withLoc(t.moduleImport(moduleName.value, name.value, importDescr), endLoc, startLoc));
    }

    return imports;
  } // Function section
  // https://webassembly.github.io/spec/binary/modules.html#function-section


  function parseFuncSection(numberOfFunctions) {
    dump([numberOfFunctions], "num funcs");

    for (var i = 0; i < numberOfFunctions; i++) {
      var indexU32 = readU32();
      var typeindex = indexU32.value;
      eatBytes(indexU32.nextIndex);
      dump([typeindex], "type index");
      var signature = state.typesInModule[typeindex];

      if (typeof signature === "undefined") {
        throw new _errors.CompileError("function signature not found (".concat(typeindex, ")"));
      } // preserve anonymous, a name might be resolved later


      var id = t.withRaw(t.identifier(getUniqueName("func")), "");
      state.functionsInModule.push({
        id: id,
        signature: signature,
        isExternal: false
      });
    }
  } // Export section
  // https://webassembly.github.io/spec/binary/modules.html#export-section


  function parseExportSection(numberOfExport) {
    dump([numberOfExport], "num exports"); // Parse vector of exports

    for (var i = 0; i < numberOfExport; i++) {
      var startLoc = getPosition();
      /**
       * Name
       */

      var name = readUTF8String();
      eatBytes(name.nextIndex);
      dump([], "export name (".concat(name.value, ")"));
      /**
       * exportdescr
       */

      var typeIndex = readByte();
      eatBytes(1);
      dump([typeIndex], "export kind");
      var indexu32 = readU32();
      var index = indexu32.value;
      eatBytes(indexu32.nextIndex);
      dump([index], "export index");
      var id = void 0,
          signature = void 0;

      if (exportTypes[typeIndex] === "Func") {
        var func = state.functionsInModule[index];

        if (typeof func === "undefined") {
          throw new _errors.CompileError("entry not found at index ".concat(index, " in function section"));
        }

        id = t.cloneNode(func.id);
        id = t.withRaw(id, String(index));
        signature = func.signature;
      } else if (exportTypes[typeIndex] === "Table") {
        var table = state.tablesInModule[index];

        if (typeof table === "undefined") {
          throw new _errors.CompileError("entry not found at index ".concat(index, " in table section"));
        }

        if (table.name != null) {
          id = t.identifier(table.name.value + "");
        } else {
          id = t.identifier(getUniqueName("table"));
          id = t.withRaw(id, ""); // preserve anonymous
        }

        signature = null;
      } else if (exportTypes[typeIndex] === "Mem") {
        var memNode = state.memoriesInModule[index];

        if (typeof memNode === "undefined") {
          throw new _errors.CompileError("entry not found at index ".concat(index, " in memory section"));
        }

        if (memNode.id != null) {
          id = t.identifier(memNode.id.value + "");
        } else {
          id = t.identifier(getUniqueName("memory"));
          id = t.withRaw(id, ""); // preserve anonymous
        }

        signature = null;
      } else {
        console.warn("Unsupported export type: " + toHex(typeIndex));
        return;
      }

      var endLoc = getPosition();
      state.elementsInExportSection.push({
        name: name.value,
        type: exportTypes[typeIndex],
        signature: signature,
        id: id,
        index: index,
        endLoc: endLoc,
        startLoc: startLoc
      });
    }
  } // Code section
  // https://webassembly.github.io/spec/binary/modules.html#code-section


  function parseCodeSection(numberOfFuncs) {
    dump([numberOfFuncs], "number functions"); // Parse vector of function

    for (var i = 0; i < numberOfFuncs; i++) {
      var startLoc = getPosition();
      dumpSep("function body " + i); // the u32 size of the function code in bytes
      // Ignore it for now

      var bodySizeU32 = readU32();
      eatBytes(bodySizeU32.nextIndex);
      dump([bodySizeU32.value], "function body size");
      var code = [];
      /**
       * Parse locals
       */

      var funcLocalNumU32 = readU32();
      var funcLocalNum = funcLocalNumU32.value;
      eatBytes(funcLocalNumU32.nextIndex);
      dump([funcLocalNum], "num locals");
      var locals = [];

      for (var _i = 0; _i < funcLocalNum; _i++) {
        var localCountU32 = readU32();
        var localCount = localCountU32.value;
        eatBytes(localCountU32.nextIndex);
        dump([localCount], "num local");
        var valtypeByte = readByte();
        eatBytes(1);
        var type = valtypes[valtypeByte];
        dump([valtypeByte], type);

        if (typeof type === "undefined") {
          throw new _errors.CompileError("Unexpected valtype: " + toHex(valtypeByte));
        }
      } // Decode instructions until the end


      parseInstructionBlock(code);
      var endLoc = getPosition();
      state.elementsInCodeSection.push({
        code: code,
        locals: locals,
        endLoc: endLoc,
        startLoc: startLoc,
        bodySize: bodySizeU32.value
      });
    }
  }

  function parseInstructionBlock(code) {
    while (true) {
      var startLoc = getPosition();
      var instructionAlreadyCreated = false;
      var instructionByte = readByte();
      eatBytes(1);
      var instruction = symbolsByByte[instructionByte];

      if (typeof instruction.object === "string") {
        dump([instructionByte], "".concat(instruction.object, ".").concat(instruction.name));
      } else {
        dump([instructionByte], instruction.name);
      }

      if (typeof instruction === "undefined") {
        throw new _errors.CompileError("Unexpected instruction: " + toHex(instructionByte));
      }
      /**
       * End of the function
       */


      if (instruction.name === "end") {
        break;
      }

      var args = [];

      if (instruction.name === "loop") {
        var blocktypeByte = readByte();
        eatBytes(1);
        var blocktype = blockTypes[blocktypeByte];
        dump([blocktypeByte], "blocktype");

        if (typeof blocktype === "undefined") {
          throw new _errors.CompileError("Unexpected blocktype: " + toHex(blocktypeByte));
        }

        var instr = [];
        parseInstructionBlock(instr); // preserve anonymous

        var label = t.withRaw(t.identifier(getUniqueName("loop")), "");
        var loopNode = t.loopInstruction(label, blocktype, instr);
        code.push(loopNode);
        instructionAlreadyCreated = true;
      } else if (instruction.name === "if") {
        var _blocktypeByte = readByte();

        eatBytes(1);
        var _blocktype = blockTypes[_blocktypeByte];
        dump([_blocktypeByte], "blocktype");

        if (typeof _blocktype === "undefined") {
          throw new _errors.CompileError("Unexpected blocktype: " + toHex(_blocktypeByte));
        }

        var consequentInstr = [];
        parseInstructionBlock(consequentInstr); // FIXME(sven): handle the second block via the byte in between

        var alternate = []; // FIXME(sven): where is that stored?
        // preserve anonymous

        var testIndex = t.withRaw(t.identifier(getUniqueName("ifindex")), "");
        var testInstrs = [];
        var ifNode = t.ifInstruction(testIndex, _blocktype, testInstrs, consequentInstr, alternate);
        code.push(ifNode);
        instructionAlreadyCreated = true;
      } else if (instruction.name === "block") {
        var _blocktypeByte2 = readByte();

        eatBytes(1);
        var _blocktype2 = blockTypes[_blocktypeByte2];
        dump([_blocktypeByte2], "blocktype");

        if (typeof _blocktype2 === "undefined") {
          throw new _errors.CompileError("Unexpected blocktype: " + toHex(_blocktypeByte2));
        }

        var _instr = [];
        parseInstructionBlock(_instr); // preserve anonymous

        var _label = t.withRaw(t.identifier(getUniqueName("block")), "");

        var blockNode = t.blockInstruction(_label, _instr, _blocktype2);
        code.push(blockNode);
        instructionAlreadyCreated = true;
      } else if (instruction.name === "call") {
        var indexu32 = readU32();
        var index = indexu32.value;
        eatBytes(indexu32.nextIndex);
        dump([index], "index");
        var callNode = t.callInstruction(t.indexLiteral(index));
        code.push(callNode);
        instructionAlreadyCreated = true;
      } else if (instruction.name === "call_indirect") {
        var indexU32 = readU32();
        var typeindex = indexU32.value;
        eatBytes(indexU32.nextIndex);
        dump([typeindex], "type index");
        var signature = state.typesInModule[typeindex];

        if (typeof signature === "undefined") {
          throw new _errors.CompileError("call_indirect signature not found (".concat(typeindex, ")"));
        }

        var _callNode = t.callIndirectInstruction(signature.params, signature.result, []);

        eatBytes(1); // 0x00 - reserved byte

        code.push(_callNode);
        instructionAlreadyCreated = true;
      } else if (instruction.name === "br_table") {
        var indicesu32 = readU32();
        var indices = indicesu32.value;
        eatBytes(indicesu32.nextIndex);
        dump([indices], "num indices");

        for (var i = 0; i <= indices; i++) {
          var _indexu = readU32();

          var _index = _indexu.value;
          eatBytes(_indexu.nextIndex);
          dump([_index], "index");
          args.push(t.numberLiteral(_indexu.value.toString(), "f64"));
        }
      } else if (instructionByte >= 0x28 && instructionByte <= 0x40) {
        /**
         * Memory instructions
         */
        var aligun32 = readU32();
        var align = aligun32.value;
        eatBytes(aligun32.nextIndex);
        dump([align], "align");
        var offsetu32 = readU32();
        var _offset = offsetu32.value;
        eatBytes(offsetu32.nextIndex);
        dump([_offset], "offset");
      } else if (instructionByte >= 0x41 && instructionByte <= 0x44) {
        /**
         * Numeric instructions
         */
        if (instruction.object === "i32") {
          var value32 = read32();
          var value = value32.value;
          eatBytes(value32.nextIndex);
          dump([value], "value");
          args.push(t.numberLiteral(value));
        }

        if (instruction.object === "u32") {
          var valueu32 = readU32();
          var _value = valueu32.value;
          eatBytes(valueu32.nextIndex);
          dump([_value], "value");
          args.push(t.numberLiteral(_value));
        }

        if (instruction.object === "i64") {
          var value64 = read64();
          var _value2 = value64.value;
          eatBytes(value64.nextIndex);
          dump([_value2], "value");
          var node = {
            type: "LongNumberLiteral",
            value: badI32ToI64Conversion(_value2)
          };
          args.push(node);
        }

        if (instruction.object === "u64") {
          var valueu64 = readU64();
          var _value3 = valueu64.value;
          eatBytes(valueu64.nextIndex);
          dump([_value3], "value");
          args.push(t.numberLiteral(_value3));
        }

        if (instruction.object === "f32") {
          var valuef32 = readF32();
          var _value4 = valuef32.value;
          eatBytes(valuef32.nextIndex);
          dump([_value4], "value");
          args.push(t.numberLiteral(_value4));
        }

        if (instruction.object === "f64") {
          var valuef64 = readF64();
          var _value5 = valuef64.value;
          eatBytes(valuef64.nextIndex);
          dump([_value5], "value");
          args.push(t.numberLiteral(_value5));
        }
      } else {
        for (var _i2 = 0; _i2 < instruction.numberOfArgs; _i2++) {
          var u32 = readU32();
          eatBytes(u32.nextIndex);
          dump([u32.value], "argument " + _i2);
          args.push(t.numberLiteral(u32.value));
        }
      }

      if (instructionAlreadyCreated === false) {
        if (typeof instruction.object === "string") {
          code.push(t.objectInstruction(instruction.name, instruction.object, args));
        } else {
          var endLoc = getPosition();

          var _node = t.withLoc(t.instruction(instruction.name, args), endLoc, startLoc);

          code.push(_node);
        }
      }
    }
  } // https://webassembly.github.io/spec/core/binary/types.html#binary-tabletype


  function parseTableType(index) {
    var name = t.withRaw(t.identifier(getUniqueName("table")), String(index));
    var elementTypeByte = readByte();
    eatBytes(1);
    dump([elementTypeByte], "element type");
    var elementType = tableTypes[elementTypeByte];

    if (typeof elementType === "undefined") {
      throw new _errors.CompileError("Unknown element type in table: " + toHex(elementType));
    }

    var limitType = readByte();
    eatBytes(1);
    var min, max;

    if (limitHasMaximum[limitType] === true) {
      var u32min = readU32();
      min = parseInt(u32min.value);
      eatBytes(u32min.nextIndex);
      dump([min], "min");
      var u32max = readU32();
      max = parseInt(u32max.value);
      eatBytes(u32max.nextIndex);
      dump([max], "max");
    } else {
      var _u32min = readU32();

      min = parseInt(_u32min.value);
      eatBytes(_u32min.nextIndex);
      dump([min], "min");
    }

    return t.table(elementType, t.limits(min, max), name);
  } // https://webassembly.github.io/spec/binary/types.html#global-types


  function parseGlobalType() {
    var valtypeByte = readByte();
    eatBytes(1);
    var type = valtypes[valtypeByte];
    dump([valtypeByte], type);

    if (typeof type === "undefined") {
      throw new _errors.CompileError("Unknown valtype: " + toHex(valtypeByte));
    }

    var globalTypeByte = readByte();
    eatBytes(1);
    var globalType = globalTypes[globalTypeByte];
    dump([globalTypeByte], "global type (".concat(globalType, ")"));

    if (typeof globalType === "undefined") {
      throw new _errors.CompileError("Invalid mutability: " + toHex(globalTypeByte));
    }

    return t.globalType(type, globalType);
  } // this section contains an array of function names and indices


  function parseNameSectionFunctions() {
    var functionNames = [];
    var subSectionSizeInBytesu32 = readU32();
    eatBytes(subSectionSizeInBytesu32.nextIndex);
    var numberOfFunctionsu32 = readU32();
    var numbeOfFunctions = numberOfFunctionsu32.value;
    eatBytes(numberOfFunctionsu32.nextIndex);

    for (var i = 0; i < numbeOfFunctions; i++) {
      var indexu32 = readU32();
      var index = indexu32.value;
      eatBytes(indexu32.nextIndex);
      var name = readUTF8String();
      eatBytes(name.nextIndex);
      functionNames.push(t.functionNameMetadata(name.value, index));
    }

    return functionNames;
  }

  function parseNameSectionLocals() {
    var subSectionSizeInBytesu32 = readU32();
    eatBytes(subSectionSizeInBytesu32.nextIndex);
    var numbeOfFunctionsu32 = readU32();
    var numbeOfFunctions = numbeOfFunctionsu32.value;
    eatBytes(numbeOfFunctionsu32.nextIndex);
    var localNames = [];

    for (var i = 0; i < numbeOfFunctions; i++) {
      var functionIndexu32 = readU32();
      var functionIndex = functionIndexu32.value;
      eatBytes(functionIndexu32.nextIndex);
      var numLocalsu32 = readU32();
      var numLocals = numLocalsu32.value;
      eatBytes(numLocalsu32.nextIndex);

      for (var _i3 = 0; _i3 < numLocals; _i3++) {
        var localIndexu32 = readU32();
        var localIndex = localIndexu32.value;
        eatBytes(localIndexu32.nextIndex);
        var name = readUTF8String();
        eatBytes(name.nextIndex);
        localNames.push(t.localNameMetadata(name.value, localIndex, functionIndex));
      }
    }

    return localNames;
  } // this is a custom suction that wat2wasm includes if invoked
  // using the --debug-names option


  function parseNameSection(remainingBytes) {
    var nameMetadata = [];
    var initialOffset = offset;

    while (offset - initialOffset < remainingBytes) {
      var sectionTypeByte = readByte();
      eatBytes(1);

      if (sectionTypeByte === 1) {
        nameMetadata.push.apply(nameMetadata, _toConsumableArray(parseNameSectionFunctions()));
      } else if (sectionTypeByte === 2) {
        nameMetadata.push.apply(nameMetadata, _toConsumableArray(parseNameSectionLocals()));
      }
    }

    return nameMetadata;
  }

  function parseGlobalSection(numberOfGlobals) {
    var globals = [];
    dump([numberOfGlobals], "num globals");

    for (var i = 0; i < numberOfGlobals; i++) {
      var globalType = parseGlobalType();
      /**
       * Global expressions
       */

      var init = [];
      parseInstructionBlock(init);
      globals.push(t.global(globalType, init));
    }

    return globals;
  }

  function parseElemSection(numberOfElements) {
    var elems = [];
    dump([numberOfElements], "num elements");

    for (var i = 0; i < numberOfElements; i++) {
      var tableindexu32 = readU32();
      var tableindex = tableindexu32.value;
      eatBytes(tableindexu32.nextIndex);
      dump([tableindex], "table index");
      /**
       * Parse instructions
       */

      var instr = [];
      parseInstructionBlock(instr);
      /**
       * Parse ( vector function index ) *
       */

      var indicesu32 = readU32();
      var indices = indicesu32.value;
      eatBytes(indicesu32.nextIndex);
      dump([indices], "num indices");
      var indexValues = [];

      for (var _i4 = 0; _i4 < indices; _i4++) {
        var indexu32 = readU32();
        var index = indexu32.value;
        eatBytes(indexu32.nextIndex);
        dump([index], "index");
        indexValues.push(t.indexLiteral(index));
      }

      elems.push(t.elem(t.indexLiteral(tableindex), instr, indexValues));
    }

    return elems;
  } // https://webassembly.github.io/spec/core/binary/types.html#memory-types


  function parseMemoryType(i) {
    var limitType = readByte();
    eatBytes(1);
    var min, max;

    if (limitHasMaximum[limitType] === true) {
      var u32min = readU32();
      min = parseInt(u32min.value);
      eatBytes(u32min.nextIndex);
      dump([min], "min");
      var u32max = readU32();
      max = parseInt(u32max.value);
      eatBytes(u32max.nextIndex);
      dump([max], "max");
    } else {
      var _u32min2 = readU32();

      min = parseInt(_u32min2.value);
      eatBytes(_u32min2.nextIndex);
      dump([min], "min");
    }

    return t.memory(t.limits(min, max), t.indexLiteral(i));
  } // https://webassembly.github.io/spec/binary/modules.html#table-section


  function parseTableSection(numberOfElements) {
    var tables = [];
    dump([numberOfElements], "num elements");

    for (var i = 0; i < numberOfElements; i++) {
      var tablesNode = parseTableType(i);
      state.tablesInModule.push(tablesNode);
      tables.push(tablesNode);
    }

    return tables;
  } // https://webassembly.github.io/spec/binary/modules.html#memory-section


  function parseMemorySection(numberOfElements) {
    var memories = [];
    dump([numberOfElements], "num elements");

    for (var i = 0; i < numberOfElements; i++) {
      var memoryNode = parseMemoryType(i);
      state.memoriesInModule.push(memoryNode);
      memories.push(memoryNode);
    }

    return memories;
  } // https://webassembly.github.io/spec/binary/modules.html#binary-startsec


  function parseStartSection() {
    var startLoc = getPosition();
    var u32 = readU32();
    var startFuncIndex = u32.value;
    eatBytes(u32.nextIndex);
    dump([startFuncIndex], "index");
    var endLoc = getPosition();
    return t.withLoc(t.start(t.indexLiteral(startFuncIndex)), endLoc, startLoc);
  } // https://webassembly.github.io/spec/binary/modules.html#data-section


  function parseDataSection(numberOfElements) {
    var dataEntries = [];
    dump([numberOfElements], "num elements");

    for (var i = 0; i < numberOfElements; i++) {
      var memoryIndexu32 = readU32();
      var memoryIndex = memoryIndexu32.value;
      eatBytes(memoryIndexu32.nextIndex);
      dump([memoryIndex], "memory index");
      var instrs = [];
      parseInstructionBlock(instrs);

      if (instrs.length !== 1) {
        throw new _errors.CompileError("data section offset must be a single instruction");
      }

      var bytes = parseVec(function (b) {
        return b;
      }); // FIXME(sven): the Go binary can store > 100kb of data here
      // my testing suite doesn't handle that.
      // Disabling for now.

      bytes = [];
      dump([], "init");
      dataEntries.push(t.data(t.memIndexLiteral(memoryIndex), instrs[0], t.byteArray(bytes)));
    }

    return dataEntries;
  } // https://webassembly.github.io/spec/binary/modules.html#binary-section


  function parseSection() {
    var sectionId = readByte();
    eatBytes(1);
    var startOffset = offset;
    var startPosition = getPosition();
    var u32 = readU32();
    var sectionSizeInBytes = u32.value;
    eatBytes(u32.nextIndex);
    var sectionSizeInBytesEndLoc = getPosition();
    var sectionSizeInBytesNode = t.withLoc(t.numberLiteral(sectionSizeInBytes), sectionSizeInBytesEndLoc, startPosition);

    switch (sectionId) {
      case sections.type:
        {
          dumpSep("section Type");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition = getPosition();

          var _u = readU32();

          var numberOfTypes = _u.value;
          eatBytes(_u.nextIndex);
          var endPosition = getPosition();

          var _metadata = t.sectionMetadata("type", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfTypes), endPosition, _startPosition));

          var _nodes = parseTypeSection(numberOfTypes);

          return {
            nodes: _nodes,
            metadata: _metadata
          };
        }

      case sections.table:
        {
          dumpSep("section Table");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition2 = getPosition();

          var _u2 = readU32();

          var numberOfTable = _u2.value;
          eatBytes(_u2.nextIndex);

          var _endPosition = getPosition();

          dump([numberOfTable], "num tables");

          var _metadata2 = t.sectionMetadata("table", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfTable), _endPosition, _startPosition2));

          var _nodes2 = parseTableSection(numberOfTable);

          return {
            nodes: _nodes2,
            metadata: _metadata2
          };
        }

      case sections.import:
        {
          dumpSep("section Import");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition3 = getPosition();

          var numberOfImportsu32 = readU32();
          var numberOfImports = numberOfImportsu32.value;
          eatBytes(numberOfImportsu32.nextIndex);

          var _endPosition2 = getPosition();

          dump([numberOfImports], "number of imports");

          var _metadata3 = t.sectionMetadata("import", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfImports), _endPosition2, _startPosition3));

          var _nodes3 = parseImportSection(numberOfImports);

          return {
            nodes: _nodes3,
            metadata: _metadata3
          };
        }

      case sections.func:
        {
          dumpSep("section Function");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition4 = getPosition();

          var numberOfFunctionsu32 = readU32();
          var numberOfFunctions = numberOfFunctionsu32.value;
          eatBytes(numberOfFunctionsu32.nextIndex);

          var _endPosition3 = getPosition();

          var _metadata4 = t.sectionMetadata("func", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfFunctions), _endPosition3, _startPosition4));

          parseFuncSection(numberOfFunctions);
          var _nodes4 = [];
          return {
            nodes: _nodes4,
            metadata: _metadata4
          };
        }

      case sections.export:
        {
          dumpSep("section Export");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition5 = getPosition();

          var _u3 = readU32();

          var numberOfExport = _u3.value;
          eatBytes(_u3.nextIndex);

          var _endPosition4 = getPosition();

          var _metadata5 = t.sectionMetadata("export", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfExport), _endPosition4, _startPosition5));

          parseExportSection(numberOfExport);
          var _nodes5 = [];
          return {
            nodes: _nodes5,
            metadata: _metadata5
          };
        }

      case sections.code:
        {
          dumpSep("section Code");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _metadata6 = t.sectionMetadata("code", startOffset, sectionSizeInBytesNode);

          if (opts.ignoreCodeSection === true) {
            eatBytes(sectionSizeInBytes); // eat the entire section
          } else {
            var _startPosition6 = getPosition();

            var _u4 = readU32();

            var numberOfFuncs = _u4.value;
            eatBytes(_u4.nextIndex);

            var _endPosition5 = getPosition();

            _metadata6.vectorOfSize = t.withLoc(t.numberLiteral(numberOfFuncs), _endPosition5, _startPosition6);
            parseCodeSection(numberOfFuncs);
          }

          var _nodes6 = [];
          return {
            nodes: _nodes6,
            metadata: _metadata6
          };
        }

      case sections.start:
        {
          dumpSep("section Start");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _metadata7 = t.sectionMetadata("start", startOffset, sectionSizeInBytesNode);

          var _nodes7 = [parseStartSection()];
          return {
            nodes: _nodes7,
            metadata: _metadata7
          };
        }

      case sections.element:
        {
          dumpSep("section Element");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition7 = getPosition();

          var numberOfElementsu32 = readU32();
          var numberOfElements = numberOfElementsu32.value;
          eatBytes(numberOfElementsu32.nextIndex);

          var _endPosition6 = getPosition();

          var _metadata8 = t.sectionMetadata("element", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfElements), _endPosition6, _startPosition7));

          var _nodes8 = parseElemSection(numberOfElements);

          return {
            nodes: _nodes8,
            metadata: _metadata8
          };
        }

      case sections.global:
        {
          dumpSep("section Global");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition8 = getPosition();

          var numberOfGlobalsu32 = readU32();
          var numberOfGlobals = numberOfGlobalsu32.value;
          eatBytes(numberOfGlobalsu32.nextIndex);

          var _endPosition7 = getPosition();

          var _metadata9 = t.sectionMetadata("global", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(numberOfGlobals), _endPosition7, _startPosition8));

          var _nodes9 = parseGlobalSection(numberOfGlobals);

          return {
            nodes: _nodes9,
            metadata: _metadata9
          };
        }

      case sections.memory:
        {
          dumpSep("section Memory");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _startPosition9 = getPosition();

          var _numberOfElementsu = readU32();

          var _numberOfElements = _numberOfElementsu.value;
          eatBytes(_numberOfElementsu.nextIndex);

          var _endPosition8 = getPosition();

          var _metadata10 = t.sectionMetadata("memory", startOffset, sectionSizeInBytesNode, t.withLoc(t.numberLiteral(_numberOfElements), _endPosition8, _startPosition9));

          var _nodes10 = parseMemorySection(_numberOfElements);

          return {
            nodes: _nodes10,
            metadata: _metadata10
          };
        }

      case sections.data:
        {
          dumpSep("section Data");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");

          var _metadata11 = t.sectionMetadata("data", startOffset, sectionSizeInBytesNode);

          if (opts.ignoreDataSection === true) {
            eatBytes(sectionSizeInBytes); // eat the entire section

            dumpSep("ignore data (" + sectionSizeInBytes + " bytes)");
            return {
              nodes: [],
              metadata: _metadata11
            };
          } else {
            var _startPosition10 = getPosition();

            var _numberOfElementsu2 = readU32();

            var _numberOfElements2 = _numberOfElementsu2.value;
            eatBytes(_numberOfElementsu2.nextIndex);

            var _endPosition9 = getPosition();

            _metadata11.vectorOfSize = t.withLoc(t.numberLiteral(_numberOfElements2), _endPosition9, _startPosition10);

            var _nodes11 = parseDataSection(_numberOfElements2);

            return {
              nodes: _nodes11,
              metadata: _metadata11
            };
          }
        }

      case sections.custom:
        {
          dumpSep("section Custom");
          dump([sectionId], "section code");
          dump([sectionSizeInBytes], "section size");
          var _metadata12 = [t.sectionMetadata("custom", startOffset, sectionSizeInBytesNode)];
          var sectionName = readUTF8String();
          eatBytes(sectionName.nextIndex);
          dump([], "section name (".concat(sectionName.value, ")"));
          var remainingBytes = sectionSizeInBytes - sectionName.nextIndex;

          if (sectionName.value === "name") {
            _metadata12.push.apply(_metadata12, _toConsumableArray(parseNameSection(remainingBytes)));
          } else {
            // We don't parse otehr custom section
            eatBytes(remainingBytes - 1
            /* UTF8 vector size */
            );
            dumpSep("ignore custom " + JSON.stringify(sectionName.value) + " section (" + remainingBytes + " bytes)");
          }

          return {
            nodes: [],
            metadata: _metadata12
          };
        }
    }

    throw new _errors.CompileError("Unexpected section: " + toHex(sectionId));
  }

  parseModuleHeader();
  parseVersion();
  var moduleFields = [];
  var moduleMetadata = {
    sections: [],
    functionNames: [],
    localNames: []
  };
  /**
   * All the generate declaration are going to be stored in our state
   */

  while (offset < buf.length) {
    var _parseSection = parseSection(),
        _nodes12 = _parseSection.nodes,
        _metadata13 = _parseSection.metadata;

    moduleFields.push.apply(moduleFields, _toConsumableArray(_nodes12));
    var metadataArray = Array.isArray(_metadata13) ? _metadata13 : [_metadata13];
    metadataArray.forEach(function (metadataItem) {
      if (metadataItem.type === "FunctionNameMetadata") {
        moduleMetadata.functionNames.push(metadataItem);
      } else if (metadataItem.type === "LocalNameMetadata") {
        moduleMetadata.localNames.push(metadataItem);
      } else {
        moduleMetadata.sections.push(metadataItem);
      }
    });
  }
  /**
   * Transform the state into AST nodes
   */


  var funcIndex = 0;
  state.functionsInModule.forEach(function (func) {
    var params = func.signature.params;
    var result = func.signature.result;
    var body = []; // External functions doesn't provide any code, can skip it here

    if (func.isExternal === true) {
      return;
    }

    var decodedElementInCodeSection = state.elementsInCodeSection[funcIndex];

    if (opts.ignoreCodeSection === false) {
      if (typeof decodedElementInCodeSection === "undefined") {
        throw new _errors.CompileError("func " + toHex(funcIndex) + " code not found");
      }

      body = decodedElementInCodeSection.code;
    }

    funcIndex++;
    var funcNode = t.func(func.id, params, result, body);

    if (func.isExternal === true) {
      funcNode.isExternal = func.isExternal;
    } // Add function position in the binary if possible


    if (opts.ignoreCodeSection === false) {
      var startLoc = decodedElementInCodeSection.startLoc,
          endLoc = decodedElementInCodeSection.endLoc,
          bodySize = decodedElementInCodeSection.bodySize;
      funcNode = t.withLoc(funcNode, endLoc, startLoc);
      funcNode.metadata = {
        bodySize: bodySize
      };
    }

    moduleFields.push(funcNode);
  });
  state.elementsInExportSection.forEach(function (moduleExport) {
    /**
     * If the export has no id, we won't be able to call it from the outside
     * so we can omit it
     */
    if (moduleExport.id != null) {
      moduleFields.push(t.withLoc(t.moduleExport(moduleExport.name, moduleExport.type, moduleExport.id), moduleExport.endLoc, moduleExport.startLoc));
    }
  });
  dumpSep("end of program");
  var module = t.module(null, moduleFields, t.moduleMetadata(moduleMetadata.sections, moduleMetadata.functionNames, moduleMetadata.localNames));
  return t.program([module]);
}