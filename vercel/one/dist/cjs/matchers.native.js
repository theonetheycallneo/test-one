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
var matchers_exports = {};
__export(matchers_exports, {
  getContextKey: () => getContextKey,
  getNameFromFilePath: () => getNameFromFilePath,
  isTypedRoute: () => isTypedRoute,
  matchArrayGroupName: () => matchArrayGroupName,
  matchDeepDynamicRouteName: () => matchDeepDynamicRouteName,
  matchDynamicName: () => matchDynamicName,
  matchGroupName: () => matchGroupName,
  removeFileSystemDots: () => removeFileSystemDots,
  removeSupportedExtensions: () => removeSupportedExtensions,
  stripGroupSegmentsFromPath: () => stripGroupSegmentsFromPath,
  stripInvisibleSegmentsFromPath: () => stripInvisibleSegmentsFromPath,
  testNotFound: () => testNotFound
});
module.exports = __toCommonJS(matchers_exports);
function matchDynamicName(name) {
  var _name_match;
  return (_name_match = name.match(/^\[([^[\](?:\.\.\.)]+?)\]$/)) === null || _name_match === void 0 ? void 0 : _name_match[1];
}
function matchDeepDynamicRouteName(name) {
  var _name_match;
  return (_name_match = name.match(/^\[\.\.\.([^/]+?)\]$/)) === null || _name_match === void 0 ? void 0 : _name_match[1];
}
function testNotFound(name) {
  return /\+not-found$/.test(name);
}
function matchGroupName(name) {
  var _name_match;
  return (_name_match = name.match(/^(?:[^\\(\\)])*?\(([^\\/]+)\).*?$/)) === null || _name_match === void 0 ? void 0 : _name_match[1];
}
function matchArrayGroupName(name) {
  var _name_match;
  return (_name_match = name.match(/(?:[^\\(\\)])*?\(?([^\\/\(\)]+,[^\\/\(\)]+)\)?.*?$/)) === null || _name_match === void 0 ? void 0 : _name_match[1];
}
function getNameFromFilePath(name) {
  return removeSupportedExtensions(removeFileSystemDots(name));
}
function getContextKey(name) {
  var normal = "/" + getNameFromFilePath(name);
  return normal.endsWith("_layout") ? normal.replace(/\/?_layout$/, "") : normal;
}
function removeSupportedExtensions(name) {
  return name.replace(/(\+(api|spa|ssg|ssr))?\.[jt]sx?$/g, "");
}
function removeFileSystemDots(filePath) {
  return filePath.replace(/^(?:\.\.?\/)+/g, "");
}
function stripGroupSegmentsFromPath(path) {
  return path.split("/").reduce(function(acc, v) {
    return matchGroupName(v) == null && acc.push(v), acc;
  }, []).join("/");
}
function stripInvisibleSegmentsFromPath(path) {
  return stripGroupSegmentsFromPath(path).replace(/\/?index$/, "");
}
function isTypedRoute(name) {
  return !name.startsWith("+") && name.match(/(_layout|[^/]*?\+[^/]*?)\.[tj]sx?$/) === null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getContextKey,
  getNameFromFilePath,
  isTypedRoute,
  matchArrayGroupName,
  matchDeepDynamicRouteName,
  matchDynamicName,
  matchGroupName,
  removeFileSystemDots,
  removeSupportedExtensions,
  stripGroupSegmentsFromPath,
  stripInvisibleSegmentsFromPath,
  testNotFound
});
//# sourceMappingURL=matchers.js.map
