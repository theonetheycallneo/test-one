import * as Linking from "expo-linking";
import { Platform } from "react-native";
import { adjustPathname } from "../fork/extractPathFromURL";
import getPathFromState from "../fork/getPathFromState";
import getStateFromPath from "../fork/getStateFromPath";
var _globalThis_expo_modules, _globalThis_expo, isExpoGo = typeof expo < "u" && ((_globalThis_expo = globalThis.expo) === null || _globalThis_expo === void 0 || (_globalThis_expo_modules = _globalThis_expo.modules) === null || _globalThis_expo_modules === void 0 ? void 0 : _globalThis_expo_modules.ExpoGo);
function getInitialURL() {
  if (process.env.NODE_ENV === "test") {
    var _Linking_getInitialURL;
    return (_Linking_getInitialURL = Linking.getInitialURL()) !== null && _Linking_getInitialURL !== void 0 ? _Linking_getInitialURL : getRootURL();
  }
  if (Platform.OS === "web") {
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
        ].includes(adjustPathname({
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
    ].includes(adjustPathname({
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
export {
  addEventListener,
  getInitialURL,
  getPathFromState,
  getRootURL,
  getStateFromPath
};
//# sourceMappingURL=linking.js.map
