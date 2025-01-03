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
var getURL_native_exports = {};
__export(getURL_native_exports, {
  getURL: () => getURL
});
module.exports = __toCommonJS(getURL_native_exports);
var import_getDevServer = __toESM(require("react-native/Libraries/Core/Devtools/getDevServer"), 1);
function getURL() {
  var url = process.env.ONE_SERVER_URL;
  if (__DEV__) {
    url || console.warn("The ONE_SERVER_URL environment variable is not set. While things will work in development mode as we'll be using your development server, you should still set ONE_SERVER_URL in your .env file for your production builds to work.");
    var { url: devServerUrl } = (0, import_getDevServer.default)();
    url = devServerUrl;
  }
  return url || (url = "http://one-server.example.com"), url.replace(/\/+$/, "");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getURL
});
//# sourceMappingURL=getURL.native.js.map
