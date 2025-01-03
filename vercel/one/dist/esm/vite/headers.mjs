import { AsyncLocalStorage } from "node:async_hooks";
const requestAsyncLocalStore = globalThis.__vxrnrequestAsyncLocalStore ?? new AsyncLocalStorage(),
  asyncHeadersCache = globalThis.__vxrnasyncHeadersCache ?? /* @__PURE__ */new WeakMap();
globalThis.__vxrnrequestAsyncLocalStore ||= requestAsyncLocalStore;
globalThis.__vxrnasyncHeadersCache ||= asyncHeadersCache;
async function setCurrentRequestHeaders(cb) {
  const id = requestAsyncLocalStore.getStore();
  if (!id) throw new Error("AsyncLocalStorage not working, no id!");
  const headers = asyncHeadersCache.get(id) ?? new Headers();
  asyncHeadersCache.set(id, headers), cb(headers);
}
function mergeHeaders(onto, from) {
  from.forEach((value, key) => {
    value === void 0 || value === "undefined" ? onto.delete(key) : onto.append(key, value);
  });
}
export { asyncHeadersCache, mergeHeaders, requestAsyncLocalStore, setCurrentRequestHeaders };
//# sourceMappingURL=headers.mjs.map
