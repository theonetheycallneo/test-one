import "./polyfills-server.mjs";
import FSExtra from "fs-extra";
import { join } from "node:path";
import { getServerEntry, loadEnv, serve as vxrnServe } from "vxrn/serve";
process.on("uncaughtException", err => {
  console.error("[one] Uncaught exception", err?.stack || err);
});
async function serve(args = {}) {
  const buildInfo = await FSExtra.readJSON("dist/buildInfo.json");
  process.env.ONE_CACHE_KEY = buildInfo.constants.CACHE_KEY;
  const {
      labelProcess
    } = await import("./cli/label-process.mjs"),
    {
      removeUndefined
    } = await import("./utils/removeUndefined.mjs"),
    {
      loadUserOneOptions
    } = await import("./vite/one.mjs");
  labelProcess("serve"), loadEnv("production");
  const oneOptions = await loadUserOneOptions("serve");
  return process.env.VXRN_REACT_19 = "1", await vxrnServe({
    server: {
      // fallback to one plugin
      ...oneOptions.server,
      // override with any flags given to cli
      ...removeUndefined({
        port: args.port ? +args.port : void 0,
        host: args.host,
        compress: args.compress,
        platform: args.platform,
        cacheHeaders: args.cacheHeaders
      }),
      async beforeStart(options, app) {
        await oneOptions.server?.beforeStart?.(options, app), await oneServe(oneOptions, options, buildInfo, app);
      }
    }
  });
}
async function oneServe(options, vxrnOptions, buildInfo, app) {
  const {
      createHandleRequest
    } = await import("./createHandleRequest.mjs"),
    {
      isResponse
    } = await import("./utils/isResponse.mjs"),
    {
      isStatusRedirect
    } = await import("./utils/isStatus.mjs"),
    {
      resolveAPIRequest
    } = await import("./vite/resolveAPIRequest.mjs"),
    isAPIRequest = /* @__PURE__ */new WeakMap(),
    root = vxrnOptions.root || ".",
    redirects = options.web?.redirects;
  if (redirects) for (const redirect of redirects) app.get(redirect.source, context => {
    const destinationUrl = redirect.destination.replace(/:\w+/g, param => {
      const paramName = param.substring(1);
      return context.req.param(paramName) || "";
    });
    return context.redirect(destinationUrl, redirect.permanent ? 301 : 302);
  });
  if (!buildInfo) throw new Error("No build info found, have you run build?");
  const {
      routeMap,
      builtRoutes
    } = buildInfo,
    routeToBuildInfo = {};
  for (const route of builtRoutes) {
    routeToBuildInfo[route.cleanPath] = route;
    const bracketRoutePath = route.cleanPath.split("/").map(part => part[0] === ":" ? `[${part.slice(1)}]` : part).join("/");
    routeToBuildInfo[bracketRoutePath] = route;
  }
  const serverOptions = {
      ...options,
      root
    },
    render = (await import(getServerEntry(serverOptions))).default.render,
    apiCJS = options.build?.api?.outputFormat === "cjs",
    handleRequest = createHandleRequest({}, {
      async handleAPI({
        route,
        request,
        loaderProps
      }) {
        const apiFile = join(process.cwd(), "dist", "api", route.page.replace("[", "_").replace("]", "_") + (apiCJS ? ".cjs" : ".js"));
        return isAPIRequest.set(request, !0), resolveAPIRequest(async () => {
          try {
            return await import(apiFile);
          } catch (err) {
            return console.error(`
 [one] Error importing API route at ${apiFile}:

  ${err}

  If this is an import error, you can likely fix this by adding this dependency to
  the "optimizeDeps.include" array in your vite.config.ts.

  \u{1F41E} For a better error message run "node" and enter:

  import('${apiFile}')

`), {};
          }
        }, request, loaderProps?.params || {});
      },
      async handleSSR({
        route,
        url,
        loaderProps
      }) {
        if (route.type === "ssr") {
          const buildInfo2 = routeToBuildInfo[route.page];
          if (!buildInfo2) throw new Error(`No buildinfo found for ${url}, route: ${route.page}, in keys: ${Object.keys(routeToBuildInfo)}`);
          try {
            const loaderData = await (await import(buildInfo2.serverJsPath)).loader?.(loaderProps),
              preloads = buildInfo2.preloads,
              headers = new Headers();
            return headers.set("content-type", "text/html"), new Response(await render({
              loaderData,
              loaderProps,
              path: loaderProps?.path || "/",
              preloads
            }), {
              headers
            });
          } catch (err) {
            console.error(`[one] Error rendering SSR route ${route.page}

  ${err?.stack ?? err}

  url: ${url}`);
          }
        }
      }
    }),
    htmlFiles = {};
  for (const key in routeMap) routeToBuildInfo[key]?.type !== "ssr" && (htmlFiles[key] = await FSExtra.readFile(join("dist/client", routeMap[key]), "utf-8"));
  app.use(async (context, next) => {
    const html = htmlFiles[context.req.path];
    if (html) return context.html(html);
    try {
      const request = context.req.raw,
        response = await handleRequest.handler(request);
      if (response) {
        if (isResponse(response)) {
          if (isStatusRedirect(response.status)) {
            const location = `${response.headers.get("location") || ""}`;
            return response.headers.forEach((value, key) => {
              context.header(key, value);
            }), context.redirect(location, response.status);
          }
          if (isAPIRequest.get(request)) try {
            response.headers.set("Cache-Control", "no-store");
          } catch (err) {
            console.info(`Error udpating cache header on api route "${context.req.path}" to no-store, it is ${response.headers.get("cache-control")}, continue`, err);
          }
          return response;
        }
        return context.json(response, 200, isAPIRequest.get(request) ? {
          "Cache-Control": "no-store"
        } : void 0);
      }
    } catch (err) {
      console.error(` [one] Error handling request: ${err.stack}`);
    }
    await next();
  });
}
export { serve };
//# sourceMappingURL=serve.mjs.map
