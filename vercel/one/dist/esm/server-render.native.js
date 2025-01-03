import ReactDOMServer from "react-dom/server.browser";
var renderToString = async function(app, options) {
  var readableStream = await ReactDOMServer.renderToReadableStream(app, {
    bootstrapModules: options.preloads
  });
  await readableStream.allReady;
  var out = await streamToString(readableStream);
  return out;
};
async function streamToString(stream) {
  var decoder = new TextDecoder("utf-8", {
    fatal: !0
  }), result = "", _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = stream[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var chunk = _step.value;
      result += decoder.decode(chunk, {
        stream: !0
      });
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError)
        throw _iteratorError;
    }
  }
  return result += decoder.decode(), result;
}
export {
  renderToString
};
//# sourceMappingURL=server-render.js.map
