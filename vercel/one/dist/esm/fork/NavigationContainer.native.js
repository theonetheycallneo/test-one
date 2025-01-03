import { jsx as _jsx } from "react/jsx-runtime";
import { BaseNavigationContainer, getActionFromState, getPathFromState, getStateFromPath, validatePathConfig } from "@react-navigation/core";
import { DefaultTheme, LinkingContext, ThemeProvider } from "@react-navigation/native";
import useDocumentTitle from "@react-navigation/native/lib/module/useDocumentTitle.native.js";
import useThenable from "@react-navigation/native/lib/module/useThenable.js";
import * as React from "react";
import useLinking from "./useLinking";
global.REACT_NAVIGATION_DEVTOOLS = /* @__PURE__ */ new WeakMap();
function NavigationContainerInner(param, ref) {
  var { theme = DefaultTheme, linking, fallback = null, documentTitle, onReady, ...rest } = param, isLinkingEnabled = linking ? linking.enabled !== !1 : !1;
  linking?.config && validatePathConfig(linking.config);
  var refContainer = React.useRef(null);
  useDocumentTitle(refContainer, documentTitle);
  var { getInitialState } = useLinking(refContainer, {
    // independent: rest.independent,
    enabled: isLinkingEnabled,
    prefixes: [],
    ...linking
  });
  React.useEffect(function() {
    refContainer.current && global.REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
      get linking() {
        var _linking_prefixes, _linking_getStateFromPath, _linking_getPathFromState, _linking_getActionFromState;
        return {
          ...linking,
          enabled: isLinkingEnabled,
          prefixes: (_linking_prefixes = linking?.prefixes) !== null && _linking_prefixes !== void 0 ? _linking_prefixes : [],
          getStateFromPath: (_linking_getStateFromPath = linking?.getStateFromPath) !== null && _linking_getStateFromPath !== void 0 ? _linking_getStateFromPath : getStateFromPath,
          getPathFromState: (_linking_getPathFromState = linking?.getPathFromState) !== null && _linking_getPathFromState !== void 0 ? _linking_getPathFromState : getPathFromState,
          getActionFromState: (_linking_getActionFromState = linking?.getActionFromState) !== null && _linking_getActionFromState !== void 0 ? _linking_getActionFromState : getActionFromState
        };
      }
    });
  });
  var [isResolved, initialState] = useThenable(getInitialState);
  React.useImperativeHandle(ref, function() {
    return refContainer.current;
  });
  var linkingContext = React.useMemo(function() {
    return {
      options: linking
    };
  }, [
    linking
  ]), isReady = rest.initialState != null || !isLinkingEnabled || isResolved, onReadyRef = React.useRef(onReady);
  return React.useEffect(function() {
    onReadyRef.current = onReady;
  }), React.useEffect(function() {
    if (isReady) {
      var _onReadyRef_current;
      (_onReadyRef_current = onReadyRef.current) === null || _onReadyRef_current === void 0 || _onReadyRef_current.call(onReadyRef);
    }
  }, [
    isReady
  ]), isReady ? /* @__PURE__ */ _jsx(LinkingContext.Provider, {
    value: linkingContext,
    children: /* @__PURE__ */ _jsx(ThemeProvider, {
      value: theme,
      children: /* @__PURE__ */ _jsx(BaseNavigationContainer, {
        ...rest,
        initialState: rest.initialState == null ? initialState : rest.initialState,
        ref: refContainer
      })
    })
  }) : fallback;
}
var NavigationContainer = /* @__PURE__ */ React.forwardRef(NavigationContainerInner), NavigationContainer_native_default = NavigationContainer;
export {
  NavigationContainer_native_default as default
};
//# sourceMappingURL=NavigationContainer.native.js.map
