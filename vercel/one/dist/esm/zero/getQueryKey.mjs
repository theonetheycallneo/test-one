import { hashString } from "../utils/hashString.mjs";
function getQueryKey(query) {
  return hashString(JSON.stringify(query.ast));
}
export { getQueryKey };
//# sourceMappingURL=getQueryKey.mjs.map
