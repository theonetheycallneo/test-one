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
var Unmatched_exports = {};
__export(Unmatched_exports, {
  Unmatched: () => Unmatched
});
module.exports = __toCommonJS(Unmatched_exports);
var import_react = __toESM(require("react"), 1),
  import_react_native = require("react-native-web"),
  import_jsx_runtime = require("react/jsx-runtime");
function Unmatched() {
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.Text, {
    children: "unmmatched!!!!!!!!!"
  });
}
const styles = import_react_native.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 36,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomColor: "#323232",
    borderBottomWidth: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center"
  },
  link: {
    color: "rgba(255,255,255,0.4)",
    textAlign: "center"
  }
});