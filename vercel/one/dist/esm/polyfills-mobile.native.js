import structuredClone from "@ungap/structured-clone";
import "@azure/core-asynciterator-polyfill";
import "core-js/actual/url";
import "core-js/actual/url-search-params";
import { promiseWithResolvers } from "./utils/promiseWithResolvers";
var _globalThis, _structuredClone, _globalThis1, _requestAnimationFrame;
globalThis.global = globalThis;
(_globalThis = globalThis)[_structuredClone = "structuredClone"] || (_globalThis[_structuredClone] = structuredClone);
(_globalThis1 = globalThis)[_requestAnimationFrame = "requestAnimationFrame"] || (_globalThis1[_requestAnimationFrame] = setTimeout);
Promise.withResolvers || // @ts-ignore
(Promise.withResolvers = promiseWithResolvers);
//# sourceMappingURL=polyfills-mobile.js.map
