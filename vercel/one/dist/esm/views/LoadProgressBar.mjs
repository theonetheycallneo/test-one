import { useEffect, useState } from "react";
import { View } from "react-native-web";
import { router } from "../imperative-api.mjs";
import { jsx } from "react/jsx-runtime";
const LoadProgressBar = ({
  startDelay = 500,
  finishDelay = 50,
  initialPercent = 20,
  updateInterval = 300,
  sporadicness = 3,
  ...props
}) => {
  const [loaded, setLoaded] = useState(0),
    [width, setWidth] = useState(0);
  return useEffect(() => {
    let loadInterval;
    const dispose = router.onLoadState(state => {
      switch (clearTimeout(loadInterval), state) {
        case "loading":
          {
            loadInterval = setTimeout(() => {
              setLoaded(initialPercent);
              let intervalCount = 0;
              loadInterval = setInterval(() => {
                intervalCount++, intervalCount % sporadicness !== 0 && setLoaded(prev => {
                  const increment = (100 - prev) * (prev > 80 ? 0.05 : 0.1) * Math.random();
                  return Math.min(prev + increment, 100);
                });
              }, updateInterval);
            }, startDelay);
            break;
          }
        case "loaded":
          {
            setLoaded(100), clearInterval(loadInterval), setTimeout(() => {
              setLoaded(0);
            }, finishDelay);
            break;
          }
      }
    });
    return () => {
      dispose(), clearInterval(loadInterval);
    };
  }, [finishDelay, initialPercent, sporadicness, startDelay, updateInterval]), /* @__PURE__ */jsx(View, {
    ...props,
    onLayout: e => {
      setWidth(e.nativeEvent.layout.width), props.onLayout?.(e);
    },
    style: [{
      display: loaded === 0 ? "none" : "flex",
      height: 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(60, 100, 200, 0.65)",
      width: "100%",
      transform: [{
        translateX: -(1 - loaded * 0.01) * width
      }],
      zIndex: Number.MAX_SAFE_INTEGER
    }, props.style]
  });
};
export { LoadProgressBar };
//# sourceMappingURL=LoadProgressBar.mjs.map
