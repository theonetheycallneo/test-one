"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var LoadProgressBar_exports = {};
__export(LoadProgressBar_exports, {
  LoadProgressBar: () => LoadProgressBar
});
module.exports = __toCommonJS(LoadProgressBar_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_react = require("react"), import_react_native = require("react-native"), import_imperative_api = require("../imperative-api"), LoadProgressBar = function(param) {
  var { startDelay = 500, finishDelay = 50, initialPercent = 20, updateInterval = 300, sporadicness = 3, ...props } = param, [loaded, setLoaded] = (0, import_react.useState)(0), [width, setWidth] = (0, import_react.useState)(0);
  return (0, import_react.useEffect)(function() {
    var loadInterval, dispose = import_imperative_api.router.onLoadState(function(state) {
      switch (clearTimeout(loadInterval), state) {
        case "loading": {
          loadInterval = setTimeout(function() {
            setLoaded(initialPercent);
            var intervalCount = 0;
            loadInterval = setInterval(function() {
              intervalCount++, intervalCount % sporadicness !== 0 && setLoaded(function(prev) {
                var increment = (100 - prev) * (prev > 80 ? 0.05 : 0.1) * Math.random();
                return Math.min(prev + increment, 100);
              });
            }, updateInterval);
          }, startDelay);
          break;
        }
        case "loaded": {
          setLoaded(100), clearInterval(loadInterval), setTimeout(function() {
            setLoaded(0);
          }, finishDelay);
          break;
        }
      }
    });
    return function() {
      dispose(), clearInterval(loadInterval);
    };
  }, [
    finishDelay,
    initialPercent,
    sporadicness,
    startDelay,
    updateInterval
  ]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, {
    ...props,
    onLayout: function(e) {
      var _props_onLayout;
      setWidth(e.nativeEvent.layout.width), (_props_onLayout = props.onLayout) === null || _props_onLayout === void 0 || _props_onLayout.call(props, e);
    },
    style: [
      {
        display: loaded === 0 ? "none" : "flex",
        height: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(60, 100, 200, 0.65)",
        width: "100%",
        transform: [
          {
            translateX: -(1 - loaded * 0.01) * width
          }
        ],
        zIndex: Number.MAX_SAFE_INTEGER
      },
      props.style
    ]
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoadProgressBar
});
//# sourceMappingURL=LoadProgressBar.js.map
