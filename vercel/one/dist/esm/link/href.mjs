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
export { resolveHref };
//# sourceMappingURL=href.mjs.map
