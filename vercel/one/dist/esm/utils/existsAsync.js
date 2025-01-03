import { exists } from "node:fs";
const existsAsync = (file) => new Promise((res, rej) => {
  try {
    exists(file, res);
  } catch {
    return !1;
  }
});
export {
  existsAsync
};
//# sourceMappingURL=existsAsync.js.map
