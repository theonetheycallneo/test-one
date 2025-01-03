var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var Root_exports = {};
__export(Root_exports, {
  Root: () => Root
});
module.exports = __toCommonJS(Root_exports);
var import_elements = require("@react-navigation/elements"),
  import_native = require("@react-navigation/native"),
  import_universal_color_scheme = require("@vxrn/universal-color-scheme"),
  import_react = require("react"),
  import_NavigationContainer = __toESM(require("./fork/NavigationContainer.cjs"), 1),
  import_getURL = require("./getURL.cjs"),
  import_serverLocationContext = require("./router/serverLocationContext.cjs"),
  import_useInitializeOneRouter = require("./router/useInitializeOneRouter.cjs"),
  import_useViteRoutes = require("./useViteRoutes.cjs"),
  import_rand = require("./utils/rand.cjs"),
  import_PreloadLinks = require("./views/PreloadLinks.cjs"),
  import_RootErrorBoundary = require("./views/RootErrorBoundary.cjs"),
  import_ScrollRestoration = require("./views/ScrollRestoration.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
typeof window < "u" && (window.__getReactRefreshIgnoredExports = () => ["feedCardQuery", "feedCardReplyQuery", "loader"]);
function Root(props) {
  const {
      path,
      routes,
      routeOptions,
      wrapper: ParentWrapper = import_react.Fragment,
      isClient,
      css,
      navigationContainerProps,
      loaderProps,
      mode
    } = props,
    context = (0, import_useViteRoutes.useViteRoutes)(routes, routeOptions, globalThis.__vxrnVersion),
    location = typeof window < "u" && window.location ? new URL(path || window.location.href || "/", window.location.href) : new URL(path || "/", (0, import_getURL.getURL)()),
    store = (0, import_useInitializeOneRouter.useInitializeOneRouter)(context, location),
    [colorScheme] = (0, import_universal_color_scheme.useColorScheme)(),
    wrapper = children => /* @__PURE__ */(0, import_jsx_runtime.jsxs)(ParentWrapper, {
      children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_ScrollRestoration.ScrollRestoration, {}), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_elements.SafeAreaProviderCompat, {
        children
      })]
    }),
    Component = store.rootComponent;
  if (!Component) throw new Error("No root component found");
  const contents =
  // <StrictMode>
  /* @__PURE__ */
  (0, import_jsx_runtime.jsxs)(import_RootErrorBoundary.RootErrorBoundary, {
    children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_NavigationContainer.default, {
      ref: store.navigationRef,
      initialState: store.initialState,
      linking: store.linking,
      onUnhandledAction,
      theme: colorScheme === "dark" ? import_native.DarkTheme : import_native.DefaultTheme,
      documentTitle: {
        enabled: !1
      },
      ...navigationContainerProps,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_serverLocationContext.ServerLocationContext.Provider, {
        value: location,
        children: wrapper(/* @__PURE__ */(0, import_jsx_runtime.jsx)(Component, {}))
      })
    }), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_PreloadLinks.PreloadLinks, {}, "preload-links")]
  });
  if (isClient) {
    if (globalThis.__vxrnHydrateMode__ === "spa") {
      const [show, setShow] = (0, import_react.useState)(!1);
      return (0, import_react.useEffect)(() => {
        setShow(!0);
      }, []), show ? contents : null;
    }
    return contents;
  }
  let {
    loaderData
  } = props;
  return loaderData?.constructor?.name === "QueryImpl" && (loaderData = void 0), /* @__PURE__ */(0, import_jsx_runtime.jsxs)("html", {
    lang: "en-US",
    children: [/* @__PURE__ */(0, import_jsx_runtime.jsxs)("head", {
      children: [process.env.NODE_ENV === "development" ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(DevHead, {}) : null, /* @__PURE__ */(0, import_jsx_runtime.jsx)("script", {
        dangerouslySetInnerHTML: {
          __html: "globalThis['global'] = globalThis"
        }
      }), css?.map(file => /* @__PURE__ */(0, import_jsx_runtime.jsx)("link", {
        rel: "stylesheet",
        href: file
      }, file))]
    }), /* @__PURE__ */(0, import_jsx_runtime.jsx)("body", {
      children: contents
    }), /* @__PURE__ */(0, import_jsx_runtime.jsx)("script", {
      async: !0,
      href: "one-loader-data",
      dangerouslySetInnerHTML: {
        __html: `
            globalThis['__vxrnPostRenderData__'] = { __vxrn__: 'post-render' };
            globalThis['__vxrnLoaderData__'] = ${JSON.stringify(loaderData)};
            globalThis['__vxrnLoaderProps__'] = ${JSON.stringify(loaderProps)};
            globalThis['__vxrnHydrateMode__'] = ${JSON.stringify(mode)};
        `
      }
    })]
  });
}
const ssrCSSID = `/@id/__x00__virtual:ssr-css.css?t=${(0, import_rand.rand)()}`;
function DevHead() {
  return /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)("link", {
      rel: "preload",
      href: ssrCSSID,
      as: "style"
    }), /* @__PURE__ */(0, import_jsx_runtime.jsx)("link", {
      rel: "stylesheet",
      href: ssrCSSID,
      "data-ssr-css": !0
    }), /* @__PURE__ */(0, import_jsx_runtime.jsx)("script", {
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
    }), /* @__PURE__ */(0, import_jsx_runtime.jsx)("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: `import { injectIntoGlobalHook } from "/@react-refresh";
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;`
      }
    })]
  });
}
let onUnhandledAction;
process.env.NODE_ENV !== "production" ? onUnhandledAction = action => {
  const payload = action.payload;
  let message = `The action '${action.type}'${payload ? ` with payload ${JSON.stringify(action.payload)}` : ""} was not handled by any navigator.`;
  switch (action.type) {
    case "NAVIGATE":
    case "PUSH":
    case "REPLACE":
    case "JUMP_TO":
      payload?.name ? message += `

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

This is a development-only warning and won't be shown in production.`, process.env.NODE_ENV === "test") throw new Error(message);
  console.error(message);
} : onUnhandledAction = () => {};