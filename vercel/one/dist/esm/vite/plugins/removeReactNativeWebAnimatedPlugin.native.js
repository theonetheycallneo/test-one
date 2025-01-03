function removeReactNativeWebAnimatedPlugin(opts) {
  var filter = opts?.panResponder ? /(react-native\/Animated\/Animated|PlatformPressable|PanResponder|ResponderSystem)/ : /(react-native\/Animated\/Animated|PlatformPressable)/, optimizeDeps = {
    esbuildOptions: {
      plugins: [
        {
          name: "remove-react-native-web-animated",
          setup(build) {
            build.onResolve({
              filter
            }, function(args) {
              return {
                path: args.path,
                namespace: "proxy-wormify"
              };
            }), build.onLoad({
              filter: /.*/,
              namespace: "proxy-wormify"
            }, function(args) {
              return {
                contents: 'export * from "@tamagui/proxy-worm";',
                loader: "js"
              };
            });
          }
        }
      ]
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
export {
  removeReactNativeWebAnimatedPlugin
};
//# sourceMappingURL=removeReactNativeWebAnimatedPlugin.js.map