import xxh from "xxhashjs";
function hashString(str) {
  return xxh.h64(0).update(str).digest().toString(36);
}
export {
  hashString
};
//# sourceMappingURL=hashString.js.map
