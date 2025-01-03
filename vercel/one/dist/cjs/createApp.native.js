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
var createApp_native_exports = {};
__export(createApp_native_exports, {
  createApp: () => createApp
});
module.exports = __toCommonJS(createApp_native_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_polyfills_mobile = require("./polyfills-mobile"), import_setup = require("./setup"), import_Root = require("./Root"), import_react_native = require("react-native");
import_react_native.LogBox.ignoreLogs([
  /Sending .* with no listeners registered/
]);
function createApp(options) {
  var App = function() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Root.Root, {
      isClient: !0,
      routes: options.routes,
      path: "/"
    });
  };
  import_react_native.AppRegistry.registerComponent("main", function() {
    return App;
  }), process.env.ONE_APP_NAME && import_react_native.AppRegistry.registerComponent(process.env.ONE_APP_NAME, function() {
    return App;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createApp
});
//# sourceMappingURL=createApp.native.js.map
