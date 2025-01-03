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
var useLoadedNavigation_exports = {};
__export(useLoadedNavigation_exports, {
  useLoadedNavigation: () => useLoadedNavigation,
  useOptionalNavigation: () => useOptionalNavigation
});
module.exports = __toCommonJS(useLoadedNavigation_exports);
var import_native = require("@react-navigation/native"), import_react = require("react"), import_router = require("../router/router");
function useLoadedNavigation() {
  var { navigationRef } = (0, import_router.useOneRouter)(), navigation = (0, import_native.useNavigation)(), isMounted = (0, import_react.useRef)(!0), pending = (0, import_react.useRef)([]);
  (0, import_react.useEffect)(function() {
    return isMounted.current = !0, function() {
      isMounted.current = !1;
    };
  }, []);
  var flush = (0, import_react.useCallback)(function() {
    if (isMounted.current) {
      var pendingCallbacks = pending.current;
      pending.current = [], pendingCallbacks.forEach(function(callback) {
        callback(navigation);
      });
    }
  }, [
    navigation
  ]);
  (0, import_react.useEffect)(function() {
    navigationRef.current && flush();
  }, [
    flush,
    navigationRef
  ]);
  var push = (0, import_react.useCallback)(function(fn) {
    pending.current.push(fn), navigationRef.current && flush();
  }, [
    flush,
    navigationRef
  ]);
  return push;
}
function useOptionalNavigation() {
  var [navigation, setNavigation] = (0, import_react.useState)(null), loadNavigation = useLoadedNavigation();
  return (0, import_react.useEffect)(function() {
    loadNavigation(function(nav) {
      return setNavigation(nav);
    });
  }, [
    loadNavigation
  ]), navigation;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useLoadedNavigation,
  useOptionalNavigation
});
//# sourceMappingURL=useLoadedNavigation.js.map
