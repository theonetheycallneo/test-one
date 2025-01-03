var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var createApp_exports = {};
__export(createApp_exports, {
  createApp: () => createApp
});
module.exports = __toCommonJS(createApp_exports);
var import_setup = require("./setup.cjs"),
  import_Root = require("./Root.cjs"),
  import_clientLoaderResolver = require("./clientLoaderResolver.cjs"),
  import_render = require("./render.cjs"),
  import_server_render = require("./server-render.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const import_meta = {};
function createApp(options) {
  return import_meta.env.SSR ? {
    options,
    render: async props => {
      let html = await (0, import_server_render.renderToString)(/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Root.Root, {
        routes: options.routes,
        ...props
      }), {
        preloads: props.preloads
      });
      const serverData = globalThis.__vxrnServerData__;
      return serverData && Object.keys(serverData).length && (html = html.replace("{ __vxrn__: 'post-render' }", JSON.stringify(serverData))), html;
    }
  } : (options.routes["/app/_layout.tsx"]?.()).then(() => {
    (0, import_clientLoaderResolver.resolveClientLoader)({
      loaderData: globalThis.__vxrnLoaderData__,
      loaderServerData: globalThis.__vxrnLoaderServerData__,
      loaderProps: globalThis.__vxrnLoaderProps__
    }).then(() => {
      (0, import_render.render)(/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Root.Root, {
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