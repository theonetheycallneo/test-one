const VIRTUAL_ENTRY = "virtual:ssr-css.css";
function SSRCSSPlugin(pluginOpts) {
  let server;
  const virtualHref = "/@id/__x00__" + VIRTUAL_ENTRY;
  return {
    name: "one-plugin-ssr-css",
    apply: "serve",
    configureServer(server_) {
      server = server_, server.middlewares.use(async (req, res, next) => {
        if (req.url?.includes(virtualHref)) {
          invalidateModule(server, "\0" + VIRTUAL_ENTRY + "?direct");
          let code = await collectStyle(server, pluginOpts.entries);
          res.setHeader("Content-Type", "text/css"), res.setHeader("Cache-Control", "no-store"), res.setHeader("Vary", "*"), res.write(code), res.end();
          return;
        }
        next();
      });
    },
    // virtual module
    // (use `startsWith` since Vite adds `?direct` for raw css request)
    resolveId(source, _importer, _options) {
      return source.startsWith(VIRTUAL_ENTRY) ? "\0" + source : void 0;
    },
    async load(id, _options) {
      if (id.startsWith("\0" + VIRTUAL_ENTRY)) {
        const url = new URL(id.slice(1), "https://test.local");
        let code = await collectStyle(server, pluginOpts.entries);
        return url.searchParams.has("direct") || (code = `export default ${JSON.stringify(code)}`), code;
      }
    },
    // also expose via transformIndexHtml
    transformIndexHtml: {
      handler: async () => [{
        tag: "link",
        injectTo: "head",
        attrs: {
          rel: "stylesheet",
          href: virtualHref,
          "data-ssr-css": !0
        }
      }, {
        tag: "script",
        injectTo: "head",
        attrs: {
          type: "module"
        },
        children: (/* js */
        `
              import { createHotContext } from "/@vite/client";
              const hot = createHotContext("/__clear_ssr_css");
              hot.on("vite:afterUpdate", () => {
                document
                  .querySelectorAll("[data-ssr-css]")
                  .forEach(node => node.remove());
              });
            `)
      }]
    }
  };
}
function invalidateModule(server, id) {
  const mod = server.moduleGraph.getModuleById(id);
  mod && server.moduleGraph.invalidateModule(mod);
}
async function collectStyle(server, entries) {
  const urls = await collectStyleUrls(server, entries);
  return (await Promise.all(urls.map(async url => {
    const code = (await server.transformRequest(url + "?direct"))?.code || "",
      prefix = `/* [collectStyle] ${url} */`;
    try {
      const {
          transform
        } = await import("lightningcss"),
        processed = transform({
          filename: "code.css",
          code: Buffer.from(code),
          ...server.config.css.lightningcss
        }).code.toString();
      return [prefix, processed];
    } catch (err) {
      return console.error(` [one] Error post-processing CSS, leaving un-processed: ${err}`), [prefix, code];
    }
  }))).flat().filter(Boolean).join(`

`);
}
async function collectStyleUrls(server, entries) {
  const visited = /* @__PURE__ */new Set();
  async function traverse(url) {
    const [, id] = await server.moduleGraph.resolveUrl(url);
    if (visited.has(id)) return;
    visited.add(id);
    const mod = server.moduleGraph.getModuleById(id);
    mod && (await Promise.all([...mod.importedModules].map(childMod => traverse(childMod.url))));
  }
  return await Promise.all(entries.map(e => server.transformRequest(e))), await Promise.all(entries.map(url => traverse(url))), [...visited].filter(url => url.match(CSS_LANGS_RE));
}
const CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
export { SSRCSSPlugin, VIRTUAL_ENTRY, collectStyle };
//# sourceMappingURL=SSRCSSPlugin.mjs.map
