import { hashString } from "../utils/hashString";
function getQueryKey(query) {
  return hashString(JSON.stringify(query.ast));
}
export {
  getQueryKey
};
//# sourceMappingURL=getQueryKey.js.map
