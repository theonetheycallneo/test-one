var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var Screen_exports = {};
__export(Screen_exports, {
  Screen: () => Screen
});
module.exports = __toCommonJS(Screen_exports);
var import_use_isomorphic_layout_effect = require("@vxrn/use-isomorphic-layout-effect"),
  import_useNavigation = require("../useNavigation.cjs");
function Screen({
  name,
  options
}) {
  const navigation = (0, import_useNavigation.useNavigation)(name);
  return (0, import_use_isomorphic_layout_effect.useIsomorphicLayoutEffect)(() => {
    options &&
    // React Navigation will infinitely loop in some cases if an empty object is passed to setOptions.
    // https://github.com/expo/router/issues/452
    Object.keys(options).length && navigation.setOptions(options);
  }, [navigation, options]), null;
}