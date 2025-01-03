import {
  BaseNavigationContainer,
  getActionFromState,
  getPathFromState,
  getStateFromPath,
  validatePathConfig
} from "@react-navigation/core";
import {
  DefaultTheme,
  ThemeProvider,
  LinkingContext
} from "@react-navigation/native";
import * as React from "react";
import useLinking from "./useLinking";
import { jsx } from "react/jsx-runtime";
global.REACT_NAVIGATION_DEVTOOLS = /* @__PURE__ */ new WeakMap();
function NavigationContainerInner({
  theme = DefaultTheme,
  linking,
  fallback = null,
  documentTitle,
  onReady,
  ...rest
}, ref) {
  const isLinkingEnabled = linking ? linking.enabled !== !1 : !1;
  linking?.config && validatePathConfig(linking.config);
  const refContainer = React.useRef(null), { getInitialState } = useLinking(refContainer, {
    independent: rest.independent,
    enabled: isLinkingEnabled,
    prefixes: [],
    ...linking
  });
  if (React.useEffect(() => {
    refContainer.current && REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
      get linking() {
        return {
          ...linking,
          enabled: isLinkingEnabled,
          prefixes: linking?.prefixes ?? [],
          getStateFromPath: linking?.getStateFromPath ?? getStateFromPath,
          getPathFromState: linking?.getPathFromState ?? getPathFromState,
          getActionFromState: linking?.getActionFromState ?? getActionFromState
        };
      }
    });
  }), cache.val === 0 && (cache.promise = new Promise((res) => {
    getInitialState().then((val) => {
      cache.val = val, cache.done = !0, res();
    });
  })), !cache.done)
    throw cache.promise;
  const initialState = cache.val;
  React.useImperativeHandle(ref, () => refContainer.current);
  const linkingContext = React.useMemo(() => ({ options: linking }), [linking]);
  return React.useEffect(() => {
    onReady?.();
  }, [onReady]), /* @__PURE__ */ jsx(LinkingContext.Provider, { value: linkingContext, children: /* @__PURE__ */ jsx(ThemeProvider, { value: theme, children: /* @__PURE__ */ jsx(
    BaseNavigationContainer,
    {
      ...rest,
      initialState: rest.initialState == null ? initialState : rest.initialState,
      ref: refContainer
    }
  ) }) });
}
const cache = {
  done: !1,
  promise: null,
  val: 0
}, NavigationContainer = React.forwardRef(NavigationContainerInner);
var NavigationContainer_default = NavigationContainer;
export {
  NavigationContainer_default as default
};
//# sourceMappingURL=NavigationContainer.js.map
