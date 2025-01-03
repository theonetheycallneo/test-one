"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var withLayoutContext_exports = {};
__export(withLayoutContext_exports, {
  useFilterScreenChildren: () => useFilterScreenChildren,
  withLayoutContext: () => withLayoutContext
});
module.exports = __toCommonJS(withLayoutContext_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_react = __toESM(require("react"), 1), import_Route = require("../Route"), import_useScreens = require("../useScreens"), import_Screen = require("../views/Screen");
function useFilterScreenChildren(children) {
  var { isCustomNavigator, contextKey } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (
    /** Used for sending developer hints */
    {}
  );
  return import_react.default.useMemo(function() {
    var customChildren = [], screens = import_react.default.Children.map(children, function(child) {
      if (/* @__PURE__ */ import_react.default.isValidElement(child) && child && child.type === import_Screen.Screen) {
        if (!child.props.name)
          throw new Error(`<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must have a \`name\` prop when used as a child of a Layout Route.`);
        if (process.env.NODE_ENV !== "production" && [
          "children",
          "component",
          "getComponent"
        ].some(function(key) {
          return key in child.props;
        }))
          throw new Error(`<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must not have a \`children\`, \`component\`, or \`getComponent\` prop when used as a child of a Layout Route`);
        return child.props;
      }
      isCustomNavigator ? customChildren.push(child) : console.warn(`Layout children must be of type Screen, all other children are ignored. To use custom children, create a custom <Layout />. Update Layout Route at: "app${contextKey}/_layout"`);
    });
    if (process.env.NODE_ENV !== "production") {
      var names = screens == null ? void 0 : screens.map(function(screen) {
        return screen.name;
      });
      if (names && new Set(names).size !== names.length)
        throw new Error("Screen names must be unique: " + names);
    }
    return {
      screens,
      children: customChildren
    };
  }, [
    children,
    contextKey,
    isCustomNavigator
  ]);
}
function withLayoutContext(Nav, processor) {
  var Navigator = /* @__PURE__ */ import_react.default.forwardRef(function(param, ref) {
    var { children: userDefinedChildren, ...props } = param, contextKey = (0, import_Route.useContextKey)(), { screens } = useFilterScreenChildren(userDefinedChildren, {
      contextKey
    }), processed = processor ? processor(screens ?? []) : screens, sorted = (0, import_useScreens.useSortedScreens)(processed ?? []);
    return sorted.length ? (
      // @ts-expect-error
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
        ...props,
        id: contextKey,
        ref,
        children: sorted
      })
    ) : null;
  });
  return Navigator.Screen = import_Screen.Screen, Navigator;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFilterScreenChildren,
  withLayoutContext
});
//# sourceMappingURL=withLayoutContext.js.map
