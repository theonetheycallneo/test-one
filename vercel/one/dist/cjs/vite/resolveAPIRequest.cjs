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
var resolveAPIRequest_exports = {};
__export(resolveAPIRequest_exports, {
  resolveAPIRequest: () => resolveAPIRequest
});
module.exports = __toCommonJS(resolveAPIRequest_exports);
var import_isResponse = require("../utils/isResponse.cjs"),
  import_headers = require("./headers.cjs");
function resolveAPIRequest(asyncImport, request, params) {
  if (asyncImport) return new Promise((res, rej) => {
    const id = {
      _id: Math.random()
    };
    import_headers.requestAsyncLocalStore.run(id, async () => {
      try {
        const imported = await asyncImport(),
          requestType = request.method || "GET",
          handler = imported[requestType] || imported.default;
        if (!handler) {
          console.warn(`No handler found for request ${requestType}`);
          return;
        }
        let response = await handler(request, {
          params
        });
        const asyncHeaders = import_headers.asyncHeadersCache.get(id);
        if (asyncHeaders) try {
          response instanceof Response ? (0, import_headers.mergeHeaders)(response.headers, asyncHeaders) : response && typeof response == "object" ? response = Response.json(response, {
            headers: asyncHeaders
          }) : response = new Response(response, {
            headers: asyncHeaders
          });
        } catch (err) {
          if (`${err}`.includes("immutable")) {
            const body = response.body ? await streamToString(response.body) : "";
            response = new Response(body, {
              headers: response.headers,
              status: response.status,
              statusText: response.statusText
            }), (0, import_headers.mergeHeaders)(response.headers, asyncHeaders);
          } else console.error(` [one] error adding headers: ${err}`);
        }
        res(response);
      } catch (err) {
        (0, import_isResponse.isResponse)(err) ? res(err) : rej(err);
      }
    });
  });
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