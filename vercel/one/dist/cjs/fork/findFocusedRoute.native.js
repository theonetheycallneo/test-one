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
var findFocusedRoute_exports = {};
__export(findFocusedRoute_exports, {
  findFocusedRoute: () => findFocusedRoute
});
module.exports = __toCommonJS(findFocusedRoute_exports);
function findFocusedRoute(state) {
  for (var current = state, _current_index; (current == null ? void 0 : current.routes[(_current_index = current.index) !== null && _current_index !== void 0 ? _current_index : 0].state) != null; ) {
    var _current_index1;
    current = current.routes[(_current_index1 = current.index) !== null && _current_index1 !== void 0 ? _current_index1 : 0].state;
  }
  var _current_index2, route = current == null ? void 0 : current.routes[(_current_index2 = current == null ? void 0 : current.index) !== null && _current_index2 !== void 0 ? _current_index2 : 0];
  return route;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findFocusedRoute
});
//# sourceMappingURL=findFocusedRoute.js.map
