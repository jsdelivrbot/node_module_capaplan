"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyOperations = applyOperations;

var _wasmGen = require("@webassemblyjs/wasm-gen");

var _encoder = require("@webassemblyjs/wasm-gen/lib/encoder");

var _ast = require("@webassemblyjs/ast");

var _helperWasmSection = require("@webassemblyjs/helper-wasm-section");

var _helperBuffer = require("@webassemblyjs/helper-buffer");

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var debug = require("debug")("wasm");

function assertNodeHasLoc(n) {
  if (n.loc == null || n.loc.start == null || n.loc.end == null) {
    throw new Error("Internal failure: can not replace node (".concat(JSON.stringify(n.type), ") without loc information"));
  }
}

function shiftLocNodeByDelta(node, delta) {
  assertNodeHasLoc(node); // $FlowIgnore: assertNodeHasLoc ensures that

  node.loc.start.column += delta; // $FlowIgnore: assertNodeHasLoc ensures that

  node.loc.end.column += delta;
}

function applyUpdate(ast, uint8Buffer, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      oldNode = _ref2[0],
      newNode = _ref2[1];

  var deltaElements = 0;
  assertNodeHasLoc(oldNode);
  var sectionName = (0, _helperWasmSection.getSectionForNode)(newNode);
  var replacementByteArray = (0, _wasmGen.encodeNode)(newNode);
  /**
   * Replace new node as bytes
   */

  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, // $FlowIgnore: assertNodeHasLoc ensures that
  oldNode.loc.start.column, // $FlowIgnore: assertNodeHasLoc ensures that
  oldNode.loc.end.column, replacementByteArray);
  /**
   * Update function body size if needed
   */

  if (sectionName === "code") {
    // Find the parent func
    (0, _ast.traverse)(ast, {
      Func: function Func(_ref3) {
        var node = _ref3.node;
        var funcHasThisIntr = node.body.find(function (n) {
          return n === newNode;
        }) !== undefined; // Update func's body size if needed

        if (funcHasThisIntr === true) {
          // These are the old functions locations informations
          assertNodeHasLoc(node);
          var oldNodeSize = (0, _wasmGen.encodeNode)(oldNode).length;
          var bodySizeDeltaBytes = replacementByteArray.length - oldNodeSize;

          if (bodySizeDeltaBytes !== 0) {
            var newValue = node.metadata.bodySize + bodySizeDeltaBytes;
            var newByteArray = (0, _encoder.encodeU32)(newValue);
            debug("resize func body newValue=%d", newValue); // function body size byte
            // FIXME(sven): only handles one byte u32

            var start = node.loc.start.column;
            var end = start + 1;
            uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, start, end, newByteArray);
          }
        }
      }
    });
  }
  /**
   * Update section size
   */


  var deltaBytes = replacementByteArray.length - ( // $FlowIgnore: assertNodeHasLoc ensures that
  oldNode.loc.end.column - oldNode.loc.start.column); // Init location informations

  newNode.loc = {
    start: {
      line: -1,
      column: -1
    },
    end: {
      line: -1,
      column: -1
    }
  }; // Update new node end position
  // $FlowIgnore: assertNodeHasLoc ensures that

  newNode.loc.start.column = oldNode.loc.start.column; // $FlowIgnore: assertNodeHasLoc ensures that

  newNode.loc.end.column = // $FlowIgnore: assertNodeHasLoc ensures that
  oldNode.loc.start.column + replacementByteArray.length;
  return {
    uint8Buffer: uint8Buffer,
    deltaBytes: deltaBytes,
    deltaElements: deltaElements
  };
}

