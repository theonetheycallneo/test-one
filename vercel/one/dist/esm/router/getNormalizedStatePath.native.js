import { stripBaseUrl } from "../fork/getStateFromPath";
function getNormalizedStatePath(param, baseUrl) {
  var { path: statePath, params } = param, [pathname] = statePath.split("?");
  return {
    // Strip empty path at the start
    segments: stripBaseUrl(pathname, baseUrl).split("/").filter(Boolean).map(decodeURIComponent),
    // TODO: This is not efficient, we should generate based on the state instead
    // of converting to string then back to object
    params: Object.entries(params).reduce(function(prev, param2) {
      var [key, value] = param2;
      if (Array.isArray(value))
        prev[key] = value.map(function(v) {
          try {
            return decodeURIComponent(v);
          } catch {
            return v;
          }
        });
      else
        try {
          prev[key] = decodeURIComponent(value);
        } catch {
          prev[key] = value;
        }
      return prev;
    }, {})
  };
}
export {
  getNormalizedStatePath
};
//# sourceMappingURL=getNormalizedStatePath.js.map
