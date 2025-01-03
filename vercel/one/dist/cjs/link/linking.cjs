var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var linking_exports = {};
__export(linking_exports, {
  addEventListener: () => addEventListener,
  getInitialURL: () => getInitialURL,
  getPathFromState: () => import_getPathFromState.default,
  getRootURL: () => getRootURL,
  getStateFromPath: () => import_getStateFromPath.default
});
module.exports = __toCommonJS(linking_exports);
var Linking = __toESM(require("expo-linking"), 1),
  import_react_native = require("react-native-web"),
  import_extractPathFromURL = require("../fork/extractPathFromURL.cjs"),
  import_getPathFromState = __toESM(require("../fork/getPathFromState.cjs"), 1),
  import_getStateFromPath = __toESM(require("../fork/getStateFromPath.cjs"), 1);
const isExpoGo = typeof expo < "u" && globalThis.expo?.modules?.ExpoGo;
function getInitialURL() {
  if (process.env.NODE_ENV === "test") return Linking.getInitialURL() ?? getRootURL();
  if (import_react_native.Platform.OS === "web") {
    if (typeof window > "u") return "";
    if (window.location?.href) return window.location.href;
  }
  return Promise.race([(async () => {
    const url = await Linking.getInitialURL();
    if (url && isExpoGo) {
      const parsed = Linking.parse(url);
      if (parsed.path === null || ["", "/"].includes((0, import_extractPathFromURL.adjustPathname)({
        hostname: parsed.hostname,
        pathname: parsed.path
      }))) return getRootURL();
    }
    return url ?? getRootURL();
  })(), new Promise(resolve =>
  // Timeout in 150ms if `getInitialState` doesn't resolve
  // Workaround for https://github.com/facebook/react-native/issues/25675
  setTimeout(() => resolve(getRootURL()), 150))]);
}
let _rootURL;
function getRootURL() {
  return _rootURL === void 0 && (_rootURL = Linking.createURL("/")), _rootURL;
}
function addEventListener(listener) {
  let callback;
  isExpoGo ? callback = ({
    url
  }) => {
    const parsed = Linking.parse(url);
    parsed.path === null || ["", "/"].includes((0, import_extractPathFromURL.adjustPathname)({
      hostname: parsed.hostname,
      pathname: parsed.path
    })) ? listener(getRootURL()) : listener(url);
  } : callback = ({
    url
  }) => listener(url);
  const subscription = Linking.addEventListener("url", callback);
  return () => {
    subscription?.remove?.();
  };
}