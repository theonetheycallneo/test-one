import { join } from "node:path";
import { debounce } from "perfect-debounce";
import { createServerModuleRunner } from "vite";
import { createHandleRequest } from "../../createHandleRequest.mjs";
import { isResponse } from "../../utils/isResponse.mjs";
import { isStatusRedirect } from "../../utils/isStatus.mjs";
import { promiseWithResolvers } from "../../utils/promiseWithResolvers.mjs";
import { LoaderDataCache } from "../../vite/constants.mjs";
import { replaceLoader } from "../../vite/replaceLoader.mjs";
import { resolveAPIRequest } from "../../vite/resolveAPIRequest.mjs";
import { virtalEntryIdClient, virtualEntryId } from "./virtualEntryPlugin.mjs";
const USE_SERVER_ENV = !1;
//!!process.env.USE_SERVER_ENV
function createFileSystemRouterPlugin(options) {
  const preloads = ["/@vite/client", virtalEntryIdClient];
  let runner,
    server,
    handleRequest = createRequestHandler(),
    renderPromise = null;
  function createRequestHandler() {
    return createHandleRequest(options, {
      async handleSSR({
        route,
        url,
        loaderProps
      }) {
        if (console.info(` \u24F5  [${route.type}] ${url} resolved to ${route.file}`), route.type === "spa") return `<html><head>
            <script>globalThis['global'] = globalThis</script>
            <script>globalThis['__vxrnIsSPA'] = true</script>
            <script type="module">
              import { injectIntoGlobalHook } from "/@react-refresh";
              injectIntoGlobalHook(window);
              window.$RefreshReg$ = () => {};
              window.$RefreshSig$ = () => (type) => type;
            </script>
            <script type="module" src="/@vite/client" async=""></script>
            <script type="module" src="/@id/__x00__virtual:one-entry" async=""></script>
          </head></html>`;
        renderPromise && (await renderPromise);
        const {
          promise,
          resolve
        } = promiseWithResolvers();
        renderPromise = promise;
        try {
          const routeFile = join("app", route.file);
          runner.clearCache(), globalThis.__vxrnresetState?.();
          const exported = routeFile === "" ? {} : await runner.import(routeFile),
            loaderData = await exported.loader?.(loaderProps);
          eval("process.env.TAMAGUI_IS_SERVER = '1'");
          const entry = await runner.import(virtualEntryId),
            render = entry.default.render;
          globalThis.__vxrnLoaderData__ = loaderData, globalThis.__vxrnLoaderProps__ = loaderProps, LoaderDataCache[route.file] = loaderData;
          const is404 = route.isNotFound || !exported.default,
            html = await render({
              loaderData,
              loaderProps,
              path: loaderProps?.path || "/",
              preloads
            });
          return is404 ? new Response(html, {
            status: 404,
            headers: {
              "Content-Type": "text/html"
            }
          }) : html;
        } catch (err) {
          console.error(`SSR error while loading file ${route.file} from URL ${url.href}
`, err);
          const title = `Error rendering ${url.pathname} on server`,
            message = err instanceof Error ? err.message : `${err}`,
            stack = err instanceof Error && err.stack || "",
            subMessage = /at (useEffect|useState|useReducer|useContext|useLayoutEffect)\s*\(.*?react\.development\.js/g.test(stack) ? `
            <h2>Duplicate React Error</h2>
            <p style="font-size: 18px; line-height: 24px; max-width: 850px;">Note: These types of errors happen during SSR because One needs all dependencies that use React to be optimized. Find the dependency on the line after the react.development.js line below to find the failing dependency. So long as that dependency has "react" as a sub-dependency, you can add it to your package.json and One will optimize it automatically. If it doesn't list it properly, you can fix this manually by changing your vite.config.ts One plugin to add "one({ deps: { depName: true })" so One optimizes depName.</p>
          ` : "";
          return console.error(`${title}
 ${message}

${stack}
`), `
            <html>
              <body style="background: #000; color: #fff; padding: 5%; font-family: monospace; line-height: 2rem;">
                <h1 style="display: inline-flex; background: red; color: white; padding: 5px; margin: -5px;">${title}</h1>
                <h2>${message}</h2>
                ${subMessage}
                ${stack ? `<pre style="font-size: 15px; line-height: 24px; white-space: pre;">
                    ${stack}
                </pre>` : ""}
              </body>
            </html>
          `;
        } finally {
          resolve();
        }
      },
      async handleLoader({
        request,
        route: route2,
        url: url2,
        loaderProps: loaderProps2
      }) {
        const routeFile2 = join("app", route2.file);
        let transformedJS = (await server.transformRequest(routeFile2))?.code;
        if (!transformedJS) throw new Error("No transformed js returned");
        const loaderData2 = await (await runner.import(routeFile2)).loader?.(loaderProps2);
        loaderData2 && (transformedJS = replaceLoader({
          code: transformedJS,
          loaderData: loaderData2
        }));
        const platform = url2.searchParams.get("platform");
        if (platform === "ios" || platform === "android") {
          if (!server.environments[platform || ""]) throw new Error(`[handleLoader] No Vite environment found for platform '${platform}'`);
          return `exports.loader = () => (${JSON.stringify(loaderData2)});`;
        }
        return transformedJS;
      },
      async handleAPI({
        request,
        route: route2,
        url: url2,
        loaderProps: loaderProps2
      }) {
        return await resolveAPIRequest(() => runner.import(join("app", route2.file)), request, loaderProps2?.params || {});
      }
    });
  }
  return {
    name: "one-router-fs",
    enforce: "post",
    apply: "serve",
    async config(userConfig) {
      if (handleRequest.manifest.pageRoutes) return {
        optimizeDeps: {
          /**
           * This adds all our routes and layouts as entries which fixes initial load making
           * optimizeDeps be triggered which causes hard refreshes (also on initial navigations)
           *
           * see: https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-entries
           * and: https://github.com/remix-run/remix/pull/9921
           */
          entries: [...new Set(handleRequest.manifest.pageRoutes.flatMap(route2 => [join("app", route2.file), ...(route2.layouts?.map(layout => join("app", layout.contextKey)) || [])]))]
        }
      };
    },
    configureServer(serverIn) {
      server = serverIn, runner = createServerModuleRunner(USE_SERVER_ENV ? server.environments.server : server.environments.ssr);
      const appDir = join(process.cwd(), "app"),
        fileWatcherChangeListener = debounce(async (type, path) => {
          (type === "add" || type === "delete") && path.startsWith(appDir) && (handleRequest = createRequestHandler());
        }, 100);
      return server.watcher.addListener("all", fileWatcherChangeListener), () => {
        server.middlewares.use(async (req, res, next) => {
          try {
            const redirects = options.web?.redirects;
            if (redirects) {
              const url2 = new URL(req.url || "", `http://${req.headers.host}`);
              for (const redirect of redirects) {
                const regexStr = `^${redirect.source.replace(/:\w+/g, "([^/]+)")}$`,
                  match = url2.pathname.match(new RegExp(regexStr));
                if (match) {
                  let destination = redirect.destination;
                  const params = redirect.source.match(/:\w+/g);
                  params && params.forEach((param, index) => {
                    destination = destination.replace(param, match[index + 1] || "");
                  }), console.warn(` [one] redirecting via redirect: ${destination}`), res.writeHead(redirect.permanent ? 301 : 302, {
                    Location: destination
                  }), res.end();
                  return;
                }
              }
            }
            const reply = await handleRequest.handler(await convertIncomingMessageToRequest(req));
            if (!reply) return next();
            if (typeof reply != "string" && isResponse(reply)) {
              if (reply.headers.forEach((value, key) => {
                if (key === "set-cookie") {
                  const cookies = value.split(", ");
                  for (const cookie of cookies) res.appendHeader("Set-Cookie", cookie);
                } else res.setHeader(key, value);
              }), isStatusRedirect(reply.status)) {
                const location = `${reply.headers.get("location") || ""}`;
                if (console.info(` \u21A6 Redirect ${location}`), location) {
                  res.writeHead(reply.status, {
                    Location: location
                  }), res.end();
                  return;
                }
                console.error("No location provided to redirected status reply", reply);
              }
              res.statusCode = reply.status, res.statusMessage = reply.statusText;
              let outString = "";
              reply.body && reply.body.locked && console.warn("Body is locked??");
              try {
                outString = reply.body ? await streamToString(reply.body) : "";
              } catch (err) {
                console.warn(`Error converting body in dev mode: ${err}`);
              }
              res.write(outString), res.end();
              return;
            }
            if (reply && typeof reply == "object") {
              res.setHeader("Content-Type", "application/json"), res.write(JSON.stringify(reply)), res.end();
              return;
            }
            res.write(reply), res.end();
            return;
          } catch (error) {
            console.error(`One routing error: ${error}`), next(error);
          }
          console.warn(`SSR handler didn't send a response for url: ${req.url}`);
        });
      };
    }
  };
}
async function streamToString(stream) {
  const reader = stream.getReader(),
    decoder = new TextDecoder();
  let result = "";
  try {
    for (;;) {
      const {
        done,
        value
      } = await reader.read();
      if (done) break;
      result += decoder.decode(value, {
        stream: !0
      });
    }
  } catch (error) {
    console.error("Error reading the stream:", error);
  } finally {
    reader.releaseLock();
  }
  return result;
}
const convertIncomingMessageToRequest = async req => {
  if (!req.originalUrl) throw new Error("Can't convert");
  const urlBase = `http://${req.headers.host}`,
    urlString = req.originalUrl || "",
    url2 = new URL(urlString, urlBase),
    headers = new Headers();
  for (const key in req.headers) req.headers[key] && headers.append(key, req.headers[key]);
  return new Request(url2, {
    method: req.method,
    body: ["POST", "PUT", "PATCH", "DELETE"].includes(req.method || "") ? await readStream(req) : null,
    headers
  });
};
function readStream(stream) {
  return new Promise((resolve2, reject) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk)), stream.on("end", () => resolve2(Buffer.concat(chunks))), stream.on("error", reject);
  });
}
export { createFileSystemRouterPlugin };
//# sourceMappingURL=fileSystemRouterPlugin.mjs.map