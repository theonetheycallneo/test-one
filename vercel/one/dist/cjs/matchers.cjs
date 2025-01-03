var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
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
  return name.match(/^\[([^[\](?:\.\.\.)]+?)\]$/)?.[1];
}
function matchDeepDynamicRouteName(name) {
  return name.match(/^\[\.\.\.([^/]+?)\]$/)?.[1];
}
function testNotFound(name) {
  return /\+not-found$/.test(name);
}
function matchGroupName(name) {
  return name.match(/^(?:[^\\(\\)])*?\(([^\\/]+)\).*?$/)?.[1];
}
function matchArrayGroupName(name) {
  return name.match(/(?:[^\\(\\)])*?\(?([^\\/\(\)]+,[^\\/\(\)]+)\)?.*?$/)?.[1];
}
function getNameFromFilePath(name) {
  return removeSupportedExtensions(removeFileSystemDots(name));
}
function getContextKey(name) {
  const normal = "/" + getNameFromFilePath(name);
  return normal.endsWith("_layout") ? normal.replace(/\/?_layout$/, "") : normal;
}
function removeSupportedExtensions(name) {
  return name.replace(/(\+(api|spa|ssg|ssr))?\.[jt]sx?$/g, "");
}
function removeFileSystemDots(filePath) {
  return filePath.replace(/^(?:\.\.?\/)+/g, "");
}
function stripGroupSegmentsFromPath(path) {
  return path.split("/").reduce((acc, v) => (matchGroupName(v) == null && acc.push(v), acc), []).join("/");
}
function stripInvisibleSegmentsFromPath(path) {
  return stripGroupSegmentsFromPath(path).replace(/\/?index$/, "");
}
function isTypedRoute(name) {
  return !name.startsWith("+") && name.match(/(_layout|[^/]*?\+[^/]*?)\.[tj]sx?$/) === null;
}