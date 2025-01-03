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
var PreloadLinks_exports = {};
__export(PreloadLinks_exports, {
  PreloadLinks: () => PreloadLinks
});
module.exports = __toCommonJS(PreloadLinks_exports);
var import_react = require("react"),
  import_router = require("../router/router.cjs"),
  import_getURL = require("../getURL.cjs");
const import_meta = {};
function PreloadLinks() {
  return typeof window < "u" && import_meta.env.PROD && (0, import_react.useEffect)(() => {
    const url = (0, import_getURL.getURL)(),
      controller = new AbortController();
    return document.addEventListener("mouseover", e => {
      let target = e.target;
      if (!(target instanceof HTMLElement) || (target = target instanceof HTMLAnchorElement ? target : target.closest("a"), !(target instanceof HTMLAnchorElement))) return;
      const href = target.getAttribute("href");
      (href?.[0] === "/" || href?.[0].startsWith(url)) && (0, import_router.preloadRoute)(href.replace(url, ""));
    }, {
      passive: !0,
      signal: controller.signal
    }), () => {
      controller.abort();
    };
  }, []), null;
}