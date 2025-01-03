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
var Root_exports = {};
__export(Root_exports, {
  Root: () => Root
});
module.exports = __toCommonJS(Root_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_elements = require("@react-navigation/elements"), import_native = require("@react-navigation/native"), import_universal_color_scheme = require("@vxrn/universal-color-scheme"), import_react = require("react"), import_NavigationContainer = __toESM(require("./fork/NavigationContainer"), 1), import_getURL = require("./getURL"), import_serverLocationContext = require("./router/serverLocationContext"), import_useInitializeOneRouter = require("./router/useInitializeOneRouter"), import_useViteRoutes = require("./useViteRoutes"), import_rand = require("./utils/rand"), import_PreloadLinks = require("./views/PreloadLinks"), import_RootErrorBoundary = require("./views/RootErrorBoundary"), import_ScrollRestoration = require("./views/ScrollRestoration");
typeof window < "u" && (window.__getReactRefreshIgnoredExports = function() {
  return [
    "feedCardQuery",
    "feedCardReplyQuery",
    "loader"
  ];
});
function Root(props) {
  var _loaderData_constructor, { path, routes, routeOptions, wrapper: ParentWrapper = import_react.Fragment, isClient, css, navigationContainerProps, loaderProps, mode } = props, context = (0, import_useViteRoutes.useViteRoutes)(routes, routeOptions, globalThis.__vxrnVersion), location = typeof window < "u" && window.location ? new URL(path || window.location.href || "/", window.location.href) : new URL(path || "/", (0, import_getURL.getURL)()), store = (0, import_useInitializeOneRouter.useInitializeOneRouter)(context, location), [colorScheme] = (0, import_universal_color_scheme.useColorScheme)(), wrapper = function(children) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ParentWrapper, {
      children: [
        /* default scroll restoration to on, but users can configure it by importing and using themselves */
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ScrollRestoration.ScrollRestoration, {}),
        /* <GestureHandlerRootView> */
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_elements.SafeAreaProviderCompat, {
          children
        })
      ]
    });
  }, Component = store.rootComponent;
  if (!Component)
    throw new Error("No root component found");
  var contents = (
    // <StrictMode>
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_RootErrorBoundary.RootErrorBoundary, {
      children: [
        /* for some reason warning if no key here */
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_NavigationContainer.default, {
          ref: store.navigationRef,
          initialState: store.initialState,
          linking: store.linking,
          onUnhandledAction,
          theme: colorScheme === "dark" ? import_native.DarkTheme : import_native.DefaultTheme,
          documentTitle: {
            enabled: !1
          },
          ...navigationContainerProps,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_serverLocationContext.ServerLocationContext.Provider, {
            value: location,
            children: wrapper(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {}))
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_PreloadLinks.PreloadLinks, {}, "preload-links")
      ]
    })
  );
  if (isClient) {
    if (globalThis.__vxrnHydrateMode__ === "spa") {
      var [show, setShow] = (0, import_react.useState)(!1);
      return (0, import_react.useEffect)(function() {
        setShow(!0);
      }, []), show ? contents : null;
    }
    return contents;
  }
  var { loaderData } = props;
  return (loaderData == null || (_loaderData_constructor = loaderData.constructor) === null || _loaderData_constructor === void 0 ? void 0 : _loaderData_constructor.name) === "QueryImpl" && (loaderData = void 0), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
    lang: "en-US",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
        children: [
          process.env.NODE_ENV === "development" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevHead, {}) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
            dangerouslySetInnerHTML: {
              __html: "globalThis['global'] = globalThis"
            }
          }),
          css == null ? void 0 : css.map(function(file) {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
              rel: "stylesheet",
              href: file
            }, file);
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("body", {
        children: contents
      }),
      /* could this just be loaded via the same loader.js? as a preload? i think so... */
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
        async: !0,
        // @ts-ignore
        href: "one-loader-data",
        dangerouslySetInnerHTML: {
          __html: `
            globalThis['__vxrnPostRenderData__'] = { __vxrn__: 'post-render' };
            globalThis['__vxrnLoaderData__'] = ${JSON.stringify(loaderData)};
            globalThis['__vxrnLoaderProps__'] = ${JSON.stringify(loaderProps)};
            globalThis['__vxrnHydrateMode__'] = ${JSON.stringify(mode)};
        `
        }
      })
    ]
  });
}
var ssrCSSID = `/@id/__x00__virtual:ssr-css.css?t=${(0, import_rand.rand)()}`;
function DevHead() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
        rel: "preload",
        href: ssrCSSID,
        as: "style"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
        rel: "stylesheet",
        href: ssrCSSID,
        "data-ssr-css": !0
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
        type: "module",
        dangerouslySetInnerHTML: {
          __html: `import { createHotContext } from "/@vite/client";
        const hot = createHotContext("/__clear_ssr_css");
        hot.on("vite:afterUpdate", () => {
          document
            .querySelectorAll("[data-ssr-css]")
            .forEach(node => node.remove());
        });`
        }
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
        type: "module",
        dangerouslySetInnerHTML: {
          __html: `import { injectIntoGlobalHook } from "/@react-refresh";
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;`
        }
      })
    ]
  });
}
var onUnhandledAction;
process.env.NODE_ENV !== "production" ? onUnhandledAction = function(action) {
  var payload = action.payload, message = `The action '${action.type}'${payload ? ` with payload ${JSON.stringify(action.payload)}` : ""} was not handled by any navigator.`;
  switch (action.type) {
    case "NAVIGATE":
    case "PUSH":
    case "REPLACE":
    case "JUMP_TO":
      payload != null && payload.name ? message += `

Do you have a route named '${payload.name}'?` : message += `

You need to pass the name of the screen to navigate to. This may be a bug.`;
      break;
    case "GO_BACK":
    case "POP":
    case "POP_TO_TOP":
      message += `

Is there any screen to go back to?`;
      break;
    case "OPEN_DRAWER":
    case "CLOSE_DRAWER":
    case "TOGGLE_DRAWER":
      message += `

Is your screen inside a Drawer navigator?`;
      break;
  }
  if (message += `

This is a development-only warning and won't be shown in production.`, process.env.NODE_ENV === "test")
    throw new Error(message);
  console.error(message);
} : onUnhandledAction = function() {
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Root
});
//# sourceMappingURL=Root.js.map
