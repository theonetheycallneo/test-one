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
var getRoutes_exports = {};
__export(getRoutes_exports, {
  extrapolateGroups: () => extrapolateGroups,
  generateDynamic: () => generateDynamic,
  getExactRoutes: () => getExactRoutes,
  getIgnoreList: () => getIgnoreList,
  getRoutes: () => getRoutes
});
module.exports = __toCommonJS(getRoutes_exports);
var import_config = require("./config"), import_matchers = require("./matchers"), import_getPageExport = require("./utils/getPageExport");
const validPlatforms = /* @__PURE__ */ new Set(["android", "ios", "native", "web"]);
function getRoutes(contextModule, options = {}) {
  const directoryTree = getDirectoryTree(contextModule, options);
  if (!directoryTree)
    return null;
  const rootNode = flattenDirectoryTreeToRoutes(directoryTree, options);
  return options.ignoreEntryPoints || crawlAndAppendInitialRoutesAndEntryFiles(rootNode, options), rootNode;
}
function getExactRoutes(contextModule, options = {}) {
  return getRoutes(contextModule, {
    ...options,
    skipGenerated: !0
  });
}
function getDirectoryTree(contextModule, options) {
  const importMode = options.importMode || process.env.One_ROUTER_IMPORT_MODE, ignoreList = [/^\.\/\+html\.[tj]sx?$/];
  options.ignore && ignoreList.push(...options.ignore), options.preserveApiRoutes || ignoreList.push(/\+api\.[tj]sx?$/);
  const rootDirectory = {
    files: /* @__PURE__ */ new Map(),
    subdirectories: /* @__PURE__ */ new Map()
  };
  let hasRoutes = !1, isValid = !1;
  for (const filePath of contextModule.keys()) {
    if (ignoreList.some((regex) => regex.test(filePath)))
      continue;
    isValid = !0;
    const meta = getFileMeta(filePath, options);
    if (meta.specificity < 0)
      continue;
    const type = meta.isLayout ? "layout" : meta.renderMode || (0, import_config.getDefaultRenderMode)();
    let node = {
      type,
      loadRoute() {
        if (options.ignoreRequireErrors)
          try {
            return contextModule(filePath);
          } catch {
            return {};
          }
        else
          return contextModule(filePath);
      },
      contextKey: filePath,
      route: "",
      // This is overwritten during hoisting based upon the _layout
      dynamic: null,
      children: []
      // While we are building the directory tree, we don't know the node's children just yet. This is added during hoisting
    };
    if (!(process.env.NODE_ENV === "development" && node.type !== "api" && importMode === "sync" && !(0, import_getPageExport.getPageExport)(node.loadRoute())))
      for (const route of extrapolateGroups(meta.route)) {
        const subdirectoryParts = route.split("/").slice(0, -1);
        let directory = rootDirectory;
        for (const part of subdirectoryParts) {
          let subDirectory = directory.subdirectories.get(part);
          subDirectory || (subDirectory = {
            files: /* @__PURE__ */ new Map(),
            subdirectories: /* @__PURE__ */ new Map()
          }, directory.subdirectories.set(part, subDirectory)), directory = subDirectory;
        }
        if (node = { ...node, route }, meta.isLayout) {
          directory.layout ??= [];
          const existing = directory.layout[meta.specificity];
          if (existing) {
            if (process.env.NODE_ENV !== "production")
              throw new Error(
                `The layouts "${filePath}" and "${existing.contextKey}" conflict on the route "/${route}". Please remove or rename one of these files.`
              );
          } else
            node = getLayoutNode(node, options), directory.layout[meta.specificity] = node;
        } else if (type === "api") {
          const fileKey = `${route}+api`;
          let nodes = directory.files.get(fileKey);
          nodes || (nodes = [], directory.files.set(fileKey, nodes));
          const existing = nodes[0];
          if (existing) {
            if (process.env.NODE_ENV !== "production")
              throw new Error(
                `The API route file "${filePath}" and "${existing.contextKey}" conflict on the route "/${route}". Please remove or rename one of these files.`
              );
          } else
            nodes[0] = node;
        } else {
          let nodes = directory.files.get(route);
          nodes || (nodes = [], directory.files.set(route, nodes));
          const existing = nodes[meta.specificity];
          if (existing) {
            if (process.env.NODE_ENV !== "production")
              throw new Error(
                `The route files "${filePath}" and "${existing.contextKey}" conflict on the route "/${route}". Please remove or rename one of these files.`
              );
          } else
            hasRoutes ||= !0, nodes[meta.specificity] = node;
        }
      }
  }
  return isValid ? (rootDirectory.layout || (rootDirectory.layout = [
    {
      type: "layout",
      loadRoute: () => ({
        default: require("./views/Navigator").DefaultNavigator
      }),
      // Generate a fake file name for the directory
      contextKey: "router/build/views/Navigator.js",
      route: "",
      generated: !0,
      dynamic: null,
      children: []
    }
  ]), options.skipGenerated || (hasRoutes && appendSitemapRoute(rootDirectory), appendNotFoundRoute(rootDirectory)), rootDirectory) : null;
}
function flattenDirectoryTreeToRoutes(directory, options, layout, pathToRemove = "") {
  if (directory.layout) {
    const previousLayout = layout;
    layout = getMostSpecific(directory.layout), previousLayout && previousLayout.children.push(layout), options.internal_stripLoadRoute && delete layout.loadRoute;
    const newRoute = layout.route.replace(pathToRemove, "");
    pathToRemove = layout.route ? `${layout.route}/` : "", layout.route = newRoute, layout.dynamic = generateDynamic(layout.route);
  }
  if (!layout) throw new Error("One Internal Error: No nearest layout");
  for (const routes of directory.files.values()) {
    const routeNode = getMostSpecific(routes);
    routeNode.route = routeNode.route.replace(pathToRemove, ""), routeNode.dynamic = generateDynamic(routeNode.route), options.internal_stripLoadRoute && delete routeNode.loadRoute, layout.children.push(routeNode);
  }
  for (const child of directory.subdirectories.values())
    flattenDirectoryTreeToRoutes(child, options, layout, pathToRemove);
  return layout;
}
function getFileMeta(key, options) {
  key = key.replace(/^\.\//, "");
  const parts = key.split("/");
  let route = (0, import_matchers.removeSupportedExtensions)(key);
  const filename = parts[parts.length - 1], filenameWithoutExtensions = (0, import_matchers.removeSupportedExtensions)(filename), isLayout = filenameWithoutExtensions.startsWith("_layout"), [_fullname, renderModeFound] = filename.match(/\+(api|ssg|ssr|spa)\.(\w+\.)?[jt]sx?$/) || [], renderMode = renderModeFound;
  if (filenameWithoutExtensions.startsWith("(") && filenameWithoutExtensions.endsWith(")"))
    throw new Error(`Invalid route ./${key}. Routes cannot end with '(group)' syntax`);
  if (renderMode !== "api" && filename.startsWith("+") && filenameWithoutExtensions !== "+not-found") {
    const renamedRoute = [...parts.slice(0, -1), filename.slice(1)].join("/");
    throw new Error(
      `Invalid route ./${key}. Route nodes cannot start with the '+' character. "Please rename to ${renamedRoute}"`
    );
  }
  let specificity = 0;
  const platformExtension = filenameWithoutExtensions.split(".")[1], hasPlatformExtension = validPlatforms.has(platformExtension), usePlatformRoutes = options.platformRoutes ?? !0;
  if (hasPlatformExtension) {
    if (usePlatformRoutes && options.platform ? platformExtension === options.platform ? specificity = 2 : platformExtension === "native" && options.platform !== "web" ? specificity = 1 : platformExtension !== options.platform && (specificity = -1) : specificity = -1, renderMode === "api" && specificity !== 0)
      throw new Error(
        `Api routes cannot have platform extensions. Please remove '.${platformExtension}' from './${key}'`
      );
    route = route.replace(new RegExp(`.${platformExtension}$`), "");
  }
  return {
    route,
    specificity,
    isLayout,
    renderMode
  };
}
function getMostSpecific(routes) {
  const route = routes[routes.length - 1];
  if (!routes[0])
    throw new Error(
      ` [one] The file ${route.contextKey} does not have a fallback sibling file without a platform extension in routes (${routes[0]}, ${routes.length}):
${routes.map((r) => r.contextKey || "NONE").join(`
`)}.`
    );
  return routes[routes.length - 1];
}
function getIgnoreList(options) {
  const ignore = [/^\.\/\+html\.[tj]sx?$/, ...options?.ignore ?? []];
  return options?.preserveApiRoutes !== !0 && ignore.push(/\+api\.[tj]sx?$/), ignore;
}
function extrapolateGroups(key, keys = /* @__PURE__ */ new Set()) {
  const match = (0, import_matchers.matchArrayGroupName)(key);
  if (!match)
    return keys.add(key), keys;
  const groups = match.split(",");
  if (new Set(groups).size !== groups.length)
    throw new Error(`Array syntax cannot contain duplicate group name "${groups}" in "${key}".`);
  if (groups.length === 1)
    return keys.add(key), keys;
  for (const group of groups)
    extrapolateGroups(key.replace(match, group.trim()), keys);
  return keys;
}
function generateDynamic(path) {
  const dynamic = path.split("/").map((part) => {
    if (part === "+not-found")
      return {
        name: "+not-found",
        deep: !0,
        notFound: !0
      };
    const deepDynamicName = (0, import_matchers.matchDeepDynamicRouteName)(part), dynamicName = deepDynamicName ?? (0, import_matchers.matchDynamicName)(part);
    return dynamicName ? { name: dynamicName, deep: !!deepDynamicName } : null;
  }).filter((part) => !!part);
  return dynamic.length === 0 ? null : dynamic;
}
function appendSitemapRoute(directory) {
  directory.files.has("_sitemap") || directory.files.set("_sitemap", [
    {
      loadRoute() {
        return { default: () => null, getNavOptions: () => {
        } };
      },
      route: "_sitemap",
      type: "ssg",
      contextKey: "",
      generated: !0,
      internal: !0,
      dynamic: null,
      children: []
    }
  ]);
}
function appendNotFoundRoute(directory) {
  directory.files.has("+not-found") || directory.files.set("+not-found", [
    {
      loadRoute() {
        return { default: () => null };
      },
      type: "spa",
      route: "+not-found",
      contextKey: "",
      generated: !0,
      internal: !0,
      dynamic: [{ name: "+not-found", deep: !0, notFound: !0 }],
      children: []
    }
  ]);
}
function getLayoutNode(node, options) {
  const groupName = (0, import_matchers.matchGroupName)(node.route);
  let initialRouteName = node.children.find((child) => child.route.replace(/\/index$/, "") === groupName)?.route;
  return {
    ...node,
    route: node.route.replace(/\/?_layout$/, ""),
    children: [],
    // Each layout should have its own children
    initialRouteName
  };
}
function crawlAndAppendInitialRoutesAndEntryFiles(node, options, entryPoints = []) {
  if (node.type === "spa" || node.type === "ssg" || node.type === "ssr")
    node.entryPoints = [.../* @__PURE__ */ new Set([...entryPoints, node.contextKey])];
  else if (node.type === "layout") {
    if (!node.children)
      throw new Error(`Layout "${node.contextKey}" does not contain any child routes`);
    entryPoints = [...entryPoints, node.contextKey];
    const groupName = (0, import_matchers.matchGroupName)(node.route);
    let initialRouteName = node.children.find((child) => child.route.replace(/\/index$/, "") === groupName)?.route;
    if (!options.internal_stripLoadRoute) {
      const loaded = node.loadRoute();
      loaded?.unstable_settings && (initialRouteName = loaded.unstable_settings.initialRouteName ?? initialRouteName, groupName && (initialRouteName = loaded.unstable_settings?.[groupName]?.initialRouteName ?? initialRouteName));
    }
    if (initialRouteName) {
      const initialRoute = node.children.find((child) => child.route === initialRouteName);
      if (!initialRoute) {
        const validInitialRoutes = node.children.filter((child) => !child.generated).map((child) => `'${child.route}'`).join(", ");
        throw groupName ? new Error(
          `Layout ${node.contextKey} has invalid initialRouteName '${initialRouteName}' for group '(${groupName})'. Valid options are: ${validInitialRoutes}`
        ) : new Error(
          `Layout ${node.contextKey} has invalid initialRouteName '${initialRouteName}'. Valid options are: ${validInitialRoutes}`
        );
      }
      node.initialRouteName = initialRouteName, entryPoints.push(initialRoute.contextKey);
    }
    for (const child of node.children)
      crawlAndAppendInitialRoutesAndEntryFiles(child, options, entryPoints);
  }
}
//# sourceMappingURL=getRoutes.js.map
