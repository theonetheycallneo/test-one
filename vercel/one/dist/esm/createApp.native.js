import { jsx as _jsx } from "react/jsx-runtime";
import "./polyfills-mobile";
import "./setup";
import { Root } from "./Root";
import { AppRegistry, LogBox } from "react-native";
LogBox.ignoreLogs([
  /Sending .* with no listeners registered/
]);
function createApp(options) {
  var App = function() {
    return /* @__PURE__ */ _jsx(Root, {
      isClient: !0,
      routes: options.routes,
      path: "/"
    });
  };
  AppRegistry.registerComponent("main", function() {
    return App;
  }), process.env.ONE_APP_NAME && AppRegistry.registerComponent(process.env.ONE_APP_NAME, function() {
    return App;
  });
}
export {
  createApp
};
//# sourceMappingURL=createApp.native.js.map
