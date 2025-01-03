var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
    get: () => from[key],
    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
  });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
// If the importer is in node compatibility mode or this is not an ESM
// file that has been converted to a CommonJS file using a Babel-
// compatible transform (i.e. "__esModule" has not been set), then set
// "default" to the CommonJS "module.exports" for node compatibility.
isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: !0
}) : target, mod));
var import_structured_clone = __toESM(require("@ungap/structured-clone"), 1),
  import_core_asynciterator_polyfill = require("@azure/core-asynciterator-polyfill"),
  import_url = require("core-js/actual/url"),
  import_url_search_params = require("core-js/actual/url-search-params"),
  import_promiseWithResolvers = require("./utils/promiseWithResolvers.cjs");
globalThis.global = globalThis;
globalThis.structuredClone ||= import_structured_clone.default;
globalThis.requestAnimationFrame ||= setTimeout;
Promise.withResolvers || (
// @ts-ignore
Promise.withResolvers = import_promiseWithResolvers.promiseWithResolvers);