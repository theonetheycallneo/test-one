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
var headers_exports = {};
__export(headers_exports, {
  asyncHeadersCache: () => asyncHeadersCache,
  mergeHeaders: () => mergeHeaders,
  requestAsyncLocalStore: () => requestAsyncLocalStore,
  setCurrentRequestHeaders: () => setCurrentRequestHeaders
});
module.exports = __toCommonJS(headers_exports);
var import_node_async_hooks = require("node:async_hooks");
const requestAsyncLocalStore = globalThis.__vxrnrequestAsyncLocalStore ?? new import_node_async_hooks.AsyncLocalStorage(), asyncHeadersCache = globalThis.__vxrnasyncHeadersCache ?? /* @__PURE__ */ new WeakMap();
globalThis.__vxrnrequestAsyncLocalStore ||= requestAsyncLocalStore;
globalThis.__vxrnasyncHeadersCache ||= asyncHeadersCache;
async function setCurrentRequestHeaders(cb) {
  const id = requestAsyncLocalStore.getStore();
  if (!id)
    throw new Error("AsyncLocalStorage not working, no id!");
  const headers = asyncHeadersCache.get(id) ?? new Headers();
  asyncHeadersCache.set(id, headers), cb(headers);
}
function mergeHeaders(onto, from) {
  from.forEach((value, key) => {
    value === void 0 || value === "undefined" ? onto.delete(key) : onto.append(key, value);
  });
}
//# sourceMappingURL=headers.js.map