function applyDelete(ast, uint8Buffer, node) {
  var deltaElements = -1; // since we removed an element

  assertNodeHasLoc(node);
  var sectionName = (0, _helperWasmSection.getSectionForNode)(node);

  if (sectionName === "start") {
    var sectionMetadata = (0, _ast.getSectionMetadata)(ast, "start");
    /**
     * The start section only contains one element,
     * we need to remove the whole section
     */

    uint8Buffer = (0, _helperWasmSection.removeSection)(ast, uint8Buffer, "start");

    var _deltaBytes = -(sectionMetadata.size.value + 1)
    /* section id */
    ;

    return {
      uint8Buffer: uint8Buffer,
      deltaBytes: _deltaBytes,
      deltaElements: deltaElements
    };
  } // replacement is nothing


  var replacement = [];
  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, // $FlowIgnore: assertNodeHasLoc ensures that
  node.loc.start.column, // $FlowIgnore: assertNodeHasLoc ensures that
  node.loc.end.column, replacement);
  /**
   * Update section
   */
  // $FlowIgnore: assertNodeHasLoc ensures that

  var deltaBytes = -(node.loc.end.column - node.loc.start.column);
  return {
    uint8Buffer: uint8Buffer,
    deltaBytes: deltaBytes,
    deltaElements: deltaElements
  };
}

function applyAdd(ast, uint8Buffer, node) {
  var deltaElements = +1; // since we added an element

  var sectionName = (0, _helperWasmSection.getSectionForNode)(node);
  var sectionMetadata = (0, _ast.getSectionMetadata)(ast, sectionName); // Section doesn't exists, we create an empty one

  if (typeof sectionMetadata === "undefined") {
    var res = (0, _helperWasmSection.createEmptySection)(ast, uint8Buffer, sectionName);
    uint8Buffer = res.uint8Buffer;
    sectionMetadata = res.sectionMetadata;
  }
  /**
   * Add nodes
   */


  var newByteArray = (0, _wasmGen.encodeNode)(node); // The size of the section doesn't include the storage of the size itself
  // we need to manually add it here
  // FIXME(sven): preprocess it into the AST?

  var start = sectionMetadata.startOffset + sectionMetadata.size.value + (sectionMetadata.size.loc.end.column - sectionMetadata.size.loc.start.column);
  var end = start;
  uint8Buffer = (0, _helperBuffer.overrideBytesInBuffer)(uint8Buffer, start, end, newByteArray);
  /**
   * Update section
   */

  var deltaBytes = newByteArray.length;
  debug("add node=%s section=%s after=%d deltaBytes=%s deltaElements=%s", node.type, sectionName, start, deltaBytes, deltaElements);
  return {
    uint8Buffer: uint8Buffer,
    deltaBytes: deltaBytes,
    deltaElements: deltaElements
  };
}

function applyOperations(ast, uint8Buffer, ops) {
  ops.forEach(function (op) {
    var state;
    var sectionName;

    switch (op.kind) {
      case "update":
        state = applyUpdate(ast, uint8Buffer, [op.oldNode, op.node]);
        sectionName = (0, _helperWasmSection.getSectionForNode)(op.node);
        break;

      case "delete":
        state = applyDelete(ast, uint8Buffer, op.node);
        sectionName = (0, _helperWasmSection.getSectionForNode)(op.node);
        break;

      case "add":
        state = applyAdd(ast, uint8Buffer, op.node);
        sectionName = (0, _helperWasmSection.getSectionForNode)(op.node);
        break;

      default:
        throw new Error("Unknown operation");
    }
    /**
     * Shift following operation's nodes
     */


    if (state.deltaBytes !== 0) {
      ops.forEach(function (op) {
        // We don't need to handle add ops, they are positioning independent
        switch (op.kind) {
          case "update":
            shiftLocNodeByDelta(op.oldNode, state.deltaBytes);
            break;

          case "delete":
            shiftLocNodeByDelta(op.node, state.deltaBytes);
            break;
        }
      });

      if (sectionName !== "start") {
        state.uint8Buffer = (0, _helperWasmSection.resizeSectionByteSize)(ast, state.uint8Buffer, sectionName, state.deltaBytes);
      }
    }

    if (state.deltaElements !== 0 && sectionName !== "start") {
      state.uint8Buffer = (0, _helperWasmSection.resizeSectionVecSize)(ast, state.uint8Buffer, sectionName, state.deltaElements);
    }

    uint8Buffer = state.uint8Buffer;
  });
  return uint8Buffer;
}