import { isResponse } from "../utils/isResponse.mjs";
import { asyncHeadersCache, mergeHeaders, requestAsyncLocalStore } from "./headers.mjs";
function resolveAPIRequest(asyncImport, request, params) {
  if (asyncImport) return new Promise((res, rej) => {
    const id = {
      _id: Math.random()
    };
    requestAsyncLocalStore.run(id, async () => {
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
        const asyncHeaders = asyncHeadersCache.get(id);
        if (asyncHeaders) try {
          response instanceof Response ? mergeHeaders(response.headers, asyncHeaders) : response && typeof response == "object" ? response = Response.json(response, {
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
            }), mergeHeaders(response.headers, asyncHeaders);
          } else console.error(` [one] error adding headers: ${err}`);
        }
        res(response);
      } catch (err) {
        isResponse(err) ? res(err) : rej(err);
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
export { resolveAPIRequest };
//# sourceMappingURL=resolveAPIRequest.mjs.map
