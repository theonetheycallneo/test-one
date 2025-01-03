import { stripBaseUrl } from "../fork/getStateFromPath.mjs";
function getNormalizedStatePath({
  path: statePath,
  params
}, baseUrl) {
  const [pathname] = statePath.split("?");
  return {
    // Strip empty path at the start
    segments: stripBaseUrl(pathname, baseUrl).split("/").filter(Boolean).map(decodeURIComponent),
    // TODO: This is not efficient, we should generate based on the state instead
    // of converting to string then back to object
    params: Object.entries(params).reduce((prev, [key, value]) => {
      if (Array.isArray(value)) prev[key] = value.map(v => {
        try {
          return decodeURIComponent(v);
        } catch {
          return v;
        }
      });else try {
        prev[key] = decodeURIComponent(value);
      } catch {
        prev[key] = value;
      }
      return prev;
    }, {})
  };
}
export { getNormalizedStatePath };
//# sourceMappingURL=getNormalizedStatePath.mjs.map
