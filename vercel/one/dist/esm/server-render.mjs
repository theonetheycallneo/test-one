import ReactDOMServer from "react-dom/server.browser";
const renderToString = async (app, options) => {
  const readableStream = await ReactDOMServer.renderToReadableStream(app, {
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
export { renderToString };
//# sourceMappingURL=server-render.mjs.map
