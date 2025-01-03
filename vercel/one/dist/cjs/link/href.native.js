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
var href_exports = {};
__export(href_exports, {
  resolveHref: () => resolveHref
});
module.exports = __toCommonJS(href_exports);
var resolveHref = function(href) {
  if (typeof href == "string")
    return resolveHref({
      pathname: href
    });
  var _href_pathname, path = (_href_pathname = href.pathname) !== null && _href_pathname !== void 0 ? _href_pathname : "";
  if (!(href != null && href.params))
    return path;
  var { pathname, params } = createQualifiedPathname(path, {
    ...href.params
  }), paramsString = createQueryParams(params);
  return pathname + (paramsString ? `?${paramsString}` : "");
};
function createQualifiedPathname(pathname, params) {
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = Object.entries(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var [key, value = ""] = _step.value, dynamicKey = `[${key}]`, deepDynamicKey = `[...${key}]`;
      if (pathname.includes(dynamicKey))
        pathname = pathname.replace(dynamicKey, encodeParam(value));
      else if (pathname.includes(deepDynamicKey))
        pathname = pathname.replace(deepDynamicKey, encodeParam(value));
      else
        continue;
      delete params[key];
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError)
        throw _iteratorError;
    }
  }
  return {
    pathname,
    params
  };
}
function encodeParam(param) {
  return Array.isArray(param) ? param.map(function(p) {
    return encodeParam(p);
  }).join("/") : encodeURIComponent(`${param}`);
}
function createQueryParams(params) {
  return Object.entries(params).filter(function(param) {
    var [, value] = param;
    return value != null;
  }).map(function(param) {
    var [key, value] = param;
    return `${key}=${encodeURIComponent(value.toString())}`;
  }).join("&");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveHref
});
//# sourceMappingURL=href.js.map
