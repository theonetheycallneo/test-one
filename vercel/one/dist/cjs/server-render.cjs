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
var server_render_exports = {};
__export(server_render_exports, {
  renderToString: () => renderToString
});
module.exports = __toCommonJS(server_render_exports);
var import_server = __toESM(require("react-dom/server.browser"), 1);
const renderToString = async (app, options) => {
  const readableStream = await import_server.default.renderToReadableStream(app, {
    bootstrapModules: options.preloads
  });
  return await readableStream.allReady, await streamToString(readableStream);
};
async function streamToString(stream) {
  const decoder = new TextDecoder("utf-8", {
    fatal: !0
  });
  let result = "";
  for await (const chunk of stream) result += decoder.decode(chunk, {
    stream: !0
  });
  return result += decoder.decode(), result;
}