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
var redirect_exports = {};
__export(redirect_exports, {
  redirect: () => redirect
});
module.exports = __toCommonJS(redirect_exports);
var import_getURL = require("../getURL"), import_imperative_api = require("../imperative-api"), redirect = function(path, status) {
  if (process.env.VITE_ENVIRONMENT === "client") {
    import_imperative_api.router.navigate(path);
    return;
  }
  return Response.redirect(path[0] === "/" ? `${(0, import_getURL.getURL)()}${path}` : path, status);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  redirect
});
//# sourceMappingURL=redirect.js.map
