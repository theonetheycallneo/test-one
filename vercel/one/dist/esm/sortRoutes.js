import { matchGroupName } from "./matchers";
function sortDynamicConvention(a, b) {
  return a.deep && !b.deep ? 1 : !a.deep && b.deep ? -1 : 0;
}
function sortRoutes(a, b) {
  if (a.dynamic && !b.dynamic)
    return 1;
  if (!a.dynamic && b.dynamic)
    return -1;
  if (a.dynamic && b.dynamic) {
    if (a.dynamic.length !== b.dynamic.length)
      return b.dynamic.length - a.dynamic.length;
    for (let i = 0; i < a.dynamic.length; i++) {
      const aDynamic = a.dynamic[i], bDynamic = b.dynamic[i];
      if (aDynamic.notFound && bDynamic.notFound) {
        const s2 = sortDynamicConvention(aDynamic, bDynamic);
        if (s2)
          return s2;
      }
      if (aDynamic.notFound && !bDynamic.notFound)
        return 1;
      if (!aDynamic.notFound && bDynamic.notFound)
        return -1;
      const s = sortDynamicConvention(aDynamic, bDynamic);
      if (s)
        return s;
    }
    return 0;
  }
  const aIndex = a.route === "index" || matchGroupName(a.route) != null, bIndex = b.route === "index" || matchGroupName(b.route) != null;
  return aIndex && !bIndex ? -1 : !aIndex && bIndex ? 1 : a.route.length - b.route.length;
}
function sortRoutesWithInitial(initialRouteName) {
  return (a, b) => {
    if (initialRouteName) {
      if (a.route === initialRouteName)
        return -1;
      if (b.route === initialRouteName)
        return 1;
    }
    return sortRoutes(a, b);
  };
}
export {
  sortRoutes,
  sortRoutesWithInitial
};
//# sourceMappingURL=sortRoutes.js.map
