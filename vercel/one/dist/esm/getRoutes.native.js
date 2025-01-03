import { getDefaultRenderMode } from "./config";
import { matchArrayGroupName, matchDeepDynamicRouteName, matchDynamicName, matchGroupName, removeSupportedExtensions } from "./matchers";
import { getPageExport } from "./utils/getPageExport";
var validPlatforms = /* @__PURE__ */ new Set([
  "android",
  "ios",
  "native",
  "web"
]);
function getRoutes(contextModule) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, directoryTree = getDirectoryTree(contextModule, options);
  if (!directoryTree)
    return null;
  var rootNode = flattenDirectoryTreeToRoutes(directoryTree, options);
  return options.ignoreEntryPoints || crawlAndAppendInitialRoutesAndEntryFiles(rootNode, options), rootNode;
}
function getExactRoutes(contextModule) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return getRoutes(contextModule, {
    ...options,
    skipGenerated: !0
  });
}
function getDirectoryTree(contextModule, options) {
  var importMode = options.importMode || process.env.One_ROUTER_IMPORT_MODE, ignoreList = [
    /^\.\/\+html\.[tj]sx?$/
  ];
  options.ignore && ignoreList.push(...options.ignore), options.preserveApiRoutes || ignoreList.push(/\+api\.[tj]sx?$/);
  var rootDirectory = {
    files: /* @__PURE__ */ new Map(),
    subdirectories: /* @__PURE__ */ new Map()
  }, hasRoutes = !1, isValid = !1, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _loop = function() {
      var filePath = _step.value;
      if (ignoreList.some(function(regex) {
        return regex.test(filePath);
      }))
        return "continue";
      isValid = !0;
      var meta = getFileMeta(filePath, options);
      if (meta.specificity < 0)
        return "continue";
      var type = meta.isLayout ? "layout" : meta.renderMode || getDefaultRenderMode(), node = {
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
      };
      if (process.env.NODE_ENV === "development" && node.type !== "api" && importMode === "sync" && !getPageExport(node.loadRoute()))
        return "continue";
      var _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0;
      try {
        for (var _iterator2 = extrapolateGroups(meta.route)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion2 = (_step1 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
          var route = _step1.value, subdirectoryParts = route.split("/").slice(0, -1), directory = rootDirectory, _iteratorNormalCompletion1 = !0, _didIteratorError1 = !1, _iteratorError1 = void 0;
          try {
            for (var _iterator1 = subdirectoryParts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion1 = (_step2 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
              var part = _step2.value, subDirectory = directory.subdirectories.get(part);
              subDirectory || (subDirectory = {
                files: /* @__PURE__ */ new Map(),
                subdirectories: /* @__PURE__ */ new Map()
              }, directory.subdirectories.set(part, subDirectory)), directory = subDirectory;
            }
          } catch (err) {
            _didIteratorError1 = !0, _iteratorError1 = err;
          } finally {
            try {
              !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
            } finally {
              if (_didIteratorError1)
                throw _iteratorError1;
            }
          }
          if (node = {
            ...node,
            route
          }, meta.isLayout) {
            var _directory, _layout;
            (_layout = (_directory = directory).layout) !== null && _layout !== void 0 || (_directory.layout = []);
            var existing = directory.layout[meta.specificity];
            if (existing) {
              if (process.env.NODE_ENV !== "production")
                throw new Error(`The layouts "${filePath}" and "${existing.contextKey}" conflict on the route "/${route}". Please remove or rename one of these files.`);
            } else
              node = getLayoutNode(node, options), directory.layout[meta.specificity] = node;
          } else if (type === "api") {
            var fileKey = `${route}+api`, nodes = directory.files.get(fileKey);
            nodes || (nodes = [], directory.files.set(fileKey, nodes));
            var existing1 = nodes[0];
            if (existing1) {
              if (process.env.NODE_ENV !== "production")
                throw new Error(`The API route file "${filePath}" and "${existing1.contextKey}" conflict on the route "/${route}". Please remove or rename one of these files.`);
            } else
              nodes[0] = node;
          } else {
            var nodes1 = directory.files.get(route);
            nodes1 || (nodes1 = [], directory.files.set(route, nodes1));
            var existing2 = nodes1[meta.specificity];
            if (existing2) {
              if (process.env.NODE_ENV !== "production")
                throw new Error(`The route files "${filePath}" and "${existing2.contextKey}" conflict on the route "/${route}". Please remove or rename one of these files.`);
            } else
              hasRoutes || (hasRoutes = !0), nodes1[meta.specificity] = node;
          }
        }
      } catch (err) {
        _didIteratorError2 = !0, _iteratorError2 = err;
      } finally {
        try {
          !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
        } finally {
          if (_didIteratorError2)
            throw _iteratorError2;
        }
      }
    }, _iterator = contextModule.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) _loop();
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
  return isValid ? (rootDirectory.layout || (rootDirectory.layout = [
    {
      type: "layout",
      loadRoute: function() {
        return {
          default: require("./views/Navigator").DefaultNavigator
        };
      },
      // Generate a fake file name for the directory
      contextKey: "router/build/views/Navigator.js",
      route: "",
      generated: !0,
      dynamic: null,
      children: []
    }
  ]), options.skipGenerated || (hasRoutes && appendSitemapRoute(rootDirectory), appendNotFoundRoute(rootDirectory)), rootDirectory) : null;
}
function flattenDirectoryTreeToRoutes(directory, options, layout) {
  var pathToRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
  if (directory.layout) {
    var previousLayout = layout;
    layout = getMostSpecific(directory.layout), previousLayout && previousLayout.children.push(layout), options.internal_stripLoadRoute && delete layout.loadRoute;
    var newRoute = layout.route.replace(pathToRemove, "");
    pathToRemove = layout.route ? `${layout.route}/` : "", layout.route = newRoute, layout.dynamic = generateDynamic(layout.route);
  }
  if (!layout) throw new Error("One Internal Error: No nearest layout");
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = directory.files.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var routes = _step.value, routeNode = getMostSpecific(routes);
      routeNode.route = routeNode.route.replace(pathToRemove, ""), routeNode.dynamic = generateDynamic(routeNode.route), options.internal_stripLoadRoute && delete routeNode.loadRoute, layout.children.push(routeNode);
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
  var _iteratorNormalCompletion1 = !0, _didIteratorError1 = !1, _iteratorError1 = void 0;
  try {
    for (var _iterator1 = directory.subdirectories.values()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
      var child = _step1.value;
      flattenDirectoryTreeToRoutes(child, options, layout, pathToRemove);
    }
  } catch (err) {
    _didIteratorError1 = !0, _iteratorError1 = err;
  } finally {
    try {
      !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
    } finally {
      if (_didIteratorError1)
        throw _iteratorError1;
    }
  }
  return layout;
}
function getFileMeta(key, options) {
  key = key.replace(/^\.\//, "");
  var parts = key.split("/"), route = removeSupportedExtensions(key), filename = parts[parts.length - 1], filenameWithoutExtensions = removeSupportedExtensions(filename), isLayout = filenameWithoutExtensions.startsWith("_layout"), [_fullname, renderModeFound] = filename.match(/\+(api|ssg|ssr|spa)\.(\w+\.)?[jt]sx?$/) || [], renderMode = renderModeFound;
  if (filenameWithoutExtensions.startsWith("(") && filenameWithoutExtensions.endsWith(")"))
    throw new Error(`Invalid route ./${key}. Routes cannot end with '(group)' syntax`);
  if (renderMode !== "api" && filename.startsWith("+") && filenameWithoutExtensions !== "+not-found") {
    var renamedRoute = [
      ...parts.slice(0, -1),
      filename.slice(1)
    ].join("/");
    throw new Error(`Invalid route ./${key}. Route nodes cannot start with the '+' character. "Please rename to ${renamedRoute}"`);
  }
  var specificity = 0, platformExtension = filenameWithoutExtensions.split(".")[1], hasPlatformExtension = validPlatforms.has(platformExtension), _options_platformRoutes, usePlatformRoutes = (_options_platformRoutes = options.platformRoutes) !== null && _options_platformRoutes !== void 0 ? _options_platformRoutes : !0;
  if (hasPlatformExtension) {
    if (usePlatformRoutes && options.platform ? platformExtension === options.platform ? specificity = 2 : platformExtension === "native" && options.platform !== "web" ? specificity = 1 : platformExtension !== options.platform && (specificity = -1) : specificity = -1, renderMode === "api" && specificity !== 0)
      throw new Error(`Api routes cannot have platform extensions. Please remove '.${platformExtension}' from './${key}'`);
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
  var route = routes[routes.length - 1];
  if (!routes[0])
    throw new Error(` [one] The file ${route.contextKey} does not have a fallback sibling file without a platform extension in routes (${routes[0]}, ${routes.length}):
${routes.map(function(r) {
      return r.contextKey || "NONE";
    }).join(`
`)}.`);
  return routes[routes.length - 1];
}
function getIgnoreList(options) {
  var _options_ignore, ignore = [
    /^\.\/\+html\.[tj]sx?$/,
    ...(_options_ignore = options?.ignore) !== null && _options_ignore !== void 0 ? _options_ignore : []
  ];
  return options?.preserveApiRoutes !== !0 && ignore.push(/\+api\.[tj]sx?$/), ignore;
}
function extrapolateGroups(key) {
  var keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set(), match = matchArrayGroupName(key);
  if (!match)
    return keys.add(key), keys;
  var groups = match.split(","), groupsSet = new Set(groups);
  if (groupsSet.size !== groups.length)
    throw new Error(`Array syntax cannot contain duplicate group name "${groups}" in "${key}".`);
  if (groups.length === 1)
    return keys.add(key), keys;
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = groups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var group = _step.value;
      extrapolateGroups(key.replace(match, group.trim()), keys);
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
  return keys;
}
function generateDynamic(path) {
  var dynamic = path.split("/").map(function(part) {
    if (part === "+not-found")
      return {
        name: "+not-found",
        deep: !0,
        notFound: !0
      };
    var deepDynamicName = matchDeepDynamicRouteName(part), dynamicName = deepDynamicName ?? matchDynamicName(part);
    return dynamicName ? {
      name: dynamicName,
      deep: !!deepDynamicName
    } : null;
  }).filter(function(part) {
    return !!part;
  });
  return dynamic.length === 0 ? null : dynamic;
}
function appendSitemapRoute(directory) {
  directory.files.has("_sitemap") || directory.files.set("_sitemap", [
    {
      loadRoute() {
        return {
          default: function() {
            return null;
          },
          getNavOptions: function() {
          }
        };
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
        return {
          default: function() {
            return null;
          }
        };
      },
      type: "spa",
      route: "+not-found",
      contextKey: "",
      generated: !0,
      internal: !0,
      dynamic: [
        {
          name: "+not-found",
          deep: !0,
          notFound: !0
        }
      ],
      children: []
    }
  ]);
}
function getLayoutNode(node, options) {
  var groupName = matchGroupName(node.route), childMatchingGroup = node.children.find(function(child) {
    return child.route.replace(/\/index$/, "") === groupName;
  }), initialRouteName = childMatchingGroup?.route;
  return {
    ...node,
    route: node.route.replace(/\/?_layout$/, ""),
    children: [],
    // Each layout should have its own children
    initialRouteName
  };
}
function crawlAndAppendInitialRoutesAndEntryFiles(node, options) {
  var entryPoints = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  if (node.type === "spa" || node.type === "ssg" || node.type === "ssr")
    node.entryPoints = [
      .../* @__PURE__ */ new Set([
        ...entryPoints,
        node.contextKey
      ])
    ];
  else if (node.type === "layout") {
    if (!node.children)
      throw new Error(`Layout "${node.contextKey}" does not contain any child routes`);
    entryPoints = [
      ...entryPoints,
      node.contextKey
    ];
    var groupName = matchGroupName(node.route), childMatchingGroup = node.children.find(function(child2) {
      return child2.route.replace(/\/index$/, "") === groupName;
    }), initialRouteName = childMatchingGroup?.route;
    if (!options.internal_stripLoadRoute) {
      var loaded = node.loadRoute();
      if (loaded?.unstable_settings) {
        var _loaded_unstable_settings_initialRouteName;
        if (initialRouteName = (_loaded_unstable_settings_initialRouteName = loaded.unstable_settings.initialRouteName) !== null && _loaded_unstable_settings_initialRouteName !== void 0 ? _loaded_unstable_settings_initialRouteName : initialRouteName, groupName) {
          var _loaded_unstable_settings_groupName, _loaded_unstable_settings, groupSpecificInitialRouteName = (_loaded_unstable_settings = loaded.unstable_settings) === null || _loaded_unstable_settings === void 0 || (_loaded_unstable_settings_groupName = _loaded_unstable_settings[groupName]) === null || _loaded_unstable_settings_groupName === void 0 ? void 0 : _loaded_unstable_settings_groupName.initialRouteName;
          initialRouteName = groupSpecificInitialRouteName ?? initialRouteName;
        }
      }
    }
    if (initialRouteName) {
      var initialRoute = node.children.find(function(child2) {
        return child2.route === initialRouteName;
      });
      if (!initialRoute) {
        var validInitialRoutes = node.children.filter(function(child2) {
          return !child2.generated;
        }).map(function(child2) {
          return `'${child2.route}'`;
        }).join(", ");
        throw groupName ? new Error(`Layout ${node.contextKey} has invalid initialRouteName '${initialRouteName}' for group '(${groupName})'. Valid options are: ${validInitialRoutes}`) : new Error(`Layout ${node.contextKey} has invalid initialRouteName '${initialRouteName}'. Valid options are: ${validInitialRoutes}`);
      }
      node.initialRouteName = initialRouteName, entryPoints.push(initialRoute.contextKey);
    }
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var child = _step.value;
        crawlAndAppendInitialRoutesAndEntryFiles(child, options, entryPoints);
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
  }
}
export {
  extrapolateGroups,
  generateDynamic,
  getExactRoutes,
  getIgnoreList,
  getRoutes
};
//# sourceMappingURL=getRoutes.js.map
