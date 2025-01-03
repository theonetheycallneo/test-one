function assertPath(path) {
  if (typeof path != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
function normalizeStringPosix(path, allowAboveRoot) {
  let res = "",
    lastSegmentLength = 0,
    lastSlash = -1,
    dots = 0,
    code;
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i);else {
      if (code === 47) break;
      code = 47;
    }
    if (code === 47) {
      if (!(lastSlash === i - 1 || dots === 1)) if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = i, dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "", lastSegmentLength = 0, lastSlash = i, dots = 0;
            continue;
          }
        }
        allowAboveRoot && (res.length > 0 ? res += "/.." : res = "..", lastSegmentLength = 2);
      } else res.length > 0 ? res += "/" + path.slice(lastSlash + 1, i) : res = path.slice(lastSlash + 1, i), lastSegmentLength = i - lastSlash - 1;
      lastSlash = i, dots = 0;
    } else code === 46 && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
}
function resolve(...segments) {
  let resolvedPath = "",
    resolvedAbsolute = !1;
  for (let i = segments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path;
    i >= 0 ? path = segments[i] : path = "/", assertPath(path), path.length !== 0 && (resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = path.charCodeAt(0) === 47);
  }
  return resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute), resolvedAbsolute ? resolvedPath.length > 0 ? "/" + resolvedPath : "/" : resolvedPath.length > 0 ? resolvedPath : ".";
}
export { resolve };
//# sourceMappingURL=path.mjs.map
