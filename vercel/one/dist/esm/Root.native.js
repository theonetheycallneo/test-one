import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SafeAreaProviderCompat } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "@vxrn/universal-color-scheme";
import { Fragment, useEffect, useState } from "react";
import UpstreamNavigationContainer from "./fork/NavigationContainer";
import { getURL } from "./getURL";
import { ServerLocationContext } from "./router/serverLocationContext";
import { useInitializeOneRouter } from "./router/useInitializeOneRouter";
import { useViteRoutes } from "./useViteRoutes";
import { rand } from "./utils/rand";
import { PreloadLinks } from "./views/PreloadLinks";
import { RootErrorBoundary } from "./views/RootErrorBoundary";
import { ScrollRestoration } from "./views/ScrollRestoration";
typeof window < "u" && (window.__getReactRefreshIgnoredExports = function() {
  return [
    "feedCardQuery",
    "feedCardReplyQuery",
    "loader"
  ];
});
function Root(props) {
  var _loaderData_constructor, { path, routes, routeOptions, wrapper: ParentWrapper = Fragment, isClient, css, navigationContainerProps, loaderProps, mode } = props, context = useViteRoutes(routes, routeOptions, globalThis.__vxrnVersion), location = typeof window < "u" && window.location ? new URL(path || window.location.href || "/", window.location.href) : new URL(path || "/", getURL()), store = useInitializeOneRouter(context, location), [colorScheme] = useColorScheme(), wrapper = function(children) {
    return /* @__PURE__ */ _jsxs(ParentWrapper, {
      children: [
        /* default scroll restoration to on, but users can configure it by importing and using themselves */
        /* @__PURE__ */ _jsx(ScrollRestoration, {}),
        /* <GestureHandlerRootView> */
        /* @__PURE__ */ _jsx(SafeAreaProviderCompat, {
          children
        })
      ]
    });
  }, Component = store.rootComponent;
  if (!Component)
    throw new Error("No root component found");
  var contents = (
    // <StrictMode>
    /* @__PURE__ */ _jsxs(RootErrorBoundary, {
      children: [
        /* for some reason warning if no key here */
        /* @__PURE__ */ _jsx(UpstreamNavigationContainer, {
          ref: store.navigationRef,
          initialState: store.initialState,
          linking: store.linking,
          onUnhandledAction,
          theme: colorScheme === "dark" ? DarkTheme : DefaultTheme,
          documentTitle: {
            enabled: !1
          },
          ...navigationContainerProps,
          children: /* @__PURE__ */ _jsx(ServerLocationContext.Provider, {
            value: location,
            children: wrapper(/* @__PURE__ */ _jsx(Component, {}))
          })
        }),
        /* @__PURE__ */ _jsx(PreloadLinks, {}, "preload-links")
      ]
    })
  );
  if (isClient) {
    if (globalThis.__vxrnHydrateMode__ === "spa") {
      var [show, setShow] = useState(!1);
      return useEffect(function() {
        setShow(!0);
      }, []), show ? contents : null;
    }
    return contents;
  }
  var { loaderData } = props;
  return (loaderData == null || (_loaderData_constructor = loaderData.constructor) === null || _loaderData_constructor === void 0 ? void 0 : _loaderData_constructor.name) === "QueryImpl" && (loaderData = void 0), /* @__PURE__ */ _jsxs("html", {
    lang: "en-US",
    children: [
      /* @__PURE__ */ _jsxs("head", {
        children: [
          process.env.NODE_ENV === "development" ? /* @__PURE__ */ _jsx(DevHead, {}) : null,
          /* @__PURE__ */ _jsx("script", {
            dangerouslySetInnerHTML: {
              __html: "globalThis['global'] = globalThis"
            }
          }),
          css?.map(function(file) {
            return /* @__PURE__ */ _jsx("link", {
              rel: "stylesheet",
              href: file
            }, file);
          })
        ]
      }),
      /* @__PURE__ */ _jsx("body", {
        children: contents
      }),
      /* could this just be loaded via the same loader.js? as a preload? i think so... */
      /* @__PURE__ */ _jsx("script", {
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
var ssrCSSID = `/@id/__x00__virtual:ssr-css.css?t=${rand()}`;
function DevHead() {
  return /* @__PURE__ */ _jsxs(_Fragment, {
    children: [
      /* @__PURE__ */ _jsx("link", {
        rel: "preload",
        href: ssrCSSID,
        as: "style"
      }),
      /* @__PURE__ */ _jsx("link", {
        rel: "stylesheet",
        href: ssrCSSID,
        "data-ssr-css": !0
      }),
      /* @__PURE__ */ _jsx("script", {
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
      /* @__PURE__ */ _jsx("script", {
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

This is a development-only warning and won't be shown in production.`, process.env.NODE_ENV === "test")
    throw new Error(message);
  console.error(message);
} : onUnhandledAction = function() {
};
export {
  Root
};
//# sourceMappingURL=Root.js.map
