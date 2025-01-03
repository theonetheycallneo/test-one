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
  const { navigationRef } = (0, import_router.useOneRouter)(), navigation = (0, import_native.useNavigation)(), isMounted = (0, import_react.useRef)(!0), pending = (0, import_react.useRef)([]);
  (0, import_react.useEffect)(() => (isMounted.current = !0, () => {
    isMounted.current = !1;
  }), []);
  const flush = (0, import_react.useCallback)(() => {
    if (isMounted.current) {
      const pendingCallbacks = pending.current;
      pending.current = [], pendingCallbacks.forEach((callback) => {
        callback(navigation);
      });
    }
  }, [navigation]);
  return (0, import_react.useEffect)(() => {
    navigationRef.current && flush();
  }, [flush, navigationRef]), (0, import_react.useCallback)(
    (fn) => {
      pending.current.push(fn), navigationRef.current && flush();
    },
    [flush, navigationRef]
  );
}
function useOptionalNavigation() {
  const [navigation, setNavigation] = (0, import_react.useState)(null), loadNavigation = useLoadedNavigation();
  return (0, import_react.useEffect)(() => {
    loadNavigation((nav) => setNavigation(nav));
  }, [loadNavigation]), navigation;
}
//# sourceMappingURL=useLoadedNavigation.js.map
