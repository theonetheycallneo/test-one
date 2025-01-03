import structuredClone from "@ungap/structured-clone";
import "@azure/core-asynciterator-polyfill";
import "core-js/actual/url";
import "core-js/actual/url-search-params";
import { promiseWithResolvers } from "./utils/promiseWithResolvers";
globalThis.global = globalThis;
globalThis.structuredClone ||= structuredClone;
globalThis.requestAnimationFrame ||= setTimeout;
Promise.withResolvers || // @ts-ignore
(Promise.withResolvers = promiseWithResolvers);
//# sourceMappingURL=polyfills-mobile.js.map
