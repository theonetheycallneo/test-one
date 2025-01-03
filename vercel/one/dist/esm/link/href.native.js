var resolveHref = function(href) {
  if (typeof href == "string")
    return resolveHref({
      pathname: href
    });
  var _href_pathname, path = (_href_pathname = href.pathname) !== null && _href_pathname !== void 0 ? _href_pathname : "";
  if (!href?.params)
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
export {
  resolveHref
};
//# sourceMappingURL=href.js.map
