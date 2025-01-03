import { SafeAreaProviderCompat } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "@vxrn/universal-color-scheme";
import { Fragment, useEffect, useState } from "react";
import UpstreamNavigationContainer from "./fork/NavigationContainer.mjs";
import { getURL } from "./getURL.mjs";
import { ServerLocationContext } from "./router/serverLocationContext.mjs";
import { useInitializeOneRouter } from "./router/useInitializeOneRouter.mjs";
import { useViteRoutes } from "./useViteRoutes.mjs";
import { rand } from "./utils/rand.mjs";
import { PreloadLinks } from "./views/PreloadLinks.mjs";
import { RootErrorBoundary } from "./views/RootErrorBoundary.mjs";
import { ScrollRestoration } from "./views/ScrollRestoration.mjs";
import { Fragment as Fragment2, jsx, jsxs } from "react/jsx-runtime";
typeof window < "u" && (window.__getReactRefreshIgnoredExports = () => ["feedCardQuery", "feedCardReplyQuery", "loader"]);
function Root(props) {
  const {
      path,
      routes,
      routeOptions,
      wrapper: ParentWrapper = Fragment,
      isClient,
      css,
      navigationContainerProps,
      loaderProps,
      mode
    } = props,
    context = useViteRoutes(routes, routeOptions, globalThis.__vxrnVersion),
    location = typeof window < "u" && window.location ? new URL(path || window.location.href || "/", window.location.href) : new URL(path || "/", getURL()),
    store = useInitializeOneRouter(context, location),
    [colorScheme] = useColorScheme(),
    wrapper = children => /* @__PURE__ */jsxs(ParentWrapper, {
      children: [/* @__PURE__ */jsx(ScrollRestoration, {}), /* @__PURE__ */jsx(SafeAreaProviderCompat, {
        children
      })]
    }),
    Component = store.rootComponent;
  if (!Component) throw new Error("No root component found");
  const contents =
  // <StrictMode>
  /* @__PURE__ */
  jsxs(RootErrorBoundary, {
    children: [/* @__PURE__ */jsx(UpstreamNavigationContainer, {
      ref: store.navigationRef,
      initialState: store.initialState,
      linking: store.linking,
      onUnhandledAction,
      theme: colorScheme === "dark" ? DarkTheme : DefaultTheme,
      documentTitle: {
        enabled: !1
      },
      ...navigationContainerProps,
      children: /* @__PURE__ */jsx(ServerLocationContext.Provider, {
        value: location,
        children: wrapper(/* @__PURE__ */jsx(Component, {}))
      })
    }), /* @__PURE__ */jsx(PreloadLinks, {}, "preload-links")]
  });
  if (isClient) {
    if (globalThis.__vxrnHydrateMode__ === "spa") {
      const [show, setShow] = useState(!1);
      return useEffect(() => {
        setShow(!0);
      }, []), show ? contents : null;
    }
    return contents;
  }
  let {
    loaderData
  } = props;
  return loaderData?.constructor?.name === "QueryImpl" && (loaderData = void 0), /* @__PURE__ */jsxs("html", {
    lang: "en-US",
    children: [/* @__PURE__ */jsxs("head", {
      children: [process.env.NODE_ENV === "development" ? /* @__PURE__ */jsx(DevHead, {}) : null, /* @__PURE__ */jsx("script", {
        dangerouslySetInnerHTML: {
          __html: "globalThis['global'] = globalThis"
        }
      }), css?.map(file => /* @__PURE__ */jsx("link", {
        rel: "stylesheet",
        href: file
      }, file))]
    }), /* @__PURE__ */jsx("body", {
      children: contents
    }), /* @__PURE__ */jsx("script", {
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
const ssrCSSID = `/@id/__x00__virtual:ssr-css.css?t=${rand()}`;
function DevHead() {
  return /* @__PURE__ */jsxs(Fragment2, {
    children: [/* @__PURE__ */jsx("link", {
      rel: "preload",
      href: ssrCSSID,
      as: "style"
    }), /* @__PURE__ */jsx("link", {
      rel: "stylesheet",
      href: ssrCSSID,
      "data-ssr-css": !0
    }), /* @__PURE__ */jsx("script", {
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
    }), /* @__PURE__ */jsx("script", {
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
export { Root };
//# sourceMappingURL=Root.mjs.map
