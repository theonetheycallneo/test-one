import { exists } from "node:fs";
var existsAsync = function(file) {
  return new Promise(function(res, rej) {
    try {
      exists(file, res);
    } catch {
      return !1;
    }
  });
};
export {
  existsAsync
};
//# sourceMappingURL=existsAsync.js.map
