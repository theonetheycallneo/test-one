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
var removeReactNativeWebAnimatedPlugin_exports = {};
__export(removeReactNativeWebAnimatedPlugin_exports, {
  removeReactNativeWebAnimatedPlugin: () => removeReactNativeWebAnimatedPlugin
});
module.exports = __toCommonJS(removeReactNativeWebAnimatedPlugin_exports);
function removeReactNativeWebAnimatedPlugin(opts) {
  const filter = opts?.panResponder ? /(react-native\/Animated\/Animated|PlatformPressable|PanResponder|ResponderSystem)/ : /(react-native\/Animated\/Animated|PlatformPressable)/,
    optimizeDeps = {
      esbuildOptions: {
        plugins: [{
          name: "remove-react-native-web-animated",
          setup(build) {
            build.onResolve({
              filter
            }, args => ({
              path: args.path,
              namespace: "proxy-wormify"
            })), build.onLoad({
              filter: /.*/,
              namespace: "proxy-wormify"
            }, args => ({
              contents: 'export * from "@tamagui/proxy-worm";',
              loader: "js"
            }));
          }
        }]
      }
    };
  return {
    name: "remove-react-native-web-animated",
    config() {
      return {
        optimizeDeps
      };
    }
  };
}