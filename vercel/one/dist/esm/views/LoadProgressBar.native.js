import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "../imperative-api";
var LoadProgressBar = function(param) {
  var { startDelay = 500, finishDelay = 50, initialPercent = 20, updateInterval = 300, sporadicness = 3, ...props } = param, [loaded, setLoaded] = useState(0), [width, setWidth] = useState(0);
  return useEffect(function() {
    var loadInterval, dispose = router.onLoadState(function(state) {
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
  ]), /* @__PURE__ */ _jsx(View, {
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
export {
  LoadProgressBar
};
//# sourceMappingURL=LoadProgressBar.js.map
