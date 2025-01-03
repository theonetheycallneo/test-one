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
var useNavigation_exports = {};
__export(useNavigation_exports, {
  resolveParentId: () => resolveParentId,
  useNavigation: () => useNavigation
});
module.exports = __toCommonJS(useNavigation_exports);
var import_native = require("@react-navigation/native"),
  import_react = __toESM(require("react"), 1),
  import_matchers = require("./matchers.cjs"),
  import_Route = require("./Route.cjs");
function useNavigation(parent) {
  const navigation = (0, import_native.useNavigation)(),
    contextKey = (0, import_Route.useContextKey)(),
    normalizedParent = import_react.default.useMemo(() => {
      if (!parent) return null;
      const normalized = (0, import_matchers.getNameFromFilePath)(parent);
      return parent.startsWith(".") ? relativePaths(contextKey, parent) : normalized;
    }, [contextKey, parent]);
  if (normalizedParent != null) {
    const parentNavigation = navigation.getParent(normalizedParent);
    if (!parentNavigation) throw new Error(`Could not find parent navigation with route "${parent}".` + (normalizedParent !== parent ? ` (normalized: ${normalizedParent})` : ""));
    return parentNavigation;
  }
  return navigation;
}
function resolveParentId(contextKey, parentId) {
  return parentId ? parentId.startsWith(".") ? (0, import_matchers.getNameFromFilePath)(relativePaths(contextKey, parentId)) : (0, import_matchers.getNameFromFilePath)(parentId) : null;
}
function relativePaths(from, to) {
  const fromParts = from.split("/").filter(Boolean),
    toParts = to.split("/").filter(Boolean);
  for (const part of toParts) if (part === "..") {
    if (fromParts.length === 0) throw new Error(`Cannot resolve path "${to}" relative to "${from}"`);
    fromParts.pop();
  } else part === "." || fromParts.push(part);
  return "/" + fromParts.join("/");
}