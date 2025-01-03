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
var useQuery_exports = {};
__export(useQuery_exports, {
  useQuery: () => useQuery
});
module.exports = __toCommonJS(useQuery_exports);
var import_react = require("react"),
  import_getQueryKey = require("./getQueryKey.cjs"),
  import_resolveQuery = require("./resolveQuery.cjs"),
  import_useQueryZero = require("./useQueryZero.cjs");
let clientInitialData = globalThis.__vxrnPostRenderData__;
const serverQueryData = {};
globalThis.__vxrnServerData__ = serverQueryData;
const promises = /* @__PURE__ */new WeakMap(),
  useQuery = (query, enable = !0) => {
    const snapshot = (0, import_useQueryZero.useQuery)(query, enable),
      queryIdRef = (0, import_react.useRef)();
    query && !queryIdRef.current && (queryIdRef.current = (0, import_getQueryKey.getQueryKey)(query));
    const queryId = queryIdRef.current || "";
    if (typeof window > "u") {
      if (!query) return [];
      const promise = promises.get(query),
        value = serverQueryData[queryId];
      if (value) return value;
      if (!promise) {
        const promise2 = new Promise((res, rej) => {
          (0, import_resolveQuery.resolveZeroQuery)(query).then(val => {
            serverQueryData[queryId] = val, res();
          }).catch(err => {
            promises.set(query, null), rej(err);
          });
        });
        throw promises.set(query, promise2), promise2;
      }
      if (promise) throw promise;
      return [];
    }
    return clientInitialData && !snapshot ? clientInitialData[queryId] || [] : snapshot || [];
  };