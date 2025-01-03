"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var useInitializeOneRouter_exports = {};
__export(useInitializeOneRouter_exports, {
  resetState: () => resetState,
  useInitializeOneRouter: () => useInitializeOneRouter
});
module.exports = __toCommonJS(useInitializeOneRouter_exports);
var import_native = require("@react-navigation/native"), import_router = require("./router"), routerStore = __toESM(require("./router"), 1), initialized = !1;
function useInitializeOneRouter(context, initialLocation) {
  var navigationRef = (0, import_native.useNavigationContainerRef)();
  return initialized || ((0, import_router.initialize)(context, navigationRef, initialLocation), initialized = !0), routerStore;
}
function resetState() {
  initialized = !1, resetReactNavigationContexts();
}
globalThis.__vxrnresetState = resetState;
function resetReactNavigationContexts() {
  var contexts = "__react_navigation__elements_contexts";
  globalThis[contexts] = /* @__PURE__ */ new Map();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resetState,
  useInitializeOneRouter
});
//# sourceMappingURL=useInitializeOneRouter.js.map
