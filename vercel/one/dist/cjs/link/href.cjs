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
var href_exports = {};
__export(href_exports, {
  resolveHref: () => resolveHref
});
module.exports = __toCommonJS(href_exports);
const resolveHref = href => {
  if (typeof href == "string") return resolveHref({
    pathname: href
  });
  const path = href.pathname ?? "";
  if (!href?.params) return path;
  const {
      pathname,
      params
    } = createQualifiedPathname(path, {
      ...href.params
    }),
    paramsString = createQueryParams(params);
  return pathname + (paramsString ? `?${paramsString}` : "");
};
function createQualifiedPathname(pathname, params) {
  for (const [key, value = ""] of Object.entries(params)) {
    const dynamicKey = `[${key}]`,
      deepDynamicKey = `[...${key}]`;
    if (pathname.includes(dynamicKey)) pathname = pathname.replace(dynamicKey, encodeParam(value));else if (pathname.includes(deepDynamicKey)) pathname = pathname.replace(deepDynamicKey, encodeParam(value));else continue;
    delete params[key];
  }
  return {
    pathname,
    params
  };
}
function encodeParam(param) {
  return Array.isArray(param) ? param.map(p => encodeParam(p)).join("/") : encodeURIComponent(`${param}`);
}
function createQueryParams(params) {
  return Object.entries(params).filter(([, value]) => value != null).map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`).join("&");
}