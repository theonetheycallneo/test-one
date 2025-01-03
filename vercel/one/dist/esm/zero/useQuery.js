import { useRef } from "react";
import { getQueryKey } from "./getQueryKey";
import { resolveZeroQuery } from "./resolveQuery";
import { useQuery as useQueryZero } from "./useQueryZero";
let clientInitialData = globalThis.__vxrnPostRenderData__;
const serverQueryData = {};
globalThis.__vxrnServerData__ = serverQueryData;
const promises = /* @__PURE__ */ new WeakMap(), useQuery = (query, enable = !0) => {
  const snapshot = useQueryZero(query, enable), queryIdRef = useRef();
  query && !queryIdRef.current && (queryIdRef.current = getQueryKey(query));
  const queryId = queryIdRef.current || "";
  if (typeof window > "u") {
    if (!query) return [];
    const promise = promises.get(query), value = serverQueryData[queryId];
    if (value) return value;
    if (!promise) {
      const promise2 = new Promise((res, rej) => {
        resolveZeroQuery(query).then((val) => {
          serverQueryData[queryId] = val, res();
        }).catch((err) => {
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
export {
  useQuery
};
//# sourceMappingURL=useQuery.js.map
