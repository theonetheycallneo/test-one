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
