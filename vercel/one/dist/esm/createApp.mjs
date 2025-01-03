import "./setup.mjs";
import { Root } from "./Root.mjs";
import { resolveClientLoader } from "./clientLoaderResolver.mjs";
import { render } from "./render.mjs";
import { renderToString } from "./server-render.mjs";
import { jsx } from "react/jsx-runtime";
function createApp(options) {
  return import.meta.env.SSR ? {
    options,
    render: async props => {
      let html = await renderToString(/* @__PURE__ */jsx(Root, {
        routes: options.routes,
        ...props
      }), {
        preloads: props.preloads
      });
      const serverData = globalThis.__vxrnServerData__;
      return serverData && Object.keys(serverData).length && (html = html.replace("{ __vxrn__: 'post-render' }", JSON.stringify(serverData))), html;
    }
  } : (options.routes["/app/_layout.tsx"]?.()).then(() => {
    resolveClientLoader({
      loaderData: globalThis.__vxrnLoaderData__,
      loaderServerData: globalThis.__vxrnLoaderServerData__,
      loaderProps: globalThis.__vxrnLoaderProps__
    }).then(() => {
      render(/* @__PURE__ */jsx(Root, {
        isClient: !0,
        routes: options.routes,
        path: window.location.href
      }));
    }).catch(err => {
      console.error('Error running client loader resolver "onClientLoaderResolve":', err);
    });
  }).catch(err => {
    console.error("Error importing root layout on client", err);
  });
}
export { createApp };
//# sourceMappingURL=createApp.mjs.map
