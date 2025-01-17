"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;

var decoder = _interopRequireWildcard(require("./decoder"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var t = require("@webassemblyjs/ast");

var defaultDecoderOpts = {
  dump: false,
  ignoreCodeSection: false,
  ignoreDataSection: false,
  ignoreCustomNameSection: false
}; // traverses the AST, locating function name metadata, which is then
// used to update index-based identifiers with function names

function restoreFunctionNames(ast) {
  var functionNames = [];
  t.traverse(ast, {
    FunctionNameMetadata: function FunctionNameMetadata(_ref) {
      var node = _ref.node;
      functionNames.push({
        name: node.value,
        index: node.index
      });
    }
  });

  if (functionNames.length === 0) {
    return;
  }

  t.traverse(ast, {
    Func: function (_Func) {
      function Func(_x) {
        return _Func.apply(this, arguments);
      }

      Func.toString = function () {
        return _Func.toString();
      };

      return Func;
    }(function (_ref2) {
      var node = _ref2.node;
      // $FlowIgnore
      var nodeName = node.name;
      var indexBasedFunctionName = nodeName.value;
      var index = Number(indexBasedFunctionName.replace("func_", ""));
      var functionName = functionNames.find(function (f) {
        return f.index === index;
      });

      if (functionName) {
        nodeName.value = functionName.name; // $FlowIgnore

        delete nodeName.raw;
      }
    }),
    // Also update the reference in the export
    ModuleExport: function (_ModuleExport) {
      function ModuleExport(_x2) {
        return _ModuleExport.apply(this, arguments);
      }

      ModuleExport.toString = function () {
        return _ModuleExport.toString();
      };

      return ModuleExport;
    }(function (_ref3) {
      var node = _ref3.node;

      if (node.descr.type === "Func") {
        // $FlowIgnore
        var nodeName = node.descr.id;
        var indexBasedFunctionName = nodeName.value;
        var index = Number(indexBasedFunctionName.replace("func_", ""));
        var functionName = functionNames.find(function (f) {
          return f.index === index;
        });

        if (functionName) {
          nodeName.value = functionName.name;
        }
      }
    }),
    CallInstruction: function (_CallInstruction) {
      function CallInstruction(_x3) {
        return _CallInstruction.apply(this, arguments);
      }

      CallInstruction.toString = function () {
        return _CallInstruction.toString();
      };

      return CallInstruction;
    }(function (nodePath) {
      var node = nodePath.node;
      var index = node.index.value;
      var functionName = functionNames.find(function (f) {
        return f.index === index;
      });

      if (functionName) {
        node.index = t.identifier(functionName.name); // $FlowIgnore

        delete node.raw;
      }
    })
  });
}

function restoreLocalNames(ast) {
  var localNames = [];
  t.traverse(ast, {
    LocalNameMetadata: function LocalNameMetadata(_ref4) {
      var node = _ref4.node;
      localNames.push({
        name: node.value,
        localIndex: node.localIndex,
        functionIndex: node.functionIndex
      });
    }
  });

  if (localNames.length === 0) {
    return;
  }

  t.traverse(ast, {
    Func: function (_Func2) {
      function Func(_x4) {
        return _Func2.apply(this, arguments);
      }

      Func.toString = function () {
        return _Func2.toString();
      };

      return Func;
    }(function (_ref5) {
      var node = _ref5.node;
      var signature = node.signature;

      if (signature.type !== "Signature") {
        return;
      } // $FlowIgnore


      var nodeName = node.name;
      var indexBasedFunctionName = nodeName.value;
      var functionIndex = Number(indexBasedFunctionName.replace("func_", ""));
      signature.params.forEach(function (param, paramIndex) {
        var paramName = localNames.find(function (f) {
          return f.localIndex === paramIndex && f.functionIndex === functionIndex;
        });

        if (paramName && paramName.name !== "") {
          param.id = paramName.name;
        }
      });
    })
  });
}

function decode(buf, customOpts) {
  var opts = Object.assign({}, defaultDecoderOpts, customOpts);
  var ast = decoder.decode(buf, opts);

  if (!opts.ignoreCustomNameSection) {
    restoreFunctionNames(ast);
    restoreLocalNames(ast);
  }

  return ast;
}