"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var useQuery_exports = {};
__export(useQuery_exports, {
  useQuery: () => useQuery
});
module.exports = __toCommonJS(useQuery_exports);
var import_react = require("react"), import_getQueryKey = require("./getQueryKey"), import_resolveQuery = require("./resolveQuery"), import_useQueryZero = require("./useQueryZero"), clientInitialData = globalThis.__vxrnPostRenderData__, serverQueryData = {};
globalThis.__vxrnServerData__ = serverQueryData;
var useQuery = function(query) {
  var enable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, snapshot = (0, import_useQueryZero.useQuery)(query, enable), queryIdRef = (0, import_react.useRef)();
  query && !queryIdRef.current && (queryIdRef.current = (0, import_getQueryKey.getQueryKey)(query));
  var queryId = queryIdRef.current || "";
  if (0) {
    var promise, value;
    if (!promise)
      var promise1;
  }
  return clientInitialData && !snapshot ? clientInitialData[queryId] || [] : snapshot || [];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useQuery
});
//# sourceMappingURL=useQuery.js.map
