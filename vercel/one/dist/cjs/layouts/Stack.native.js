"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Stack_exports = {};
__export(Stack_exports, {
  Stack: () => Stack,
  default: () => Stack_default
});
module.exports = __toCommonJS(Stack_exports);
var import_native_stack = require("@react-navigation/native-stack"), import_withLayoutContext = require("./withLayoutContext"), NativeStackNavigator = (0, import_native_stack.createNativeStackNavigator)().Navigator, Stack = (0, import_withLayoutContext.withLayoutContext)(NativeStackNavigator), Stack_default = Stack;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Stack
});
//# sourceMappingURL=Stack.js.map
