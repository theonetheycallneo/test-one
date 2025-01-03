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
var url_exports = {};
__export(url_exports, {
  hasUrlProtocolPrefix: () => hasUrlProtocolPrefix,
  isWellKnownUri: () => isWellKnownUri,
  shouldLinkExternally: () => shouldLinkExternally
});
module.exports = __toCommonJS(url_exports);
function hasUrlProtocolPrefix(href) {
  return /^[\w\d_+.-]+:\/\//.test(href);
}
function isWellKnownUri(href) {
  return /^(https?|mailto|tel|sms|geo|maps|market|itmss?|itms-apps|content|file):/.test(href);
}
function shouldLinkExternally(href) {
  return !/^[./]/.test(href) && (hasUrlProtocolPrefix(href) || isWellKnownUri(href));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasUrlProtocolPrefix,
  isWellKnownUri,
  shouldLinkExternally
});
//# sourceMappingURL=url.js.map
