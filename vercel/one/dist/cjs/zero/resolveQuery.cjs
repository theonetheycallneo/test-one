var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var resolveQuery_exports = {};
__export(resolveQuery_exports, {
  resolveZeroQuery: () => resolveZeroQuery
});
module.exports = __toCommonJS(resolveQuery_exports);
async function resolveZeroQuery(query) {
  const view = query.materialize(),
    tm = setTimeout(() => {
      console.warn(" Warning: query slow to resolve, ensure Zero server is running", JSON.stringify(query.ast, null, 2));
    }, 2e3);
  return new Promise((res, rej) => {
    try {
      const unsubscribe = view.addListener(snapshot => {
        unsubscribe(), clearTimeout(tm), res(snapshot);
      });
      view.hydrate();
    } catch (err) {
      clearTimeout(tm), rej(err);
    }
  });
}