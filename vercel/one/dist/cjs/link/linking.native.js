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
var linking_exports = {};
__export(linking_exports, {
  addEventListener: () => addEventListener,
  getInitialURL: () => getInitialURL,
  getPathFromState: () => import_getPathFromState.default,
  getRootURL: () => getRootURL,
  getStateFromPath: () => import_getStateFromPath.default
});
module.exports = __toCommonJS(linking_exports);
var Linking = __toESM(require("expo-linking"), 1), import_react_native = require("react-native"), import_extractPathFromURL = require("../fork/extractPathFromURL"), import_getPathFromState = __toESM(require("../fork/getPathFromState"), 1), import_getStateFromPath = __toESM(require("../fork/getStateFromPath"), 1), _globalThis_expo_modules, _globalThis_expo, isExpoGo = typeof expo < "u" && ((_globalThis_expo = globalThis.expo) === null || _globalThis_expo === void 0 || (_globalThis_expo_modules = _globalThis_expo.modules) === null || _globalThis_expo_modules === void 0 ? void 0 : _globalThis_expo_modules.ExpoGo);
function getInitialURL() {
  if (process.env.NODE_ENV === "test") {
    var _Linking_getInitialURL;
    return (_Linking_getInitialURL = Linking.getInitialURL()) !== null && _Linking_getInitialURL !== void 0 ? _Linking_getInitialURL : getRootURL();
  }
  if (import_react_native.Platform.OS === "web") {
    var _window_location;
    if (typeof window > "u")
      return "";
    if (!((_window_location = window.location) === null || _window_location === void 0) && _window_location.href)
      return window.location.href;
  }
  return Promise.race([
    async function() {
      var url = await Linking.getInitialURL();
      if (url && isExpoGo) {
        var parsed = Linking.parse(url);
        if (parsed.path === null || [
          "",
          "/"
        ].includes((0, import_extractPathFromURL.adjustPathname)({
          hostname: parsed.hostname,
          pathname: parsed.path
        })))
          return getRootURL();
      }
      return url ?? getRootURL();
    }(),
    new Promise(function(resolve) {
      return (
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(function() {
          return resolve(getRootURL());
        }, 150)
      );
    })
  ]);
}
var _rootURL;
function getRootURL() {
  return _rootURL === void 0 && (_rootURL = Linking.createURL("/")), _rootURL;
}
function addEventListener(listener) {
  var callback;
  isExpoGo ? callback = function(param) {
    var { url } = param, parsed = Linking.parse(url);
    parsed.path === null || [
      "",
      "/"
    ].includes((0, import_extractPathFromURL.adjustPathname)({
      hostname: parsed.hostname,
      pathname: parsed.path
    })) ? listener(getRootURL()) : listener(url);
  } : callback = function(param) {
    var { url } = param;
    return listener(url);
  };
  var subscription = Linking.addEventListener("url", callback);
  return function() {
    var _subscription_remove;
    subscription == null || (_subscription_remove = subscription.remove) === null || _subscription_remove === void 0 || _subscription_remove.call(subscription);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addEventListener,
  getInitialURL,
  getPathFromState,
  getRootURL,
  getStateFromPath
});
//# sourceMappingURL=linking.js.map
