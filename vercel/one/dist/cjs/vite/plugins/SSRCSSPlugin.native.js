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
var SSRCSSPlugin_exports = {};
__export(SSRCSSPlugin_exports, {
  SSRCSSPlugin: () => SSRCSSPlugin,
  VIRTUAL_ENTRY: () => VIRTUAL_ENTRY,
  collectStyle: () => collectStyle
});
module.exports = __toCommonJS(SSRCSSPlugin_exports);
var VIRTUAL_ENTRY = "virtual:ssr-css.css";
function SSRCSSPlugin(pluginOpts) {
  var server, virtualHref = "/@id/__x00__" + VIRTUAL_ENTRY;
  return {
    name: "one-plugin-ssr-css",
    apply: "serve",
    configureServer(server_) {
      server = server_, server.middlewares.use(async function(req, res, next) {
        var _req_url;
        if (!((_req_url = req.url) === null || _req_url === void 0) && _req_url.includes(virtualHref)) {
          invalidateModule(server, "\0" + VIRTUAL_ENTRY + "?direct");
          var code = await collectStyle(server, pluginOpts.entries);
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
        var url = new URL(id.slice(1), "https://test.local"), code = await collectStyle(server, pluginOpts.entries);
        return url.searchParams.has("direct") || (code = `export default ${JSON.stringify(code)}`), code;
      }
    },
    // also expose via transformIndexHtml
    transformIndexHtml: {
      handler: async function() {
        return [
          {
            tag: "link",
            injectTo: "head",
            attrs: {
              rel: "stylesheet",
              href: virtualHref,
              "data-ssr-css": !0
            }
          },
          {
            tag: "script",
            injectTo: "head",
            attrs: {
              type: "module"
            },
            children: (
              /* js */
              `
              import { createHotContext } from "/@vite/client";
              const hot = createHotContext("/__clear_ssr_css");
              hot.on("vite:afterUpdate", () => {
                document
                  .querySelectorAll("[data-ssr-css]")
                  .forEach(node => node.remove());
              });
            `
            )
          }
        ];
      }
    }
  };
}
function invalidateModule(server, id) {
  var mod = server.moduleGraph.getModuleById(id);
  mod && server.moduleGraph.invalidateModule(mod);
}
async function collectStyle(server, entries) {
  var urls = await collectStyleUrls(server, entries), codes = await Promise.all(urls.map(async function(url) {
    var res = await server.transformRequest(url + "?direct"), code = (res == null ? void 0 : res.code) || "", prefix = `/* [collectStyle] ${url} */`;
    try {
      var { transform } = await import("lightningcss"), processed = transform({
        filename: "code.css",
        code: Buffer.from(code),
        ...server.config.css.lightningcss
      }).code.toString();
      return [
        prefix,
        processed
      ];
    } catch (err) {
      return console.error(` [one] Error post-processing CSS, leaving un-processed: ${err}`), [
        prefix,
        code
      ];
    }
  }));
  return codes.flat().filter(Boolean).join(`

`);
}
async function collectStyleUrls(server, entries) {
  var visited = /* @__PURE__ */ new Set();
  async function traverse(url) {
    var [, id] = await server.moduleGraph.resolveUrl(url);
    if (!visited.has(id)) {
      visited.add(id);
      var mod = server.moduleGraph.getModuleById(id);
      mod && await Promise.all([
        ...mod.importedModules
      ].map(function(childMod) {
        return traverse(childMod.url);
      }));
    }
  }
  return await Promise.all(entries.map(function(e) {
    return server.transformRequest(e);
  })), await Promise.all(entries.map(function(url) {
    return traverse(url);
  })), [
    ...visited
  ].filter(function(url) {
    return url.match(CSS_LANGS_RE);
  });
}
var CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SSRCSSPlugin,
  VIRTUAL_ENTRY,
  collectStyle
});
//# sourceMappingURL=SSRCSSPlugin.js.map
