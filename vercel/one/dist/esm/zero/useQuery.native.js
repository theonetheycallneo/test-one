import { useRef } from "react";
import { getQueryKey } from "./getQueryKey";
import "./resolveQuery";
import { useQuery as useQueryZero } from "./useQueryZero";
var clientInitialData = globalThis.__vxrnPostRenderData__, serverQueryData = {};
globalThis.__vxrnServerData__ = serverQueryData;
var useQuery = function(query) {
  var enable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, snapshot = useQueryZero(query, enable), queryIdRef = useRef();
  query && !queryIdRef.current && (queryIdRef.current = getQueryKey(query));
  var queryId = queryIdRef.current || "";
  if (0) {
    var promise, value;
    if (!promise)
      var promise1;
  }
  return clientInitialData && !snapshot ? clientInitialData[queryId] || [] : snapshot || [];
};
export {
  useQuery
};
//# sourceMappingURL=useQuery.js.map
