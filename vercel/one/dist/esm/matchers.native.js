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
export {
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
};
//# sourceMappingURL=matchers.js.map
