import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { u as useIsomorphicLayoutEffect$2, i as isVariable, s as simpleHash, c as createVariable, g as getVariableValue, a as createCSSVariable, b as getSetting, d as sortString, v as variableToString, T as THEME_CLASSNAME_PREFIX, e as getTokenObject, f as scanAllSheets, l as listenForSheetChanges, h as configureMedia, j as configListeners, k as setTokens, m as getAllRules, n as setConfig, o as getThemeManager, p as ThemeManagerIDContext, C as ComponentContext, q as getConfig, r as isTouchable, t as isClient, w as Theme, x as styled, V as View$1, y as getTokens, z as Text, A as isServer, B as createStyledContext, D as useMedia, E as isWeb, F as isIos, G as isAndroid$1, H as useComposedRefs, S as Stack, I as composeRefs, J as composeEventHandlers, K as useTheme, L as getVariable, M as useProps, N as Spacer, O as transformsToString, P as SchemeProvider, Q as useColorScheme } from "./index-CsfU4fKn.js";
import * as React from "react";
import React__default, { useState, useEffect, useId as useId$1, useContext, useRef, cloneElement, Children, isValidElement, startTransition as startTransition$1, useMemo, createContext, memo, useReducer, forwardRef, useLayoutEffect } from "react";
import { n as nanoid, N as NavigationRouteContext, u as useLatestCallback, a as NavigationContainerRefContext, b as NavigationContext, c as useOptionsGetters, d as NavigationStateContext, E as EnsureSingleNavigator, e as NavigationBuilderContext, C as CommonActions, U as UnhandledActionContext, g as goBack, S as SingleNavigatorContext, r as reset, f as navigate, h as useScheduleUpdate, i as useEventEmitter, j as useChildListeners, k as useKeyedChildListeners, l as Screen$1, G as Group, m as UIManager, s as stylesheet, _ as _objectWithoutPropertiesLoose, V as View, o as useMergeRefs$1, p as requireWarning, q as getDefaultExportFromCjs, t as invariant, D as Dimensions, v as mergeRefs, w as _objectSpread2, x as canUseDOM, y as navigate$1, z as push, A as dismiss, B as dismissAll, F as canDismiss, H as replace, I as goBack$1, J as canGoBack, K as setParams, L as subscribeToRootState, M as subscribeToLoadingState, O as useContextKey, P as getNameFromFilePath, Q as useIsomorphicLayoutEffect$1, R as useSortedScreens, T as StackRouter, W as Platform } from "../_virtual_one-entry.js";
import * as ReactDOM from "react-dom";
import { createPortal, flushSync } from "react-dom";
import "react-dom/client";
import "react-dom/server.browser";
const CurrentRenderContext = /* @__PURE__ */ React.createContext(void 0);
function useRouteCache(routes) {
  React.useMemo(() => ({
    current: /* @__PURE__ */ new Map()
  }), []);
  {
    return routes;
  }
}
const NavigationHelpersContext = /* @__PURE__ */ React.createContext(void 0);
const PreventRemoveContext = /* @__PURE__ */ React.createContext(void 0);
const transformPreventedRoutes = (preventedRoutesMap) => {
  const preventedRoutesToTransform = [...preventedRoutesMap.values()];
  const preventedRoutes = preventedRoutesToTransform.reduce((acc, _ref) => {
    var _acc$routeKey;
    let {
      routeKey,
      preventRemove
    } = _ref;
    acc[routeKey] = {
      preventRemove: ((_acc$routeKey = acc[routeKey]) === null || _acc$routeKey === void 0 ? void 0 : _acc$routeKey.preventRemove) || preventRemove
    };
    return acc;
  }, {});
  return preventedRoutes;
};
function PreventRemoveProvider(_ref2) {
  let {
    children
  } = _ref2;
  const [parentId] = React.useState(() => nanoid());
  const [preventedRoutesMap, setPreventedRoutesMap] = React.useState(/* @__PURE__ */ new Map());
  const navigation = React.useContext(NavigationHelpersContext);
  const route = React.useContext(NavigationRouteContext);
  const preventRemoveContextValue = React.useContext(PreventRemoveContext);
  const setParentPrevented = preventRemoveContextValue === null || preventRemoveContextValue === void 0 ? void 0 : preventRemoveContextValue.setPreventRemove;
  const setPreventRemove = useLatestCallback((id, routeKey, preventRemove) => {
    if (preventRemove && (navigation == null || navigation !== null && navigation !== void 0 && navigation.getState().routes.every((route2) => route2.key !== routeKey))) {
      throw new Error(`Couldn't find a route with the key ${routeKey}. Is your component inside NavigationContent?`);
    }
    setPreventedRoutesMap((prevPrevented) => {
      var _prevPrevented$get, _prevPrevented$get2;
      if (routeKey === ((_prevPrevented$get = prevPrevented.get(id)) === null || _prevPrevented$get === void 0 ? void 0 : _prevPrevented$get.routeKey) && preventRemove === ((_prevPrevented$get2 = prevPrevented.get(id)) === null || _prevPrevented$get2 === void 0 ? void 0 : _prevPrevented$get2.preventRemove)) {
        return prevPrevented;
      }
      const nextPrevented = new Map(prevPrevented);
      if (preventRemove) {
        nextPrevented.set(id, {
          routeKey,
          preventRemove
        });
      } else {
        nextPrevented.delete(id);
      }
      return nextPrevented;
    });
  });
  const isPrevented = [...preventedRoutesMap.values()].some((_ref3) => {
    let {
      preventRemove
    } = _ref3;
    return preventRemove;
  });
  React.useEffect(() => {
    if ((route === null || route === void 0 ? void 0 : route.key) !== void 0 && setParentPrevented !== void 0) {
      setParentPrevented(parentId, route.key, isPrevented);
      return () => {
        setParentPrevented(parentId, route.key, false);
      };
    }
    return;
  }, [parentId, isPrevented, route === null || route === void 0 ? void 0 : route.key, setParentPrevented]);
  const value = React.useMemo(() => ({
    setPreventRemove,
    preventedRoutes: transformPreventedRoutes(preventedRoutesMap)
  }), [setPreventRemove, preventedRoutesMap]);
  return /* @__PURE__ */ React.createElement(PreventRemoveContext.Provider, {
    value
  }, children);
}
function useNavigation$1() {
  const root = React.useContext(NavigationContainerRefContext);
  const navigation = React.useContext(NavigationContext);
  if (navigation === void 0 && root === void 0) {
    throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
  }
  return navigation ?? root;
}
function isArrayEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  return a.every((it, index2) => it === b[index2]);
}
function isRecordEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every((key) => a[key] === b[key]);
}
const NavigationContent = (_ref) => {
  let {
    render,
    children
  } = _ref;
  return render(children);
};
function useComponent(render) {
  const renderRef = React.useRef(render);
  renderRef.current = render;
  React.useEffect(() => {
    renderRef.current = null;
  });
  return React.useRef((_ref2) => {
    let {
      children
    } = _ref2;
    const render2 = renderRef.current;
    if (render2 === null) {
      throw new Error("The returned component must be rendered in the same render phase as the hook.");
    }
    return /* @__PURE__ */ React.createElement(NavigationContent, {
      render: render2
    }, children);
  }).current;
}
function useCurrentRender(_ref) {
  let {
    state,
    navigation,
    descriptors
  } = _ref;
  const current = React.useContext(CurrentRenderContext);
  if (current && navigation.isFocused()) {
    current.options = descriptors[state.routes[state.index].key].options;
  }
}
function StaticContainer(props) {
  return props.children;
}
const StaticContainer$1 = /* @__PURE__ */ React.memo(StaticContainer, (prevProps, nextProps) => {
  const prevPropKeys = Object.keys(prevProps);
  const nextPropKeys = Object.keys(nextProps);
  if (prevPropKeys.length !== nextPropKeys.length) {
    return false;
  }
  for (const key of prevPropKeys) {
    if (key === "children") {
      continue;
    }
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
});
function SceneView(_ref) {
  let {
    screen,
    route,
    navigation,
    routeState,
    getState,
    setState,
    options,
    clearOptions
  } = _ref;
  const navigatorKeyRef = React.useRef();
  const getKey = React.useCallback(() => navigatorKeyRef.current, []);
  const {
    addOptionsGetter
  } = useOptionsGetters({
    key: route.key,
    options,
    navigation
  });
  const setKey = React.useCallback((key) => {
    navigatorKeyRef.current = key;
  }, []);
  const getCurrentState = React.useCallback(() => {
    const state = getState();
    const currentRoute = state.routes.find((r) => r.key === route.key);
    return currentRoute ? currentRoute.state : void 0;
  }, [getState, route.key]);
  const setCurrentState = React.useCallback((child) => {
    const state = getState();
    setState({
      ...state,
      routes: state.routes.map((r) => r.key === route.key ? {
        ...r,
        state: child
      } : r)
    });
  }, [getState, route.key, setState]);
  const isInitialRef = React.useRef(true);
  React.useEffect(() => {
    isInitialRef.current = false;
  });
  React.useEffect(() => {
    return clearOptions;
  }, []);
  const getIsInitial = React.useCallback(() => isInitialRef.current, []);
  const context = React.useMemo(() => ({
    state: routeState,
    getState: getCurrentState,
    setState: setCurrentState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  }), [routeState, getCurrentState, setCurrentState, getKey, setKey, getIsInitial, addOptionsGetter]);
  const ScreenComponent = screen.getComponent ? screen.getComponent() : screen.component;
  return /* @__PURE__ */ React.createElement(NavigationStateContext.Provider, {
    value: context
  }, /* @__PURE__ */ React.createElement(EnsureSingleNavigator, null, /* @__PURE__ */ React.createElement(StaticContainer$1, {
    name: screen.name,
    render: ScreenComponent || screen.children,
    navigation,
    route
  }, ScreenComponent !== void 0 ? /* @__PURE__ */ React.createElement(ScreenComponent, {
    navigation,
    route
  }) : screen.children !== void 0 ? screen.children({
    navigation,
    route
  }) : null)));
}
function useNavigationCache(_ref) {
  let {
    state,
    getState,
    navigation,
    setOptions,
    router: router2,
    emitter
  } = _ref;
  const {
    stackRef
  } = React.useContext(NavigationBuilderContext);
  const cache2 = React.useMemo(
    () => ({
      current: {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getState, navigation, setOptions, router2, emitter]
  );
  const actions = {
    ...router2.actionCreators,
    ...CommonActions
  };
  cache2.current = state.routes.reduce((acc, route) => {
    const previous = cache2.current[route.key];
    if (previous) {
      acc[route.key] = previous;
    } else {
      const {
        emit,
        ...rest
      } = navigation;
      const dispatch = (thunk) => {
        const action = typeof thunk === "function" ? thunk(getState()) : thunk;
        if (action != null) {
          navigation.dispatch({
            source: route.key,
            ...action
          });
        }
      };
      const withStack = (callback) => {
        let isStackSet = false;
        try {
          if (false) ;
          callback();
        } finally {
          if (isStackSet && stackRef) {
            stackRef.current = void 0;
          }
        }
      };
      const helpers = Object.keys(actions).reduce((acc2, name) => {
        acc2[name] = function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return withStack(() => (
            // @ts-expect-error: name is a valid key, but TypeScript is dumb
            dispatch(actions[name](...args))
          ));
        };
        return acc2;
      }, {});
      acc[route.key] = {
        ...rest,
        ...helpers,
        // FIXME: too much work to fix the types for now
        ...emitter.create(route.key),
        dispatch: (thunk) => withStack(() => dispatch(thunk)),
        getParent: (id) => {
          if (id !== void 0 && id === rest.getId()) {
            return acc[route.key];
          }
          return rest.getParent(id);
        },
        setOptions: (options) => setOptions((o) => ({
          ...o,
          [route.key]: {
            ...o[route.key],
            ...options
          }
        })),
        isFocused: () => {
          const state2 = getState();
          if (state2.routes[state2.index].key !== route.key) {
            return false;
          }
          return navigation ? navigation.isFocused() : true;
        }
      };
    }
    return acc;
  }, {});
  return cache2.current;
}
function useDescriptors(_ref) {
  let {
    state,
    screens,
    navigation,
    screenOptions,
    defaultScreenOptions,
    onAction,
    getState,
    setState,
    addListener,
    addKeyedListener,
    onRouteFocus,
    router: router2,
    emitter
  } = _ref;
  const [options, setOptions] = React.useState({});
  const {
    onDispatchAction,
    onOptionsChange,
    stackRef
  } = React.useContext(NavigationBuilderContext);
  const context = React.useMemo(() => ({
    navigation,
    onAction,
    addListener,
    addKeyedListener,
    onRouteFocus,
    onDispatchAction,
    onOptionsChange,
    stackRef
  }), [navigation, onAction, addListener, addKeyedListener, onRouteFocus, onDispatchAction, onOptionsChange, stackRef]);
  const navigations = useNavigationCache({
    state,
    getState,
    navigation,
    setOptions,
    router: router2,
    emitter
  });
  const routes = useRouteCache(state.routes);
  return routes.reduce((acc, route, i) => {
    const config2 = screens[route.name];
    const screen = config2.props;
    const navigation2 = navigations[route.key];
    const optionsList = [
      // The default `screenOptions` passed to the navigator
      screenOptions,
      // The `screenOptions` props passed to `Group` elements
      ...config2.options ? config2.options.filter(Boolean) : [],
      // The `options` prop passed to `Screen` elements,
      screen.options,
      // The options set via `navigation.setOptions`
      options[route.key]
    ];
    const customOptions = optionsList.reduce((acc2, curr) => Object.assign(
      acc2,
      // @ts-expect-error: we check for function but TS still complains
      typeof curr !== "function" ? curr : curr({
        route,
        navigation: navigation2
      })
    ), {});
    const mergedOptions = {
      ...typeof defaultScreenOptions === "function" ? (
        // @ts-expect-error: ts gives incorrect error here
        defaultScreenOptions({
          route,
          navigation: navigation2,
          options: customOptions
        })
      ) : defaultScreenOptions,
      ...customOptions
    };
    const clearOptions = () => setOptions((o) => {
      if (route.key in o) {
        const {
          [route.key]: _,
          ...rest
        } = o;
        return rest;
      }
      return o;
    });
    acc[route.key] = {
      route,
      // @ts-expect-error: it's missing action helpers, fix later
      navigation: navigation2,
      render() {
        return /* @__PURE__ */ React.createElement(NavigationBuilderContext.Provider, {
          key: route.key,
          value: context
        }, /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
          value: navigation2
        }, /* @__PURE__ */ React.createElement(NavigationRouteContext.Provider, {
          value: route
        }, /* @__PURE__ */ React.createElement(SceneView, {
          navigation: navigation2,
          route,
          screen,
          routeState: state.routes[i].state,
          getState,
          setState,
          options: mergedOptions,
          clearOptions
        }))));
      },
      options: mergedOptions
    };
    return acc;
  }, {});
}
function useFocusedListenersChildrenAdapter(_ref) {
  let {
    navigation,
    focusedListeners
  } = _ref;
  const {
    addListener
  } = React.useContext(NavigationBuilderContext);
  const listener = React.useCallback((callback) => {
    if (navigation.isFocused()) {
      for (const listener2 of focusedListeners) {
        const {
          handled,
          result
        } = listener2(callback);
        if (handled) {
          return {
            handled,
            result
          };
        }
      }
      return {
        handled: true,
        result: callback(navigation)
      };
    } else {
      return {
        handled: false,
        result: null
      };
    }
  }, [focusedListeners, navigation]);
  React.useEffect(() => addListener === null || addListener === void 0 ? void 0 : addListener("focus", listener), [addListener, listener]);
}
function useFocusEvents(_ref) {
  let {
    state,
    emitter
  } = _ref;
  const navigation = React.useContext(NavigationContext);
  const lastFocusedKeyRef = React.useRef();
  const currentFocusedKey = state.routes[state.index].key;
  React.useEffect(() => navigation === null || navigation === void 0 ? void 0 : navigation.addListener("focus", () => {
    lastFocusedKeyRef.current = currentFocusedKey;
    emitter.emit({
      type: "focus",
      target: currentFocusedKey
    });
  }), [currentFocusedKey, emitter, navigation]);
  React.useEffect(() => navigation === null || navigation === void 0 ? void 0 : navigation.addListener("blur", () => {
    lastFocusedKeyRef.current = void 0;
    emitter.emit({
      type: "blur",
      target: currentFocusedKey
    });
  }), [currentFocusedKey, emitter, navigation]);
  React.useEffect(() => {
    const lastFocusedKey = lastFocusedKeyRef.current;
    lastFocusedKeyRef.current = currentFocusedKey;
    if (lastFocusedKey === void 0 && !navigation) {
      emitter.emit({
        type: "focus",
        target: currentFocusedKey
      });
    }
    if (lastFocusedKey === currentFocusedKey || !(navigation ? navigation.isFocused() : true)) {
      return;
    }
    if (lastFocusedKey === void 0) {
      return;
    }
    emitter.emit({
      type: "blur",
      target: lastFocusedKey
    });
    emitter.emit({
      type: "focus",
      target: currentFocusedKey
    });
  }, [currentFocusedKey, emitter, navigation]);
}
function useNavigationHelpers(_ref) {
  let {
    id: navigatorId,
    onAction,
    getState,
    emitter,
    router: router2
  } = _ref;
  const onUnhandledAction = React.useContext(UnhandledActionContext);
  const parentNavigationHelpers = React.useContext(NavigationContext);
  return React.useMemo(() => {
    const dispatch = (op) => {
      const action = typeof op === "function" ? op(getState()) : op;
      const handled = onAction(action);
      if (!handled) {
        onUnhandledAction === null || onUnhandledAction === void 0 ? void 0 : onUnhandledAction(action);
      }
    };
    const actions = {
      ...router2.actionCreators,
      ...CommonActions
    };
    const helpers = Object.keys(actions).reduce((acc, name) => {
      acc[name] = function() {
        return dispatch(actions[name](...arguments));
      };
      return acc;
    }, {});
    const navigationHelpers = {
      ...parentNavigationHelpers,
      ...helpers,
      dispatch,
      emit: emitter.emit,
      isFocused: parentNavigationHelpers ? parentNavigationHelpers.isFocused : () => true,
      canGoBack: () => {
        const state = getState();
        return router2.getStateForAction(state, goBack(), {
          routeNames: state.routeNames,
          routeParamList: {},
          routeGetIdList: {}
        }) !== null || (parentNavigationHelpers === null || parentNavigationHelpers === void 0 ? void 0 : parentNavigationHelpers.canGoBack()) || false;
      },
      getId: () => navigatorId,
      getParent: (id) => {
        if (id !== void 0) {
          let current = navigationHelpers;
          while (current && id !== current.getId()) {
            current = current.getParent();
          }
          return current;
        }
        return parentNavigationHelpers;
      },
      getState
    };
    return navigationHelpers;
  }, [navigatorId, emitter.emit, getState, onAction, onUnhandledAction, parentNavigationHelpers, router2]);
}
const VISITED_ROUTE_KEYS = Symbol("VISITED_ROUTE_KEYS");
const shouldPreventRemove = (emitter, beforeRemoveListeners, currentRoutes, nextRoutes, action) => {
  const nextRouteKeys = nextRoutes.map((route) => route.key);
  const removedRoutes = currentRoutes.filter((route) => !nextRouteKeys.includes(route.key)).reverse();
  const visitedRouteKeys = (
    // @ts-expect-error: add this property to mark that we've already emitted this action
    action[VISITED_ROUTE_KEYS] ?? /* @__PURE__ */ new Set()
  );
  const beforeRemoveAction = {
    ...action,
    [VISITED_ROUTE_KEYS]: visitedRouteKeys
  };
  for (const route of removedRoutes) {
    var _beforeRemoveListener;
    if (visitedRouteKeys.has(route.key)) {
      continue;
    }
    const isPrevented = (_beforeRemoveListener = beforeRemoveListeners[route.key]) === null || _beforeRemoveListener === void 0 ? void 0 : _beforeRemoveListener.call(beforeRemoveListeners, beforeRemoveAction);
    if (isPrevented) {
      return true;
    }
    visitedRouteKeys.add(route.key);
    const event = emitter.emit({
      type: "beforeRemove",
      target: route.key,
      data: {
        action: beforeRemoveAction
      },
      canPreventDefault: true
    });
    if (event.defaultPrevented) {
      return true;
    }
  }
  return false;
};
function useOnPreventRemove(_ref) {
  let {
    getState,
    emitter,
    beforeRemoveListeners
  } = _ref;
  const {
    addKeyedListener
  } = React.useContext(NavigationBuilderContext);
  const route = React.useContext(NavigationRouteContext);
  const routeKey = route === null || route === void 0 ? void 0 : route.key;
  React.useEffect(() => {
    if (routeKey) {
      return addKeyedListener === null || addKeyedListener === void 0 ? void 0 : addKeyedListener("beforeRemove", routeKey, (action) => {
        const state = getState();
        return shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, [], action);
      });
    }
  }, [addKeyedListener, beforeRemoveListeners, emitter, getState, routeKey]);
}
function useOnAction(_ref) {
  let {
    router: router2,
    getState,
    setState,
    key,
    actionListeners,
    beforeRemoveListeners,
    routerConfigOptions,
    emitter
  } = _ref;
  const {
    onAction: onActionParent,
    onRouteFocus: onRouteFocusParent,
    addListener: addListenerParent,
    onDispatchAction
  } = React.useContext(NavigationBuilderContext);
  const routerConfigOptionsRef = React.useRef(routerConfigOptions);
  React.useEffect(() => {
    routerConfigOptionsRef.current = routerConfigOptions;
  });
  const onAction = React.useCallback(function(action) {
    let visitedNavigators = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
    const state = getState();
    if (visitedNavigators.has(state.key)) {
      return false;
    }
    visitedNavigators.add(state.key);
    if (typeof action.target !== "string" || action.target === state.key) {
      let result = router2.getStateForAction(state, action, routerConfigOptionsRef.current);
      result = result === null && action.target === state.key ? state : result;
      if (result !== null) {
        onDispatchAction(action, state === result);
        if (state !== result) {
          const isPrevented = shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, result.routes, action);
          if (isPrevented) {
            return true;
          }
          setState(result);
        }
        if (onRouteFocusParent !== void 0) {
          const shouldFocus = router2.shouldActionChangeFocus(action);
          if (shouldFocus && key !== void 0) {
            onRouteFocusParent(key);
          }
        }
        return true;
      }
    }
    if (onActionParent !== void 0) {
      if (onActionParent(action, visitedNavigators)) {
        return true;
      }
    }
    for (let i = actionListeners.length - 1; i >= 0; i--) {
      const listener = actionListeners[i];
      if (listener(action, visitedNavigators)) {
        return true;
      }
    }
    return false;
  }, [actionListeners, beforeRemoveListeners, emitter, getState, key, onActionParent, onDispatchAction, onRouteFocusParent, router2, setState]);
  useOnPreventRemove({
    getState,
    emitter,
    beforeRemoveListeners
  });
  React.useEffect(() => addListenerParent === null || addListenerParent === void 0 ? void 0 : addListenerParent("action", onAction), [addListenerParent, onAction]);
  return onAction;
}
function useOnGetState(_ref) {
  let {
    getState,
    getStateListeners
  } = _ref;
  const {
    addKeyedListener
  } = React.useContext(NavigationBuilderContext);
  const route = React.useContext(NavigationRouteContext);
  const key = route ? route.key : "root";
  const getRehydratedState = React.useCallback(() => {
    const state = getState();
    const routes = state.routes.map((route2) => {
      var _getStateListeners$ro;
      const childState = (_getStateListeners$ro = getStateListeners[route2.key]) === null || _getStateListeners$ro === void 0 ? void 0 : _getStateListeners$ro.call(getStateListeners);
      if (route2.state === childState) {
        return route2;
      }
      return {
        ...route2,
        state: childState
      };
    });
    if (isArrayEqual(state.routes, routes)) {
      return state;
    }
    return {
      ...state,
      routes
    };
  }, [getState, getStateListeners]);
  React.useEffect(() => {
    return addKeyedListener === null || addKeyedListener === void 0 ? void 0 : addKeyedListener("getState", key, getRehydratedState);
  }, [addKeyedListener, getRehydratedState, key]);
}
function useOnRouteFocus(_ref) {
  let {
    router: router2,
    getState,
    key: sourceRouteKey,
    setState
  } = _ref;
  const {
    onRouteFocus: onRouteFocusParent
  } = React.useContext(NavigationBuilderContext);
  return React.useCallback((key) => {
    const state = getState();
    const result = router2.getStateForRouteFocus(state, key);
    if (result !== state) {
      setState(result);
    }
    if (onRouteFocusParent !== void 0 && sourceRouteKey !== void 0) {
      onRouteFocusParent(sourceRouteKey);
    }
  }, [getState, onRouteFocusParent, router2, setState, sourceRouteKey]);
}
function useRegisterNavigator() {
  const [key] = React.useState(() => nanoid());
  const container = React.useContext(SingleNavigatorContext);
  if (container === void 0) {
    throw new Error("Couldn't register the navigator. Have you wrapped your app with 'NavigationContainer'?\n\nThis can also happen if there are multiple copies of '@react-navigation' packages installed.");
  }
  React.useEffect(() => {
    const {
      register,
      unregister
    } = container;
    register(key);
    return () => unregister(key);
  }, [container, key]);
  return key;
}
const isValidKey = (key) => key === void 0 || typeof key === "string" && key !== "";
const getRouteConfigsFromChildren = (children, groupKey, groupOptions) => {
  const configs = React.Children.toArray(children).reduce((acc, child) => {
    var _child$type, _child$props;
    if (/* @__PURE__ */ React.isValidElement(child)) {
      if (child.type === Screen$1) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(`Got an invalid 'navigationKey' prop (${JSON.stringify(child.props.navigationKey)}) for the screen '${child.props.name}'. It must be a non-empty string or 'undefined'.`);
        }
        acc.push({
          keys: [groupKey, child.props.navigationKey],
          options: groupOptions,
          props: child.props
        });
        return acc;
      }
      if (child.type === React.Fragment || child.type === Group) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(`Got an invalid 'navigationKey' prop (${JSON.stringify(child.props.navigationKey)}) for the group. It must be a non-empty string or 'undefined'.`);
        }
        acc.push(...getRouteConfigsFromChildren(child.props.children, child.props.navigationKey, child.type !== Group ? groupOptions : groupOptions != null ? [...groupOptions, child.props.screenOptions] : [child.props.screenOptions]));
        return acc;
      }
    }
    throw new Error(`A navigator can only contain 'Screen', 'Group' or 'React.Fragment' as its direct children (found ${/* @__PURE__ */ React.isValidElement(child) ? `'${typeof child.type === "string" ? child.type : (_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.name}'${child.props != null && typeof child.props === "object" && "name" in child.props && (_child$props = child.props) !== null && _child$props !== void 0 && _child$props.name ? ` for the screen '${child.props.name}'` : ""}` : typeof child === "object" ? JSON.stringify(child) : `'${String(child)}'`}). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.`);
  }, []);
  return configs;
};
function useNavigationBuilder(createRouter, options) {
  const navigatorKey = useRegisterNavigator();
  const route = React.useContext(NavigationRouteContext);
  const {
    children,
    screenListeners,
    ...rest
  } = options;
  const {
    current: router2
  } = React.useRef(createRouter({
    ...rest,
    ...route !== null && route !== void 0 && route.params && route.params.state == null && route.params.initial !== false && typeof route.params.screen === "string" ? {
      initialRouteName: route.params.screen
    } : null
  }));
  const routeConfigs = getRouteConfigsFromChildren(children);
  const screens = routeConfigs.reduce((acc, config2) => {
    if (config2.props.name in acc) {
      throw new Error(`A navigator cannot contain multiple 'Screen' components with the same name (found duplicate screen named '${config2.props.name}')`);
    }
    acc[config2.props.name] = config2;
    return acc;
  }, {});
  const routeNames = routeConfigs.map((config2) => config2.props.name);
  const routeKeyList = routeNames.reduce((acc, curr) => {
    acc[curr] = screens[curr].keys.map((key) => key ?? "").join(":");
    return acc;
  }, {});
  const routeParamList = routeNames.reduce((acc, curr) => {
    const {
      initialParams
    } = screens[curr].props;
    acc[curr] = initialParams;
    return acc;
  }, {});
  const routeGetIdList = routeNames.reduce((acc, curr) => Object.assign(acc, {
    [curr]: screens[curr].props.getId
  }), {});
  if (!routeNames.length) {
    throw new Error("Couldn't find any screens for the navigator. Have you defined any screens as its children?");
  }
  const isStateValid = React.useCallback((state2) => state2.type === void 0 || state2.type === router2.type, [router2.type]);
  const isStateInitialized = React.useCallback((state2) => state2 !== void 0 && state2.stale === false && isStateValid(state2), [isStateValid]);
  const {
    state: currentState,
    getState: getCurrentState,
    setState: setCurrentState,
    setKey,
    getKey,
    getIsInitial
  } = React.useContext(NavigationStateContext);
  const stateCleanedUp = React.useRef(false);
  const cleanUpState = React.useCallback(() => {
    setCurrentState(void 0);
    stateCleanedUp.current = true;
  }, [setCurrentState]);
  const setState = React.useCallback((state2) => {
    if (stateCleanedUp.current) {
      return;
    }
    setCurrentState(state2);
  }, [setCurrentState]);
  const [initializedState, isFirstStateInitialization] = React.useMemo(() => {
    var _route$params4;
    const initialRouteParamList = routeNames.reduce((acc, curr) => {
      var _route$params, _route$params2, _route$params3;
      const {
        initialParams
      } = screens[curr].props;
      const initialParamsFromParams = (route === null || route === void 0 ? void 0 : (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.state) == null && (route === null || route === void 0 ? void 0 : (_route$params2 = route.params) === null || _route$params2 === void 0 ? void 0 : _route$params2.initial) !== false && (route === null || route === void 0 ? void 0 : (_route$params3 = route.params) === null || _route$params3 === void 0 ? void 0 : _route$params3.screen) === curr ? route.params.params : void 0;
      acc[curr] = initialParams !== void 0 || initialParamsFromParams !== void 0 ? {
        ...initialParams,
        ...initialParamsFromParams
      } : void 0;
      return acc;
    }, {});
    if ((currentState === void 0 || !isStateValid(currentState)) && (route === null || route === void 0 ? void 0 : (_route$params4 = route.params) === null || _route$params4 === void 0 ? void 0 : _route$params4.state) == null) {
      return [router2.getInitialState({
        routeNames,
        routeParamList: initialRouteParamList,
        routeGetIdList
      }), true];
    } else {
      var _route$params5;
      return [router2.getRehydratedState((route === null || route === void 0 ? void 0 : (_route$params5 = route.params) === null || _route$params5 === void 0 ? void 0 : _route$params5.state) ?? currentState, {
        routeNames,
        routeParamList: initialRouteParamList,
        routeGetIdList
      }), false];
    }
  }, [currentState, router2, isStateValid]);
  const previousRouteKeyListRef = React.useRef(routeKeyList);
  React.useEffect(() => {
    previousRouteKeyListRef.current = routeKeyList;
  });
  const previousRouteKeyList = previousRouteKeyListRef.current;
  let state = (
    // If the state isn't initialized, or stale, use the state we initialized instead
    // The state won't update until there's a change needed in the state we have initalized locally
    // So it'll be `undefined` or stale until the first navigation event happens
    isStateInitialized(currentState) ? currentState : initializedState
  );
  let nextState = state;
  if (!isArrayEqual(state.routeNames, routeNames) || !isRecordEqual(routeKeyList, previousRouteKeyList)) {
    nextState = router2.getStateForRouteNamesChange(state, {
      routeNames,
      routeParamList,
      routeGetIdList,
      routeKeyChanges: Object.keys(routeKeyList).filter((name) => previousRouteKeyList.hasOwnProperty(name) && routeKeyList[name] !== previousRouteKeyList[name])
    });
  }
  const previousNestedParamsRef = React.useRef(route === null || route === void 0 ? void 0 : route.params);
  React.useEffect(() => {
    previousNestedParamsRef.current = route === null || route === void 0 ? void 0 : route.params;
  }, [route === null || route === void 0 ? void 0 : route.params]);
  if (route !== null && route !== void 0 && route.params) {
    const previousParams = previousNestedParamsRef.current;
    let action;
    if (typeof route.params.state === "object" && route.params.state != null && route.params !== previousParams) {
      action = reset(route.params.state);
    } else if (typeof route.params.screen === "string" && (route.params.initial === false && isFirstStateInitialization || route.params !== previousParams)) {
      action = navigate({
        name: route.params.screen,
        params: route.params.params,
        path: route.params.path
      });
    }
    const updatedState = action ? router2.getStateForAction(nextState, action, {
      routeNames,
      routeParamList,
      routeGetIdList
    }) : null;
    nextState = updatedState !== null ? router2.getRehydratedState(updatedState, {
      routeNames,
      routeParamList,
      routeGetIdList
    }) : nextState;
  }
  const shouldUpdate = state !== nextState;
  useScheduleUpdate(() => {
    if (shouldUpdate) {
      setState(nextState);
    }
  });
  state = nextState;
  React.useEffect(() => {
    setKey(navigatorKey);
    if (!getIsInitial()) {
      setState(nextState);
    }
    return () => {
      setTimeout(() => {
        if (getCurrentState() !== void 0 && getKey() === navigatorKey) {
          cleanUpState();
        }
      }, 0);
    };
  }, []);
  const initializedStateRef = React.useRef();
  initializedStateRef.current = initializedState;
  const getState = React.useCallback(() => {
    const currentState2 = getCurrentState();
    return isStateInitialized(currentState2) ? currentState2 : initializedStateRef.current;
  }, [getCurrentState, isStateInitialized]);
  const emitter = useEventEmitter((e) => {
    let routeNames2 = [];
    let route2;
    if (e.target) {
      var _route;
      route2 = state.routes.find((route3) => route3.key === e.target);
      if ((_route = route2) !== null && _route !== void 0 && _route.name) {
        routeNames2.push(route2.name);
      }
    } else {
      route2 = state.routes[state.index];
      routeNames2.push(...Object.keys(screens).filter((name) => {
        var _route2;
        return ((_route2 = route2) === null || _route2 === void 0 ? void 0 : _route2.name) === name;
      }));
    }
    if (route2 == null) {
      return;
    }
    const navigation2 = descriptors[route2.key].navigation;
    const listeners = [].concat(
      ...[screenListeners, ...routeNames2.map((name) => {
        const {
          listeners: listeners2
        } = screens[name].props;
        return listeners2;
      })].map((listeners2) => {
        const map = typeof listeners2 === "function" ? listeners2({
          route: route2,
          navigation: navigation2
        }) : listeners2;
        return map ? Object.keys(map).filter((type) => type === e.type).map((type) => map === null || map === void 0 ? void 0 : map[type]) : void 0;
      })
    ).filter((cb, i, self) => cb && self.lastIndexOf(cb) === i);
    listeners.forEach((listener) => listener === null || listener === void 0 ? void 0 : listener(e));
  });
  useFocusEvents({
    state,
    emitter
  });
  React.useEffect(() => {
    emitter.emit({
      type: "state",
      data: {
        state
      }
    });
  }, [emitter, state]);
  const {
    listeners: childListeners,
    addListener
  } = useChildListeners();
  const {
    keyedListeners,
    addKeyedListener
  } = useKeyedChildListeners();
  const onAction = useOnAction({
    router: router2,
    getState,
    setState,
    key: route === null || route === void 0 ? void 0 : route.key,
    actionListeners: childListeners.action,
    beforeRemoveListeners: keyedListeners.beforeRemove,
    routerConfigOptions: {
      routeNames,
      routeParamList,
      routeGetIdList
    },
    emitter
  });
  const onRouteFocus = useOnRouteFocus({
    router: router2,
    key: route === null || route === void 0 ? void 0 : route.key,
    getState,
    setState
  });
  const navigation = useNavigationHelpers({
    id: options.id,
    onAction,
    getState,
    emitter,
    router: router2
  });
  useFocusedListenersChildrenAdapter({
    navigation,
    focusedListeners: childListeners.focus
  });
  useOnGetState({
    getState,
    getStateListeners: keyedListeners.getState
  });
  const descriptors = useDescriptors({
    state,
    screens,
    navigation,
    screenOptions: options.screenOptions,
    defaultScreenOptions: options.defaultScreenOptions,
    onAction,
    getState,
    setState,
    onRouteFocus,
    addListener,
    addKeyedListener,
    router: router2,
    // @ts-expect-error: this should have both core and custom events, but too much work right now
    emitter
  });
  useCurrentRender({
    state,
    navigation,
    descriptors
  });
  const NavigationContent2 = useComponent((children2) => /* @__PURE__ */ React.createElement(NavigationHelpersContext.Provider, {
    value: navigation
  }, /* @__PURE__ */ React.createElement(PreventRemoveProvider, null, children2)));
  return {
    state,
    navigation,
    descriptors,
    NavigationContent: NavigationContent2
  };
}
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t2 = arguments[e];
      for (var r in t2) ({}).hasOwnProperty.call(t2, r) && (n[r] = t2[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
var TextInputState = {
  /**
   * Internal state
   */
  _currentlyFocusedNode: null,
  /**
   * Returns the ID of the currently focused text field, if one exists
   * If no text field is focused it returns null
   */
  currentlyFocusedField() {
    if (document.activeElement !== this._currentlyFocusedNode) {
      this._currentlyFocusedNode = null;
    }
    return this._currentlyFocusedNode;
  },
  /**
   * @param {Object} TextInputID id of the text field to focus
   * Focuses the specified text field
   * noop if the text field was already focused
   */
  focusTextInput(textFieldNode) {
    if (textFieldNode !== null) {
      this._currentlyFocusedNode = textFieldNode;
      if (document.activeElement !== textFieldNode) {
        UIManager.focus(textFieldNode);
      }
    }
  },
  /**
   * @param {Object} textFieldNode id of the text field to focus
   * Unfocuses the specified text field
   * noop if it wasn't focused
   */
  blurTextInput(textFieldNode) {
    if (textFieldNode !== null) {
      this._currentlyFocusedNode = null;
      if (document.activeElement === textFieldNode) {
        UIManager.blur(textFieldNode);
      }
    }
  }
};
var dismissKeyboard = () => {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
};
var _excluded$1 = ["onScroll", "onTouchMove", "onWheel", "scrollEnabled", "scrollEventThrottle", "showsHorizontalScrollIndicator", "showsVerticalScrollIndicator", "style"];
function normalizeScrollEvent(e) {
  return {
    nativeEvent: {
      contentOffset: {
        get x() {
          return e.target.scrollLeft;
        },
        get y() {
          return e.target.scrollTop;
        }
      },
      contentSize: {
        get height() {
          return e.target.scrollHeight;
        },
        get width() {
          return e.target.scrollWidth;
        }
      },
      layoutMeasurement: {
        get height() {
          return e.target.offsetHeight;
        },
        get width() {
          return e.target.offsetWidth;
        }
      }
    },
    timeStamp: Date.now()
  };
}
function shouldEmitScrollEvent(lastTick, eventThrottle) {
  var timeSinceLastTick = Date.now() - lastTick;
  return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
}
var ScrollViewBase = /* @__PURE__ */ React.forwardRef((props, forwardedRef) => {
  var onScroll = props.onScroll, onTouchMove = props.onTouchMove, onWheel = props.onWheel, _props$scrollEnabled = props.scrollEnabled, scrollEnabled = _props$scrollEnabled === void 0 ? true : _props$scrollEnabled, _props$scrollEventThr = props.scrollEventThrottle, scrollEventThrottle = _props$scrollEventThr === void 0 ? 0 : _props$scrollEventThr, showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator, showsVerticalScrollIndicator = props.showsVerticalScrollIndicator, style = props.style, rest = _objectWithoutPropertiesLoose(props, _excluded$1);
  var scrollState = React.useRef({
    isScrolling: false,
    scrollLastTick: 0
  });
  var scrollTimeout = React.useRef(null);
  var scrollRef = React.useRef(null);
  function createPreventableScrollHandler(handler) {
    return (e) => {
      if (scrollEnabled) {
        if (handler) {
          handler(e);
        }
      }
    };
  }
  function handleScroll2(e) {
    e.stopPropagation();
    if (e.target === scrollRef.current) {
      e.persist();
      if (scrollTimeout.current != null) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        handleScrollEnd(e);
      }, 100);
      if (scrollState.current.isScrolling) {
        if (shouldEmitScrollEvent(scrollState.current.scrollLastTick, scrollEventThrottle)) {
          handleScrollTick(e);
        }
      } else {
        handleScrollStart(e);
      }
    }
  }
  function handleScrollStart(e) {
    scrollState.current.isScrolling = true;
    handleScrollTick(e);
  }
  function handleScrollTick(e) {
    scrollState.current.scrollLastTick = Date.now();
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }
  function handleScrollEnd(e) {
    scrollState.current.isScrolling = false;
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }
  var hideScrollbar = showsHorizontalScrollIndicator === false || showsVerticalScrollIndicator === false;
  return /* @__PURE__ */ React.createElement(View, _extends$1({}, rest, {
    onScroll: handleScroll2,
    onTouchMove: createPreventableScrollHandler(onTouchMove),
    onWheel: createPreventableScrollHandler(onWheel),
    ref: useMergeRefs$1(scrollRef, forwardedRef),
    style: [style, !scrollEnabled && styles$1.scrollDisabled, hideScrollbar && styles$1.hideScrollbar]
  }));
});
var styles$1 = stylesheet.create({
  scrollDisabled: {
    overflowX: "hidden",
    overflowY: "hidden",
    touchAction: "none"
  },
  hideScrollbar: {
    scrollbarWidth: "none"
  }
});
var warningExports = requireWarning();
const warning = /* @__PURE__ */ getDefaultExportFromCjs(warningExports);
var _excluded = ["contentContainerStyle", "horizontal", "onContentSizeChange", "refreshControl", "stickyHeaderIndices", "pagingEnabled", "forwardedRef", "keyboardDismissMode", "onScroll", "centerContent"];
var emptyObject = {};
var IS_ANIMATING_TOUCH_START_THRESHOLD_MS = 16;
let ScrollView$1 = class ScrollView extends React__default.Component {
  constructor() {
    super(...arguments);
    this._scrollNodeRef = null;
    this._innerViewRef = null;
    this.isTouching = false;
    this.lastMomentumScrollBeginTime = 0;
    this.lastMomentumScrollEndTime = 0;
    this.observedScrollSinceBecomingResponder = false;
    this.becameResponderWhileAnimating = false;
    this.scrollResponderHandleScrollShouldSetResponder = () => {
      return this.isTouching;
    };
    this.scrollResponderHandleStartShouldSetResponderCapture = (e) => {
      return this.scrollResponderIsAnimating();
    };
    this.scrollResponderHandleTerminationRequest = () => {
      return !this.observedScrollSinceBecomingResponder;
    };
    this.scrollResponderHandleTouchEnd = (e) => {
      var nativeEvent = e.nativeEvent;
      this.isTouching = nativeEvent.touches.length !== 0;
      this.props.onTouchEnd && this.props.onTouchEnd(e);
    };
    this.scrollResponderHandleResponderRelease = (e) => {
      this.props.onResponderRelease && this.props.onResponderRelease(e);
      var currentlyFocusedTextInput = TextInputState.currentlyFocusedField();
      if (!this.props.keyboardShouldPersistTaps && currentlyFocusedTextInput != null && e.target !== currentlyFocusedTextInput && !this.observedScrollSinceBecomingResponder && !this.becameResponderWhileAnimating) {
        this.props.onScrollResponderKeyboardDismissed && this.props.onScrollResponderKeyboardDismissed(e);
        TextInputState.blurTextInput(currentlyFocusedTextInput);
      }
    };
    this.scrollResponderHandleScroll = (e) => {
      this.observedScrollSinceBecomingResponder = true;
      this.props.onScroll && this.props.onScroll(e);
    };
    this.scrollResponderHandleResponderGrant = (e) => {
      this.observedScrollSinceBecomingResponder = false;
      this.props.onResponderGrant && this.props.onResponderGrant(e);
      this.becameResponderWhileAnimating = this.scrollResponderIsAnimating();
    };
    this.scrollResponderHandleScrollBeginDrag = (e) => {
      this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
    };
    this.scrollResponderHandleScrollEndDrag = (e) => {
      this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
    };
    this.scrollResponderHandleMomentumScrollBegin = (e) => {
      this.lastMomentumScrollBeginTime = Date.now();
      this.props.onMomentumScrollBegin && this.props.onMomentumScrollBegin(e);
    };
    this.scrollResponderHandleMomentumScrollEnd = (e) => {
      this.lastMomentumScrollEndTime = Date.now();
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
    };
    this.scrollResponderHandleTouchStart = (e) => {
      this.isTouching = true;
      this.props.onTouchStart && this.props.onTouchStart(e);
    };
    this.scrollResponderHandleTouchMove = (e) => {
      this.props.onTouchMove && this.props.onTouchMove(e);
    };
    this.scrollResponderIsAnimating = () => {
      var now = Date.now();
      var timeSinceLastMomentumScrollEnd = now - this.lastMomentumScrollEndTime;
      var isAnimating = timeSinceLastMomentumScrollEnd < IS_ANIMATING_TOUCH_START_THRESHOLD_MS || this.lastMomentumScrollEndTime < this.lastMomentumScrollBeginTime;
      return isAnimating;
    };
    this.scrollResponderScrollTo = (x, y, animated) => {
      if (typeof x === "number") {
        console.warn("`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.");
      } else {
        var _ref = x || emptyObject;
        x = _ref.x;
        y = _ref.y;
        animated = _ref.animated;
      }
      var node = this.getScrollableNode();
      var left = x || 0;
      var top = y || 0;
      if (node != null) {
        if (typeof node.scroll === "function") {
          node.scroll({
            top,
            left,
            behavior: !animated ? "auto" : "smooth"
          });
        } else {
          node.scrollLeft = left;
          node.scrollTop = top;
        }
      }
    };
    this.scrollResponderZoomTo = (rect, animated) => {
      {
        invariant("zoomToRect is not implemented");
      }
    };
    this.scrollResponderScrollNativeHandleToKeyboard = (nodeHandle, additionalOffset, preventNegativeScrollOffset) => {
      this.additionalScrollOffset = additionalOffset || 0;
      this.preventNegativeScrollOffset = !!preventNegativeScrollOffset;
      UIManager.measureLayout(nodeHandle, this.getInnerViewNode(), this.scrollResponderTextInputFocusError, this.scrollResponderInputMeasureAndScrollToKeyboard);
    };
    this.scrollResponderInputMeasureAndScrollToKeyboard = (left, top, width, height) => {
      var keyboardScreenY = Dimensions.get("window").height;
      if (this.keyboardWillOpenTo) {
        keyboardScreenY = this.keyboardWillOpenTo.endCoordinates.screenY;
      }
      var scrollOffsetY = top - keyboardScreenY + height + this.additionalScrollOffset;
      if (this.preventNegativeScrollOffset) {
        scrollOffsetY = Math.max(0, scrollOffsetY);
      }
      this.scrollResponderScrollTo({
        x: 0,
        y: scrollOffsetY,
        animated: true
      });
      this.additionalOffset = 0;
      this.preventNegativeScrollOffset = false;
    };
    this.scrollResponderKeyboardWillShow = (e) => {
      this.keyboardWillOpenTo = e;
      this.props.onKeyboardWillShow && this.props.onKeyboardWillShow(e);
    };
    this.scrollResponderKeyboardWillHide = (e) => {
      this.keyboardWillOpenTo = null;
      this.props.onKeyboardWillHide && this.props.onKeyboardWillHide(e);
    };
    this.scrollResponderKeyboardDidShow = (e) => {
      if (e) {
        this.keyboardWillOpenTo = e;
      }
      this.props.onKeyboardDidShow && this.props.onKeyboardDidShow(e);
    };
    this.scrollResponderKeyboardDidHide = (e) => {
      this.keyboardWillOpenTo = null;
      this.props.onKeyboardDidHide && this.props.onKeyboardDidHide(e);
    };
    this.flashScrollIndicators = () => {
      this.scrollResponderFlashScrollIndicators();
    };
    this.getScrollResponder = () => {
      return this;
    };
    this.getScrollableNode = () => {
      return this._scrollNodeRef;
    };
    this.getInnerViewRef = () => {
      return this._innerViewRef;
    };
    this.getInnerViewNode = () => {
      return this._innerViewRef;
    };
    this.getNativeScrollRef = () => {
      return this._scrollNodeRef;
    };
    this.scrollTo = (y, x, animated) => {
      if (typeof y === "number") {
        console.warn("`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.");
      } else {
        var _ref2 = y || emptyObject;
        x = _ref2.x;
        y = _ref2.y;
        animated = _ref2.animated;
      }
      this.scrollResponderScrollTo({
        x: x || 0,
        y: y || 0,
        animated: animated !== false
      });
    };
    this.scrollToEnd = (options) => {
      var animated = (options && options.animated) !== false;
      var horizontal = this.props.horizontal;
      var scrollResponderNode = this.getScrollableNode();
      var x = horizontal ? scrollResponderNode.scrollWidth : 0;
      var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
      this.scrollResponderScrollTo({
        x,
        y,
        animated
      });
    };
    this._handleContentOnLayout = (e) => {
      var _e$nativeEvent$layout = e.nativeEvent.layout, width = _e$nativeEvent$layout.width, height = _e$nativeEvent$layout.height;
      this.props.onContentSizeChange(width, height);
    };
    this._handleScroll = (e) => {
      if (this.props.keyboardDismissMode === "on-drag") {
        dismissKeyboard();
      }
      this.scrollResponderHandleScroll(e);
    };
    this._setInnerViewRef = (node) => {
      this._innerViewRef = node;
    };
    this._setScrollNodeRef = (node) => {
      this._scrollNodeRef = node;
      if (node != null) {
        node.getScrollResponder = this.getScrollResponder;
        node.getInnerViewNode = this.getInnerViewNode;
        node.getInnerViewRef = this.getInnerViewRef;
        node.getNativeScrollRef = this.getNativeScrollRef;
        node.getScrollableNode = this.getScrollableNode;
        node.scrollTo = this.scrollTo;
        node.scrollToEnd = this.scrollToEnd;
        node.flashScrollIndicators = this.flashScrollIndicators;
        node.scrollResponderZoomTo = this.scrollResponderZoomTo;
        node.scrollResponderScrollNativeHandleToKeyboard = this.scrollResponderScrollNativeHandleToKeyboard;
      }
      var ref = mergeRefs(this.props.forwardedRef);
      ref(node);
    };
  }
  /**
   * ------------------------------------------------------
   * START SCROLLRESPONDER
   * ------------------------------------------------------
   */
  // Reset to false every time becomes responder. This is used to:
  // - Determine if the scroll view has been scrolled and therefore should
  // refuse to give up its responder lock.
  // - Determine if releasing should dismiss the keyboard when we are in
  // tap-to-dismiss mode (!this.props.keyboardShouldPersistTaps).
  /**
   * Invoke this from an `onScroll` event.
   */
  /**
   * Merely touch starting is not sufficient for a scroll view to become the
   * responder. Being the "responder" means that the very next touch move/end
   * event will result in an action/movement.
   *
   * Invoke this from an `onStartShouldSetResponder` event.
   *
   * `onStartShouldSetResponder` is used when the next move/end will trigger
   * some UI movement/action, but when you want to yield priority to views
   * nested inside of the view.
   *
   * There may be some cases where scroll views actually should return `true`
   * from `onStartShouldSetResponder`: Any time we are detecting a standard tap
   * that gives priority to nested views.
   *
   * - If a single tap on the scroll view triggers an action such as
   *   recentering a map style view yet wants to give priority to interaction
   *   views inside (such as dropped pins or labels), then we would return true
   *   from this method when there is a single touch.
   *
   * - Similar to the previous case, if a two finger "tap" should trigger a
   *   zoom, we would check the `touches` count, and if `>= 2`, we would return
   *   true.
   *
   */
  scrollResponderHandleStartShouldSetResponder() {
    return false;
  }
  /**
   * There are times when the scroll view wants to become the responder
   * (meaning respond to the next immediate `touchStart/touchEnd`), in a way
   * that *doesn't* give priority to nested views (hence the capture phase):
   *
   * - Currently animating.
   * - Tapping anywhere that is not the focused input, while the keyboard is
   *   up (which should dismiss the keyboard).
   *
   * Invoke this from an `onStartShouldSetResponderCapture` event.
   */
  /**
   * Invoke this from an `onResponderReject` event.
   *
   * Some other element is not yielding its role as responder. Normally, we'd
   * just disable the `UIScrollView`, but a touch has already began on it, the
   * `UIScrollView` will not accept being disabled after that. The easiest
   * solution for now is to accept the limitation of disallowing this
   * altogether. To improve this, find a way to disable the `UIScrollView` after
   * a touch has already started.
   */
  scrollResponderHandleResponderReject() {
    warning(false, "ScrollView doesn't take rejection well - scrolls anyway");
  }
  /**
   * We will allow the scroll view to give up its lock iff it acquired the lock
   * during an animation. This is a very useful default that happens to satisfy
   * many common user experiences.
   *
   * - Stop a scroll on the left edge, then turn that into an outer view's
   *   backswipe.
   * - Stop a scroll mid-bounce at the top, continue pulling to have the outer
   *   view dismiss.
   * - However, without catching the scroll view mid-bounce (while it is
   *   motionless), if you drag far enough for the scroll view to become
   *   responder (and therefore drag the scroll view a bit), any backswipe
   *   navigation of a swipe gesture higher in the view hierarchy, should be
   *   rejected.
   */
  /**
   * Invoke this from an `onTouchEnd` event.
   *
   * @param {SyntheticEvent} e Event.
   */
  /**
   * Invoke this from an `onResponderRelease` event.
   */
  /**
   * Invoke this from an `onResponderGrant` event.
   */
  /**
   * Unfortunately, `onScrollBeginDrag` also fires when *stopping* the scroll
   * animation, and there's not an easy way to distinguish a drag vs. stopping
   * momentum.
   *
   * Invoke this from an `onScrollBeginDrag` event.
   */
  /**
   * Invoke this from an `onScrollEndDrag` event.
   */
  /**
   * Invoke this from an `onMomentumScrollBegin` event.
   */
  /**
   * Invoke this from an `onMomentumScrollEnd` event.
   */
  /**
   * Invoke this from an `onTouchStart` event.
   *
   * Since we know that the `SimpleEventPlugin` occurs later in the plugin
   * order, after `ResponderEventPlugin`, we can detect that we were *not*
   * permitted to be the responder (presumably because a contained view became
   * responder). The `onResponderReject` won't fire in that case - it only
   * fires when a *current* responder rejects our request.
   *
   * @param {SyntheticEvent} e Touch Start event.
   */
  /**
   * Invoke this from an `onTouchMove` event.
   *
   * Since we know that the `SimpleEventPlugin` occurs later in the plugin
   * order, after `ResponderEventPlugin`, we can detect that we were *not*
   * permitted to be the responder (presumably because a contained view became
   * responder). The `onResponderReject` won't fire in that case - it only
   * fires when a *current* responder rejects our request.
   *
   * @param {SyntheticEvent} e Touch Start event.
   */
  /**
   * A helper function for this class that lets us quickly determine if the
   * view is currently animating. This is particularly useful to know when
   * a touch has just started or ended.
   */
  /**
   * A helper function to scroll to a specific point in the scrollview.
   * This is currently used to help focus on child textviews, but can also
   * be used to quickly scroll to any element we want to focus. Syntax:
   *
   * scrollResponderScrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  /**
   * A helper function to zoom to a specific rect in the scrollview. The argument has the shape
   * {x: number; y: number; width: number; height: number; animated: boolean = true}
   *
   * @platform ios
   */
  /**
   * Displays the scroll indicators momentarily.
   */
  scrollResponderFlashScrollIndicators() {
  }
  /**
   * This method should be used as the callback to onFocus in a TextInputs'
   * parent view. Note that any module using this mixin needs to return
   * the parent view's ref in getScrollViewRef() in order to use this method.
   * @param {any} nodeHandle The TextInput node handle
   * @param {number} additionalOffset The scroll view's top "contentInset".
   *        Default is 0.
   * @param {bool} preventNegativeScrolling Whether to allow pulling the content
   *        down to make it meet the keyboard's top. Default is false.
   */
  /**
   * The calculations performed here assume the scroll view takes up the entire
   * screen - even if has some content inset. We then measure the offsets of the
   * keyboard, and compensate both for the scroll view's "contentInset".
   *
   * @param {number} left Position of input w.r.t. table view.
   * @param {number} top Position of input w.r.t. table view.
   * @param {number} width Width of the text input.
   * @param {number} height Height of the text input.
   */
  scrollResponderTextInputFocusError(e) {
    console.error("Error measuring text field: ", e);
  }
  /**
   * Warning, this may be called several times for a single keyboard opening.
   * It's best to store the information in this method and then take any action
   * at a later point (either in `keyboardDidShow` or other).
   *
   * Here's the order that events occur in:
   * - focus
   * - willShow {startCoordinates, endCoordinates} several times
   * - didShow several times
   * - blur
   * - willHide {startCoordinates, endCoordinates} several times
   * - didHide several times
   *
   * The `ScrollResponder` providesModule callbacks for each of these events.
   * Even though any user could have easily listened to keyboard events
   * themselves, using these `props` callbacks ensures that ordering of events
   * is consistent - and not dependent on the order that the keyboard events are
   * subscribed to. This matters when telling the scroll view to scroll to where
   * the keyboard is headed - the scroll responder better have been notified of
   * the keyboard destination before being instructed to scroll to where the
   * keyboard will be. Stick to the `ScrollResponder` callbacks, and everything
   * will work.
   *
   * WARNING: These callbacks will fire even if a keyboard is displayed in a
   * different navigation pane. Filter out the events to determine if they are
   * relevant to you. (For example, only if you receive these callbacks after
   * you had explicitly focused a node etc).
   */
  /**
   * ------------------------------------------------------
   * END SCROLLRESPONDER
   * ------------------------------------------------------
   */
  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   * Syntax:
   *
   * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
  render() {
    var _this$props = this.props, contentContainerStyle = _this$props.contentContainerStyle, horizontal = _this$props.horizontal, onContentSizeChange = _this$props.onContentSizeChange, refreshControl = _this$props.refreshControl, stickyHeaderIndices = _this$props.stickyHeaderIndices, pagingEnabled = _this$props.pagingEnabled;
    _this$props.forwardedRef;
    _this$props.keyboardDismissMode;
    _this$props.onScroll;
    var centerContent = _this$props.centerContent, other = _objectWithoutPropertiesLoose(_this$props, _excluded);
    var contentSizeChangeProps = {};
    if (onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout
      };
    }
    var hasStickyHeaderIndices = !horizontal && Array.isArray(stickyHeaderIndices);
    var children = hasStickyHeaderIndices || pagingEnabled ? React__default.Children.map(this.props.children, (child, i) => {
      var isSticky = hasStickyHeaderIndices && stickyHeaderIndices.indexOf(i) > -1;
      if (child != null && (isSticky || pagingEnabled)) {
        return /* @__PURE__ */ React__default.createElement(View, {
          style: [isSticky && styles.stickyHeader, pagingEnabled && styles.pagingEnabledChild]
        }, child);
      } else {
        return child;
      }
    }) : this.props.children;
    var contentContainer = /* @__PURE__ */ React__default.createElement(View, _extends$1({}, contentSizeChangeProps, {
      children,
      collapsable: false,
      ref: this._setInnerViewRef,
      style: [horizontal && styles.contentContainerHorizontal, centerContent && styles.contentContainerCenterContent, contentContainerStyle]
    }));
    var baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;
    var pagingEnabledStyle = horizontal ? styles.pagingEnabledHorizontal : styles.pagingEnabledVertical;
    var props = _objectSpread2(_objectSpread2({}, other), {}, {
      style: [baseStyle, pagingEnabled && pagingEnabledStyle, this.props.style],
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject
    });
    var ScrollViewClass = ScrollViewBase;
    invariant(ScrollViewClass !== void 0, "ScrollViewClass must not be undefined");
    var scrollView = /* @__PURE__ */ React__default.createElement(ScrollViewClass, _extends$1({}, props, {
      ref: this._setScrollNodeRef
    }), contentContainer);
    if (refreshControl) {
      return /* @__PURE__ */ React__default.cloneElement(refreshControl, {
        style: props.style
      }, scrollView);
    }
    return scrollView;
  }
};
var commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: "translateZ(0)",
  // iOS native scrolling
  WebkitOverflowScrolling: "touch"
};
var styles = stylesheet.create({
  baseVertical: _objectSpread2(_objectSpread2({}, commonStyle), {}, {
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "auto"
  }),
  baseHorizontal: _objectSpread2(_objectSpread2({}, commonStyle), {}, {
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden"
  }),
  contentContainerHorizontal: {
    flexDirection: "row"
  },
  contentContainerCenterContent: {
    justifyContent: "center",
    flexGrow: 1
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  pagingEnabledHorizontal: {
    scrollSnapType: "x mandatory"
  },
  pagingEnabledVertical: {
    scrollSnapType: "y mandatory"
  },
  pagingEnabledChild: {
    scrollSnapAlign: "start"
  }
});
var ForwardedScrollView = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ React__default.createElement(ScrollView$1, _extends$1({}, props, {
    forwardedRef
  }));
});
ForwardedScrollView.displayName = "ScrollView";
class TaskQueue {
  constructor(_ref) {
    var onMoreTasks = _ref.onMoreTasks;
    this._onMoreTasks = onMoreTasks;
    this._queueStack = [{
      tasks: [],
      popable: true
    }];
  }
  enqueue(task) {
    this._getCurrentQueue().push(task);
  }
  enqueueTasks(tasks) {
    tasks.forEach((task) => this.enqueue(task));
  }
  cancelTasks(tasksToCancel) {
    this._queueStack = this._queueStack.map((queue) => _objectSpread2(_objectSpread2({}, queue), {}, {
      tasks: queue.tasks.filter((task) => tasksToCancel.indexOf(task) === -1)
    })).filter((queue, idx) => queue.tasks.length > 0 || idx === 0);
  }
  hasTasksToProcess() {
    return this._getCurrentQueue().length > 0;
  }
  /**
   * Executes the next task in the queue.
   */
  processNext() {
    var queue = this._getCurrentQueue();
    if (queue.length) {
      var task = queue.shift();
      try {
        if (typeof task === "object" && task.gen) {
          this._genPromise(task);
        } else if (typeof task === "object" && task.run) {
          task.run();
        } else {
          invariant(typeof task === "function", "Expected Function, SimpleTask, or PromiseTask, but got:\n" + JSON.stringify(task, null, 2));
          task();
        }
      } catch (e) {
        e.message = "TaskQueue: Error with task " + (task.name || "") + ": " + e.message;
        throw e;
      }
    }
  }
  _getCurrentQueue() {
    var stackIdx = this._queueStack.length - 1;
    var queue = this._queueStack[stackIdx];
    if (queue.popable && queue.tasks.length === 0 && stackIdx > 0) {
      this._queueStack.pop();
      return this._getCurrentQueue();
    } else {
      return queue.tasks;
    }
  }
  _genPromise(task) {
    var length = this._queueStack.push({
      tasks: [],
      popable: false
    });
    var stackIdx = length - 1;
    var stackItem = this._queueStack[stackIdx];
    task.gen().then(() => {
      stackItem.popable = true;
      this.hasTasksToProcess() && this._onMoreTasks();
    }).catch((ex) => {
      setTimeout(() => {
        ex.message = "TaskQueue: Error resolving Promise in task " + task.name + ": " + ex.message;
        throw ex;
      }, 0);
    });
  }
}
class EventEmitter {
  constructor() {
    this._registry = {};
  }
  /**
   * Registers a listener that is called when the supplied event is emitted.
   * Returns a subscription that has a `remove` method to undo registration.
   */
  addListener(eventType, listener, context) {
    var registrations = allocate(this._registry, eventType);
    var registration = {
      context,
      listener,
      remove() {
        registrations.delete(registration);
      }
    };
    registrations.add(registration);
    return registration;
  }
  /**
   * Emits the supplied event. Additional arguments supplied to `emit` will be
   * passed through to each of the registered listeners.
   *
   * If a listener modifies the listeners registered for the same event, those
   * changes will not be reflected in the current invocation of `emit`.
   */
  emit(eventType) {
    var registrations = this._registry[eventType];
    if (registrations != null) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      for (var _i = 0, _arr = [...registrations]; _i < _arr.length; _i++) {
        var registration = _arr[_i];
        registration.listener.apply(registration.context, args);
      }
    }
  }
  /**
   * Removes all registered listeners.
   */
  removeAllListeners(eventType) {
    if (eventType == null) {
      this._registry = {};
    } else {
      delete this._registry[eventType];
    }
  }
  /**
   * Returns the number of registered listeners for the supplied event.
   */
  listenerCount(eventType) {
    var registrations = this._registry[eventType];
    return registrations == null ? 0 : registrations.size;
  }
}
function allocate(registry, eventType) {
  var registrations = registry[eventType];
  if (registrations == null) {
    registrations = /* @__PURE__ */ new Set();
    registry[eventType] = registrations;
  }
  return registrations;
}
var _requestIdleCallback = function _requestIdleCallback2(cb, options) {
  return setTimeout(() => {
    var start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};
var isSupported = canUseDOM && typeof window.requestIdleCallback !== "undefined";
var requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
var _emitter = new EventEmitter();
var InteractionManager = {
  Events: {
    interactionStart: "interactionStart",
    interactionComplete: "interactionComplete"
  },
  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task) {
    var tasks = [];
    var promise = new Promise((resolve) => {
      _scheduleUpdate();
      if (task) {
        tasks.push(task);
      }
      tasks.push({
        run: resolve,
        name: "resolve " + (task && task.name || "?")
      });
      _taskQueue.enqueueTasks(tasks);
    });
    return {
      then: promise.then.bind(promise),
      done: promise.then.bind(promise),
      cancel: () => {
        _taskQueue.cancelTasks(tasks);
      }
    };
  },
  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle() {
    _scheduleUpdate();
    var handle = ++_inc;
    _addInteractionSet.add(handle);
    return handle;
  },
  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle) {
    invariant(!!handle, "Must provide a handle to clear.");
    _scheduleUpdate();
    _addInteractionSet.delete(handle);
    _deleteInteractionSet.add(handle);
  },
  addListener: _emitter.addListener.bind(_emitter),
  /**
   *
   * @param deadline
   */
  setDeadline(deadline) {
    _deadline = deadline;
  }
};
var _interactionSet = /* @__PURE__ */ new Set();
var _addInteractionSet = /* @__PURE__ */ new Set();
var _deleteInteractionSet = /* @__PURE__ */ new Set();
var _taskQueue = new TaskQueue({
  onMoreTasks: _scheduleUpdate
});
var _nextUpdateHandle = 0;
var _inc = 0;
var _deadline = -1;
function _scheduleUpdate() {
  if (!_nextUpdateHandle) {
    if (_deadline > 0) {
      _nextUpdateHandle = setTimeout(_processUpdate);
    } else {
      _nextUpdateHandle = requestIdleCallback(_processUpdate);
    }
  }
}
function _processUpdate() {
  _nextUpdateHandle = 0;
  var interactionCount = _interactionSet.size;
  _addInteractionSet.forEach((handle) => _interactionSet.add(handle));
  _deleteInteractionSet.forEach((handle) => _interactionSet.delete(handle));
  var nextInteractionCount = _interactionSet.size;
  if (interactionCount !== 0 && nextInteractionCount === 0) {
    _emitter.emit(InteractionManager.Events.interactionComplete);
  } else if (interactionCount === 0 && nextInteractionCount !== 0) {
    _emitter.emit(InteractionManager.Events.interactionStart);
  }
  if (nextInteractionCount === 0) {
    var begin = Date.now();
    while (_taskQueue.hasTasksToProcess()) {
      _taskQueue.processNext();
      if (_deadline > 0 && Date.now() - begin >= _deadline) {
        _scheduleUpdate();
        break;
      }
    }
  }
  _addInteractionSet.clear();
  _deleteInteractionSet.clear();
}
var TouchHistoryMath = {
  /**
   * This code is optimized and not intended to look beautiful. This allows
   * computing of touch centroids that have moved after `touchesChangedAfter`
   * timeStamp. You can compute the current centroid involving all touches
   * moves after `touchesChangedAfter`, or you can compute the previous
   * centroid of all touches that were moved after `touchesChangedAfter`.
   *
   * @param {TouchHistoryMath} touchHistory Standard Responder touch track
   * data.
   * @param {number} touchesChangedAfter timeStamp after which moved touches
   * are considered "actively moving" - not just "active".
   * @param {boolean} isXAxis Consider `x` dimension vs. `y` dimension.
   * @param {boolean} ofCurrent Compute current centroid for actively moving
   * touches vs. previous centroid of now actively moving touches.
   * @return {number} value of centroid in specified dimension.
   */
  centroidDimension: function centroidDimension(touchHistory, touchesChangedAfter, isXAxis, ofCurrent) {
    var touchBank = touchHistory.touchBank;
    var total = 0;
    var count2 = 0;
    var oneTouchData = touchHistory.numberActiveTouches === 1 ? touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch] : null;
    if (oneTouchData !== null) {
      if (oneTouchData.touchActive && oneTouchData.currentTimeStamp > touchesChangedAfter) {
        total += ofCurrent && isXAxis ? oneTouchData.currentPageX : ofCurrent && !isXAxis ? oneTouchData.currentPageY : !ofCurrent && isXAxis ? oneTouchData.previousPageX : oneTouchData.previousPageY;
        count2 = 1;
      }
    } else {
      for (var i = 0; i < touchBank.length; i++) {
        var touchTrack = touchBank[i];
        if (touchTrack !== null && touchTrack !== void 0 && touchTrack.touchActive && touchTrack.currentTimeStamp >= touchesChangedAfter) {
          var toAdd = void 0;
          if (ofCurrent && isXAxis) {
            toAdd = touchTrack.currentPageX;
          } else if (ofCurrent && !isXAxis) {
            toAdd = touchTrack.currentPageY;
          } else if (!ofCurrent && isXAxis) {
            toAdd = touchTrack.previousPageX;
          } else {
            toAdd = touchTrack.previousPageY;
          }
          total += toAdd;
          count2++;
        }
      }
    }
    return count2 > 0 ? total / count2 : TouchHistoryMath.noCentroid;
  },
  currentCentroidXOfTouchesChangedAfter: function currentCentroidXOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(
      touchHistory,
      touchesChangedAfter,
      true,
      // isXAxis
      true
      // ofCurrent
    );
  },
  currentCentroidYOfTouchesChangedAfter: function currentCentroidYOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(
      touchHistory,
      touchesChangedAfter,
      false,
      // isXAxis
      true
      // ofCurrent
    );
  },
  previousCentroidXOfTouchesChangedAfter: function previousCentroidXOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(
      touchHistory,
      touchesChangedAfter,
      true,
      // isXAxis
      false
      // ofCurrent
    );
  },
  previousCentroidYOfTouchesChangedAfter: function previousCentroidYOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(
      touchHistory,
      touchesChangedAfter,
      false,
      // isXAxis
      false
      // ofCurrent
    );
  },
  currentCentroidX: function currentCentroidX(touchHistory) {
    return TouchHistoryMath.centroidDimension(
      touchHistory,
      0,
      // touchesChangedAfter
      true,
      // isXAxis
      true
      // ofCurrent
    );
  },
  currentCentroidY: function currentCentroidY(touchHistory) {
    return TouchHistoryMath.centroidDimension(
      touchHistory,
      0,
      // touchesChangedAfter
      false,
      // isXAxis
      true
      // ofCurrent
    );
  },
  noCentroid: -1
};
var currentCentroidXOfTouchesChangedAfter2 = TouchHistoryMath.currentCentroidXOfTouchesChangedAfter;
var currentCentroidYOfTouchesChangedAfter2 = TouchHistoryMath.currentCentroidYOfTouchesChangedAfter;
var previousCentroidXOfTouchesChangedAfter2 = TouchHistoryMath.previousCentroidXOfTouchesChangedAfter;
var previousCentroidYOfTouchesChangedAfter2 = TouchHistoryMath.previousCentroidYOfTouchesChangedAfter;
var currentCentroidX2 = TouchHistoryMath.currentCentroidX;
var currentCentroidY2 = TouchHistoryMath.currentCentroidY;
var PanResponder = {
  /**
   *
   * A graphical explanation of the touch data flow:
   *
   * +----------------------------+             +--------------------------------+
   * | ResponderTouchHistoryStore |             |TouchHistoryMath                |
   * +----------------------------+             +----------+---------------------+
   * |Global store of touchHistory|             |Allocation-less math util       |
   * |including activeness, start |             |on touch history (centroids     |
   * |position, prev/cur position.|             |and multitouch movement etc)    |
   * |                            |             |                                |
   * +----^-----------------------+             +----^---------------------------+
   *      |                                          |
   *      | (records relevant history                |
   *      |  of touches relevant for                 |
   *      |  implementing higher level               |
   *      |  gestures)                               |
   *      |                                          |
   * +----+-----------------------+             +----|---------------------------+
   * | ResponderEventPlugin       |             |    |   Your App/Component      |
   * +----------------------------+             +----|---------------------------+
   * |Negotiates which view gets  | Low level   |    |             High level    |
   * |onResponderMove events.     | events w/   |  +-+-------+     events w/     |
   * |Also records history into   | touchHistory|  |   Pan   |     multitouch +  |
   * |ResponderTouchHistoryStore. +---------------->Responder+-----> accumulative|
   * +----------------------------+ attached to |  |         |     distance and  |
   *                                 each event |  +---------+     velocity.     |
   *                                            |                                |
   *                                            |                                |
   *                                            +--------------------------------+
   *
   *
   *
   * Gesture that calculates cumulative movement over time in a way that just
   * "does the right thing" for multiple touches. The "right thing" is very
   * nuanced. When moving two touches in opposite directions, the cumulative
   * distance is zero in each dimension. When two touches move in parallel five
   * pixels in the same direction, the cumulative distance is five, not ten. If
   * two touches start, one moves five in a direction, then stops and the other
   * touch moves fives in the same direction, the cumulative distance is ten.
   *
   * This logic requires a kind of processing of time "clusters" of touch events
   * so that two touch moves that essentially occur in parallel but move every
   * other frame respectively, are considered part of the same movement.
   *
   * Explanation of some of the non-obvious fields:
   *
   * - moveX/moveY: If no move event has been observed, then `(moveX, moveY)` is
   *   invalid. If a move event has been observed, `(moveX, moveY)` is the
   *   centroid of the most recently moved "cluster" of active touches.
   *   (Currently all move have the same timeStamp, but later we should add some
   *   threshold for what is considered to be "moving"). If a palm is
   *   accidentally counted as a touch, but a finger is moving greatly, the palm
   *   will move slightly, but we only want to count the single moving touch.
   * - x0/y0: Centroid location (non-cumulative) at the time of becoming
   *   responder.
   * - dx/dy: Cumulative touch distance - not the same thing as sum of each touch
   *   distance. Accounts for touch moves that are clustered together in time,
   *   moving the same direction. Only valid when currently responder (otherwise,
   *   it only represents the drag distance below the threshold).
   * - vx/vy: Velocity.
   */
  _initializeGestureState(gestureState) {
    gestureState.moveX = 0;
    gestureState.moveY = 0;
    gestureState.x0 = 0;
    gestureState.y0 = 0;
    gestureState.dx = 0;
    gestureState.dy = 0;
    gestureState.vx = 0;
    gestureState.vy = 0;
    gestureState.numberActiveTouches = 0;
    gestureState._accountsForMovesUpTo = 0;
  },
  /**
   * This is nuanced and is necessary. It is incorrect to continuously take all
   * active *and* recently moved touches, find the centroid, and track how that
   * result changes over time. Instead, we must take all recently moved
   * touches, and calculate how the centroid has changed just for those
   * recently moved touches, and append that change to an accumulator. This is
   * to (at least) handle the case where the user is moving three fingers, and
   * then one of the fingers stops but the other two continue.
   *
   * This is very different than taking all of the recently moved touches and
   * storing their centroid as `dx/dy`. For correctness, we must *accumulate
   * changes* in the centroid of recently moved touches.
   *
   * There is also some nuance with how we handle multiple moved touches in a
   * single event. With the way `ReactNativeEventEmitter` dispatches touches as
   * individual events, multiple touches generate two 'move' events, each of
   * them triggering `onResponderMove`. But with the way `PanResponder` works,
   * all of the gesture inference is performed on the first dispatch, since it
   * looks at all of the touches (even the ones for which there hasn't been a
   * native dispatch yet). Therefore, `PanResponder` does not call
   * `onResponderMove` passed the first dispatch. This diverges from the
   * typical responder callback pattern (without using `PanResponder`), but
   * avoids more dispatches than necessary.
   */
  _updateGestureStateOnMove(gestureState, touchHistory) {
    gestureState.numberActiveTouches = touchHistory.numberActiveTouches;
    gestureState.moveX = currentCentroidXOfTouchesChangedAfter2(touchHistory, gestureState._accountsForMovesUpTo);
    gestureState.moveY = currentCentroidYOfTouchesChangedAfter2(touchHistory, gestureState._accountsForMovesUpTo);
    var movedAfter = gestureState._accountsForMovesUpTo;
    var prevX = previousCentroidXOfTouchesChangedAfter2(touchHistory, movedAfter);
    var x = currentCentroidXOfTouchesChangedAfter2(touchHistory, movedAfter);
    var prevY = previousCentroidYOfTouchesChangedAfter2(touchHistory, movedAfter);
    var y = currentCentroidYOfTouchesChangedAfter2(touchHistory, movedAfter);
    var nextDX = gestureState.dx + (x - prevX);
    var nextDY = gestureState.dy + (y - prevY);
    var dt = touchHistory.mostRecentTimeStamp - gestureState._accountsForMovesUpTo;
    gestureState.vx = (nextDX - gestureState.dx) / dt;
    gestureState.vy = (nextDY - gestureState.dy) / dt;
    gestureState.dx = nextDX;
    gestureState.dy = nextDY;
    gestureState._accountsForMovesUpTo = touchHistory.mostRecentTimeStamp;
  },
  /**
   * @param {object} config Enhanced versions of all of the responder callbacks
   * that provide not only the typical `ResponderSyntheticEvent`, but also the
   * `PanResponder` gesture state.  Simply replace the word `Responder` with
   * `PanResponder` in each of the typical `onResponder*` callbacks. For
   * example, the `config` object would look like:
   *
   *  - `onMoveShouldSetPanResponder: (e, gestureState) => {...}`
   *  - `onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}`
   *  - `onStartShouldSetPanResponder: (e, gestureState) => {...}`
   *  - `onStartShouldSetPanResponderCapture: (e, gestureState) => {...}`
   *  - `onPanResponderReject: (e, gestureState) => {...}`
   *  - `onPanResponderGrant: (e, gestureState) => {...}`
   *  - `onPanResponderStart: (e, gestureState) => {...}`
   *  - `onPanResponderEnd: (e, gestureState) => {...}`
   *  - `onPanResponderRelease: (e, gestureState) => {...}`
   *  - `onPanResponderMove: (e, gestureState) => {...}`
   *  - `onPanResponderTerminate: (e, gestureState) => {...}`
   *  - `onPanResponderTerminationRequest: (e, gestureState) => {...}`
   *  - `onShouldBlockNativeResponder: (e, gestureState) => {...}`
   *
   *  In general, for events that have capture equivalents, we update the
   *  gestureState once in the capture phase and can use it in the bubble phase
   *  as well.
   *
   *  Be careful with onStartShould* callbacks. They only reflect updated
   *  `gestureState` for start/end events that bubble/capture to the Node.
   *  Once the node is the responder, you can rely on every start/end event
   *  being processed by the gesture and `gestureState` being updated
   *  accordingly. (numberActiveTouches) may not be totally accurate unless you
   *  are the responder.
   */
  create(config2) {
    var interactionState = {
      handle: null,
      shouldCancelClick: false,
      timeout: null
    };
    var gestureState = {
      // Useful for debugging
      stateID: Math.random(),
      moveX: 0,
      moveY: 0,
      x0: 0,
      y0: 0,
      dx: 0,
      dy: 0,
      vx: 0,
      vy: 0,
      numberActiveTouches: 0,
      _accountsForMovesUpTo: 0
    };
    var panHandlers = {
      onStartShouldSetResponder(event) {
        return config2.onStartShouldSetPanResponder == null ? false : config2.onStartShouldSetPanResponder(event, gestureState);
      },
      onMoveShouldSetResponder(event) {
        return config2.onMoveShouldSetPanResponder == null ? false : config2.onMoveShouldSetPanResponder(event, gestureState);
      },
      onStartShouldSetResponderCapture(event) {
        if (event.nativeEvent.touches.length === 1) {
          PanResponder._initializeGestureState(gestureState);
        }
        gestureState.numberActiveTouches = event.touchHistory.numberActiveTouches;
        return config2.onStartShouldSetPanResponderCapture != null ? config2.onStartShouldSetPanResponderCapture(event, gestureState) : false;
      },
      onMoveShouldSetResponderCapture(event) {
        var touchHistory = event.touchHistory;
        if (gestureState._accountsForMovesUpTo === touchHistory.mostRecentTimeStamp) {
          return false;
        }
        PanResponder._updateGestureStateOnMove(gestureState, touchHistory);
        return config2.onMoveShouldSetPanResponderCapture ? config2.onMoveShouldSetPanResponderCapture(event, gestureState) : false;
      },
      onResponderGrant(event) {
        if (!interactionState.handle) {
          interactionState.handle = InteractionManager.createInteractionHandle();
        }
        if (interactionState.timeout) {
          clearInteractionTimeout(interactionState);
        }
        interactionState.shouldCancelClick = true;
        gestureState.x0 = currentCentroidX2(event.touchHistory);
        gestureState.y0 = currentCentroidY2(event.touchHistory);
        gestureState.dx = 0;
        gestureState.dy = 0;
        if (config2.onPanResponderGrant) {
          config2.onPanResponderGrant(event, gestureState);
        }
        return config2.onShouldBlockNativeResponder == null ? true : config2.onShouldBlockNativeResponder(event, gestureState);
      },
      onResponderReject(event) {
        clearInteractionHandle(interactionState, config2.onPanResponderReject, event, gestureState);
      },
      onResponderRelease(event) {
        clearInteractionHandle(interactionState, config2.onPanResponderRelease, event, gestureState);
        setInteractionTimeout(interactionState);
        PanResponder._initializeGestureState(gestureState);
      },
      onResponderStart(event) {
        var touchHistory = event.touchHistory;
        gestureState.numberActiveTouches = touchHistory.numberActiveTouches;
        if (config2.onPanResponderStart) {
          config2.onPanResponderStart(event, gestureState);
        }
      },
      onResponderMove(event) {
        var touchHistory = event.touchHistory;
        if (gestureState._accountsForMovesUpTo === touchHistory.mostRecentTimeStamp) {
          return;
        }
        PanResponder._updateGestureStateOnMove(gestureState, touchHistory);
        if (config2.onPanResponderMove) {
          config2.onPanResponderMove(event, gestureState);
        }
      },
      onResponderEnd(event) {
        var touchHistory = event.touchHistory;
        gestureState.numberActiveTouches = touchHistory.numberActiveTouches;
        clearInteractionHandle(interactionState, config2.onPanResponderEnd, event, gestureState);
      },
      onResponderTerminate(event) {
        clearInteractionHandle(interactionState, config2.onPanResponderTerminate, event, gestureState);
        setInteractionTimeout(interactionState);
        PanResponder._initializeGestureState(gestureState);
      },
      onResponderTerminationRequest(event) {
        return config2.onPanResponderTerminationRequest == null ? true : config2.onPanResponderTerminationRequest(event, gestureState);
      },
      // We do not want to trigger 'click' activated gestures or native behaviors
      // on any pan target that is under a mouse cursor when it is released.
      // Browsers will natively cancel 'click' events on a target if a non-mouse
      // active pointer moves.
      onClickCapture: (event) => {
        if (interactionState.shouldCancelClick === true) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    };
    return {
      panHandlers,
      getInteractionHandle() {
        return interactionState.handle;
      }
    };
  }
};
function clearInteractionHandle(interactionState, callback, event, gestureState) {
  if (interactionState.handle) {
    InteractionManager.clearInteractionHandle(interactionState.handle);
    interactionState.handle = null;
  }
  if (callback) {
    callback(event, gestureState);
  }
}
function clearInteractionTimeout(interactionState) {
  clearTimeout(interactionState.timeout);
}
function setInteractionTimeout(interactionState) {
  interactionState.timeout = setTimeout(() => {
    interactionState.shouldCancelClick = false;
  }, 250);
}
const router = {
  navigate: navigate$1,
  push,
  dismiss,
  dismissAll,
  canDismiss,
  replace,
  back: goBack$1,
  canGoBack,
  setParams: (params) => setParams(params),
  subscribe: subscribeToRootState,
  onLoadState: subscribeToLoadingState
};
function useNavigation(parent) {
  const navigation = useNavigation$1(), contextKey = useContextKey(), normalizedParent = React__default.useMemo(() => {
    if (!parent) return null;
    const normalized = getNameFromFilePath(parent);
    return parent.startsWith(".") ? relativePaths(contextKey, parent) : normalized;
  }, [contextKey, parent]);
  if (normalizedParent != null) {
    const parentNavigation = navigation.getParent(normalizedParent);
    if (!parentNavigation) throw new Error(`Could not find parent navigation with route "${parent}".` + (normalizedParent !== parent ? ` (normalized: ${normalizedParent})` : ""));
    return parentNavigation;
  }
  return navigation;
}
function relativePaths(from, to) {
  const fromParts = from.split("/").filter(Boolean), toParts = to.split("/").filter(Boolean);
  for (const part of toParts) if (part === "..") {
    if (fromParts.length === 0) throw new Error(`Cannot resolve path "${to}" relative to "${from}"`);
    fromParts.pop();
  } else part === "." || fromParts.push(part);
  return "/" + fromParts.join("/");
}
function Screen({
  name,
  options
}) {
  const navigation = useNavigation(name);
  return useIsomorphicLayoutEffect$1(() => {
    options && // React Navigation will infinitely loop in some cases if an empty object is passed to setOptions.
    // https://github.com/expo/router/issues/452
    Object.keys(options).length && navigation.setOptions(options);
  }, [navigation, options]), null;
}
function useFilterScreenChildren(children, {
  isCustomNavigator,
  contextKey
} = {}) {
  return React__default.useMemo(() => {
    const customChildren = [], screens = React__default.Children.map(children, (child) => {
      if (React__default.isValidElement(child) && child && child.type === Screen) {
        if (!child.props.name) throw new Error(`<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must have a \`name\` prop when used as a child of a Layout Route.`);
        return child.props;
      }
      isCustomNavigator ? customChildren.push(child) : console.warn(`Layout children must be of type Screen, all other children are ignored. To use custom children, create a custom <Layout />. Update Layout Route at: "app${contextKey}/_layout"`);
    });
    return {
      screens,
      children: customChildren
    };
  }, [children, contextKey, isCustomNavigator]);
}
const NavigatorContext = React.createContext(null);
function Navigator({
  initialRouteName,
  screenOptions,
  children,
  router: router2
}) {
  const contextKey = useContextKey(), {
    screens,
    children: otherSlot
  } = useFilterScreenChildren(children, {
    isCustomNavigator: true,
    contextKey
  }), sorted = useSortedScreens(screens ?? []);
  return sorted.length ? /* @__PURE__ */ jsx(QualifiedNavigator, {
    initialRouteName,
    screenOptions,
    screens: sorted,
    contextKey,
    router: router2,
    children: otherSlot
  }) : (console.warn(`Navigator at "${contextKey}" has no children.`), null);
}
function QualifiedNavigator({
  initialRouteName,
  screenOptions,
  children,
  screens,
  contextKey,
  router: router2 = StackRouter
}) {
  const {
    state,
    navigation,
    descriptors,
    NavigationContent: NavigationContent2
  } = useNavigationBuilder(router2, {
    // Used for getting the parent with navigation.getParent('/normalized/path')
    id: contextKey,
    children: screens,
    screenOptions,
    initialRouteName
  }), value = React.useMemo(() => ({
    contextKey,
    state,
    navigation,
    descriptors,
    router: router2
  }), [contextKey, state, navigation, descriptors, router2]);
  return /* @__PURE__ */ jsx(NavigatorContext.Provider, {
    value,
    children: /* @__PURE__ */ jsx(NavigationContent2, {
      children
    })
  });
}
function useNavigatorContext() {
  const context = React.useContext(NavigatorContext);
  if (!context) throw new Error("useNavigatorContext must be used within a <Navigator />");
  return context;
}
function useSlot() {
  var _a;
  const context = useNavigatorContext(), {
    state,
    descriptors
  } = context, current = state.routes.find((route, i) => state.index === i);
  return current ? ((_a = descriptors[current.key]) == null ? void 0 : _a.render()) ?? null : null;
}
const Slot = React.memo(function(props) {
  var _a;
  const contextKey = useContextKey();
  return ((_a = React.useContext(NavigatorContext)) == null ? void 0 : _a.contextKey) !== contextKey ? /* @__PURE__ */ jsx(Navigator, {
    ...props,
    children: /* @__PURE__ */ jsx(QualifiedSlot, {})
  }) : /* @__PURE__ */ jsx(QualifiedSlot, {});
});
function QualifiedSlot() {
  return useSlot();
}
Navigator.Slot = Slot;
Navigator.useContext = useNavigatorContext;
Navigator.Screen = Screen;
const LoadProgressBar = ({
  startDelay = 500,
  finishDelay = 50,
  initialPercent = 20,
  updateInterval = 300,
  sporadicness = 3,
  ...props
}) => {
  const [loaded, setLoaded] = useState(0), [width, setWidth] = useState(0);
  return useEffect(() => {
    let loadInterval;
    const dispose = router.onLoadState((state) => {
      switch (clearTimeout(loadInterval), state) {
        case "loading": {
          loadInterval = setTimeout(() => {
            setLoaded(initialPercent);
            let intervalCount = 0;
            loadInterval = setInterval(() => {
              intervalCount++, intervalCount % sporadicness !== 0 && setLoaded((prev) => {
                const increment = (100 - prev) * (prev > 80 ? 0.05 : 0.1) * Math.random();
                return Math.min(prev + increment, 100);
              });
            }, updateInterval);
          }, startDelay);
          break;
        }
        case "loaded": {
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
  }, [finishDelay, initialPercent, sporadicness, startDelay, updateInterval]), /* @__PURE__ */ jsx(View, {
    ...props,
    onLayout: (e) => {
      var _a;
      setWidth(e.nativeEvent.layout.width), (_a = props.onLayout) == null ? void 0 : _a.call(props, e);
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
const isServerSide = typeof window > "u", idFn$1 = () => {
};
function useForceUpdate() {
  return isServerSide ? idFn$1 : React__default.useReducer((x) => Math.random(), 0)[1];
}
const LayoutGroupContext = React__default.createContext({});
function useConstant(fn) {
  if (typeof document > "u") return React.useMemo(() => fn(), []);
  const ref = React.useRef();
  return ref.current || (ref.current = {
    v: fn()
  }), ref.current.v;
}
const PresenceContext = React.createContext(null), ResetPresence = (props) => /* @__PURE__ */ jsx(PresenceContext.Provider, {
  value: null,
  children: props.children
});
function usePresence() {
  const context = React.useContext(PresenceContext);
  if (!context) return [true, null, context];
  const {
    id,
    isPresent: isPresent2,
    onExitComplete,
    register
  } = context;
  return React.useEffect(() => register(id), []), !isPresent2 && onExitComplete ? [false, () => onExitComplete == null ? void 0 : onExitComplete(id), context] : [true, void 0, context];
}
const PresenceChild = React.memo(({
  children,
  initial,
  isPresent,
  onExitComplete,
  exitVariant,
  enterVariant,
  enterExitVariant,
  presenceAffectsLayout,
  custom
}) => {
  const presenceChildren = useConstant(newChildrenMap), id = useId$1() || "", context = React.useMemo(
    () => ({
      id,
      initial,
      isPresent,
      custom,
      exitVariant,
      enterVariant,
      enterExitVariant,
      onExitComplete: () => {
        presenceChildren.set(id, true);
        for (const isComplete of presenceChildren.values()) if (!isComplete) return;
        onExitComplete == null ? void 0 : onExitComplete();
      },
      register: () => (presenceChildren.set(id, false), () => presenceChildren.delete(id))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    // @ts-expect-error its ok
    presenceAffectsLayout ? void 0 : [isPresent, exitVariant, enterVariant]
  );
  return React.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]), React.useEffect(() => {
    !isPresent && !presenceChildren.size && (onExitComplete == null ? void 0 : onExitComplete());
  }, [isPresent]), /* @__PURE__ */ jsx(PresenceContext.Provider, {
    value: context,
    children
  });
});
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  return Children.forEach(children, (child) => {
    isValidElement(child) && filtered.push(child);
  }), filtered;
}
const AnimatePresence = ({
  children,
  enterVariant,
  exitVariant,
  enterExitVariant,
  initial = true,
  onExitComplete,
  exitBeforeEnter,
  presenceAffectsLayout = true,
  custom
}) => {
  let forceRender = useContext(LayoutGroupContext).forceRender ?? useForceUpdate();
  const filteredChildren = onlyElements(children), presentChildren = useRef(filteredChildren), allChildren = useRef(/* @__PURE__ */ new Map()).current, exiting = useRef(/* @__PURE__ */ new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  const isInitialRender = useRef(true);
  if (isInitialRender.current) return isInitialRender.current = false, /* @__PURE__ */ jsx(Fragment, {
    children: filteredChildren.map((child) => /* @__PURE__ */ jsx(PresenceChild, {
      isPresent: true,
      enterExitVariant,
      exitVariant,
      enterVariant,
      initial: initial ? void 0 : false,
      presenceAffectsLayout,
      custom,
      children: child
    }, getChildKey(child)))
  });
  let childrenToRender = [...filteredChildren];
  const presentKeys = presentChildren.current.map(getChildKey), targetKeys = filteredChildren.map(getChildKey), numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    targetKeys.indexOf(key) === -1 ? exiting.add(key) : exiting.delete(key);
  }
  return exitBeforeEnter && exiting.size && (childrenToRender = []), exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1) return;
    const child = allChildren.get(key);
    if (!child) return;
    const insertionIndex = presentKeys.indexOf(key), exitingComponent = /* @__PURE__ */ jsx(PresenceChild, {
      isPresent: false,
      onExitComplete: () => {
        allChildren.delete(key), exiting.delete(key);
        const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
        presentChildren.current.splice(removeIndex, 1), exiting.size || (presentChildren.current = filteredChildren, forceRender(), onExitComplete == null ? void 0 : onExitComplete());
      },
      presenceAffectsLayout,
      enterExitVariant,
      enterVariant,
      exitVariant,
      custom,
      children: child
    }, getChildKey(child));
    childrenToRender.splice(insertionIndex, 0, exitingComponent);
  }), childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exiting.has(key) ? child : /* @__PURE__ */ jsx(PresenceChild, {
      isPresent: true,
      exitVariant,
      enterVariant,
      enterExitVariant,
      presenceAffectsLayout,
      custom,
      children: child
    }, getChildKey(child));
  }), presentChildren.current = childrenToRender, /* @__PURE__ */ jsx(Fragment, {
    children: exiting.size ? childrenToRender : (
      // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
      childrenToRender.map((child) => cloneElement(child))
    )
  });
};
AnimatePresence.displayName = "AnimatePresence";
const Decorated = Symbol(), withStaticProperties = (component, staticProps) => {
  const next = (() => {
    if (component[Decorated]) {
      const _ = React__default.forwardRef((props, ref) => React__default.createElement(component, {
        ...props,
        ref
      }));
      for (const key in component) {
        const v = component[key];
        _[key] = v && typeof v == "object" ? {
          ...v
        } : v;
      }
    }
    return component;
  })();
  return Object.assign(next, staticProps), next[Decorated] = true, next;
};
function useGet(currentValue, initialValue, forwardToFunction) {
  const curRef = React.useRef(initialValue ?? currentValue);
  return useIsomorphicLayoutEffect$2(() => {
    curRef.current = currentValue;
  }), React.useCallback(forwardToFunction ? (...args) => {
    var _a;
    return (_a = curRef.current) == null ? void 0 : _a.apply(null, args);
  } : () => curRef.current, []);
}
function useEvent(callback) {
  return useGet(callback, defaultValue, true);
}
const defaultValue = () => {
  throw new Error("Cannot call an event handler while rendering.");
};
const startTransition = (callback) => {
  startTransition$1(callback);
};
const emptyCallbackFn = (_) => _();
function useControllableState({
  prop,
  defaultProp,
  onChange,
  strategy = "prop-wins",
  preventUpdate,
  transition
}) {
  const [state, setState] = React.useState(prop ?? defaultProp), previous = React.useRef(state), propWins = strategy === "prop-wins" && prop !== void 0, value = propWins ? prop : state, onChangeCb = useEvent(onChange || idFn), transitionFn = transition ? startTransition : emptyCallbackFn;
  React.useEffect(() => {
    prop !== void 0 && (previous.current = prop, transitionFn(() => {
      setState(prop);
    }));
  }, [prop]), React.useEffect(() => {
    propWins || state !== previous.current && (previous.current = state, onChangeCb(state));
  }, [onChangeCb, state, propWins]);
  const setter = useEvent((next) => {
    if (!preventUpdate) if (propWins) {
      const nextValue = typeof next == "function" ? next(previous.current) : next;
      onChangeCb(nextValue);
    } else transitionFn(() => {
      setState(next);
    });
  });
  return [value, setter];
}
const idFn = () => {
};
function useDidFinishSSR(value) {
  const [cur, setCur] = React.useState(value);
  return React.useEffect(() => {
    setCur(true);
  }, []), cur ?? false;
}
const cache$1 = /* @__PURE__ */ new WeakMap(), createVariables = (tokens2, parentPath = "", isFont = false) => {
  if (cache$1.has(tokens2)) return tokens2;
  const res = {};
  for (let keyIn in tokens2) {
    const val = tokens2[keyIn], isPrefixed = keyIn[0] === "$", keyWithPrefix = isPrefixed ? keyIn : `$${keyIn}`, key = isPrefixed ? keyWithPrefix.slice(1) : keyIn;
    if (isVariable(val)) {
      res[key] = val;
      continue;
    }
    const niceKey = simpleHash(key, 1e3), name = parentPath && parentPath !== "t-color" ? `${parentPath}-${niceKey}` : `c-${niceKey}`;
    if (val && typeof val == "object") {
      res[key] = createVariables(
        tokens2[key],
        name,
        false
        /* note: don't pass isFont down, we want to avoid it past the first level */
      );
      continue;
    }
    const finalValue = isVariable(val) ? val : createVariable({
      val,
      name,
      key: keyWithPrefix
    });
    res[key] = finalValue;
  }
  return cache$1.set(res, true), res;
};
const registerCSSVariable = (v) => {
  tokensValueToVariable.set(getVariableValue(v), v);
}, variableToCSS = (v, unitless = false) => `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${createCSSVariable(v.name, false)}:${!unitless && typeof v.val == "number" ? `${v.val}px` : v.val}`, tokensValueToVariable = /* @__PURE__ */ new Map();
const darkLight = ["dark", "light"], lightDark = ["light", "dark"];
function getThemeCSSRules(props) {
  const cssRuleSets = [];
  if (!process.env.TAMAGUI_DOES_SSR_CSS || process.env.TAMAGUI_DOES_SSR_CSS === "mutates-themes" || process.env.TAMAGUI_DOES_SSR_CSS === "false") {
    const {
      config: config2,
      themeName,
      theme,
      names
    } = props, hasDarkLight = props.hasDarkLight ?? (config2.themes && ("light" in config2.themes || "dark" in config2.themes)), CNP = `.${THEME_CLASSNAME_PREFIX}`;
    let vars = "";
    for (const themeKey in theme) {
      const variable = theme[themeKey];
      let value = null;
      tokensValueToVariable.has(variable.val) ? value = tokensValueToVariable.get(variable.val).variable : value = variable.val, vars += `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${simpleHash(themeKey, 40)}:${value};`;
    }
    const isDarkBase = themeName === "dark", isLightBase = themeName === "light", baseSelectors = names.map((name) => `${CNP}${name}`), selectorsSet = new Set(isDarkBase || isLightBase ? baseSelectors : []);
    if (hasDarkLight) {
      const maxDepth = getSetting("maxDarkLightNesting") ?? 3;
      for (const subName of names) {
        const isDark = isDarkBase || subName.startsWith("dark_"), isLight = !isDark && (isLightBase || subName.startsWith("light_"));
        if (!(isDark || isLight)) {
          selectorsSet.add(`${CNP}${subName}`);
          continue;
        }
        const childSelector = `${CNP}${subName.replace(/^(dark|light)_/, "")}`, order = isDark ? darkLight : lightDark, [stronger, weaker] = order, numSelectors = Math.round(maxDepth * 1.5);
        for (let depth = 0; depth < numSelectors; depth++) {
          const isOdd = depth % 2 === 1;
          if (isOdd && depth < 3) continue;
          const parents = new Array(depth + 1).fill(0).map((_, idx) => `${CNP}${idx % 2 === 0 ? stronger : weaker}`);
          let parentSelectors = parents.length > 1 ? parents.slice(1) : parents;
          if (isOdd) {
            const [_first, second, ...rest] = parentSelectors;
            parentSelectors = [second, ...rest, second];
          }
          const lastParentSelector = parentSelectors[parentSelectors.length - 1], nextChildSelector = childSelector === lastParentSelector ? "" : childSelector, parentSelectorString = parentSelectors.join(" ");
          selectorsSet.add(`${parentSelectorString} ${nextChildSelector}`);
        }
      }
    }
    const selectors = [...selectorsSet].sort(sortString), css = `${selectors.map((x) => `:root${isBaseTheme(x) && getSetting("themeClassNameOnRoot") ? "" : " "}${x}`).join(", ")} {${vars}}`;
    if (cssRuleSets.push(css), getSetting("shouldAddPrefersColorThemes")) {
      const bgString = theme.background ? `background:${variableToString(theme.background)};` : "", fgString = theme.color ? `color:${variableToString(theme.color)}` : "", bodyRules = `body{${bgString}${fgString}}`, isDark = themeName.startsWith("dark"), baseName = isDark ? "dark" : "light", themeRules = `${selectors.map((x) => {
        if (x == darkSelector || x === lightSelector) return ":root";
        if (!(isDark && x.startsWith(lightSelector) || !isDark && x.startsWith(darkSelector))) return x.replace(/^\.t_(dark|light) /, "").trim();
      }).filter(Boolean).join(", ")} {${vars}}`, prefersMediaSelectors = `@media(prefers-color-scheme:${baseName}){
    ${bodyRules}
    ${themeRules}
  }`;
      cssRuleSets.push(prefersMediaSelectors);
    }
    const selectionStyles2 = getSetting("selectionStyles");
    if (selectionStyles2) {
      const rules = selectionStyles2(theme);
      if (rules) {
        const selectionSelectors = baseSelectors.map((s) => `${s} ::selection`).join(", "), styles2 = Object.entries(rules).flatMap(([k, v]) => v ? `${k === "backgroundColor" ? "background" : k}:${variableToString(v)}` : []).join(";");
        if (styles2) {
          const css2 = `${selectionSelectors}{${styles2}}`;
          cssRuleSets.push(css2);
        }
      }
    }
  }
  return cssRuleSets;
}
const darkSelector = ".t_dark", lightSelector = ".t_light", isBaseTheme = (x) => x === darkSelector || x === lightSelector || x.startsWith(".t_dark ") || x.startsWith(".t_light ");
const themesRaw = {};
function proxyThemesToParents(dedupedThemes) {
  for (const {
    names,
    theme
  } of dedupedThemes) for (const name of names) themesRaw[name] = theme;
  const themes2 = {};
  for (const {
    names,
    theme
  } of dedupedThemes) for (const themeName of names) {
    const proxiedTheme = proxyThemeToParents(themeName, theme);
    themes2[themeName] = proxiedTheme;
  }
  return themes2;
}
function proxyThemeToParents(themeName, theme) {
  const cur = [], parents = themeName.split("_").slice(0, -1).map((part) => (cur.push(part), cur.join("_"))), numParents = parents.length;
  return new Proxy(theme, {
    get(target, key) {
      if (!key || // dont ask me, idk why but on hermes you can see that useTheme()[undefined] passes in STRING undefined to proxy
      // if someone is crazy enough to use "undefined" as a theme key then this not working is on them
      key == "undefined" || Reflect.has(target, key)) return Reflect.get(target, key);
      for (let i = numParents - 1; i >= 0; i--) {
        const parent = themesRaw[parents[i]];
        if (parent && Reflect.has(parent, key)) return Reflect.get(parent, key);
      }
      return getTokenObject(key);
    }
  });
}
function ensureThemeVariable(theme, key) {
  const val = theme[key];
  isVariable(val) ? val.name !== key && (theme[key] = createVariable({
    key: val.name,
    name: key,
    val: val.val
  })) : theme[key] = createVariable({
    key,
    name: key,
    val
  });
}
const fontWeights = ["100", "200", "300", "400", "500", "600", "700", "800", "900"], processSection = (section, keys, defaultValue2) => {
  if (typeof section == "string") return section;
  const sectionKeys = Object.keys(section);
  let fillValue = section[sectionKeys[0]];
  return Object.fromEntries([.../* @__PURE__ */ new Set([...keys, ...sectionKeys])].map((key) => {
    const value = section[key] ?? defaultValue2 ?? fillValue;
    return fillValue = value, defaultValue2 = value, [key, value];
  }));
}, createFont = (font) => {
  const sizeKeys = Object.keys(font.size), processedFont = Object.fromEntries(Object.entries(font).map(([key, section]) => [key, processSection(section, key === "face" ? fontWeights : sizeKeys, key === "face" ? {
    normal: font.family
  } : void 0)]));
  return Object.freeze(processedFont);
};
function parseFont(definition) {
  var _a;
  const parsed = {};
  for (const attrKey in definition) {
    const attr2 = definition[attrKey];
    if (attrKey === "family" || attrKey === "face") parsed[attrKey] = attr2;
    else {
      parsed[attrKey] = {};
      for (const key in attr2) {
        let val = attr2[key];
        ((_a = val.val) == null ? void 0 : _a[0]) === "$" && (val = val.val), parsed[attrKey][`$${key}`] = val;
      }
    }
  }
  return parsed;
}
function registerFontVariables(parsedFont) {
  const response = [];
  for (const fkey in parsedFont) if (fkey !== "face") {
    if (fkey === "family") {
      const val = parsedFont[fkey];
      registerCSSVariable(val), response.push(variableToCSS(val));
    } else for (const fskey in parsedFont[fkey]) if (typeof parsedFont[fkey][fskey] != "string") {
      const val = parsedFont[fkey][fskey];
      registerCSSVariable(val), response.push(variableToCSS(val));
    }
  }
  return response;
}
const createdConfigs = /* @__PURE__ */ new WeakMap();
function createTamagui$1(configIn) {
  var _a;
  if (createdConfigs.has(configIn)) return configIn;
  const tokensParsed = {}, tokens2 = createVariables(configIn.tokens || {});
  if (configIn.tokens) {
    const tokensMerged = {};
    for (const cat in tokens2) {
      tokensParsed[cat] = {}, tokensMerged[cat] = {};
      const tokenCat = tokens2[cat];
      for (const key in tokenCat) {
        const val = tokenCat[key], prefixedKey = `$${key}`;
        tokensParsed[cat][prefixedKey] = val, tokensMerged[cat][prefixedKey] = val, tokensMerged[cat][key] = val;
      }
    }
    setTokens(tokensMerged);
  }
  let foundThemes;
  if (configIn.themes) {
    const noThemes = Object.keys(configIn.themes).length === 0;
    noThemes && (foundThemes = scanAllSheets(noThemes, tokensParsed)), process.env.TAMAGUI_SKIP_THEME_OPTIMIZATION || noThemes && listenForSheetChanges();
  }
  let fontSizeTokens = null, fontsParsed;
  if (configIn.fonts) {
    const fontTokens = Object.fromEntries(Object.entries(configIn.fonts).map(([k, v]) => [k, createVariables(v, "f", true)]));
    fontsParsed = (() => {
      const res = {};
      for (const familyName in fontTokens) {
        const font = fontTokens[familyName], fontParsed = parseFont(font);
        res[`$${familyName}`] = fontParsed, !fontSizeTokens && fontParsed.size && (fontSizeTokens = new Set(Object.keys(fontParsed.size)));
      }
      return res;
    })();
  }
  const specificTokens = {}, themeConfig = (() => {
    const cssRuleSets = [], declarations = [], fontDeclarations = {};
    for (const key in tokens2) for (const skey in tokens2[key]) {
      const variable = tokens2[key][skey];
      if (specificTokens[`$${key}.${skey}`] = variable, false) ;
      registerCSSVariable(variable), declarations.push(variableToCSS(variable, key === "zIndex"));
    }
    {
      let declarationsToRuleSet = function(decs, selector = "") {
        return `:root${selector} {${sep}${[...decs].join(`;${sep}`)}${sep}}`;
      };
      for (const key in fontsParsed) {
        const fontParsed = fontsParsed[key], [name, language] = key.includes("_") ? key.split("_") : [key], fontVars = registerFontVariables(fontParsed);
        fontDeclarations[key] = {
          name: name.slice(1),
          declarations: fontVars,
          language
        };
      }
      const sep = configIn.cssStyleSeparator || "";
      if (cssRuleSets.push(declarationsToRuleSet(declarations)), fontDeclarations) for (const key in fontDeclarations) {
        const {
          name,
          declarations: declarations2,
          language = "default"
        } = fontDeclarations[key], fontSelector = `.font_${name}`, langSelector = `:root .t_lang-${name}-${language} ${fontSelector}`, selectors = language === "default" ? ` ${fontSelector}, ${langSelector}` : langSelector, specificRuleSet = declarationsToRuleSet(declarations2, selectors);
        cssRuleSets.push(specificRuleSet);
      }
    }
    const themesIn = configIn.themes, dedupedThemes = foundThemes ?? getThemesDeduped(themesIn);
    return {
      themes: proxyThemesToParents(dedupedThemes),
      cssRuleSets,
      getThemeRulesSets() {
        let themeRuleSets = [];
        for (const {
          names,
          theme
        } of dedupedThemes) {
          const nextRules = getThemeCSSRules({
            config: configIn,
            themeName: names[0],
            names,
            theme
          });
          themeRuleSets = [...themeRuleSets, ...nextRules];
        }
        return themeRuleSets;
      }
    };
  })(), shorthands2 = configIn.shorthands || {};
  let lastCSSInsertedRulesIndex = -1;
  const getCSS = (opts = {}) => {
    const {
      separator = `
`,
      sinceLastCall,
      exclude
    } = opts;
    if (sinceLastCall && lastCSSInsertedRulesIndex >= 0) {
      const rules = getAllRules();
      return lastCSSInsertedRulesIndex = rules.length, rules.slice(lastCSSInsertedRulesIndex).join(separator);
    }
    lastCSSInsertedRulesIndex = 0;
    const runtimeStyles = getAllRules().join(separator);
    return exclude === "design-system" ? runtimeStyles : `${`._ovs-contain {overscroll-behavior:contain;}
.is_Text .is_Text {display:inline-flex;}
._dsp_contents {display:contents;}
${themeConfig.cssRuleSets.join(separator)}`}
${exclude ? "" : themeConfig.getThemeRulesSets().join(separator)}
${runtimeStyles}`;
  }, getNewCSS = (opts) => getCSS({
    ...opts,
    sinceLastCall: true
  }), defaultFontSetting = ((_a = configIn.settings) == null ? void 0 : _a.defaultFont) ?? configIn.defaultFont, defaultFont = (() => {
    let val = defaultFontSetting;
    return (val == null ? void 0 : val[0]) === "$" && (val = val.slice(1)), val;
  })(), defaultFontToken = defaultFont ? `$${defaultFont}` : "", unset = {
    ...configIn.unset
  };
  !unset.fontFamily && defaultFont && (unset.fontFamily = defaultFontToken);
  const config2 = {
    fonts: {},
    onlyAllowShorthands: false,
    fontLanguages: [],
    animations: {},
    media: {},
    ...configIn,
    unset,
    settings: {
      // move deprecated settings here so we can reference them all using `getSetting`
      // TODO remove this on v2
      disableSSR: configIn.disableSSR,
      defaultFont: configIn.defaultFont,
      disableRootThemeClass: configIn.disableRootThemeClass,
      onlyAllowShorthands: configIn.onlyAllowShorthands,
      mediaQueryDefaultActive: configIn.mediaQueryDefaultActive,
      themeClassNameOnRoot: configIn.themeClassNameOnRoot,
      cssStyleSeparator: configIn.cssStyleSeparator,
      webContainerType: "inline-size",
      ...configIn.settings
    },
    tokens: tokens2,
    // vite made this into a function if it wasn't set
    shorthands: shorthands2,
    inverseShorthands: shorthands2 ? Object.fromEntries(Object.entries(shorthands2).map(([k, v]) => [v, k])) : {},
    themes: themeConfig.themes,
    fontsParsed: fontsParsed || {},
    themeConfig,
    tokensParsed,
    parsed: true,
    getNewCSS,
    getCSS,
    defaultFont,
    fontSizeTokens: fontSizeTokens || /* @__PURE__ */ new Set(),
    specificTokens,
    defaultFontToken
    // const tokens = [...getToken(tokens.size[0])]
    // .spacer-sm + ._dsp_contents._dsp-sm-hidden { margin-left: -var(--${}) }
  };
  return setConfig(config2), configureMedia(config2), createdConfigs.set(config2, true), configListeners.size && (configListeners.forEach((cb) => cb(config2)), configListeners.clear()), config2;
}
function getThemesDeduped(themes2) {
  const dedupedThemes = [], existing = /* @__PURE__ */ new Map();
  for (const themeName in themes2) {
    const darkOrLightSpecificPrefix = themeName.startsWith("dark") ? "dark" : themeName.startsWith("light") ? "light" : "", rawTheme = themes2[themeName], key = darkOrLightSpecificPrefix + JSON.stringify(rawTheme);
    if (existing.has(key)) {
      existing.get(key).names.push(themeName);
      continue;
    }
    const theme = {
      ...rawTheme
    };
    for (const key2 in theme) ensureThemeVariable(theme, key2);
    const deduped = {
      names: [themeName],
      theme
    };
    dedupedThemes.push(deduped), existing.set(key, deduped);
  }
  return dedupedThemes;
}
function createTokens(tokens2) {
  return createVariables(tokens2, process.env.TAMAGUI_TOKEN_PREFIX ?? "t");
}
function useThemeName(opts) {
  const manager = getThemeManager(React__default.useContext(ThemeManagerIDContext)), [name, setName] = React__default.useState((manager == null ? void 0 : manager.state.name) || "");
  return useIsomorphicLayoutEffect$2(() => {
    if (manager) return setName(manager.state.name), manager.onChangeTheme((next, manager2) => {
      const name2 = next;
      name2 && setName(name2);
    });
  }, [manager == null ? void 0 : manager.state.name]), name;
}
const useConfiguration = () => {
  const {
    groups,
    animationDriver,
    ...restComponentConfig
  } = React__default.useContext(ComponentContext), {
    animations: animations2,
    ...restConfig
  } = getConfig();
  return {
    ...restConfig,
    ...restComponentConfig,
    animationDriver: animationDriver ?? getConfig().animations
  };
};
const useIsTouchDevice = () => useDidFinishSSR() ? isTouchable : false;
const ThemeProvider = (props) => (isClient && React__default.useLayoutEffect(() => {
  if (props.disableRootThemeClass) return;
  const cn = `${THEME_CLASSNAME_PREFIX}${props.defaultTheme}`, target = props.themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot") ? document.documentElement : document.body;
  return target.classList.add(cn), () => {
    target.classList.remove(cn);
  };
}, [props.defaultTheme, props.disableRootThemeClass, props.themeClassNameOnRoot]), /* @__PURE__ */ jsx(Theme, {
  className: props.className,
  name: props.defaultTheme,
  forceClassName: !props.disableRootThemeClass,
  _isRoot: true,
  children: props.children
}));
function TamaguiProvider$1({
  children,
  disableInjectCSS,
  config: config2,
  className,
  defaultTheme,
  disableRootThemeClass,
  reset: reset2,
  themeClassNameOnRoot
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(UnmountedClassName, {
      children: /* @__PURE__ */ jsx(ComponentContext.Provider, {
        animationDriver: config2 == null ? void 0 : config2.animations,
        children: /* @__PURE__ */ jsx(ThemeProvider, {
          themeClassNameOnRoot: themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot"),
          disableRootThemeClass: disableRootThemeClass ?? getSetting("disableRootThemeClass"),
          defaultTheme: defaultTheme ?? (config2 ? Object.keys(config2.themes)[0] : ""),
          reset: reset2,
          className,
          children
        })
      })
    }), config2 && !disableInjectCSS && /* @__PURE__ */ jsx("style", {
      precedence: "default",
      href: "tamagui-css",
      children: config2.getCSS()
    }, "tamagui-css")]
  });
}
function UnmountedClassName(props) {
  const [mounted, setMounted] = React__default.useState(false);
  return React__default.useEffect(() => {
    setMounted(true);
  }, []), /* @__PURE__ */ jsx("span", {
    style: {
      display: "contents"
    },
    className: mounted ? "" : "t_unmounted",
    children: props.children
  });
}
TamaguiProvider$1.displayName = "TamaguiProvider";
const getElevation = (size2, extras) => {
  if (!size2) return;
  const {
    tokens: tokens2
  } = extras, token = tokens2.size[size2], sizeNum = isVariable(token) ? +token.val : size2;
  return getSizedElevation(sizeNum, extras);
}, getSizedElevation = (val, {
  theme,
  tokens: tokens2
}) => {
  let num = 0;
  if (val === true) {
    const val2 = getVariableValue(tokens2.size.true);
    typeof val2 == "number" ? num = val2 : num = 10;
  } else num = +val;
  if (num === 0) return;
  const [height, shadowRadius] = [Math.round(num / 4 + 1), Math.round(num / 2 + 2)];
  return {
    shadowColor: theme.shadowColor,
    shadowRadius,
    shadowOffset: {
      height,
      width: 0
    },
    ...{}
  };
};
const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}, getInset = (val) => val && typeof val == "object" ? val : {
  top: val,
  left: val,
  bottom: val,
  right: val
}, variants = {
  fullscreen: {
    true: fullscreenStyle
  },
  elevation: {
    "...size": getElevation,
    ":number": getElevation
  },
  inset: getInset
}, YStack = styled(View$1, {
  flexDirection: "column",
  variants
});
YStack.displayName = "YStack";
const XStack = styled(View$1, {
  flexDirection: "row",
  variants
});
XStack.displayName = "XStack";
const ZStack = styled(YStack, {
  position: "relative"
}, {
  neverFlatten: true,
  isZStack: true
});
ZStack.displayName = "ZStack";
const defaultOptions = {
  shift: 0,
  bounds: [0]
}, getSize = (size2, options) => getTokenRelative("size", size2, options), getSpace = (space2, options) => getTokenRelative("space", space2, options), cacheVariables = {}, cacheWholeVariables = {}, cacheKeys = {}, cacheWholeKeys = {}, stepTokenUpOrDown = (type, current, options = defaultOptions) => {
  var _a, _b;
  const tokens2 = getTokens({
    prefixed: true
  })[type];
  if (!(type in cacheVariables)) {
    cacheKeys[type] = [], cacheVariables[type] = [], cacheWholeKeys[type] = [], cacheWholeVariables[type] = [];
    const sorted = Object.keys(tokens2).map((k) => tokens2[k]).sort((a, b) => a.val - b.val);
    for (const token of sorted) cacheKeys[type].push(token.key), cacheVariables[type].push(token);
    const sortedExcludingHalfSteps = sorted.filter((x) => !x.key.endsWith(".5"));
    for (const token of sortedExcludingHalfSteps) cacheWholeKeys[type].push(token.key), cacheWholeVariables[type].push(token);
  }
  const isString = typeof current == "string", tokensOrdered = (options.excludeHalfSteps ? isString ? cacheWholeKeys : cacheWholeVariables : isString ? cacheKeys : cacheVariables)[type], min2 = ((_a = options.bounds) == null ? void 0 : _a[0]) ?? 0, max2 = ((_b = options.bounds) == null ? void 0 : _b[1]) ?? tokensOrdered.length - 1, currentIndex = tokensOrdered.indexOf(current);
  let shift = options.shift || 0;
  shift && (current === "$true" || isVariable(current) && current.name === "true") && (shift += shift > 0 ? 1 : -1);
  const index2 = Math.min(max2, Math.max(min2, currentIndex + shift)), found = tokensOrdered[index2];
  return (typeof found == "string" ? tokens2[found] : found) || tokens2.$true;
}, getTokenRelative = stepTokenUpOrDown;
const elevate = {
  true: (_, extras) => getElevation(extras.props.size, extras)
}, bordered = (val, {
  props
}) => ({
  // TODO size it with size in '...size'
  borderWidth: typeof val == "number" ? val : 1,
  borderColor: "$borderColor",
  ...props.hoverTheme && {
    hoverStyle: {
      borderColor: "$borderColorHover"
    }
  },
  ...props.pressTheme && {
    pressStyle: {
      borderColor: "$borderColorPress"
    }
  },
  ...props.focusTheme && {
    focusStyle: {
      borderColor: "$borderColorFocus"
    }
  }
}), padded = {
  true: (_, extras) => {
    const {
      tokens: tokens2,
      props
    } = extras;
    return {
      padding: tokens2.space[props.size] || tokens2.space.$true
    };
  }
}, radiused = {
  true: (_, extras) => {
    const {
      tokens: tokens2,
      props
    } = extras;
    return {
      borderRadius: tokens2.radius[props.size] || tokens2.radius.$true
    };
  }
}, circularStyle = {
  borderRadius: 1e5,
  padding: 0
}, circular = {
  true: (_, {
    props,
    tokens: tokens2
  }) => {
    if (!("size" in props)) return circularStyle;
    const size2 = typeof props.size == "number" ? props.size : tokens2.size[props.size];
    return {
      ...circularStyle,
      width: size2,
      height: size2,
      maxWidth: size2,
      maxHeight: size2,
      minWidth: size2,
      minHeight: size2
    };
  }
}, hoverTheme = {
  true: {
    hoverStyle: {
      backgroundColor: "$backgroundHover",
      borderColor: "$borderColorHover"
    }
  },
  false: {}
}, pressTheme = {
  true: {
    cursor: "pointer",
    pressStyle: {
      backgroundColor: "$backgroundPress",
      borderColor: "$borderColorPress"
    }
  },
  false: {}
}, focusTheme = {
  true: {
    focusStyle: {
      backgroundColor: "$backgroundFocus",
      borderColor: "$borderColorFocus"
    }
  },
  false: {}
};
const chromelessStyle = {
  backgroundColor: "transparent",
  borderColor: "transparent",
  shadowColor: "transparent",
  hoverStyle: {
    borderColor: "transparent"
  }
}, themeableVariants = {
  backgrounded: {
    true: {
      backgroundColor: "$background"
    }
  },
  radiused,
  hoverTheme,
  pressTheme,
  focusTheme,
  circular,
  padded,
  elevate,
  bordered,
  transparent: {
    true: {
      backgroundColor: "transparent"
    }
  },
  chromeless: {
    true: chromelessStyle,
    all: {
      ...chromelessStyle,
      hoverStyle: chromelessStyle,
      pressStyle: chromelessStyle,
      focusStyle: chromelessStyle
    }
  }
}, ThemeableStack = styled(YStack, {
  variants: themeableVariants
});
const getFontSized = (sizeTokenIn = "$true", {
  font,
  fontFamily,
  props
}) => {
  var _a, _b, _c, _d, _e, _f;
  if (!font) return {
    fontSize: sizeTokenIn
  };
  const sizeToken = sizeTokenIn === "$true" ? getDefaultSizeToken(font) : sizeTokenIn, style = {}, fontSize = font.size[sizeToken], lineHeight = (_a = font.lineHeight) == null ? void 0 : _a[sizeToken], fontWeight = (_b = font.weight) == null ? void 0 : _b[sizeToken], letterSpacing = (_c = font.letterSpacing) == null ? void 0 : _c[sizeToken], textTransform = (_d = font.transform) == null ? void 0 : _d[sizeToken], fontStyle = props.fontStyle ?? ((_e = font.style) == null ? void 0 : _e[sizeToken]), color2 = props.color ?? ((_f = font.color) == null ? void 0 : _f[sizeToken]);
  return fontStyle && (style.fontStyle = fontStyle), textTransform && (style.textTransform = textTransform), fontFamily && (style.fontFamily = fontFamily), fontWeight && (style.fontWeight = fontWeight), letterSpacing && (style.letterSpacing = letterSpacing), fontSize && (style.fontSize = fontSize), lineHeight && (style.lineHeight = lineHeight), color2 && (style.color = color2), style;
}, cache = /* @__PURE__ */ new WeakMap();
function getDefaultSizeToken(font) {
  if (typeof font == "object" && cache.has(font)) return cache.get(font);
  const sizeTokens = "$true" in font.size ? font.size : getTokens().size, sizeDefault = sizeTokens.$true, sizeDefaultSpecific = sizeDefault ? Object.keys(sizeTokens).find((x) => x !== "$true" && sizeTokens[x].val === sizeDefault.val) : null;
  return !sizeDefault || !sizeDefaultSpecific ? Object.keys(font.size)[3] : (cache.set(font, sizeDefaultSpecific), sizeDefaultSpecific);
}
const SizableText = styled(Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    unstyled: {
      false: {
        size: "$true",
        color: "$color"
      }
    },
    size: getFontSized
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
SizableText.staticConfig.variants.fontFamily = {
  "...": (_val, extras) => {
    const sizeProp = extras.props.size, fontSizeProp = extras.props.fontSize, size2 = sizeProp === "$true" && fontSizeProp ? fontSizeProp : extras.props.size || "$true";
    return getFontSized(size2, extras);
  }
};
const Paragraph = styled(SizableText, {
  name: "Paragraph",
  tag: "p",
  userSelect: "auto",
  color: "$color",
  size: "$true",
  whiteSpace: "normal"
});
function wrapChildrenInText(TextComponent, propsIn, extraProps) {
  const {
    children,
    textProps,
    size: size2,
    noTextWrap,
    color: color2,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    textAlign,
    fontStyle,
    maxFontSizeMultiplier
  } = propsIn;
  if (noTextWrap || !children) return [children];
  const props = {
    ...extraProps
  };
  return color2 && (props.color = color2), fontFamily && (props.fontFamily = fontFamily), fontSize && (props.fontSize = fontSize), fontWeight && (props.fontWeight = fontWeight), letterSpacing && (props.letterSpacing = letterSpacing), textAlign && (props.textAlign = textAlign), size2 && (props.size = size2), fontStyle && (props.fontStyle = fontStyle), maxFontSizeMultiplier && (props.maxFontSizeMultiplier = maxFontSizeMultiplier), React__default.Children.toArray(children).map((child, index2) => typeof child == "string" ? (
    // so "data-disable-theme" is a hack to fix themeInverse, don't ask me why
    /* @__PURE__ */ jsx(TextComponent, {
      ...props,
      ...textProps,
      children: child
    }, index2)
  ) : child);
}
if (typeof globalThis["__DEV__"] === "undefined") {
  globalThis["__DEV__"] = false;
}
const CurrentPortalZIndices = {}, useStackedZIndex = (props) => {
  const {
    stackZIndex,
    zIndex: zIndexProp = 1e3
  } = props, id = useId$1(), zIndex2 = useMemo(() => {
    if (stackZIndex) {
      const highest = Object.values(CurrentPortalZIndices).reduce((acc, cur) => Math.max(acc, cur), 0);
      return Math.max(stackZIndex, highest + 1);
    }
    if (zIndexProp) return zIndexProp;
  }, [stackZIndex]);
  return useEffect(() => {
    if (typeof stackZIndex == "number") return CurrentPortalZIndices[id] = stackZIndex, () => {
      delete CurrentPortalZIndices[id];
    };
  }, [stackZIndex]), zIndex2;
};
const Portal = React.memo((propsIn) => {
  var _a;
  if (isServer) return null;
  const {
    host = (_a = globalThis.document) == null ? void 0 : _a.body,
    stackZIndex,
    ...props
  } = propsIn, zIndex2 = useStackedZIndex(propsIn);
  return createPortal(/* @__PURE__ */ jsx(YStack, {
    contain: "strict",
    fullscreen: true,
    position: "fixed",
    maxWidth: "100vw",
    maxHeight: "100vh",
    pointerEvents: "none",
    ...props,
    zIndex: zIndex2
  }), host);
});
const IS_FABRIC = typeof global < "u" && !!(global._IS_FABRIC ?? global.nativeFabricUIManager), USE_NATIVE_PORTAL = process.env.TAMAGUI_USE_NATIVE_PORTAL !== "false" && !IS_FABRIC, allPortalHosts = /* @__PURE__ */ new Map(), portalListeners = {};
const INITIAL_STATE = {};
const registerHost = (state, hostName) => (hostName in state || (state[hostName] = []), state), deregisterHost = (state, hostName) => (delete state[hostName], state), addUpdatePortal = (state, hostName, portalName, node) => {
  hostName in state || (state = registerHost(state, hostName));
  const index2 = state[hostName].findIndex((item) => item.name === portalName);
  return index2 !== -1 ? state[hostName][index2].node = node : state[hostName].push({
    name: portalName,
    node
  }), state;
}, removePortal = (state, hostName, portalName) => {
  if (!(hostName in state)) return console.info(`Failed to remove portal '${portalName}', '${hostName}' was not registered!`), state;
  const index2 = state[hostName].findIndex((item) => item.name === portalName);
  return index2 !== -1 && state[hostName].splice(index2, 1), state;
}, reducer = (state, action) => {
  const {
    type
  } = action;
  switch (type) {
    case 0:
      return registerHost({
        ...state
      }, action.hostName);
    case 1:
      return deregisterHost({
        ...state
      }, action.hostName);
    case 2:
      return addUpdatePortal({
        ...state
      }, action.hostName, action.portalName, action.node);
    case 3:
      return removePortal({
        ...state
      }, action.hostName, action.portalName);
    default:
      return state;
  }
}, PortalStateContext = createContext(null), PortalDispatchContext = createContext(null), PortalProviderComponent = ({
  rootHostName = "root",
  shouldAddRootHost = true,
  children
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE), transitionDispatch = useMemo(() => (value) => {
    startTransition(() => {
      dispatch(value);
    });
  }, [dispatch]);
  return /* @__PURE__ */ jsx(PortalDispatchContext.Provider, {
    value: transitionDispatch,
    children: /* @__PURE__ */ jsxs(PortalStateContext.Provider, {
      value: state,
      children: [children, shouldAddRootHost && /* @__PURE__ */ jsx(PortalHost, {
        name: rootHostName
      })]
    })
  });
}, PortalProvider = memo(PortalProviderComponent);
PortalProvider.displayName = "PortalProvider";
const PortalHost = memo(function(props) {
  return /* @__PURE__ */ jsx(PortalHostWeb, {
    ...props
  });
});
function PortalHostWeb(props) {
  return /* @__PURE__ */ jsx("div", {
    style: {
      display: "contents"
    },
    ref: (node) => {
      var _a;
      node ? (allPortalHosts.set(props.name, node), (_a = portalListeners[props.name]) == null ? void 0 : _a.forEach((x) => x(node))) : allPortalHosts.delete(props.name);
    }
  });
}
const GorhomPortalItem = (props) => {
  if (!props.hostName) throw new Error("No name");
  const cur = allPortalHosts.get(props.hostName), [node, setNode] = useState(cur);
  return cur && !node && setNode(cur), useEffect(() => {
    var _a;
    if (!props.hostName || node) return;
    const listener = (node2) => {
      setNode(node2);
    };
    return portalListeners[_a = props.hostName] || (portalListeners[_a] = /* @__PURE__ */ new Set()), portalListeners[props.hostName].add(listener), () => {
      var _a2;
      (_a2 = portalListeners[props.hostName]) == null ? void 0 : _a2.delete(listener);
    };
  }, [node]), node ? createPortal(props.children, node) : null;
};
const CurrentAdaptContextScope = createContext(""), AdaptContext = createStyledContext({
  Contents: null,
  scopeName: "",
  portalName: "",
  platform: null,
  setPlatform: null,
  when: null,
  setChildren: null,
  setWhen: null
}), ProvideAdaptContext = ({
  children,
  ...context
}) => {
  const scope = context.scopeName || "";
  return /* @__PURE__ */ jsx(CurrentAdaptContextScope.Provider, {
    value: scope,
    children: /* @__PURE__ */ jsx(AdaptContext.Provider, {
      scope,
      ...context,
      children
    })
  });
}, useAdaptContext = (scope = "") => {
  const contextScope = useContext(CurrentAdaptContextScope);
  return AdaptContext.useStyledContext(scope === "" && contextScope || scope);
}, AdaptPortals = /* @__PURE__ */ new Map(), AdaptParent = ({
  children,
  Contents,
  scope,
  portal
}) => {
  const portalName = `AdaptPortal${scope}`, id = useId$1();
  let FinalContents = Contents || AdaptPortals.get(id);
  FinalContents || (FinalContents = () => /* @__PURE__ */ jsx(PortalHost, {
    name: portalName,
    forwardProps: typeof portal == "boolean" ? void 0 : portal == null ? void 0 : portal.forwardProps
  }), AdaptPortals.set(id, FinalContents)), useEffect(() => () => {
    AdaptPortals.delete(id);
  }, []);
  const [when, setWhen] = React__default.useState(null), [platform2, setPlatform] = React__default.useState(null), [children2, setChildren] = React__default.useState(null);
  return /* @__PURE__ */ jsx(ProvideAdaptContext, {
    Contents: FinalContents,
    when,
    platform: platform2,
    setPlatform,
    setWhen,
    setChildren,
    portalName,
    scopeName: scope,
    children
  });
}, AdaptContents = ({
  scope,
  ...rest
}) => {
  const context = useAdaptContext(scope);
  if (!(context == null ? void 0 : context.Contents)) throw new Error("tamagui.dev/docs/intro/errors#warning-002");
  return React__default.createElement(context.Contents, {
    ...rest,
    key: "stable"
  });
};
AdaptContents.shouldForwardSpace = true;
const Adapt = withStaticProperties(function(props) {
  const {
    platform: platform2,
    when,
    children,
    scope
  } = props, context = useAdaptContext(scope), scopeName = scope ?? context.scopeName, enabled = useAdaptIsActiveGiven(props);
  useIsomorphicLayoutEffect$2(() => {
    context == null ? void 0 : context.setWhen(when || enabled), context == null ? void 0 : context.setPlatform(platform2 || null);
  }, [when, platform2, context, enabled]), useIsomorphicLayoutEffect$2(() => () => {
    context == null ? void 0 : context.setWhen(null);
  }, []);
  let output;
  if (typeof children == "function") {
    const Component = context == null ? void 0 : context.Contents;
    output = children(Component ? /* @__PURE__ */ jsx(Component, {}) : null);
  } else output = children;
  return useEffect(() => {
    typeof children == "function" && output !== void 0 && (context == null ? void 0 : context.setChildren(output));
  }, [output]), /* @__PURE__ */ jsx(CurrentAdaptContextScope.Provider, {
    value: scopeName,
    children: enabled ? output : null
  });
}, {
  Contents: AdaptContents
}), AdaptPortalContents = (props) => {
  const {
    portalName
  } = useAdaptContext(props.scope);
  return /* @__PURE__ */ jsx(GorhomPortalItem, {
    hostName: portalName,
    children: props.children
  });
}, useAdaptIsActiveGiven = ({
  when,
  platform: platform2
}) => {
  const media2 = useMedia();
  if (when == null && platform2 == null) return false;
  let enabled = false;
  return platform2 === "touch" ? enabled = isTouchable : platform2 === "native" ? enabled = !isWeb : platform2 === "web" ? enabled = isWeb : platform2 === "ios" ? enabled = isIos : platform2 === "android" && (enabled = isAndroid$1), platform2 && enabled == false ? false : (when && typeof when == "string" && (enabled = media2[when]), enabled);
}, useAdaptIsActive = (scope) => {
  const props = useAdaptContext(scope);
  return useAdaptIsActiveGiven(props);
};
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext2(rootComponentName, defaultContext) {
    const BaseContext = React.createContext(defaultContext), index2 = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    function Provider(props) {
      var _a;
      const {
        scope,
        children,
        ...context
      } = props, Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index2]) || BaseContext, value = React.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx(Context.Provider, {
        value,
        children
      });
    }
    function useContext2(consumerName, scope, options) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index2]) || BaseContext, context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      const missingContextMessage = `\`${consumerName}\` must be used within \`${rootComponentName}\``;
      if (options == null ? void 0 : options.fallback) return (options == null ? void 0 : options.warn) !== false && console.warn(missingContextMessage), options.fallback;
      throw new Error(missingContextMessage);
    }
    return Provider.displayName = `${rootComponentName}Provider`, [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => React.createContext(defaultContext));
    return function(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return React.useMemo(() => ({
        [`__scope${scopeName}`]: {
          ...scope,
          [scopeName]: contexts
        }
      }), [scope, contexts]);
    };
  };
  return createScope.scopeName = scopeName, [createContext2, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, {
        useScope,
        scopeName
      }) => {
        const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
        return {
          ...nextScopes2,
          ...currentScope
        };
      }, {});
      return React.useMemo(() => ({
        [`__scope${baseScope.scopeName}`]: nextScopes
      }), [nextScopes]);
    };
  };
  return createScope.scopeName = baseScope.scopeName, createScope;
}
const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount", AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount", EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
}, FocusScope = React.forwardRef(function(props, forwardedRef) {
  const childProps = useFocusScope(props, forwardedRef);
  return typeof props.children == "function" ? /* @__PURE__ */ jsx(Fragment, {
    children: props.children(childProps)
  }) : React.cloneElement(React.Children.only(props.children), childProps);
});
function useFocusScope(props, forwardedRef) {
  const {
    loop = false,
    enabled = true,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    forceUnmount,
    children,
    ...scopeProps
  } = props, [container, setContainer] = React.useState(null), onMountAutoFocus = useEvent(onMountAutoFocusProp), onUnmountAutoFocus = useEvent(onUnmountAutoFocusProp), lastFocusedElementRef = React.useRef(null), setContainerTransition = React.useCallback((node) => {
    startTransition(() => {
      setContainer(node);
    });
  }, [setContainer]), composedRefs = useComposedRefs(forwardedRef, setContainerTransition), focusScope = React.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  React.useEffect(() => {
    if (!enabled || !trapped) return;
    const controller = new AbortController();
    function handleFocusIn(event) {
      if (focusScope.paused || !container) return;
      const target = event.target;
      container.contains(target) ? (target == null ? void 0 : target.addEventListener("blur", handleBlur, {
        signal: controller.signal
      }), lastFocusedElementRef.current = target) : focus(lastFocusedElementRef.current, {
        select: true
      });
    }
    function handleFocusOut(event) {
      controller.abort(), !(focusScope.paused || !container) && (container.contains(event.relatedTarget) || focus(lastFocusedElementRef.current, {
        select: true
      }));
    }
    function handleBlur() {
      lastFocusedElementRef.current = container;
    }
    return document.addEventListener("focusin", handleFocusIn), document.addEventListener("focusout", handleFocusOut), () => {
      controller.abort(), document.removeEventListener("focusin", handleFocusIn), document.removeEventListener("focusout", handleFocusOut);
    };
  }, [trapped, forceUnmount, container, focusScope.paused]), React.useEffect(() => {
    if (!enabled || !container || forceUnmount) return;
    focusScopesStack.add(focusScope);
    const previouslyFocusedElement = document.activeElement;
    if (!container.contains(previouslyFocusedElement)) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
      if (container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus), container.dispatchEvent(mountEvent), !mountEvent.defaultPrevented) {
        const candidates = removeLinks(getTabbableCandidates(container));
        focusFirst(candidates, {
          select: true
        }), document.activeElement === previouslyFocusedElement && focus(container);
      }
    }
    return () => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
      const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus), container.dispatchEvent(unmountEvent), unmountEvent.defaultPrevented || focus(previouslyFocusedElement ?? document.body, {
        select: true
      }), container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus), focusScopesStack.remove(focusScope);
    };
  }, [enabled, container, forceUnmount, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = React.useCallback((event) => {
    if (!trapped || !loop || focusScope.paused) return;
    const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey, focusedElement = document.activeElement;
    if (isTabKey && focusedElement) {
      const container2 = event.currentTarget, [first, last] = getTabbableEdges(container2);
      first && last ? !event.shiftKey && focusedElement === last ? (event.preventDefault(), loop && focus(first, {
        select: true
      })) : event.shiftKey && focusedElement === first && (event.preventDefault(), loop && focus(last, {
        select: true
      })) : focusedElement === container2 && event.preventDefault();
    }
  }, [loop, trapped, focusScope.paused]);
  return {
    tabIndex: -1,
    ...scopeProps,
    ref: composedRefs,
    onKeyDown: handleKeyDown
  };
}
function focusFirst(candidates, {
  select = false
} = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) if (focus(candidate, {
    select
  }), document.activeElement !== previouslyFocusedElement) return;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container), first = findVisible(candidates, container), last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [], walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput3 = node.tagName === "INPUT" && node.type === "hidden";
      return node.disabled || node.hidden || isHiddenInput3 ? NodeFilter.FILTER_SKIP : node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; walker.nextNode(); ) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) if (!isHidden$1(element, {
    upTo: container
  })) return element;
}
function isHidden$1(node, {
  upTo
}) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  for (; node; ) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, {
  select = false
} = {}) {
  if (element == null ? void 0 : element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({
      preventScroll: true
    }), element !== previouslyFocusedElement && isSelectableInput(element) && select && element.select();
  }
}
const focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      focusScope !== activeFocusScope && (activeFocusScope == null ? void 0 : activeFocusScope.pause()), stack = arrayRemove(stack, focusScope), stack.unshift(focusScope);
    },
    remove(focusScope) {
      var _a;
      stack = arrayRemove(stack, focusScope), (_a = stack[0]) == null ? void 0 : _a.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array], index2 = updatedArray.indexOf(item);
  return index2 !== -1 && updatedArray.splice(index2, 1), updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t2 = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t2[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t2[p[i]] = s[p[i]];
    }
  return t2;
}
function __spreadArray(to, from, pack) {
  for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
function useCallbackRef(initialValue, callback) {
  var ref = useState(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue2) {
  var callbackRef = useCallbackRef(null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs2 = buffer;
        buffer = [];
        cbs2.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs2 = buffer;
        buffer = [];
        cbs2.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs3 = pendingQueue;
        pendingQueue = [];
        cbs3.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
var SideCar$1 = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}
var effectCar = createSidecarMedium();
var nothing = function() {
  return;
};
var RemoveScroll$1 = React.forwardRef(function(props, parentRef) {
  var ref = React.useRef(null);
  var _a = React.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React.createElement(
    React.Fragment,
    null,
    enabled && React.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? React.cloneElement(React.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll$1.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll$1.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var getNonce = function() {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet2 = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet2 = makeStyleTag()) {
          injectStyles(stylesheet2, style);
          insertStyleTag(stylesheet2);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet2) {
        stylesheet2.parentNode && stylesheet2.parentNode.removeChild(stylesheet2);
        stylesheet2 = null;
      }
    }
  };
};
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles2, isDynamic) {
    React.useEffect(function() {
      sheet.add(styles2);
      return function() {
        sheet.remove();
      };
    }, [styles2 && isDynamic]);
  };
};
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet2 = function(_a) {
    var styles2 = _a.styles, dynamic = _a.dynamic;
    useStyle(styles2, dynamic);
    return null;
  };
  return Sheet2;
};
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
  React.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = React.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return React.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  if (!(node instanceof Element)) {
    return false;
  }
  var styles2 = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles2[overflow] !== "hidden" && // contains scroll inside self
    !(styles2.overflowY === styles2.overflowX && !alwaysContainsScroll(node) && styles2[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    if (target instanceof ShadowRoot) {
      target = target.host;
    } else {
      target = target.parentNode;
    }
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (Math.abs(availableScroll) < 1 || !noOverscroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || !noOverscroll)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React.useRef([]);
  var touchStartRef = React.useRef([0, 0]);
  var activeAxis = React.useRef();
  var id = React.useState(idCounter++)[0];
  var Style2 = React.useState(styleSingleton)[0];
  var lastProps = React.useRef(props);
  React.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef)).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React.createElement(
    React.Fragment,
    null,
    inert ? React.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? React.createElement(RemoveScrollBar, { gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}
const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = React.forwardRef(function(props, ref) {
  return React.createElement(RemoveScroll$1, __assign({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll$1.classNames;
const RemoveScroll = React__default.memo((props) => props.children ? /* @__PURE__ */ jsx(ReactRemoveScroll, {
  ...props
}) : null);
ReactRemoveScroll.classNames;
const SHEET_NAME = "Sheet", SHEET_HANDLE_NAME = "SheetHandle", SHEET_OVERLAY_NAME = "SheetOverlay";
const [createSheetContext, createSheetScope] = createContextScope(SHEET_NAME), [SheetProvider, useSheetContext] = createSheetContext(SHEET_NAME, {});
const ParentSheetContext = React__default.createContext({
  zIndex: 1e5
}), SheetInsideSheetContext = React__default.createContext(null);
function resisted(y, minY, maxOverflow = 25) {
  if (y < minY) {
    const past = minY - y, extra = -(1.1 - 0.15 ** (Math.min(maxOverflow, past) / maxOverflow)) * maxOverflow;
    return minY + extra;
  }
  return y;
}
const useSheetController = () => {
  const controller = React__default.useContext(SheetControllerContext), isHidden3 = controller == null ? void 0 : controller.hidden, isShowingNonSheet = isHidden3 && (controller == null ? void 0 : controller.open);
  return {
    controller,
    isHidden: isHidden3,
    isShowingNonSheet,
    disableDrag: controller == null ? void 0 : controller.disableDrag
  };
}, SheetControllerContext = React__default.createContext(null);
const useSheetOpenState = (props) => {
  const {
    isHidden: isHidden3,
    controller
  } = useSheetController(), onOpenChangeInternal = (val) => {
    var _a, _b;
    (_a = controller == null ? void 0 : controller.onOpenChange) == null ? void 0 : _a.call(controller, val), (_b = props.onOpenChange) == null ? void 0 : _b.call(props, val);
  }, [open, setOpen] = useControllableState({
    prop: (controller == null ? void 0 : controller.open) ?? props.open,
    defaultProp: props.defaultOpen ?? false,
    onChange: onOpenChangeInternal,
    strategy: "most-recent-wins",
    transition: true
  });
  return {
    open,
    setOpen,
    isHidden: isHidden3,
    controller
  };
};
function useSheetProviderProps(props, state, options = {}) {
  const handleRef = React__default.useRef(null), contentRef = React__default.useRef(null), [frameSize, setFrameSize] = React__default.useState(0), [maxContentSize, setMaxContentSize] = React__default.useState(0), snapPointsMode = props.snapPointsMode ?? "percent", snapPointsProp = props.snapPoints ?? (snapPointsMode === "percent" ? [80] : snapPointsMode === "constant" ? [256] : ["fit"]), hasFit = snapPointsProp[0] === "fit", snapPoints = React__default.useMemo(() => props.dismissOnSnapToBottom ? [...snapPointsProp, 0] : snapPointsProp, [JSON.stringify(snapPointsProp), props.dismissOnSnapToBottom]), [position_, setPositionImmediate] = useControllableState({
    prop: props.position,
    defaultProp: props.defaultPosition || (state.open ? 0 : -1),
    onChange: props.onPositionChange,
    strategy: "most-recent-wins",
    transition: true
  }), position = state.open === false ? -1 : position_, {
    open
  } = state, setPosition = React__default.useCallback((next) => {
    props.dismissOnSnapToBottom && next === snapPoints.length - 1 ? state.setOpen(false) : setPositionImmediate(next);
  }, [props.dismissOnSnapToBottom, snapPoints.length, setPositionImmediate, state.setOpen]);
  open && props.dismissOnSnapToBottom && position === snapPoints.length - 1 && setPositionImmediate(0);
  const shouldSetPositionOpen = open && position < 0;
  React__default.useEffect(() => {
    shouldSetPositionOpen && setPosition(0);
  }, [setPosition, shouldSetPositionOpen]);
  const {
    animationDriver
  } = useConfiguration();
  if (!animationDriver) throw new Error("❌ 008");
  const scrollBridge = useConstant(() => ({
    enabled: false,
    y: 0,
    paneY: 0,
    paneMinY: 0,
    scrollStartY: -1,
    drag: () => {
    },
    release: () => {
    },
    scrollLock: false
  })), removeScrollEnabled = props.forceRemoveScrollEnabled ?? (open && props.modal), maxSnapPoint = snapPoints[0];
  return {
    screenSize: snapPointsMode === "percent" ? frameSize / ((typeof maxSnapPoint == "number" ? maxSnapPoint : 100) / 100) : maxContentSize,
    maxSnapPoint,
    removeScrollEnabled,
    scrollBridge,
    modal: !!props.modal,
    open: state.open,
    setOpen: state.setOpen,
    hidden: !!state.isHidden,
    contentRef,
    handleRef,
    frameSize,
    setFrameSize,
    dismissOnOverlayPress: props.dismissOnOverlayPress ?? true,
    dismissOnSnapToBottom: props.dismissOnSnapToBottom ?? false,
    onOverlayComponent: options.onOverlayComponent,
    scope: props.__scopeSheet,
    hasFit,
    position,
    snapPoints,
    snapPointsMode,
    setMaxContentSize,
    setPosition,
    setPositionImmediate,
    onlyShowFrame: false
  };
}
const hiddenSize = 10000.1;
let sheetHiddenStyleSheet = null;
const relativeDimensionTo = "window", SheetImplementationCustom = React__default.forwardRef(function(props, forwardedRef) {
  const parentSheet = React__default.useContext(ParentSheetContext), {
    animation,
    animationConfig: animationConfigProp,
    modal = false,
    zIndex: zIndex2 = parentSheet.zIndex + 1,
    moveOnKeyboardChange = false,
    unmountChildrenWhenHidden = false,
    portalProps,
    containerComponent: ContainerComponent = React__default.Fragment
  } = props, state = useSheetOpenState(props), [overlayComponent, setOverlayComponent] = React__default.useState(null), providerProps = useSheetProviderProps(props, state, {
    onOverlayComponent: setOverlayComponent
  }), {
    frameSize,
    setFrameSize,
    snapPoints,
    snapPointsMode,
    hasFit,
    position,
    setPosition,
    scrollBridge,
    screenSize,
    setMaxContentSize,
    maxSnapPoint
  } = providerProps, {
    open,
    controller,
    isHidden: isHidden3
  } = state, sheetRef = React__default.useRef(null), ref = useComposedRefs(forwardedRef, sheetRef, providerProps.contentRef), animationConfig = (() => {
    const [animationProp, animationPropConfig] = animation ? Array.isArray(animation) ? animation : [animation] : [];
    return animationConfigProp ?? (animationProp ? {
      ...getConfig().animations.animations[animationProp],
      ...animationPropConfig
    } : null);
  })(), [isShowingInnerSheet, setIsShowingInnerSheet] = React__default.useState(false), sheetInsideSheet = React__default.useContext(SheetInsideSheetContext);
  React__default.useCallback((hasChild) => {
    setIsShowingInnerSheet(hasChild);
  }, []);
  const positions = React__default.useMemo(() => snapPoints.map((point) => getYPositions(snapPointsMode, point, screenSize, frameSize)), [screenSize, frameSize, snapPoints, snapPointsMode]), {
    animationDriver
  } = useConfiguration(), {
    useAnimatedNumber,
    useAnimatedNumberStyle,
    useAnimatedNumberReaction
  } = animationDriver, AnimatedView = animationDriver.View ?? Stack;
  useIsomorphicLayoutEffect$2(() => {
    if (sheetInsideSheet && open) return sheetInsideSheet(true), () => {
      sheetInsideSheet(false);
    };
  }, [sheetInsideSheet, open]);
  const nextParentContext = React__default.useMemo(() => ({
    zIndex: zIndex2
  }), [zIndex2]), startPosition = useDidFinishSSR() && screenSize ? screenSize : hiddenSize, animatedNumber = useAnimatedNumber(startPosition), at = React__default.useRef(startPosition), hasntMeasured = at.current === hiddenSize, [disableAnimation, setDisableAnimation] = useState(hasntMeasured);
  useAnimatedNumberReaction({
    value: animatedNumber,
    hostRef: sheetRef
  }, React__default.useCallback((value) => {
    at.current = value, scrollBridge.paneY = value;
  }, [animationDriver]));
  function stopSpring() {
    animatedNumber.stop(), scrollBridge.onFinishAnimate && (scrollBridge.onFinishAnimate(), scrollBridge.onFinishAnimate = void 0);
  }
  const animateTo = useEvent((position2) => {
    if (frameSize === 0) return;
    let toValue = isHidden3 || position2 === -1 ? screenSize : positions[position2];
    at.current !== toValue && (at.current = toValue, stopSpring(), animatedNumber.setValue(toValue, {
      type: "spring",
      ...animationConfig
    }));
  });
  useIsomorphicLayoutEffect$2(() => {
    if (hasntMeasured && screenSize) {
      at.current = screenSize, animatedNumber.setValue(screenSize, {
        type: "timing",
        duration: 0
      }, () => {
        setTimeout(() => {
          setDisableAnimation(false);
        }, 10);
      });
      return;
    }
    disableAnimation || !frameSize || !screenSize || isHidden3 || hasntMeasured && !open || animateTo(position);
  }, [hasntMeasured, disableAnimation, isHidden3, frameSize, screenSize, open, position]);
  const disableDrag = props.disableDrag ?? (controller == null ? void 0 : controller.disableDrag), themeName = useThemeName(), [isDragging, setIsDragging] = React__default.useState(false), panResponder = React__default.useMemo(() => {
    if (disableDrag || !frameSize || isShowingInnerSheet) return;
    const minY = positions[0];
    scrollBridge.paneMinY = minY;
    let startY = at.current;
    function setPanning(val) {
      setIsDragging(val), isClient && (sheetHiddenStyleSheet || (sheetHiddenStyleSheet = document.createElement("style"), typeof document.head < "u" && document.head.appendChild(sheetHiddenStyleSheet)), val ? sheetHiddenStyleSheet.innerText = ":root * { user-select: none !important; -webkit-user-select: none !important; }" : sheetHiddenStyleSheet.innerText = "");
    }
    const release = ({
      vy,
      dragAt
    }) => {
      isExternalDrag = false, setPanning(false);
      const end = dragAt + startY + frameSize * vy * 0.2;
      let closestPoint = 0, dist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < positions.length; i++) {
        const position2 = positions[i], curDist = end > position2 ? end - position2 : position2 - end;
        curDist < dist && (dist = curDist, closestPoint = i);
      }
      setPosition(closestPoint), animateTo(closestPoint);
    }, finish = (_e, state2) => {
      release({
        vy: state2.vy,
        dragAt: state2.dy
      });
    };
    const onMoveShouldSet = (e, {
      dy
    }) => {
      if (e.target === providerProps.handleRef.current) return true;
      const isScrolled = scrollBridge.y !== 0, isDraggingUp = dy < 0, isNearTop = scrollBridge.paneY - 5 <= scrollBridge.paneMinY;
      return isScrolled ? false : isNearTop && !isScrolled && isDraggingUp && !isWeb ? false : Math.abs(dy) > 5;
    }, grant = () => {
      setPanning(true), stopSpring(), startY = at.current;
    };
    let isExternalDrag = false;
    return scrollBridge.drag = (dy) => {
      isExternalDrag || (isExternalDrag = true, grant());
      const to = dy + startY;
      animatedNumber.setValue(resisted(to, minY), {
        type: "direct"
      });
    }, scrollBridge.release = release, PanResponder.create({
      onMoveShouldSetPanResponder: onMoveShouldSet,
      onPanResponderGrant: grant,
      onPanResponderMove: (_e, {
        dy
      }) => {
        const toFull = dy + startY, to = resisted(toFull, minY);
        animatedNumber.setValue(to, {
          type: "direct"
        });
      },
      onPanResponderEnd: finish,
      onPanResponderTerminate: finish,
      onPanResponderRelease: finish
    });
  }, [disableDrag, isShowingInnerSheet, animateTo, frameSize, positions, setPosition]), handleAnimationViewLayout = React__default.useCallback((e) => {
    var _a;
    const next = Math.min((_a = e.nativeEvent) == null ? void 0 : _a.layout.height, Dimensions.get(relativeDimensionTo).height);
    next && setFrameSize(next);
  }, []), handleMaxContentViewLayout = React__default.useCallback((e) => {
    var _a;
    const next = Math.min((_a = e.nativeEvent) == null ? void 0 : _a.layout.height, Dimensions.get(relativeDimensionTo).height);
    next && setMaxContentSize(next);
  }, []), animatedStyle = useAnimatedNumberStyle(animatedNumber, (val) => {
    "worklet";
    return {
      transform: [{
        translateY: frameSize === 0 ? hiddenSize : val
      }]
    };
  });
  React__default.useRef(null);
  React__default.useEffect(() => {
    return;
  }, [moveOnKeyboardChange, positions, position, isHidden3]);
  const [opacity, setOpacity] = React__default.useState(open ? 1 : 0);
  open && opacity === 0 && setOpacity(1), React__default.useEffect(() => {
    if (!open) {
      const tm = setTimeout(() => {
        setOpacity(0);
      }, 400);
      return () => {
        clearTimeout(tm);
      };
    }
  }, [open]);
  const forcedContentHeight = hasFit ? void 0 : snapPointsMode === "percent" ? `${maxSnapPoint}${"dvh"}` : maxSnapPoint;
  let contents = /* @__PURE__ */ jsx(ParentSheetContext.Provider, {
    value: nextParentContext,
    children: /* @__PURE__ */ jsxs(SheetProvider, {
      ...providerProps,
      children: [/* @__PURE__ */ jsx(AnimatePresence, {
        custom: {
          open
        },
        children: !open ? null : overlayComponent
      }), snapPointsMode !== "percent" && /* @__PURE__ */ jsx(View, {
        style: {
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none"
        },
        onLayout: handleMaxContentViewLayout
      }), /* @__PURE__ */ jsx(AnimatedView, {
        ref,
        ...panResponder == null ? void 0 : panResponder.panHandlers,
        onLayout: handleAnimationViewLayout,
        ...!isDragging && {
          // @ts-ignore for CSS driver this is necessary to attach the transition
          animation: disableAnimation ? null : animation
        },
        disableClassName: true,
        style: [{
          position: "absolute",
          zIndex: zIndex2,
          width: "100%",
          height: forcedContentHeight,
          minHeight: forcedContentHeight,
          opacity,
          ...!open && {
            pointerEvents: "none"
          }
        }, animatedStyle],
        children: props.children
      })]
    })
  });
  if (!USE_NATIVE_PORTAL) {
    const adaptContext = useAdaptContext();
    contents = /* @__PURE__ */ jsx(ProvideAdaptContext, {
      ...adaptContext,
      children: contents
    });
  }
  const shouldMountChildren = unmountChildrenWhenHidden ? !!opacity : true;
  if (modal) {
    const modalContents = /* @__PURE__ */ jsx(Portal, {
      stackZIndex: zIndex2,
      ...portalProps,
      children: shouldMountChildren && /* @__PURE__ */ jsx(ContainerComponent, {
        children: /* @__PURE__ */ jsx(Theme, {
          forceClassName: true,
          name: themeName,
          children: contents
        })
      })
    });
    return modalContents;
  }
  return contents;
});
function getYPositions(mode, point, screenSize, frameSize) {
  if (!screenSize || !frameSize) return 0;
  if (mode === "mixed") {
    if (typeof point == "number") return screenSize - Math.min(screenSize, Math.max(0, point));
    if (point === "fit") return screenSize - Math.min(screenSize, frameSize);
    if (point.endsWith("%")) {
      const pct2 = Math.min(100, Math.max(0, Number(point.slice(0, -1)))) / 100;
      return Number.isNaN(pct2) ? (console.warn("Invalid snapPoint percentage string"), 0) : Math.round(screenSize - pct2 * screenSize);
    }
    return console.warn("Invalid snapPoint unknown value"), 0;
  }
  if (mode === "fit") return point === 0 ? screenSize : screenSize - Math.min(screenSize, frameSize);
  if (mode === "constant" && typeof point == "number") return screenSize - Math.min(screenSize, Math.max(0, point));
  const pct = Math.min(100, Math.max(0, Number(point))) / 100;
  return Number.isNaN(pct) ? (console.warn("Invalid snapPoint percentage"), 0) : Math.round(screenSize - pct * screenSize);
}
const ScrollView2 = styled(ForwardedScrollView, {
  name: "ScrollView",
  scrollEnabled: true,
  variants: {
    fullscreen: {
      true: fullscreenStyle
    }
  }
}, {
  accept: {
    contentContainerStyle: "style"
  }
});
const SHEET_SCROLL_VIEW_NAME = "SheetScrollView", SheetScrollView = React__default.forwardRef(({
  __scopeSheet,
  children,
  onScroll,
  ...props
}, ref) => {
  const context = useSheetContext(SHEET_SCROLL_VIEW_NAME, __scopeSheet), {
    scrollBridge
  } = context, scrollRef = React__default.useRef(null), state = React__default.useRef({
    lastPageY: 0,
    dragAt: 0,
    dys: [],
    // store a few recent dys to get velocity on release
    isScrolling: false,
    isDragging: false
  }), release = () => {
    if (!state.current.isDragging) return;
    state.current.isDragging = false, scrollBridge.scrollStartY = -1, state.current.isScrolling = false;
    let vy = 0;
    if (state.current.dys.length) {
      const recentDys = state.current.dys.slice(-10);
      vy = (recentDys.length ? recentDys.reduce((a, b) => a + b, 0) : 0) / recentDys.length * 0.04;
    }
    state.current.dys = [], scrollBridge.release({
      dragAt: state.current.dragAt,
      vy
    });
  };
  return /* @__PURE__ */ jsx(ScrollView2, {
    ref: composeRefs(scrollRef, ref),
    flex: 1,
    scrollEventThrottle: 8,
    onResponderRelease: release,
    className: "_ovs-contain",
    onScroll: (e) => {
      const {
        y
      } = e.nativeEvent.contentOffset;
      scrollBridge.y = y, y > 0 && (scrollBridge.scrollStartY = -1), onScroll == null ? void 0 : onScroll(e);
    },
    onStartShouldSetResponder: () => (scrollBridge.scrollStartY = -1, state.current.isDragging = true, true),
    onMoveShouldSetResponder: () => false,
    ...props,
    children
  });
});
const useSheetOffscreenSize = ({
  snapPoints,
  position,
  screenSize,
  frameSize,
  snapPointsMode
}) => {
  if (snapPointsMode === "fit") return 0;
  if (snapPointsMode === "constant") {
    const maxSize2 = Number(snapPoints[0]), currentSize2 = Number(snapPoints[position] ?? 0);
    return maxSize2 - currentSize2;
  }
  if (snapPointsMode === "percent") {
    const maxPercentOpened = Number(snapPoints[0]) / 100, percentOpened = Number(snapPoints[position] ?? 0) / 100;
    return (maxPercentOpened - percentOpened) * screenSize;
  }
  const maxSnapPoint = snapPoints[0];
  if (maxSnapPoint === "fit") return 0;
  const maxSize = typeof maxSnapPoint == "string" ? Number(maxSnapPoint.slice(0, -1)) / 100 * screenSize : maxSnapPoint, currentSnapPoint = snapPoints[position] ?? 0, currentSize = typeof currentSnapPoint == "string" ? Number(currentSnapPoint.slice(0, -1)) / 100 * screenSize : currentSnapPoint, offscreenSize = maxSize - currentSize;
  return Number.isNaN(offscreenSize) ? 0 : offscreenSize;
};
function createSheet({
  Handle: Handle2,
  Frame: Frame2,
  Overlay: Overlay2
}) {
  const SheetHandle = Handle2.styleable(({
    __scopeSheet,
    ...props
  }, forwardedRef) => {
    const context = useSheetContext(SHEET_HANDLE_NAME, __scopeSheet), composedRef = useComposedRefs(context.handleRef, forwardedRef);
    return context.onlyShowFrame ? null : (
      // @ts-ignore
      /* @__PURE__ */ jsx(Handle2, {
        ref: composedRef,
        onPress: () => {
          const max2 = context.snapPoints.length + (context.dismissOnSnapToBottom ? -1 : 0), nextPos = (context.position + 1) % max2;
          context.setPosition(nextPos);
        },
        open: context.open,
        ...props
      })
    );
  }), SheetOverlay = Overlay2.extractable(memo((propsIn) => {
    const {
      __scopeSheet,
      ...props
    } = propsIn, context = useSheetContext(SHEET_OVERLAY_NAME, __scopeSheet), element = useMemo(() => (
      // @ts-ignore
      /* @__PURE__ */ jsx(Overlay2, {
        ...props,
        onPress: composeEventHandlers(props.onPress, context.dismissOnOverlayPress ? () => {
          context.setOpen(false);
        } : void 0)
      })
    ), [props.onPress, context.dismissOnOverlayPress]);
    return useIsomorphicLayoutEffect$2(() => {
      var _a;
      (_a = context.onOverlayComponent) == null ? void 0 : _a.call(context, element);
    }, [element]), context.onlyShowFrame, null;
  })), SheetFrame = Frame2.extractable(forwardRef(({
    __scopeSheet,
    adjustPaddingForOffscreenContent,
    disableHideBottomOverflow,
    children,
    ...props
  }, forwardedRef) => {
    const context = useSheetContext(SHEET_NAME, __scopeSheet), {
      hasFit,
      removeScrollEnabled,
      frameSize,
      contentRef,
      open
    } = context, composedContentRef = useComposedRefs(forwardedRef, contentRef), offscreenSize = useSheetOffscreenSize(context), sheetContents = useMemo(() => (
      // @ts-ignore
      /* @__PURE__ */ jsxs(Frame2, {
        ref: composedContentRef,
        flex: hasFit ? 0 : 1,
        height: hasFit ? void 0 : frameSize,
        pointerEvents: open ? "auto" : "none",
        ...props,
        children: [children, adjustPaddingForOffscreenContent && /* @__PURE__ */ jsx(Stack, {
          "data-sheet-offscreen-pad": true,
          height: offscreenSize,
          width: "100%"
        })]
      })
    ), [open, props, frameSize, offscreenSize, adjustPaddingForOffscreenContent, hasFit]);
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(RemoveScroll, {
        forwardProps: true,
        enabled: removeScrollEnabled,
        allowPinchZoom: true,
        shards: [contentRef],
        removeScrollBar: false,
        children: sheetContents
      }), !disableHideBottomOverflow && // @ts-ignore
      /* @__PURE__ */ jsx(Frame2, {
        ...props,
        componentName: "SheetCover",
        children: null,
        position: "absolute",
        bottom: "-100%",
        zIndex: -1,
        height: context.frameSize,
        left: 0,
        right: 0,
        borderWidth: 0,
        borderRadius: 0,
        shadowOpacity: 0
      })]
    });
  })), Sheet2 = forwardRef(function(props, ref) {
    const hydrated = useDidFinishSSR(), {
      isShowingNonSheet
    } = useSheetController();
    let SheetImplementation = SheetImplementationCustom;
    return props.native && Platform.OS, isShowingNonSheet || !hydrated ? null : /* @__PURE__ */ jsx(SheetImplementation, {
      ref,
      ...props
    });
  }), components = {
    Frame: SheetFrame,
    Overlay: SheetOverlay,
    Handle: SheetHandle,
    ScrollView: SheetScrollView
  }, Controlled = withStaticProperties(Sheet2, components);
  return withStaticProperties(Sheet2, {
    ...components,
    Controlled
  });
}
const Handle = styled(XStack, {
  name: SHEET_HANDLE_NAME,
  variants: {
    open: {
      true: {
        pointerEvents: "auto"
      },
      false: {
        opacity: 0,
        pointerEvents: "none"
      }
    },
    unstyled: {
      false: {
        height: 10,
        borderRadius: 100,
        backgroundColor: "$background",
        zIndex: 10,
        marginHorizontal: "35%",
        marginBottom: "$2",
        opacity: 0.5,
        hoverStyle: {
          opacity: 0.7
        }
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), Overlay = styled(ThemeableStack, {
  name: SHEET_OVERLAY_NAME,
  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "auto"
      },
      false: {
        opacity: 0,
        pointerEvents: "none"
      }
    },
    unstyled: {
      false: {
        fullscreen: true,
        position: "absolute",
        backgrounded: true,
        zIndex: 99999,
        pointerEvents: "auto"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), Frame = styled(YStack, {
  name: SHEET_NAME,
  variants: {
    unstyled: {
      false: {
        flex: 1,
        backgroundColor: "$background",
        borderTopLeftRadius: "$true",
        borderTopRightRadius: "$true",
        width: "100%",
        maxHeight: "100%",
        overflow: "hidden"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), Sheet = createSheet({
  Frame,
  Handle,
  Overlay
});
const SheetController = ({
  children,
  onOpenChange: onOpenChangeProp,
  ...value
}) => {
  const onOpenChange = useEvent(onOpenChangeProp), memoValue = React__default.useMemo(() => ({
    open: value.open,
    hidden: value.hidden,
    disableDrag: value.disableDrag,
    onOpenChange
  }), [onOpenChange, value.open, value.hidden, value.disableDrag]);
  return /* @__PURE__ */ jsx(SheetControllerContext.Provider, {
    value: memoValue,
    children
  });
};
const getFontSize = (inSize, opts) => {
  const res = getFontSizeVariable(inSize);
  return isVariable(res) ? +res.val : res ? +res : 16;
}, getFontSizeVariable = (inSize, opts) => {
  var _a;
  const token = getFontSizeToken(inSize);
  if (!token) return inSize;
  const conf = getConfig();
  return (_a = conf.fontsParsed[conf.defaultFontToken]) == null ? void 0 : _a.size[token];
}, getFontSizeToken = (inSize, opts) => {
  var _a;
  if (typeof inSize == "number") return null;
  const relativeSize = 0, conf = getConfig(), fontSize = ((_a = conf.fontsParsed[conf.defaultFontToken]) == null ? void 0 : _a.size) || // fallback to size tokens
  conf.tokensParsed.size, size2 = (inSize === "$true" && !("$true" in fontSize) ? "$4" : inSize) ?? ("$true" in fontSize ? "$true" : "$4"), sizeTokens = Object.keys(fontSize);
  let foundIndex = sizeTokens.indexOf(size2);
  foundIndex === -1 && size2.endsWith(".5") && (foundIndex = sizeTokens.indexOf(size2.replace(".5", "")));
  const tokenIndex = Math.min(Math.max(0, foundIndex + relativeSize), sizeTokens.length - 1);
  return sizeTokens[tokenIndex] ?? size2;
};
const useCurrentColor = (colorProp) => {
  var _a, _b;
  const theme = useTheme();
  return getVariable(
    // TODO can remove 'web' here, will return DynamicColor for iOS for ListItem icons, which is supported in newer react-native-svg versions
    colorProp || ((_a = theme[colorProp]) == null ? void 0 : _a.get("web")) || ((_b = theme.color) == null ? void 0 : _b.get("web"))
  );
};
const useGetThemedIcon = (props) => {
  const color2 = useCurrentColor(props.color);
  return (el) => el && (React__default.isValidElement(el) ? React__default.cloneElement(el, {
    ...props,
    color: color2,
    // @ts-expect-error
    ...el.props
  }) : React__default.createElement(el, props));
};
function createMedia(media2) {
  return media2;
}
const NAME = "ListItem", ListItemFrame = styled(ThemeableStack, {
  name: NAME,
  tag: "li",
  variants: {
    unstyled: {
      false: {
        size: "$true",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        width: "100%",
        borderColor: "$borderColor",
        maxWidth: "100%",
        overflow: "hidden",
        flexDirection: "row",
        backgroundColor: "$background",
        cursor: "default"
      }
    },
    size: {
      "...size": (val, {
        tokens: tokens2
      }) => ({
        minHeight: tokens2.size[val],
        paddingHorizontal: tokens2.space[val],
        paddingVertical: getSpace(tokens2.space[val], {
          shift: -4
        })
      })
    },
    active: {
      true: {
        hoverStyle: {
          backgroundColor: "$background"
        }
      }
    },
    disabled: {
      true: {
        opacity: 0.5,
        // TODO breaking types
        pointerEvents: "none"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), ListItemText = styled(SizableText, {
  name: "ListItemText",
  variants: {
    unstyled: {
      false: {
        color: "$color",
        size: "$true",
        flexGrow: 1,
        flexShrink: 1,
        ellipse: true,
        cursor: "inherit"
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), ListItemSubtitle = styled(ListItemText, {
  name: "ListItemSubtitle",
  variants: {
    unstyled: {
      false: {
        opacity: 0.6,
        maxWidth: "100%",
        color: "$color"
      }
    },
    size: {
      "...size": (val, extras) => {
        const oneSmaller = getSize(val, {
          shift: -1,
          excludeHalfSteps: true
        });
        return getFontSized(oneSmaller.key, extras);
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), ListItemTitle = styled(ListItemText, {
  name: "ListItemTitle"
}), useListItem = (propsIn, {
  Text: Text2 = ListItemText,
  Subtitle = ListItemSubtitle,
  Title = ListItemTitle
} = {
  Text: ListItemText,
  Subtitle: ListItemSubtitle,
  Title: ListItemTitle
}) => {
  const props = useProps(propsIn, {
    resolveValues: "none"
  }), {
    children,
    icon,
    iconAfter,
    noTextWrap,
    theme: themeName,
    space: space2,
    spaceFlex,
    scaleIcon = 1,
    scaleSpace = 1,
    unstyled = false,
    subTitle,
    title,
    // text props
    color: color2,
    fontWeight,
    fontSize,
    fontFamily,
    letterSpacing,
    textAlign,
    ellipse,
    ...rest
  } = props, textProps = {
    color: color2,
    fontWeight,
    fontSize,
    fontFamily,
    letterSpacing,
    textAlign,
    ellipse,
    children
  }, size2 = props.size || "$true", iconSize = getFontSize(size2) * scaleIcon, getThemedIcon = useGetThemedIcon({
    size: iconSize,
    color: color2
  }), [themedIcon, themedIconAfter] = [icon, iconAfter].map(getThemedIcon), sizeToken = getTokens().space[props.space] ?? iconSize, spaceSize = getVariableValue(sizeToken) * scaleSpace, contents = wrapChildrenInText(Text2, textProps);
  return {
    props: {
      ...rest,
      children: /* @__PURE__ */ jsxs(Fragment, {
        children: [themedIcon ? /* @__PURE__ */ jsxs(Fragment, {
          children: [themedIcon, /* @__PURE__ */ jsx(Spacer, {
            size: spaceSize
          })]
        }) : null, title || subTitle ? /* @__PURE__ */ jsxs(YStack, {
          flex: 1,
          children: [noTextWrap === "all" ? title : /* @__PURE__ */ jsx(Title, {
            size: size2,
            children: title
          }), subTitle ? /* @__PURE__ */ jsx(Fragment, {
            children: typeof subTitle == "string" && noTextWrap !== "all" ? (
              // TODO can use theme but we need to standardize to alt themes
              // or standardize on subtle colors in themes
              /* @__PURE__ */ jsx(Subtitle, {
                unstyled,
                size: size2,
                children: subTitle
              })
            ) : subTitle
          }) : null, contents]
        }) : contents, themedIconAfter ? /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Spacer, {
            size: spaceSize
          }), themedIconAfter]
        }) : null]
      })
    }
  };
}, ListItemComponent = ListItemFrame.styleable(function(props, ref) {
  const {
    props: listItemProps
  } = useListItem(props);
  return /* @__PURE__ */ jsx(ListItemFrame, {
    ref,
    ...listItemProps
  });
}), ListItem2 = withStaticProperties(ListItemComponent, {
  Text: ListItemText,
  Subtitle: ListItemSubtitle
});
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset: reset2
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset2 && resetCount <= 50) {
      resetCount++;
      if (typeof reset2 === "object") {
        if (reset2.placement) {
          statefulPlacement = reset2.placement;
        }
        if (reset2.rects) {
          rects = reset2.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset2.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow$1(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const size$3 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow$1(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body2 = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body2.scrollWidth, body2.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body2.scrollHeight, body2.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body2).direction === "rtl") {
    x += max(html.clientWidth, body2.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement(element);
  function cleanup2() {
    var _io;
    clearTimeout(timeoutId2);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup2();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup2;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const detectOverflow = detectOverflow$1;
const offset$1 = offset$2;
const size$2 = size$3;
const computePosition = (reference, floating, options) => {
  const cache2 = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache2
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var index$1 = typeof document !== "undefined" ? useLayoutEffect : useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef$1(value) {
  const ref = React.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating$1(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React.useState(null);
  const [_floating, _setFloating] = React.useState(null);
  const setReference = React.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React.useRef(null);
  const floatingRef = React.useRef(null);
  const dataRef = React.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef$1(whileElementsMounted);
  const platformRef = useLatestRef$1(platform2);
  const openRef = useLatestRef$1(open);
  const update = React.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config2 = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config2.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config2).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index$1(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React.useRef(false);
  index$1(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index$1(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const offset = (options, deps) => ({
  ...offset$1(options),
  options: [options, deps]
});
const size$1 = (options, deps) => ({
  ...size$2(options),
  options: [options, deps]
});
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
    var _activeElement;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map((_ref) => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  if (isAndroid() && event.pointerType) {
    return event.type === "click" && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  if (isJSDOM()) return false;
  return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function isAndroid() {
  const re = /android/i;
  return re.test(getPlatform()) || re.test(getUserAgent());
}
function isMac() {
  return getPlatform().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function isJSDOM() {
  return getUserAgent().includes("jsdom/");
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ["mouse", "pen"];
  return values.includes(pointerType);
}
function isReactEvent(event) {
  return "nativeEvent" in event;
}
function isRootElement(element) {
  return element.matches("html,body");
}
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const e = event;
  return e.target != null && node.contains(e.target);
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
  return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function isTypeableCombobox(element) {
  if (!element) return false;
  return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
const SafeReact = {
  ...React
};
const useInsertionEffect = SafeReact.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React.useRef(() => {
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index2, cols, prevRow) {
  return Math.floor(index2 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index2) {
  return index2 < 0 || index2 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index2 = startingIndex;
  do {
    index2 += decrement ? -amount : amount;
  } while (index2 >= 0 && index2 <= list.length - 1 && isDisabled(list, index2, disabledIndices));
  return index2;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset3 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset3 : offset3 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT) ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index2) => {
    let {
      width,
      height
    } = _ref2;
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index2;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getCellIndexOfCorner(index2, sizes, cellMap, cols, corner) {
  if (index2 === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index2);
  const sizeItem = sizes[index2];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index2);
  }
}
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index2, cellIndex) => indices.includes(index2) ? [cellIndex] : []);
}
function isDisabled(list, index2, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index2);
  }
  const element = list[index2];
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
var index = typeof document !== "undefined" ? useLayoutEffect : useEffect;
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
let serverHandoffComplete = false;
let count = 0;
const genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = React.useState(() => serverHandoffComplete ? genId() : void 0);
  index(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
const useReactId = SafeReact.useId;
const useId = useReactId || useFloatingId;
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
const FloatingNodeContext = /* @__PURE__ */ React.createContext(null);
const FloatingTreeContext = /* @__PURE__ */ React.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
const useFloatingTree = () => React.useContext(FloatingTreeContext);
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
function useLatestRef(value) {
  const ref = useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
let rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}
function getAncestors(nodes, id) {
  var _nodes$find;
  let allAncestors = [];
  let currentParentId = (_nodes$find = nodes.find((node) => node.id === id)) == null ? void 0 : _nodes$find.parentId;
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}
function getChildren(nodes, id) {
  let allChildren = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    });
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function getDeepestNode(nodes, id) {
  let deepestNodeId;
  let maxDepth = -1;
  function findDeepest(nodeId, depth) {
    if (depth > maxDepth) {
      deepestNodeId = nodeId;
      maxDepth = depth;
    }
    const children = getChildren(nodes, nodeId);
    children.forEach((child) => {
      findDeepest(child.id, depth + 1);
    });
  }
  findDeepest(id, 0);
  return nodes.find((node) => node.id === deepestNodeId);
}
let counterMap = /* @__PURE__ */ new WeakMap();
let uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
let markerMap = {};
let lockCount$1 = 0;
const supportsInert = () => typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
const unwrapHost = (node) => node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets) => targets.map((target) => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter((x) => x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body2, ariaHidden, inert) {
  const markerName = "data-floating-ui-inert";
  const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
  const avoidElements = correctElements(body2, uncorrectedAvoidElements);
  const elementsToKeep = /* @__PURE__ */ new Set();
  const elementsToStop = new Set(avoidElements);
  const hiddenElements = [];
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  const markerCounter = markerMap[markerName];
  avoidElements.forEach(keep);
  deep(body2);
  elementsToKeep.clear();
  function keep(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    el.parentNode && keep(el.parentNode);
  }
  function deep(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    [].forEach.call(parent.children, (node) => {
      if (getNodeName(node) === "script") return;
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr2 = controlAttribute ? node.getAttribute(controlAttribute) : null;
        const alreadyHidden = attr2 !== null && attr2 !== "false";
        const counterValue = (counterMap.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "");
        }
        if (!alreadyHidden && controlAttribute) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    });
  }
  lockCount$1++;
  return () => {
    hiddenElements.forEach((element) => {
      const counterValue = (counterMap.get(element) || 0) - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;
      counterMap.set(element, counterValue);
      markerCounter.set(element, markerValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) {
          element.removeAttribute(controlAttribute);
        }
        uncontrolledElementsSet.delete(element);
      }
      if (!markerValue) {
        element.removeAttribute(markerName);
      }
    });
    lockCount$1--;
    if (!lockCount$1) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
      markerMap = {};
    }
  };
}
function markOthers(avoidElements, ariaHidden, inert) {
  if (ariaHidden === void 0) {
    ariaHidden = false;
  }
  if (inert === void 0) {
    inert = false;
  }
  const body2 = getDocument(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements.concat(Array.from(body2.querySelectorAll("[aria-live]"))), body2, ariaHidden, inert);
}
const getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function getTabbableIn(container, direction) {
  const allTabbable = tabbable(container, getTabbableOptions());
  if (direction === "prev") {
    allTabbable.reverse();
  }
  const activeIndex = allTabbable.indexOf(activeElement(getDocument(container)));
  const nextTabbableElements = allTabbable.slice(activeIndex + 1);
  return nextTabbableElements[0];
}
function getNextTabbable() {
  return getTabbableIn(document.body, "next");
}
function getPreviousTabbable() {
  return getTabbableIn(document.body, "prev");
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container, getTabbableOptions());
  tabbableElements.forEach((element) => {
    element.dataset.tabindex = element.getAttribute("tabindex") || "";
    element.setAttribute("tabindex", "-1");
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  });
}
const HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
let timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
const FocusGuard = /* @__PURE__ */ React.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React.useState();
  index(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return /* @__PURE__ */ React.createElement("span", _extends({}, props, restProps));
});
const PortalContext = /* @__PURE__ */ React.createContext(null);
const attr = /* @__PURE__ */ createAttribute("portal");
function useFloatingPortalNode(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    id,
    root
  } = props;
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const [portalNode, setPortalNode] = React.useState(null);
  const portalNodeRef = React.useRef(null);
  index(() => {
    return () => {
      portalNode == null || portalNode.remove();
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);
  index(() => {
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    const existingIdRoot = id ? document.getElementById(id) : null;
    if (!existingIdRoot) return;
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    existingIdRoot.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, uniqueId]);
  index(() => {
    if (root === null) return;
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    let container = root || (portalContext == null ? void 0 : portalContext.portalNode);
    if (container && !isElement(container)) container = container.current;
    container = container || document.body;
    let idWrapper = null;
    if (id) {
      idWrapper = document.createElement("div");
      idWrapper.id = id;
      container.appendChild(idWrapper);
    }
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    container = idWrapper || container;
    container.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, root, uniqueId, portalContext]);
  return portalNode;
}
function FloatingPortal(props) {
  const {
    children,
    id,
    root,
    preserveTabOrder = true
  } = props;
  const portalNode = useFloatingPortalNode({
    id,
    root
  });
  const [focusManagerState, setFocusManagerState] = React.useState(null);
  const beforeOutsideRef = React.useRef(null);
  const afterOutsideRef = React.useRef(null);
  const beforeInsideRef = React.useRef(null);
  const afterInsideRef = React.useRef(null);
  const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
  const open = focusManagerState == null ? void 0 : focusManagerState.open;
  const shouldRenderGuards = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode)
  );
  React.useEffect(() => {
    if (!portalNode || !preserveTabOrder || modal) {
      return;
    }
    function onFocus(event) {
      if (portalNode && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, preserveTabOrder, modal]);
  React.useEffect(() => {
    if (!portalNode) return;
    if (open) return;
    enableFocusInside(portalNode);
  }, [open, portalNode]);
  return /* @__PURE__ */ React.createElement(PortalContext.Provider, {
    value: React.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode])
  }, shouldRenderGuards && portalNode && /* @__PURE__ */ React.createElement(FocusGuard, {
    "data-type": "outside",
    ref: beforeOutsideRef,
    onFocus: (event) => {
      if (isOutsideEvent(event, portalNode)) {
        var _beforeInsideRef$curr;
        (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
      } else {
        const prevTabbable = getPreviousTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        prevTabbable == null || prevTabbable.focus();
      }
    }
  }), shouldRenderGuards && portalNode && /* @__PURE__ */ React.createElement("span", {
    "aria-owns": portalNode.id,
    style: HIDDEN_STYLES
  }), portalNode && /* @__PURE__ */ ReactDOM.createPortal(children, portalNode), shouldRenderGuards && portalNode && /* @__PURE__ */ React.createElement(FocusGuard, {
    "data-type": "outside",
    ref: afterOutsideRef,
    onFocus: (event) => {
      if (isOutsideEvent(event, portalNode)) {
        var _afterInsideRef$curre;
        (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
      } else {
        const nextTabbable = getNextTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        nextTabbable == null || nextTabbable.focus();
        (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent, "focus-out"));
      }
    }
  }));
}
const usePortalContext = () => React.useContext(PortalContext);
const FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) {
    return null;
  }
  return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE + "]") || floatingElement;
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function addPreviouslyFocusedElement(element) {
  previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
  let tabbableEl = element;
  if (!tabbableEl || getNodeName(tabbableEl) === "body") return;
  if (!isTabbable(tabbableEl, getTabbableOptions())) {
    const tabbableChild = tabbable(tabbableEl, getTabbableOptions())[0];
    if (tabbableChild) {
      tabbableEl = tabbableChild;
    }
  }
  previouslyFocusedElements.push(tabbableEl);
  if (previouslyFocusedElements.length > LIST_LIMIT) {
    previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
  }
}
function getPreviouslyFocusedElement() {
  return previouslyFocusedElements.slice().reverse().find((el) => el.isConnected);
}
const VisuallyHiddenDismiss = /* @__PURE__ */ React.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return /* @__PURE__ */ React.createElement("button", _extends({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    order = ["content"],
    guards: _guards = true,
    initialFocus = 0,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    visuallyHiddenDismiss = false,
    closeOnFocusOut = true
  } = props;
  const {
    open,
    refs,
    nodeId,
    onOpenChange,
    events,
    dataRef,
    floatingId,
    elements: {
      domReference,
      floating
    }
  } = context;
  const ignoreInitialFocus = typeof initialFocus === "number" && initialFocus < 0;
  const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;
  const guards = supportsInert() ? _guards : true;
  const orderRef = useLatestRef(order);
  const initialFocusRef = useLatestRef(initialFocus);
  const returnFocusRef = useLatestRef(returnFocus);
  const tree = useFloatingTree();
  const portalContext = usePortalContext();
  const startDismissButtonRef = React.useRef(null);
  const endDismissButtonRef = React.useRef(null);
  const preventReturnFocusRef = React.useRef(false);
  const isPointerDownRef = React.useRef(false);
  const tabbableIndexRef = React.useRef(-1);
  const isInsidePortal = portalContext != null;
  const floatingFocusElement = getFloatingFocusElement(floating);
  const getTabbableContent = useEffectEvent(function(container) {
    if (container === void 0) {
      container = floatingFocusElement;
    }
    return container ? tabbable(container, getTabbableOptions()) : [];
  });
  const getTabbableElements = useEffectEvent((container) => {
    const content = getTabbableContent(container);
    return orderRef.current.map((type) => {
      if (domReference && type === "reference") {
        return domReference;
      }
      if (floatingFocusElement && type === "floating") {
        return floatingFocusElement;
      }
      return content;
    }).filter(Boolean).flat();
  });
  React.useEffect(() => {
    if (disabled) return;
    if (!modal) return;
    function onKeyDown(event) {
      if (event.key === "Tab") {
        if (contains(floatingFocusElement, activeElement(getDocument(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          stopEvent(event);
        }
        const els = getTabbableElements();
        const target = getTarget(event);
        if (orderRef.current[0] === "reference" && target === domReference) {
          stopEvent(event);
          if (event.shiftKey) {
            enqueueFocus(els[els.length - 1]);
          } else {
            enqueueFocus(els[1]);
          }
        }
        if (orderRef.current[1] === "floating" && target === floatingFocusElement && event.shiftKey) {
          stopEvent(event);
          enqueueFocus(els[0]);
        }
      }
    }
    const doc = getDocument(floatingFocusElement);
    doc.addEventListener("keydown", onKeyDown);
    return () => {
      doc.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
  React.useEffect(() => {
    if (disabled) return;
    if (!floating) return;
    function handleFocusIn(event) {
      const target = getTarget(event);
      const tabbableContent = getTabbableContent();
      const tabbableIndex = tabbableContent.indexOf(target);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
    }
    floating.addEventListener("focusin", handleFocusIn);
    return () => {
      floating.removeEventListener("focusin", handleFocusIn);
    };
  }, [disabled, floating, getTabbableContent]);
  React.useEffect(() => {
    if (disabled) return;
    if (!closeOnFocusOut) return;
    function handlePointerDown() {
      isPointerDownRef.current = true;
      setTimeout(() => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      queueMicrotask(() => {
        const movedToUnrelatedNode = !(contains(domReference, relatedTarget) || contains(floating, relatedTarget) || contains(relatedTarget, floating) || contains(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute("focus-guard")) || tree && (getChildren(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context, _node$context2;
          return contains((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || contains((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
        }) || getAncestors(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context3, _node$context4;
          return ((_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating) === relatedTarget || ((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.domReference) === relatedTarget;
        })));
        if (restoreFocus && movedToUnrelatedNode && activeElement(getDocument(floatingFocusElement)) === getDocument(floatingFocusElement).body) {
          if (isHTMLElement(floatingFocusElement)) {
            floatingFocusElement.focus();
          }
          const prevTabbableIndex = tabbableIndexRef.current;
          const tabbableContent = getTabbableContent();
          const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
          if (isHTMLElement(nodeToFocus)) {
            nodeToFocus.focus();
          }
        }
        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        relatedTarget !== getPreviouslyFocusedElement()) {
          preventReturnFocusRef.current = true;
          onOpenChange(false, event, "focus-out");
        }
      });
    }
    if (floating && isHTMLElement(domReference)) {
      domReference.addEventListener("focusout", handleFocusOutside);
      domReference.addEventListener("pointerdown", handlePointerDown);
      floating.addEventListener("focusout", handleFocusOutside);
      return () => {
        domReference.removeEventListener("focusout", handleFocusOutside);
        domReference.removeEventListener("pointerdown", handlePointerDown);
        floating.removeEventListener("focusout", handleFocusOutside);
      };
    }
  }, [disabled, domReference, floating, floatingFocusElement, modal, nodeId, tree, portalContext, onOpenChange, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox]);
  React.useEffect(() => {
    var _portalContext$portal;
    if (disabled) return;
    const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute("portal") + "]")) || []);
    if (floating) {
      const insideElements = [floating, ...portalNodes, startDismissButtonRef.current, endDismissButtonRef.current, orderRef.current.includes("reference") || isUntrappedTypeableCombobox ? domReference : null].filter((x) => x != null);
      const cleanup2 = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, guards, !guards) : markOthers(insideElements);
      return () => {
        cleanup2();
      };
    }
  }, [disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, guards]);
  index(() => {
    if (disabled || !isHTMLElement(floatingFocusElement)) return;
    const doc = getDocument(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    queueMicrotask(() => {
      const focusableElements = getTabbableElements(floatingFocusElement);
      const initialFocusValue = initialFocusRef.current;
      const elToFocus = (typeof initialFocusValue === "number" ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusElement;
      const focusAlreadyInsideFloatingEl = contains(floatingFocusElement, previouslyFocusedElement);
      if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
        enqueueFocus(elToFocus, {
          preventScroll: elToFocus === floatingFocusElement
        });
      }
    });
  }, [disabled, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements, initialFocusRef]);
  index(() => {
    if (disabled || !floatingFocusElement) return;
    let preventReturnFocusScroll = false;
    const doc = getDocument(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    const contextData = dataRef.current;
    let openEvent = contextData.openEvent;
    addPreviouslyFocusedElement(previouslyFocusedElement);
    function onOpenChange2(_ref) {
      let {
        open: open2,
        reason,
        event,
        nested
      } = _ref;
      if (open2) {
        openEvent = event;
      }
      if (reason === "escape-key" && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      if (reason === "hover" && event.type === "mouseleave") {
        preventReturnFocusRef.current = true;
      }
      if (reason !== "outside-press") return;
      if (nested) {
        preventReturnFocusRef.current = false;
        preventReturnFocusScroll = true;
      } else {
        preventReturnFocusRef.current = !(isVirtualClick(event) || isVirtualPointerEvent(event));
      }
    }
    events.on("openchange", onOpenChange2);
    const fallbackEl = doc.createElement("span");
    fallbackEl.setAttribute("tabindex", "-1");
    fallbackEl.setAttribute("aria-hidden", "true");
    Object.assign(fallbackEl.style, HIDDEN_STYLES);
    if (isInsidePortal && domReference) {
      domReference.insertAdjacentElement("afterend", fallbackEl);
    }
    function getReturnElement() {
      if (typeof returnFocusRef.current === "boolean") {
        return getPreviouslyFocusedElement() || fallbackEl;
      }
      return returnFocusRef.current.current || fallbackEl;
    }
    return () => {
      events.off("openchange", onOpenChange2);
      const activeEl = activeElement(doc);
      const isFocusInsideFloatingTree = contains(floating, activeEl) || tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
        var _node$context5;
        return contains((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.floating, activeEl);
      });
      const shouldFocusReference = isFocusInsideFloatingTree || openEvent && ["click", "mousedown"].includes(openEvent.type);
      if (shouldFocusReference && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      const returnElement = getReturnElement();
      queueMicrotask(() => {
        if (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(returnElement) && // If the focus moved somewhere else after mount, avoid returning focus
          // since it likely entered a different element which should be
          // respected: https://github.com/floating-ui/floating-ui/issues/2607
          (returnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)
        ) {
          returnElement.focus({
            preventScroll: preventReturnFocusScroll
          });
        }
        fallbackEl.remove();
      });
    };
  }, [disabled, floating, floatingFocusElement, returnFocusRef, dataRef, refs, events, tree, nodeId, isInsidePortal, domReference]);
  React.useEffect(() => {
    queueMicrotask(() => {
      preventReturnFocusRef.current = false;
    });
  }, [disabled]);
  index(() => {
    if (disabled) return;
    if (!portalContext) return;
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange,
      refs
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, onOpenChange, refs, closeOnFocusOut]);
  index(() => {
    if (disabled) return;
    if (!floatingFocusElement) return;
    if (typeof MutationObserver !== "function") return;
    if (ignoreInitialFocus) return;
    const handleMutation = () => {
      const tabIndex = floatingFocusElement.getAttribute("tabindex");
      const tabbableContent = getTabbableContent();
      const activeEl = activeElement(getDocument(floating));
      const tabbableIndex = tabbableContent.indexOf(activeEl);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
      if (orderRef.current.includes("floating") || activeEl !== refs.domReference.current && tabbableContent.length === 0) {
        if (tabIndex !== "0") {
          floatingFocusElement.setAttribute("tabindex", "0");
        }
      } else if (tabIndex !== "-1") {
        floatingFocusElement.setAttribute("tabindex", "-1");
      }
    };
    handleMutation();
    const observer = new MutationObserver(handleMutation);
    observer.observe(floatingFocusElement, {
      childList: true,
      subtree: true,
      attributes: true
    });
    return () => {
      observer.disconnect();
    };
  }, [disabled, floating, floatingFocusElement, refs, orderRef, getTabbableContent, ignoreInitialFocus]);
  function renderDismissButton(location) {
    if (disabled || !visuallyHiddenDismiss || !modal) {
      return null;
    }
    return /* @__PURE__ */ React.createElement(VisuallyHiddenDismiss, {
      ref: location === "start" ? startDismissButtonRef : endDismissButtonRef,
      onClick: (event) => onOpenChange(false, event.nativeEvent)
    }, typeof visuallyHiddenDismiss === "string" ? visuallyHiddenDismiss : "Dismiss");
  }
  const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldRenderGuards && /* @__PURE__ */ React.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.beforeInsideRef,
    onFocus: (event) => {
      if (modal) {
        const els = getTabbableElements();
        enqueueFocus(order[0] === "reference" ? els[0] : els[els.length - 1]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        preventReturnFocusRef.current = false;
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const nextTabbable = getNextTabbable() || domReference;
          nextTabbable == null || nextTabbable.focus();
        } else {
          var _portalContext$before;
          (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
        }
      }
    }
  }), !isUntrappedTypeableCombobox && renderDismissButton("start"), children, renderDismissButton("end"), shouldRenderGuards && /* @__PURE__ */ React.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.afterInsideRef,
    onFocus: (event) => {
      if (modal) {
        enqueueFocus(getTabbableElements()[0]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        if (closeOnFocusOut) {
          preventReturnFocusRef.current = true;
        }
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const prevTabbable = getPreviousTabbable() || domReference;
          prevTabbable == null || prevTabbable.focus();
        } else {
          var _portalContext$afterO;
          (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
        }
      }
    }
  }));
}
let lockCount = 0;
function enableScrollLock() {
  const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
  const bodyStyle = document.body.style;
  const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
  const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.scrollX;
  const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.scrollY;
  bodyStyle.overflow = "hidden";
  if (scrollbarWidth) {
    bodyStyle[paddingProp] = scrollbarWidth + "px";
  }
  if (isIOS) {
    var _window$visualViewpor, _window$visualViewpor2;
    const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
    const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
    Object.assign(bodyStyle, {
      position: "fixed",
      top: -(scrollY - Math.floor(offsetTop)) + "px",
      left: -(scrollX - Math.floor(offsetLeft)) + "px",
      right: "0"
    });
  }
  return () => {
    Object.assign(bodyStyle, {
      overflow: "",
      [paddingProp]: ""
    });
    if (isIOS) {
      Object.assign(bodyStyle, {
        position: "",
        top: "",
        left: "",
        right: ""
      });
      window.scrollTo(scrollX, scrollY);
    }
  };
}
let cleanup = () => {
};
const FloatingOverlay = /* @__PURE__ */ React.forwardRef(function FloatingOverlay2(props, ref) {
  const {
    lockScroll = false,
    ...rest
  } = props;
  index(() => {
    if (!lockScroll) return;
    lockCount++;
    if (lockCount === 1) {
      cleanup = enableScrollLock();
    }
    return () => {
      lockCount--;
      if (lockCount === 0) {
        cleanup();
      }
    };
  }, [lockScroll]);
  return /* @__PURE__ */ React.createElement("div", _extends({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
function isButtonTarget(event) {
  return isHTMLElement(event.target) && event.target.tagName === "BUTTON";
}
function isSpaceIgnored(element) {
  return isTypeableElement(element);
}
function useClick(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    elements: {
      domReference
    }
  } = context;
  const {
    enabled = true,
    event: eventOption = "click",
    toggle = true,
    ignoreMouse = false,
    keyboardHandlers = true,
    stickIfOpen = true
  } = props;
  const pointerTypeRef = React.useRef();
  const didKeyDownRef = React.useRef(false);
  const reference = React.useMemo(() => ({
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onMouseDown(event) {
      const pointerType = pointerTypeRef.current;
      if (event.button !== 0) return;
      if (eventOption === "click") return;
      if (isMouseLikePointerType(pointerType) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === "mousedown" : true)) {
        onOpenChange(false, event.nativeEvent, "click");
      } else {
        event.preventDefault();
        onOpenChange(true, event.nativeEvent, "click");
      }
    },
    onClick(event) {
      const pointerType = pointerTypeRef.current;
      if (eventOption === "mousedown" && pointerTypeRef.current) {
        pointerTypeRef.current = void 0;
        return;
      }
      if (isMouseLikePointerType(pointerType) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === "click" : true)) {
        onOpenChange(false, event.nativeEvent, "click");
      } else {
        onOpenChange(true, event.nativeEvent, "click");
      }
    },
    onKeyDown(event) {
      pointerTypeRef.current = void 0;
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
        return;
      }
      if (event.key === " " && !isSpaceIgnored(domReference)) {
        event.preventDefault();
        didKeyDownRef.current = true;
      }
      if (event.key === "Enter") {
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, "click");
        } else {
          onOpenChange(true, event.nativeEvent, "click");
        }
      }
    },
    onKeyUp(event) {
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
        return;
      }
      if (event.key === " " && didKeyDownRef.current) {
        didKeyDownRef.current = false;
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, "click");
        } else {
          onOpenChange(true, event.nativeEvent, "click");
        }
      }
    }
  }), [dataRef, domReference, eventOption, ignoreMouse, keyboardHandlers, onOpenChange, open, stickIfOpen, toggle]);
  return React.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
const bubbleHandlerKeys = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
};
const captureHandlerKeys = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
};
const normalizeProp = (normalizable) => {
  var _normalizable$escapeK, _normalizable$outside;
  return {
    escapeKey: typeof normalizable === "boolean" ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
    outsidePress: typeof normalizable === "boolean" ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
  };
};
function useDismiss(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    elements,
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = "pointerdown",
    referencePress = false,
    referencePressEvent = "pointerdown",
    ancestorScroll = false,
    bubbles,
    capture
  } = props;
  const tree = useFloatingTree();
  const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === "function" ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === "function" ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = React.useRef(false);
  const endedOrStartedInsideRef = React.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const {
    escapeKey: escapeKeyCapture,
    outsidePress: outsidePressCapture
  } = normalizeProp(capture);
  const isComposingRef = React.useRef(false);
  const closeOnEscapeKeyDown = useEffectEvent((event) => {
    var _dataRef$current$floa;
    if (!open || !enabled || !escapeKey || event.key !== "Escape") {
      return;
    }
    if (isComposingRef.current) {
      return;
    }
    const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      event.stopPropagation();
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _child$context;
          if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event, "escape-key");
  });
  const closeOnEscapeKeyDownCapture = useEffectEvent((event) => {
    var _getTarget2;
    const callback = () => {
      var _getTarget;
      closeOnEscapeKeyDown(event);
      (_getTarget = getTarget(event)) == null || _getTarget.removeEventListener("keydown", callback);
    };
    (_getTarget2 = getTarget(event)) == null || _getTarget2.addEventListener("keydown", callback);
  });
  const closeOnPressOutside = useEffectEvent((event) => {
    var _dataRef$current$floa2;
    const insideReactTree = insideReactTreeRef.current;
    insideReactTreeRef.current = false;
    const endedOrStartedInside = endedOrStartedInsideRef.current;
    endedOrStartedInsideRef.current = false;
    if (outsidePressEvent === "click" && endedOrStartedInside) {
      return;
    }
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === "function" && !outsidePress(event)) {
      return;
    }
    const target = getTarget(event);
    const inertSelector = "[" + createAttribute("inert") + "]";
    const markers = getDocument(elements.floating).querySelectorAll(inertSelector);
    let targetRootAncestor = isElement(target) ? target : null;
    while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
      const nextParent = getParentNode(targetRootAncestor);
      if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
        break;
      }
      targetRootAncestor = nextParent;
    }
    if (markers.length && isElement(target) && !isRootElement(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !contains(target, elements.floating) && // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(markers).every((marker) => !contains(targetRootAncestor, marker))) {
      return;
    }
    if (isHTMLElement(target) && floating) {
      const canScrollX = target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      let xCond = canScrollY && event.offsetX > target.clientWidth;
      if (canScrollY) {
        const isRTL2 = getComputedStyle$1(target).direction === "rtl";
        if (isRTL2) {
          xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
        }
      }
      if (xCond || canScrollX && event.offsetY > target.clientHeight) {
        return;
      }
    }
    const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
    const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
      var _node$context;
      return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
    });
    if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach((child) => {
        var _child$context2;
        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
          return;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    onOpenChange(false, event, "outside-press");
  });
  const closeOnPressOutsideCapture = useEffectEvent((event) => {
    var _getTarget4;
    const callback = () => {
      var _getTarget3;
      closeOnPressOutside(event);
      (_getTarget3 = getTarget(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
    };
    (_getTarget4 = getTarget(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
  });
  React.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    let compositionTimeout = -1;
    function onScroll(event) {
      onOpenChange(false, event, "ancestor-scroll");
    }
    function handleCompositionStart() {
      window.clearTimeout(compositionTimeout);
      isComposingRef.current = true;
    }
    function handleCompositionEnd() {
      compositionTimeout = window.setTimeout(
        () => {
          isComposingRef.current = false;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        isWebKit() ? 5 : 0
      );
    }
    const doc = getDocument(elements.floating);
    if (escapeKey) {
      doc.addEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
      doc.addEventListener("compositionstart", handleCompositionStart);
      doc.addEventListener("compositionend", handleCompositionEnd);
    }
    outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement(elements.domReference)) {
        ancestors = getOverflowAncestors(elements.domReference);
      }
      if (isElement(elements.floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
      }
      if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
      }
    }
    ancestors = ancestors.filter((ancestor) => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    return () => {
      if (escapeKey) {
        doc.removeEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
        doc.removeEventListener("compositionstart", handleCompositionStart);
        doc.removeEventListener("compositionend", handleCompositionEnd);
      }
      outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener("scroll", onScroll);
      });
      window.clearTimeout(compositionTimeout);
    };
  }, [dataRef, elements, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
  React.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  const reference = React.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    [bubbleHandlerKeys[referencePressEvent]]: (event) => {
      if (referencePress) {
        onOpenChange(false, event.nativeEvent, "reference-press");
      }
    }
  }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
  const floating = React.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    onMouseDown() {
      endedOrStartedInsideRef.current = true;
    },
    onMouseUp() {
      endedOrStartedInsideRef.current = true;
    },
    [captureHandlerKeys[outsidePressEvent]]: () => {
      insideReactTreeRef.current = true;
    }
  }), [closeOnEscapeKeyDown, outsidePressEvent]);
  return React.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = React.useRef({});
  const [events] = React.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  const [positionReference, setPositionReference] = React.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = React.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = React.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return React.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = React.useState(null);
  const [positionReference, _setPositionReference] = React.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = React.useRef(null);
  const tree = useFloatingTree();
  index(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating$1({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = React.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = React.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
const ACTIVE_KEY = "active";
const SELECTED_KEY = "selected";
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  let domUserProps = userProps;
  if (isItem && userProps) {
    const {
      [ACTIVE_KEY]: _,
      [SELECTED_KEY]: __,
      ...validProps
    } = userProps;
    domUserProps = validProps;
  }
  return {
    ...elementKey === "floating" && {
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: ""
    },
    ...domUserProps,
    ...propsList.map((value) => {
      const propsOrGetProps = value ? value[elementKey] : null;
      if (typeof propsOrGetProps === "function") {
        return userProps ? propsOrGetProps(userProps) : null;
      }
      return propsOrGetProps;
    }).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
          return;
        }
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
  const getReferenceProps = React.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps
  );
  const getFloatingProps = React.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps
  );
  const getItemProps = React.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps
  );
  return React.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
let isPreventScrollSupported = false;
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical;
    case "horizontal":
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key === " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  return doSwitch(orientation, vertical, horizontal);
}
function useListNavigation(context, props) {
  const {
    open,
    onOpenChange,
    elements
  } = context;
  const {
    listRef,
    activeIndex,
    onNavigate: unstable_onNavigate = () => {
    },
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = "vertical",
    cols = 1,
    scrollItemIntoView = true,
    virtualItemRef,
    itemSizes,
    dense = false
  } = props;
  const floatingFocusElement = getFloatingFocusElement(elements.floating);
  const floatingFocusElementRef = useLatestRef(floatingFocusElement);
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const onNavigate = useEffectEvent(unstable_onNavigate);
  const typeableComboboxReference = isTypeableCombobox(elements.domReference);
  const focusItemOnOpenRef = React.useRef(focusItemOnOpen);
  const indexRef = React.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = React.useRef(null);
  const isPointerModalityRef = React.useRef(true);
  const previousOnNavigateRef = React.useRef(onNavigate);
  const previousMountedRef = React.useRef(!!elements.floating);
  const previousOpenRef = React.useRef(open);
  const forceSyncFocus = React.useRef(false);
  const forceScrollIntoViewRef = React.useRef(false);
  const disabledIndicesRef = useLatestRef(disabledIndices);
  const latestOpenRef = useLatestRef(open);
  const scrollItemIntoViewRef = useLatestRef(scrollItemIntoView);
  const selectedIndexRef = useLatestRef(selectedIndex);
  const [activeId, setActiveId] = React.useState();
  const [virtualId, setVirtualId] = React.useState();
  const focusItem = useEffectEvent(function(listRef2, indexRef2, forceScrollIntoView) {
    if (forceScrollIntoView === void 0) {
      forceScrollIntoView = false;
    }
    function runFocus(item2) {
      if (virtual) {
        setActiveId(item2.id);
        tree == null || tree.events.emit("virtualfocus", item2);
        if (virtualItemRef) {
          virtualItemRef.current = item2;
        }
      } else {
        enqueueFocus(item2, {
          preventScroll: true,
          // Mac Safari does not move the virtual cursor unless the focus call
          // is sync. However, for the very first focus call, we need to wait
          // for the position to be ready in order to prevent unwanted
          // scrolling. This means the virtual cursor will not move to the first
          // item when first opening the floating element, but will on
          // subsequent calls. `preventScroll` is supported in modern Safari,
          // so we can use that instead.
          // iOS Safari must be async or the first item will not be focused.
          sync: isMac() && isSafari() ? isPreventScrollSupported || forceSyncFocus.current : false
        });
      }
    }
    const initialItem = listRef2.current[indexRef2.current];
    if (initialItem) {
      runFocus(initialItem);
    }
    requestAnimationFrame(() => {
      const waitedItem = listRef2.current[indexRef2.current] || initialItem;
      if (!waitedItem) return;
      if (!initialItem) {
        runFocus(waitedItem);
      }
      const scrollIntoViewOptions = scrollItemIntoViewRef.current;
      const shouldScrollIntoView = scrollIntoViewOptions && item && (forceScrollIntoView || !isPointerModalityRef.current);
      if (shouldScrollIntoView) {
        waitedItem.scrollIntoView == null || waitedItem.scrollIntoView(typeof scrollIntoViewOptions === "boolean" ? {
          block: "nearest",
          inline: "nearest"
        } : scrollIntoViewOptions);
      }
    });
  });
  index(() => {
    document.createElement("div").focus({
      get preventScroll() {
        isPreventScrollSupported = true;
        return false;
      }
    });
  }, []);
  index(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true;
        indexRef.current = selectedIndex;
        onNavigate(selectedIndex);
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1;
      previousOnNavigateRef.current(null);
    }
  }, [enabled, open, elements.floating, selectedIndex, onNavigate]);
  index(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (activeIndex == null) {
        forceSyncFocus.current = false;
        if (selectedIndexRef.current != null) {
          return;
        }
        if (previousMountedRef.current) {
          indexRef.current = -1;
          focusItem(listRef, indexRef);
        }
        if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          let runs = 0;
          const waitForListPopulated = () => {
            if (listRef.current[0] == null) {
              if (runs < 2) {
                const scheduler = runs ? requestAnimationFrame : queueMicrotask;
                scheduler(waitForListPopulated);
              }
              runs++;
            } else {
              indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
              keyRef.current = null;
              onNavigate(indexRef.current);
            }
          };
          waitForListPopulated();
        }
      } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem(listRef, indexRef, forceScrollIntoViewRef.current);
        forceScrollIntoViewRef.current = false;
      }
    }
  }, [enabled, open, elements.floating, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);
  index(() => {
    var _nodes$find;
    if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = (_nodes$find = nodes.find((node) => node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
    const activeEl = activeElement(getDocument(elements.floating));
    const treeContainsActiveEl = nodes.some((node) => node.context && contains(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, elements.floating, tree, parentId, virtual]);
  index(() => {
    if (!enabled) return;
    if (!tree) return;
    if (!virtual) return;
    if (parentId) return;
    function handleVirtualFocus(item2) {
      setVirtualId(item2.id);
      if (virtualItemRef) {
        virtualItemRef.current = item2;
      }
    }
    tree.events.on("virtualfocus", handleVirtualFocus);
    return () => {
      tree.events.off("virtualfocus", handleVirtualFocus);
    };
  }, [enabled, tree, virtual, parentId, virtualItemRef]);
  index(() => {
    previousOnNavigateRef.current = onNavigate;
    previousMountedRef.current = !!elements.floating;
  });
  index(() => {
    if (!open) {
      keyRef.current = null;
    }
  }, [open]);
  index(() => {
    previousOpenRef.current = open;
  }, [open]);
  const hasActiveIndex = activeIndex != null;
  const item = React.useMemo(() => {
    function syncCurrentTarget(currentTarget) {
      if (!open) return;
      const index2 = listRef.current.indexOf(currentTarget);
      if (index2 !== -1) {
        onNavigate(index2);
      }
    }
    const props2 = {
      onFocus(_ref) {
        let {
          currentTarget
        } = _ref;
        syncCurrentTarget(currentTarget);
      },
      onClick: (_ref2) => {
        let {
          currentTarget
        } = _ref2;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      // Safari
      ...focusItemOnHover && {
        onMouseMove(_ref3) {
          let {
            currentTarget
          } = _ref3;
          syncCurrentTarget(currentTarget);
        },
        onPointerLeave(_ref4) {
          let {
            pointerType
          } = _ref4;
          if (!isPointerModalityRef.current || pointerType === "touch") {
            return;
          }
          indexRef.current = -1;
          focusItem(listRef, indexRef);
          onNavigate(null);
          if (!virtual) {
            enqueueFocus(floatingFocusElementRef.current, {
              preventScroll: true
            });
          }
        }
      }
    };
    return props2;
  }, [open, floatingFocusElementRef, focusItem, focusItemOnHover, listRef, onNavigate, virtual]);
  const commonOnKeyDown = useEffectEvent((event) => {
    isPointerModalityRef.current = false;
    forceSyncFocus.current = true;
    if (event.which === 229) {
      return;
    }
    if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
      return;
    }
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
      stopEvent(event);
      onOpenChange(false, event.nativeEvent, "list-navigation");
      if (isHTMLElement(elements.domReference)) {
        if (virtual) {
          tree == null || tree.events.emit("virtualfocus", elements.domReference);
        } else {
          elements.domReference.focus();
        }
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = getMinIndex(listRef, disabledIndices);
    const maxIndex = getMaxIndex(listRef, disabledIndices);
    if (!typeableComboboxReference) {
      if (event.key === "Home") {
        stopEvent(event);
        indexRef.current = minIndex;
        onNavigate(indexRef.current);
      }
      if (event.key === "End") {
        stopEvent(event);
        indexRef.current = maxIndex;
        onNavigate(indexRef.current);
      }
    }
    if (cols > 1) {
      const sizes = itemSizes || Array.from({
        length: listRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index3) => index3 != null && !isDisabled(listRef.current, index3, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index3, cellIndex) => index3 != null && !isDisabled(listRef.current, index3, disabledIndices) ? cellIndex : foundIndex, -1);
      const index2 = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        rtl,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...disabledIndices || listRef.current.map((_, index3) => isDisabled(listRef.current, index3) ? index3 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(
          indexRef.current > maxIndex ? minIndex : indexRef.current,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction
          // we're moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT) ? "tr" : "tl"
        ),
        stopEvent: true
      })];
      if (index2 != null) {
        indexRef.current = index2;
        onNavigate(indexRef.current);
      }
      if (orientation === "both") {
        return;
      }
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event);
      if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(indexRef.current);
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          });
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else {
        if (loop) {
          indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
      }
      if (isIndexOutOfBounds(listRef, indexRef.current)) {
        onNavigate(null);
      } else {
        onNavigate(indexRef.current);
      }
    }
  });
  const ariaActiveDescendantProp = React.useMemo(() => {
    return virtual && open && hasActiveIndex && {
      "aria-activedescendant": virtualId || activeId
    };
  }, [virtual, open, hasActiveIndex, virtualId, activeId]);
  const floating = React.useMemo(() => {
    return {
      "aria-orientation": orientation === "both" ? void 0 : orientation,
      ...!isTypeableCombobox(elements.domReference) && ariaActiveDescendantProp,
      onKeyDown: commonOnKeyDown,
      onPointerMove() {
        isPointerModalityRef.current = true;
      }
    };
  }, [ariaActiveDescendantProp, commonOnKeyDown, elements.domReference, orientation]);
  const reference = React.useMemo(() => {
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    return {
      ...ariaActiveDescendantProp,
      onKeyDown(event) {
        isPointerModalityRef.current = false;
        const isArrowKey = event.key.startsWith("Arrow");
        const isHomeOrEndKey = ["Home", "End"].includes(event.key);
        const isMoveKey = isArrowKey || isHomeOrEndKey;
        const isCrossOpenKey = isCrossOrientationOpenKey(event.key, orientation, rtl);
        const isCrossCloseKey = isCrossOrientationCloseKey(event.key, orientation, rtl);
        const isMainKey = isMainOrientationKey(event.key, orientation);
        const isNavigationKey = (nested ? isCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
        if (virtual && open) {
          const rootNode = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.parentId == null);
          const deepestNode = tree && rootNode ? getDeepestNode(tree.nodesRef.current, rootNode.id) : null;
          if (isMoveKey && deepestNode && virtualItemRef) {
            const eventObject = new KeyboardEvent("keydown", {
              key: event.key,
              bubbles: true
            });
            if (isCrossOpenKey || isCrossCloseKey) {
              var _deepestNode$context, _deepestNode$context2;
              const isCurrentTarget = ((_deepestNode$context = deepestNode.context) == null ? void 0 : _deepestNode$context.elements.domReference) === event.currentTarget;
              const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? listRef.current.find((item2) => (item2 == null ? void 0 : item2.id) === activeId) : null;
              if (dispatchItem) {
                stopEvent(event);
                dispatchItem.dispatchEvent(eventObject);
                setVirtualId(void 0);
              }
            }
            if ((isMainKey || isHomeOrEndKey) && deepestNode.context) {
              if (deepestNode.context.open && deepestNode.parentId && event.currentTarget !== deepestNode.context.elements.domReference) {
                var _deepestNode$context$;
                stopEvent(event);
                (_deepestNode$context$ = deepestNode.context.elements.domReference) == null || _deepestNode$context$.dispatchEvent(eventObject);
                return;
              }
            }
          }
          return commonOnKeyDown(event);
        }
        if (!open && !openOnArrowKeyDown && isArrowKey) {
          return;
        }
        if (isNavigationKey) {
          keyRef.current = nested && isMainKey ? null : event.key;
        }
        if (nested) {
          if (isCrossOpenKey) {
            stopEvent(event);
            if (open) {
              indexRef.current = getMinIndex(listRef, disabledIndicesRef.current);
              onNavigate(indexRef.current);
            } else {
              onOpenChange(true, event.nativeEvent, "list-navigation");
            }
          }
          return;
        }
        if (isMainKey) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }
          stopEvent(event);
          if (!open && openOnArrowKeyDown) {
            onOpenChange(true, event.nativeEvent, "list-navigation");
          } else {
            commonOnKeyDown(event);
          }
          if (open) {
            onNavigate(indexRef.current);
          }
        }
      },
      onFocus() {
        if (open && !virtual) {
          onNavigate(null);
        }
      },
      onPointerDown: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    };
  }, [activeId, ariaActiveDescendantProp, commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, onOpenChange, open, openOnArrowKeyDown, orientation, rtl, selectedIndex, tree, virtual, virtualItemRef]);
  return React.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}
const componentRoleToAriaRoleMap = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", false]]);
function useRole(context, props) {
  var _componentRoleToAriaR;
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    floatingId
  } = context;
  const {
    enabled = true,
    role = "dialog"
  } = props;
  const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
  const referenceId = useId();
  const parentId = useFloatingParentNodeId();
  const isNested = parentId != null;
  const reference = React.useMemo(() => {
    if (ariaRole === "tooltip" || role === "label") {
      return {
        ["aria-" + (role === "label" ? "labelledby" : "describedby")]: open ? floatingId : void 0
      };
    }
    return {
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
      "aria-controls": open ? floatingId : void 0,
      ...ariaRole === "listbox" && {
        role: "combobox"
      },
      ...ariaRole === "menu" && {
        id: referenceId
      },
      ...ariaRole === "menu" && isNested && {
        role: "menuitem"
      },
      ...role === "select" && {
        "aria-autocomplete": "none"
      },
      ...role === "combobox" && {
        "aria-autocomplete": "list"
      }
    };
  }, [ariaRole, floatingId, isNested, open, referenceId, role]);
  const floating = React.useMemo(() => {
    const floatingProps = {
      id: floatingId,
      ...ariaRole && {
        role: ariaRole
      }
    };
    if (ariaRole === "tooltip" || role === "label") {
      return floatingProps;
    }
    return {
      ...floatingProps,
      ...ariaRole === "menu" && {
        "aria-labelledby": referenceId
      }
    };
  }, [ariaRole, floatingId, referenceId, role]);
  const item = React.useCallback((_ref) => {
    let {
      active,
      selected
    } = _ref;
    const commonProps = {
      role: "option",
      ...active && {
        id: floatingId + "-option"
      }
    };
    switch (role) {
      case "select":
        return {
          ...commonProps,
          "aria-selected": active && selected
        };
      case "combobox": {
        return {
          ...commonProps,
          ...active && {
            "aria-selected": true
          }
        };
      }
    }
    return {};
  }, [floatingId, role]);
  return React.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}
function useTypeahead(context, props) {
  var _ref;
  const {
    open,
    dataRef
  } = context;
  const {
    listRef,
    activeIndex,
    onMatch: unstable_onMatch,
    onTypingChange: unstable_onTypingChange,
    enabled = true,
    findMatch = null,
    resetMs = 750,
    ignoreKeys = [],
    selectedIndex = null
  } = props;
  const timeoutIdRef = React.useRef();
  const stringRef = React.useRef("");
  const prevIndexRef = React.useRef((_ref = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref : -1);
  const matchIndexRef = React.useRef(null);
  const onMatch = useEffectEvent(unstable_onMatch);
  const onTypingChange = useEffectEvent(unstable_onTypingChange);
  const findMatchRef = useLatestRef(findMatch);
  const ignoreKeysRef = useLatestRef(ignoreKeys);
  index(() => {
    if (open) {
      clearTimeout(timeoutIdRef.current);
      matchIndexRef.current = null;
      stringRef.current = "";
    }
  }, [open]);
  index(() => {
    if (open && stringRef.current === "") {
      var _ref2;
      prevIndexRef.current = (_ref2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref2 : -1;
    }
  }, [open, selectedIndex, activeIndex]);
  const setTypingChange = useEffectEvent((value) => {
    if (value) {
      if (!dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange(value);
      }
    } else {
      if (dataRef.current.typing) {
        dataRef.current.typing = value;
        onTypingChange(value);
      }
    }
  });
  const onKeyDown = useEffectEvent((event) => {
    function getMatchingIndex(list, orderedList, string) {
      const str = findMatchRef.current ? findMatchRef.current(orderedList, string) : orderedList.find((text) => (text == null ? void 0 : text.toLocaleLowerCase().indexOf(string.toLocaleLowerCase())) === 0);
      return str ? list.indexOf(str) : -1;
    }
    const listContent = listRef.current;
    if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
      if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
        setTypingChange(false);
      } else if (event.key === " ") {
        stopEvent(event);
      }
    }
    if (listContent == null || ignoreKeysRef.current.includes(event.key) || // Character key.
    event.key.length !== 1 || // Modifier key.
    event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (open && event.key !== " ") {
      stopEvent(event);
      setTypingChange(true);
    }
    const allowRapidSuccessionOfFirstLetter = listContent.every((text) => {
      var _text$, _text$2;
      return text ? ((_text$ = text[0]) == null ? void 0 : _text$.toLocaleLowerCase()) !== ((_text$2 = text[1]) == null ? void 0 : _text$2.toLocaleLowerCase()) : true;
    });
    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = "";
      prevIndexRef.current = matchIndexRef.current;
    }
    stringRef.current += event.key;
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      stringRef.current = "";
      prevIndexRef.current = matchIndexRef.current;
      setTypingChange(false);
    }, resetMs);
    const prevIndex = prevIndexRef.current;
    const index2 = getMatchingIndex(listContent, [...listContent.slice((prevIndex || 0) + 1), ...listContent.slice(0, (prevIndex || 0) + 1)], stringRef.current);
    if (index2 !== -1) {
      onMatch(index2);
      matchIndexRef.current = index2;
    } else if (event.key !== " ") {
      stringRef.current = "";
      setTypingChange(false);
    }
  });
  const reference = React.useMemo(() => ({
    onKeyDown
  }), [onKeyDown]);
  const floating = React.useMemo(() => {
    return {
      onKeyDown,
      onKeyUp(event) {
        if (event.key === " ") {
          setTypingChange(false);
        }
      }
    };
  }, [onKeyDown, setTypingChange]);
  return React.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}
function getArgsWithCustomFloatingHeight(state, height) {
  return {
    ...state,
    rects: {
      ...state.rects,
      floating: {
        ...state.rects.floating,
        height
      }
    }
  };
}
const inner = (props) => ({
  name: "inner",
  options: props,
  async fn(state) {
    const {
      listRef,
      overflowRef,
      onFallbackChange,
      offset: innerOffset = 0,
      index: index2 = 0,
      minItemsVisible = 4,
      referenceOverflowThreshold = 0,
      scrollRef,
      ...detectOverflowOptions
    } = evaluate(props, state);
    const {
      rects,
      elements: {
        floating
      }
    } = state;
    const item = listRef.current[index2];
    const scrollEl = (scrollRef == null ? void 0 : scrollRef.current) || floating;
    const clientTop = floating.clientTop || scrollEl.clientTop;
    const floatingIsBordered = floating.clientTop !== 0;
    const scrollElIsBordered = scrollEl.clientTop !== 0;
    const floatingIsScrollEl = floating === scrollEl;
    if (!item) {
      return {};
    }
    const nextArgs = {
      ...state,
      ...await offset(-item.offsetTop - floating.clientTop - rects.reference.height / 2 - item.offsetHeight / 2 - innerOffset).fn(state)
    };
    const overflow = await detectOverflow(getArgsWithCustomFloatingHeight(nextArgs, scrollEl.scrollHeight + clientTop + floating.clientTop), detectOverflowOptions);
    const refOverflow = await detectOverflow(nextArgs, {
      ...detectOverflowOptions,
      elementContext: "reference"
    });
    const diffY = max(0, overflow.top);
    const nextY = nextArgs.y + diffY;
    const isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight;
    const rounder = isScrollable ? (v) => v : round;
    const maxHeight = rounder(max(0, scrollEl.scrollHeight + (floatingIsBordered && floatingIsScrollEl || scrollElIsBordered ? clientTop * 2 : 0) - diffY - max(0, overflow.bottom)));
    scrollEl.style.maxHeight = maxHeight + "px";
    scrollEl.scrollTop = diffY;
    if (onFallbackChange) {
      const shouldFallback = scrollEl.offsetHeight < item.offsetHeight * min(minItemsVisible, listRef.current.length) - 1 || refOverflow.top >= -referenceOverflowThreshold || refOverflow.bottom >= -referenceOverflowThreshold;
      ReactDOM.flushSync(() => onFallbackChange(shouldFallback));
    }
    if (overflowRef) {
      overflowRef.current = await detectOverflow(getArgsWithCustomFloatingHeight({
        ...nextArgs,
        y: nextY
      }, scrollEl.offsetHeight + clientTop + floating.clientTop), detectOverflowOptions);
    }
    return {
      y: nextY
    };
  }
});
function useInnerOffset(context, props) {
  const {
    open,
    elements
  } = context;
  const {
    enabled = true,
    overflowRef,
    scrollRef,
    onChange: unstable_onChange
  } = props;
  const onChange = useEffectEvent(unstable_onChange);
  const controlledScrollingRef = React.useRef(false);
  const prevScrollTopRef = React.useRef(null);
  const initialOverflowRef = React.useRef(null);
  React.useEffect(() => {
    if (!enabled) return;
    function onWheel(e) {
      if (e.ctrlKey || !el || overflowRef.current == null) {
        return;
      }
      const dY = e.deltaY;
      const isAtTop = overflowRef.current.top >= -0.5;
      const isAtBottom = overflowRef.current.bottom >= -0.5;
      const remainingScroll = el.scrollHeight - el.clientHeight;
      const sign = dY < 0 ? -1 : 1;
      const method = dY < 0 ? "max" : "min";
      if (el.scrollHeight <= el.clientHeight) {
        return;
      }
      if (!isAtTop && dY > 0 || !isAtBottom && dY < 0) {
        e.preventDefault();
        ReactDOM.flushSync(() => {
          onChange((d) => d + Math[method](dY, remainingScroll * sign));
        });
      } else if (/firefox/i.test(getUserAgent())) {
        el.scrollTop += dY;
      }
    }
    const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
    if (open && el) {
      el.addEventListener("wheel", onWheel);
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
        if (overflowRef.current != null) {
          initialOverflowRef.current = {
            ...overflowRef.current
          };
        }
      });
      return () => {
        prevScrollTopRef.current = null;
        initialOverflowRef.current = null;
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, [enabled, open, elements.floating, overflowRef, scrollRef, onChange]);
  const floating = React.useMemo(() => ({
    onKeyDown() {
      controlledScrollingRef.current = true;
    },
    onWheel() {
      controlledScrollingRef.current = false;
    },
    onPointerMove() {
      controlledScrollingRef.current = false;
    },
    onScroll() {
      const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
      if (!overflowRef.current || !el || !controlledScrollingRef.current) {
        return;
      }
      if (prevScrollTopRef.current !== null) {
        const scrollDiff = el.scrollTop - prevScrollTopRef.current;
        if (overflowRef.current.bottom < -0.5 && scrollDiff < -1 || overflowRef.current.top < -0.5 && scrollDiff > 1) {
          ReactDOM.flushSync(() => onChange((d) => d + scrollDiff));
        }
      }
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
      });
    }
  }), [elements.floating, onChange, overflowRef, scrollRef]);
  return React.useMemo(() => enabled ? {
    floating
  } : {}, [enabled, floating]);
}
const Separator = styled(Stack, {
  name: "Separator",
  borderColor: "$borderColor",
  flexShrink: 0,
  borderWidth: 0,
  flex: 1,
  height: 0,
  maxHeight: 0,
  borderBottomWidth: 1,
  y: -0.5,
  variants: {
    vertical: {
      true: {
        y: 0,
        x: -0.5,
        height: "initial",
        // maxHeight auto WILL BE passed to style attribute, but for some reason not used?
        // almost seems like a react or browser bug, but for now `initial` works
        // also, it doesn't happen for `height`, but for consistency using the same values
        maxHeight: "initial",
        width: 0,
        maxWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 1
      }
    }
  }
});
function debounce(func, wait, leading) {
  let timeout, isCancelled = false;
  function debounced() {
    isCancelled = false;
    const args = arguments;
    leading && !timeout && func.apply(this, args), clearTimeout(timeout), timeout = setTimeout(() => {
      timeout = null, leading || isCancelled || func.apply(this, args), isCancelled = false;
    }, wait);
  }
  return debounced.cancel = () => {
    isCancelled = true;
  }, debounced;
}
const defaultOpts = {
  leading: false
};
function useDebounce(fn, wait, options = defaultOpts, mountArgs = [fn]) {
  const dbEffect = React.useRef(null);
  return React.useEffect(() => () => {
    var _a;
    (_a = dbEffect.current) == null ? void 0 : _a.cancel();
  }, []), React.useMemo(() => (dbEffect.current = debounce(fn, wait, options.leading), dbEffect.current), [options.leading, ...mountArgs]);
}
const SELECT_NAME = "Select", SCROLL_ARROW_THRESHOLD = 8, VIEWPORT_NAME = "SelectViewport";
const [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME), [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
createContextScope(SELECT_NAME);
const [SelectItemParentProvider, useSelectItemParentContext] = createSelectContext(SELECT_NAME), ForwardSelectContext = ({
  __scopeSelect,
  context,
  itemContext,
  children
}) => /* @__PURE__ */ jsx(SelectProvider, {
  isInSheet: true,
  scope: __scopeSelect,
  ...context,
  children: /* @__PURE__ */ jsx(SelectItemParentProvider, {
    scope: __scopeSelect,
    ...itemContext,
    children
  })
});
const useShowSelectSheet = (context) => {
  const breakpointActive = useAdaptIsActive();
  return context.open === false ? false : breakpointActive;
};
const CONTENT_NAME = "SelectContent", SelectContent = ({
  children,
  __scopeSelect,
  zIndex: zIndex2 = 1e3,
  ...focusScopeProps
}) => {
  const context = useSelectContext(CONTENT_NAME, __scopeSelect), itemParentContext = useSelectItemParentContext(CONTENT_NAME, __scopeSelect), themeName = useThemeName(), showSheet = useShowSelectSheet(context), contents = /* @__PURE__ */ jsx(Theme, {
    forceClassName: true,
    name: themeName,
    children
  }), touch = useIsTouchDevice(), overlayStyle = React__default.useMemo(() => ({
    zIndex: zIndex2,
    pointerEvents: context.open ? "auto" : "none"
  }), [context.open]);
  return itemParentContext.shouldRenderWebNative ? /* @__PURE__ */ jsx(Fragment, {
    children
  }) : showSheet ? context.open ? /* @__PURE__ */ jsx(Fragment, {
    children: contents
  }) : null : /* @__PURE__ */ jsx(FloatingPortal, {
    children: /* @__PURE__ */ jsx(FloatingOverlay, {
      style: overlayStyle,
      lockScroll: !context.disablePreventBodyScroll && !!context.open && !touch,
      children: /* @__PURE__ */ jsx(FocusScope, {
        loop: true,
        enabled: !!context.open,
        trapped: true,
        ...focusScopeProps,
        children: contents
      })
    })
  });
};
const SelectInlineImpl = (props) => {
  const {
    __scopeSelect,
    children,
    open = false,
    selectedIndexRef,
    listContentRef
  } = props, selectContext = useSelectContext("SelectSheetImpl", __scopeSelect), selectItemParentContext = useSelectItemParentContext("SelectSheetImpl", __scopeSelect), {
    setActiveIndex,
    selectedIndex,
    activeIndex,
    forceUpdate
  } = selectContext, {
    setOpen,
    setSelectedIndex
  } = selectItemParentContext, [scrollTop, setScrollTop] = React.useState(0), touch = useIsTouchDevice(), listItemsRef = React.useRef([]), overflowRef = React.useRef(null), upArrowRef = React.useRef(null), downArrowRef = React.useRef(null), allowSelectRef = React.useRef(false), allowMouseUpRef = React.useRef(true), selectTimeoutRef = React.useRef(), state = React.useRef({
    isMouseOutside: false,
    isTyping: false
  }), [controlledScrolling, setControlledScrolling] = React.useState(false), [fallback, setFallback] = React.useState(false), [innerOffset, setInnerOffset] = React.useState(0), [blockSelection, setBlockSelection] = React.useState(false), floatingStyle = React.useRef({});
  useIsomorphicLayoutEffect$2(() => {
    queueMicrotask(() => {
      open || (setScrollTop(0), setFallback(false), setActiveIndex(null), setControlledScrolling(false));
    });
  }, [open, setActiveIndex]), isClient && useIsomorphicLayoutEffect$2(() => {
    if (!open) return;
    const mouseUp = (e) => {
      state.current.isMouseOutside && setOpen(false);
    };
    return document.addEventListener("mouseup", mouseUp), () => {
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [open]);
  const {
    x,
    y,
    strategy,
    context,
    refs,
    update
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    // biome-ignore lint/correctness/noConstantCondition: <explanation>
    middleware: [size$1({
      apply({
        rects: {
          reference: {
            width
          }
        }
      }) {
        Object.assign(floatingStyle.current, {
          minWidth: width + 8
        }), refs.floating.current && Object.assign(refs.floating.current.style, floatingStyle.current);
      }
    }), inner({
      listRef: listItemsRef,
      overflowRef,
      index: selectedIndex,
      offset: innerOffset,
      onFallbackChange: setFallback,
      padding: 10,
      minItemsVisible: touch ? 10 : 4,
      referenceOverflowThreshold: 20
    }), offset({
      crossAxis: -5
    })]
  }), floatingRef = refs.floating, showUpArrow = open && scrollTop > SCROLL_ARROW_THRESHOLD, showDownArrow = open && floatingRef.current && scrollTop < floatingRef.current.scrollHeight - floatingRef.current.clientHeight - SCROLL_ARROW_THRESHOLD, isScrollable = showDownArrow || showUpArrow;
  useIsomorphicLayoutEffect$2(() => (window.addEventListener("resize", update), open && update(), () => window.removeEventListener("resize", update)), [update, open]);
  const onMatch = useEvent((index2) => (open ? setActiveIndex : setSelectedIndex)(index2)), interactionsProps = [useClick(context, {
    event: "mousedown",
    keyboardHandlers: false
  }), useDismiss(context, {
    outsidePress: false
  }), useRole(context, {
    role: "listbox"
  }), useInnerOffset(context, {
    enabled: !fallback && isScrollable,
    onChange: setInnerOffset,
    overflowRef,
    scrollRef: refs.floating
  }), useListNavigation(context, {
    listRef: listItemsRef,
    activeIndex: activeIndex || 0,
    selectedIndex,
    onNavigate: setActiveIndex,
    scrollItemIntoView: false
  }), useTypeahead(context, {
    listRef: listContentRef,
    onMatch,
    selectedIndex,
    activeIndex,
    onTypingChange: (e) => {
      state.current.isTyping = e;
    }
  })], interactions = useInteractions(
    // unfortunately these memos will just always break due to floating-ui context always changing :/
    React.useMemo(() => interactionsProps, interactionsProps)
  ), interactionsContext = React.useMemo(() => ({
    ...interactions,
    getReferenceProps() {
      return interactions.getReferenceProps({
        ref: refs.reference,
        className: "SelectTrigger",
        onKeyDown(event) {
          (event.key === "Enter" || event.code === "Space" || event.key === " " && !state.current.isTyping) && (event.preventDefault(), setOpen(true));
        }
      });
    },
    getFloatingProps(props2) {
      return interactions.getFloatingProps({
        ref: refs.floating,
        className: "Select",
        ...props2,
        style: {
          position: strategy,
          top: y ?? "",
          left: x ?? "",
          outline: 0,
          scrollbarWidth: "none",
          ...floatingStyle.current,
          ...props2 == null ? void 0 : props2.style
        },
        onPointerEnter() {
          setControlledScrolling(false), state.current.isMouseOutside = false;
        },
        onPointerLeave() {
          state.current.isMouseOutside = true;
        },
        onPointerMove() {
          state.current.isMouseOutside = false, setControlledScrolling(false);
        },
        onKeyDown() {
          setControlledScrolling(true);
        },
        onContextMenu(e) {
          e.preventDefault();
        },
        onScroll(event) {
          flushSync(() => {
            setScrollTop(event.currentTarget.scrollTop);
          });
        }
      });
    }
  }), [refs.reference.current, x, y, refs.floating.current, interactions]);
  return useIsomorphicLayoutEffect$2(() => {
    if (open) return selectTimeoutRef.current = setTimeout(() => {
      allowSelectRef.current = true;
    }, 300), () => {
      clearTimeout(selectTimeoutRef.current);
    };
    allowSelectRef.current = false, allowMouseUpRef.current = true, setInnerOffset(0), setFallback(false), setBlockSelection(false);
  }, [open]), useIsomorphicLayoutEffect$2(() => {
    !open && state.current.isMouseOutside && (state.current.isMouseOutside = false);
  }, [open]), useIsomorphicLayoutEffect$2(() => {
    function onPointerDown(e) {
      var _a, _b, _c;
      const target = e.target;
      ((_a = refs.floating.current) == null ? void 0 : _a.contains(target)) || ((_b = upArrowRef.current) == null ? void 0 : _b.contains(target)) || ((_c = downArrowRef.current) == null ? void 0 : _c.contains(target)) || (setOpen(false), setControlledScrolling(false));
    }
    if (open) return document.addEventListener("pointerdown", onPointerDown), () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, refs, setOpen]), React.useEffect(() => {
    var _a, _b;
    open && controlledScrolling && activeIndex != null && ((_a = listItemsRef.current[activeIndex]) == null ? void 0 : _a.scrollIntoView({
      block: "nearest"
    })), setScrollTop(((_b = refs.floating.current) == null ? void 0 : _b.scrollTop) ?? 0);
  }, [open, refs, controlledScrolling, activeIndex]), React.useEffect(() => {
    var _a;
    open && fallback && selectedIndex != null && ((_a = listItemsRef.current[selectedIndex]) == null ? void 0 : _a.scrollIntoView({
      block: "nearest"
    }));
  }, [open, fallback, selectedIndex]), useIsomorphicLayoutEffect$2(() => {
    refs.floating.current && fallback && (refs.floating.current.style.maxHeight = "");
  }, [refs, fallback]), /* @__PURE__ */ jsx(SelectProvider, {
    scope: __scopeSelect,
    ...selectContext,
    setScrollTop,
    setInnerOffset,
    fallback,
    floatingContext: context,
    activeIndex,
    canScrollDown: !!showDownArrow,
    canScrollUp: !!showUpArrow,
    controlledScrolling,
    blockSelection,
    upArrowRef,
    downArrowRef,
    update,
    children: /* @__PURE__ */ jsx(SelectItemParentProvider, {
      scope: __scopeSelect,
      ...selectItemParentContext,
      allowMouseUpRef,
      allowSelectRef,
      dataRef: context.dataRef,
      interactions: interactionsContext,
      listRef: listItemsRef,
      selectTimeoutRef,
      children
    })
  });
};
const ITEM_NAME = "SelectItem", [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME), SelectItem = ListItemFrame.styleable(function(props, forwardedRef) {
  const {
    __scopeSelect,
    value,
    disabled = false,
    textValue: textValueProp,
    index: index2,
    ...restProps
  } = props, {
    props: listItemProps
  } = useListItem({
    ...!props.unstyled && {
      ellipse: true
    },
    ...restProps
  }), context = useSelectItemParentContext(ITEM_NAME, __scopeSelect), {
    setSelectedIndex,
    listRef,
    setOpen,
    onChange,
    activeIndexSubscribe,
    valueSubscribe,
    allowMouseUpRef,
    allowSelectRef,
    setValueAtIndex,
    selectTimeoutRef,
    dataRef,
    interactions,
    shouldRenderWebNative,
    size: size2,
    onActiveChange,
    initialValue
  } = context, [isSelected, setSelected] = React.useState(initialValue === value);
  React.useEffect(() => activeIndexSubscribe((i) => {
    var _a;
    index2 === i && (onActiveChange(value, index2), (_a = listRef == null ? void 0 : listRef.current[index2]) == null ? void 0 : _a.focus());
  }), [index2]), React.useEffect(() => valueSubscribe((val) => {
    setSelected(val === value);
  }), [value]);
  const textId = React.useId(), refCallback = React.useCallback((node) => {
    node instanceof HTMLElement && listRef && (listRef.current[index2] = node);
  }, []), composedRefs = useComposedRefs(forwardedRef, refCallback);
  useIsomorphicLayoutEffect$2(() => {
    setValueAtIndex(index2, value);
  }, [index2, setValueAtIndex, value]);
  function handleSelect() {
    setSelectedIndex(index2), onChange(value), setOpen(false);
  }
  const selectItemProps = React.useMemo(() => interactions ? interactions.getItemProps({
    onTouchMove() {
      allowSelectRef.current = true, allowMouseUpRef.current = false;
    },
    onTouchEnd() {
      allowSelectRef.current = false, allowMouseUpRef.current = true;
    },
    onKeyDown(event) {
      event.key === "Enter" || event.key === " " && !(dataRef == null ? void 0 : dataRef.current.typing) ? (event.preventDefault(), handleSelect()) : allowSelectRef.current = true;
    },
    onClick() {
      allowSelectRef.current && handleSelect();
    },
    onMouseUp() {
      allowMouseUpRef.current && (allowSelectRef.current && handleSelect(), clearTimeout(selectTimeoutRef.current), selectTimeoutRef.current = setTimeout(() => {
        allowSelectRef.current = true;
      }));
    }
  }) : {
    onPress: handleSelect
  }, [handleSelect]);
  return /* @__PURE__ */ jsx(SelectItemContextProvider, {
    scope: __scopeSelect,
    value,
    textId: textId || "",
    isSelected,
    children: shouldRenderWebNative ? /* @__PURE__ */ jsx("option", {
      value,
      children: props.children
    }) : /* @__PURE__ */ jsx(ListItemFrame, {
      tag: "div",
      componentName: ITEM_NAME,
      ref: composedRefs,
      "aria-labelledby": textId,
      "aria-selected": isSelected,
      "data-state": isSelected ? "active" : "inactive",
      "aria-disabled": disabled || void 0,
      "data-disabled": disabled ? "" : void 0,
      tabIndex: disabled ? void 0 : -1,
      ...!props.unstyled && {
        backgrounded: true,
        pressTheme: true,
        hoverTheme: true,
        focusTheme: true,
        cursor: "default",
        size: size2,
        outlineOffset: -0.5,
        focusVisibleStyle: {
          outlineColor: "$outlineColor",
          outlineWidth: 1,
          outlineStyle: "solid"
        }
      },
      ...listItemProps,
      ...selectItemProps
    })
  });
}, {
  disableTheme: true
});
const ITEM_TEXT_NAME = "SelectItemText", SelectItemTextFrame = styled(SizableText, {
  name: ITEM_TEXT_NAME,
  variants: {
    unstyled: {
      false: {
        userSelect: "none",
        color: "$color",
        ellipse: true
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), SelectItemText = SelectItemTextFrame.styleable(function(props, forwardedRef) {
  const {
    __scopeSelect,
    className,
    ...itemTextProps
  } = props, context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect), itemParentContext = useSelectItemParentContext(ITEM_TEXT_NAME, __scopeSelect), ref = React.useRef(null), composedRefs = useComposedRefs(forwardedRef, ref), itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect), contents = React.useRef();
  return contents.current = /* @__PURE__ */ jsx(SelectItemTextFrame, {
    className,
    size: itemParentContext.size,
    id: itemContext.textId,
    ...itemTextProps,
    ref: composedRefs
  }), React.useEffect(() => {
    itemParentContext.initialValue === itemContext.value && !context.selectedIndex && context.setSelectedItem(contents.current);
  }, []), React.useEffect(() => itemParentContext.valueSubscribe((val) => {
    val === itemContext.value && context.setSelectedItem(contents.current);
  }), [itemContext.value]), itemParentContext.shouldRenderWebNative ? /* @__PURE__ */ jsx(Fragment, {
    children: props.children
  }) : /* @__PURE__ */ jsx(Fragment, {
    children: contents.current
  });
});
const SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton", SelectScrollUpButton = React.forwardRef((props, forwardedRef) => /* @__PURE__ */ jsx(SelectScrollButtonImpl, {
  componentName: SCROLL_UP_BUTTON_NAME,
  ...props,
  dir: "up",
  ref: forwardedRef
}));
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
const SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton", SelectScrollDownButton = React.forwardRef((props, forwardedRef) => /* @__PURE__ */ jsx(SelectScrollButtonImpl, {
  componentName: SCROLL_DOWN_BUTTON_NAME,
  ...props,
  dir: "down",
  ref: forwardedRef
}));
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
const SelectScrollButtonImpl = React.memo(React.forwardRef((props, forwardedRef) => {
  var _a, _b;
  const {
    __scopeSelect,
    dir,
    componentName,
    ...scrollIndicatorProps
  } = props, {
    forceUpdate,
    open,
    fallback,
    setScrollTop,
    setInnerOffset,
    ...context
  } = useSelectContext(componentName, __scopeSelect), floatingRef = (_a = context.floatingContext) == null ? void 0 : _a.refs.floating, statusRef = React.useRef("idle"), isVisible = context[dir === "down" ? "canScrollDown" : "canScrollUp"], frameRef = React.useRef(), {
    x,
    y,
    refs,
    strategy
  } = useFloating({
    open: open && isVisible,
    strategy: "fixed",
    elements: {
      reference: floatingRef == null ? void 0 : floatingRef.current
    },
    placement: dir === "up" ? "top" : "bottom",
    middleware: [offset(({
      rects
    }) => -rects.floating.height)],
    whileElementsMounted: (...args) => autoUpdate(...args, {
      animationFrame: true
    })
  }), composedRef = useComposedRefs(forwardedRef, refs.setFloating);
  if (!isVisible) return null;
  const onScroll = (amount) => {
    const floating = floatingRef;
    floating && (fallback ? floating.current && (floating.current.scrollTop -= amount, flushSync(() => {
      var _a2;
      return setScrollTop(((_a2 = floating.current) == null ? void 0 : _a2.scrollTop) ?? 0);
    })) : flushSync(() => setInnerOffset((value) => value - amount)));
  };
  return /* @__PURE__ */ jsx(YStack, {
    ref: composedRef,
    componentName,
    "aria-hidden": true,
    ...scrollIndicatorProps,
    zIndex: 1e3,
    position: strategy,
    left: x || 0,
    top: y || 0,
    width: `calc(${(((_b = floatingRef == null ? void 0 : floatingRef.current) == null ? void 0 : _b.offsetWidth) ?? 0) - 2}px)`,
    onPointerEnter: () => {
      statusRef.current = "active";
      let prevNow = Date.now();
      function frame() {
        const element = floatingRef == null ? void 0 : floatingRef.current;
        if (element) {
          const currentNow = Date.now(), msElapsed = currentNow - prevNow;
          prevNow = currentNow;
          const pixelsToScroll = msElapsed / 2, remainingPixels = dir === "up" ? element.scrollTop : element.scrollHeight - element.clientHeight - element.scrollTop, scrollRemaining = dir === "up" ? element.scrollTop - pixelsToScroll > 0 : element.scrollTop + pixelsToScroll < element.scrollHeight - element.clientHeight;
          onScroll(dir === "up" ? Math.min(pixelsToScroll, remainingPixels) : Math.max(-pixelsToScroll, -remainingPixels)), scrollRemaining && (frameRef.current = requestAnimationFrame(frame));
        }
      }
      cancelAnimationFrame(frameRef.current), frameRef.current = requestAnimationFrame(frame);
    },
    onPointerLeave: () => {
      statusRef.current = "idle", cancelAnimationFrame(frameRef.current);
    }
  });
}));
const TRIGGER_NAME = "SelectTrigger", isPointerCoarse = isClient ? window.matchMedia("(pointer:coarse)").matches : true, SelectTrigger = React.forwardRef(function(props, forwardedRef) {
  var _a;
  const {
    __scopeSelect,
    disabled = false,
    unstyled = false,
    ...triggerProps
  } = props, context = useSelectContext(TRIGGER_NAME, __scopeSelect), itemParentContext = useSelectItemParentContext(TRIGGER_NAME, __scopeSelect), composedRefs = useComposedRefs(forwardedRef, (_a = context.floatingContext) == null ? void 0 : _a.refs.setReference);
  return itemParentContext.shouldRenderWebNative ? null : /* @__PURE__ */ jsx(ListItem2, {
    componentName: TRIGGER_NAME,
    unstyled,
    tag: "button",
    type: "button",
    id: itemParentContext.id,
    ...!unstyled && {
      backgrounded: true,
      radiused: true,
      hoverTheme: true,
      pressTheme: true,
      focusable: true,
      focusVisibleStyle: {
        outlineStyle: "solid",
        outlineWidth: 2,
        outlineColor: "$outlineColor"
      },
      borderWidth: 1,
      size: itemParentContext.size
    },
    "aria-expanded": context.open,
    "aria-autocomplete": "none",
    dir: context.dir,
    disabled,
    "data-disabled": disabled ? "" : void 0,
    ...triggerProps,
    ref: composedRefs,
    ...itemParentContext.interactions ? {
      ...itemParentContext.interactions.getReferenceProps(),
      ...isPointerCoarse ? {
        onPress() {
          itemParentContext.setOpen(!context.open);
        }
      } : {
        onMouseDown() {
          var _a2;
          (_a2 = context.floatingContext) == null ? void 0 : _a2.update(), itemParentContext.setOpen(!context.open);
        }
      }
    } : {
      onPress() {
        itemParentContext.setOpen(!context.open);
      }
    }
  });
});
const SelectViewportFrame = styled(ThemeableStack, {
  name: VIEWPORT_NAME,
  variants: {
    unstyled: {
      false: {
        size: "$2",
        backgroundColor: "$background",
        elevate: true,
        bordered: true,
        userSelect: "none",
        outlineWidth: 0
      }
    },
    size: {
      "...size": (val, {
        tokens: tokens2
      }) => ({
        borderRadius: tokens2.radius[val] ?? val
      })
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), SelectViewport = SelectViewportFrame.styleable(function(props, forwardedRef) {
  var _a;
  const {
    __scopeSelect,
    children,
    disableScroll,
    ...viewportProps
  } = props, context = useSelectContext(VIEWPORT_NAME, __scopeSelect), itemContext = useSelectItemParentContext(VIEWPORT_NAME, __scopeSelect), isAdapted = useAdaptIsActive();
  if (useIsomorphicLayoutEffect$2(() => {
    context.update && context.update();
  }, [isAdapted]), itemContext.shouldRenderWebNative) return /* @__PURE__ */ jsx(Fragment, {
    children
  });
  if (isAdapted || !isWeb) return /* @__PURE__ */ jsx(AdaptPortalContents, {
    children: /* @__PURE__ */ jsx(ForwardSelectContext, {
      __scopeSelect,
      itemContext,
      context,
      children
    })
  });
  if (!itemContext.interactions) return null;
  const {
    style,
    // remove this, it was set to "Select" always
    className,
    ...floatingProps
  } = itemContext.interactions.getFloatingProps(), composedRefs = useComposedRefs(forwardedRef, (_a = context.floatingContext) == null ? void 0 : _a.refs.setFloating);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [!disableScroll && !props.unstyled && /* @__PURE__ */ jsx("style", {
      dangerouslySetInnerHTML: {
        __html: selectViewportCSS
      }
    }), /* @__PURE__ */ jsx(AnimatePresence, {
      children: context.open ? /* @__PURE__ */ jsx(FloatingFocusManager, {
        context: context.floatingContext,
        modal: false,
        children: /* @__PURE__ */ jsx(SelectViewportFrame, {
          size: itemContext.size,
          role: "presentation",
          ...viewportProps,
          ...style,
          ...floatingProps,
          ...!props.unstyled && {
            overflowY: disableScroll ? void 0 : style.overflow ?? "auto"
          },
          ref: composedRefs,
          children
        }, "select-viewport")
      }) : null
    }), !context.open && /* @__PURE__ */ jsx("div", {
      style: {
        display: "none"
      },
      children: props.children
    })]
  });
}), selectViewportCSS = `
.is_SelectViewport {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.is_SelectViewport::-webkit-scrollbar{
  display:none
}
`;
const VALUE_NAME = "SelectValue", SelectValueFrame = styled(SizableText, {
  name: VALUE_NAME,
  userSelect: "none"
}), SelectValue = SelectValueFrame.styleable(function({
  __scopeSelect,
  children: childrenProp,
  placeholder,
  ...props
}, forwardedRef) {
  const context = useSelectContext(VALUE_NAME, __scopeSelect), itemParentContext = useSelectItemParentContext(VALUE_NAME, __scopeSelect), composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange), children = childrenProp ?? context.selectedItem, selectValueChildren = context.value == null || context.value === "" ? placeholder ?? children : children;
  return /* @__PURE__ */ jsx(SelectValueFrame, {
    ...!props.unstyled && {
      size: itemParentContext.size,
      ellipse: true,
      // we don't want events from the portalled `SelectValue` children to bubble
      // through the item they came from
      pointerEvents: "none"
    },
    ref: composedRefs,
    ...props,
    children: unwrapSelectItem(selectValueChildren)
  });
});
function unwrapSelectItem(selectValueChildren) {
  return React.Children.map(selectValueChildren, (child) => {
    var _a, _b, _c;
    if (child) {
      if (((_b = (_a = child.type) == null ? void 0 : _a.staticConfig) == null ? void 0 : _b.componentName) === ITEM_TEXT_NAME) return child.props.children;
      if ((_c = child.props) == null ? void 0 : _c.children) return unwrapSelectItem(child.props.children);
    }
    return child;
  });
}
const SelectIcon = styled(XStack, {
  name: "SelectIcon",
  // @ts-ignore
  "aria-hidden": true,
  children: /* @__PURE__ */ jsx(Paragraph, {
    children: "▼"
  })
}), ITEM_INDICATOR_NAME = "SelectItemIndicator", SelectItemIndicatorFrame = styled(XStack, {
  name: ITEM_TEXT_NAME
}), SelectItemIndicator = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    ...itemIndicatorProps
  } = props, context = useSelectItemParentContext(ITEM_INDICATOR_NAME, __scopeSelect), itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
  return context.shouldRenderWebNative ? null : itemContext.isSelected ? /* @__PURE__ */ jsx(SelectItemIndicatorFrame, {
    "aria-hidden": true,
    ...itemIndicatorProps,
    ref: forwardedRef
  }) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
const GROUP_NAME = "SelectGroup", [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME), SelectGroupFrame = styled(YStack, {
  name: GROUP_NAME,
  width: "100%"
}), NativeSelectTextFrame = styled(SizableText, {
  tag: "select",
  backgroundColor: "$background",
  borderColor: "$borderColor",
  hoverStyle: {
    backgroundColor: "$backgroundHover"
  }
}), NativeSelectFrame = styled(ThemeableStack, {
  name: "NativeSelect",
  bordered: true,
  userSelect: "none",
  outlineWidth: 0,
  paddingRight: 10,
  variants: {
    size: {
      "...size": (val, extras) => {
        const {
          tokens: tokens2
        } = extras, paddingHorizontal = getVariableValue(tokens2.space[val]);
        return {
          borderRadius: tokens2.radius[val] ?? val,
          minHeight: tokens2.size[val],
          paddingRight: paddingHorizontal + 20,
          paddingLeft: paddingHorizontal,
          paddingVertical: getSpace(val, {
            shift: -3
          })
        };
      }
    }
  },
  defaultVariants: {
    size: "$2"
  }
}), SelectGroup = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    ...groupProps
  } = props, groupId = React.useId(), context = useSelectContext(GROUP_NAME, __scopeSelect), itemParentContext = useSelectItemParentContext(GROUP_NAME, __scopeSelect), size2 = itemParentContext.size ?? "$true", nativeSelectRef = React.useRef(null), content = itemParentContext.shouldRenderWebNative ? /* @__PURE__ */ jsx(NativeSelectFrame, {
    asChild: true,
    size: size2,
    value: context.value,
    id: itemParentContext.id,
    children: /* @__PURE__ */ jsx(NativeSelectTextFrame, {
      onChange: (event) => {
        itemParentContext.onChange(event.currentTarget.value);
      },
      size: size2,
      ref: nativeSelectRef,
      style: {
        color: "var(--color)",
        // @ts-ignore
        appearance: "none"
      },
      children: props.children
    })
  }) : /* @__PURE__ */ jsx(SelectGroupFrame, {
    role: "group",
    "aria-labelledby": groupId,
    ...groupProps,
    ref: forwardedRef
  });
  return /* @__PURE__ */ jsx(SelectGroupContextProvider, {
    scope: __scopeSelect,
    id: groupId || "",
    children: content
  });
});
SelectGroup.displayName = GROUP_NAME;
const LABEL_NAME = "SelectLabel", SelectLabel = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    ...labelProps
  } = props, context = useSelectItemParentContext(LABEL_NAME, __scopeSelect), groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
  return context.shouldRenderWebNative ? null : /* @__PURE__ */ jsx(ListItem2, {
    tag: "div",
    componentName: LABEL_NAME,
    fontWeight: "800",
    id: groupContext.id,
    size: context.size,
    ...labelProps,
    ref: forwardedRef
  });
});
SelectLabel.displayName = LABEL_NAME;
styled(Separator, {
  name: "SelectSeparator"
});
const SelectSheetController = (props) => {
  const context = useSelectContext("SelectSheetController", props.__scopeSelect), showSheet = useShowSelectSheet(context), isAdapted = useAdaptIsActive(), getShowSheet = useGet(showSheet);
  return /* @__PURE__ */ jsx(SheetController, {
    onOpenChange: (val) => {
      getShowSheet() && props.onOpenChange(val);
    },
    open: context.open,
    hidden: isAdapted === false,
    children: props.children
  });
}, SelectSheetImpl = (props) => /* @__PURE__ */ jsx(Fragment, {
  children: props.children
});
withStaticProperties(function(props) {
  const internalId = React.useId(), scopeKey = props.__scopeSelect ? Object.keys(props.__scopeSelect)[0] ?? internalId : internalId;
  return /* @__PURE__ */ jsx(AdaptParent, {
    scope: `${scopeKey}SheetContents`,
    portal: true,
    children: /* @__PURE__ */ jsx(SelectInner, {
      scopeKey,
      ...props
    })
  });
}, {
  Adapt,
  Content: SelectContent,
  Group: SelectGroup,
  Icon: SelectIcon,
  Item: SelectItem,
  ItemIndicator: SelectItemIndicator,
  ItemText: SelectItemText,
  Label: SelectLabel,
  ScrollDownButton: SelectScrollDownButton,
  ScrollUpButton: SelectScrollUpButton,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Viewport: SelectViewport,
  Sheet: Sheet.Controlled
});
function useEmitter() {
  const listeners = React.useRef();
  listeners.current || (listeners.current = /* @__PURE__ */ new Set());
  const emit = (value) => {
    listeners.current.forEach((l) => l(value));
  }, subscribe = React.useCallback((listener) => (listeners.current.add(listener), () => {
    listeners.current.delete(listener);
  }), []);
  return [emit, subscribe];
}
function SelectInner(props) {
  const {
    __scopeSelect,
    native,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue: defaultValue2,
    onValueChange,
    disablePreventBodyScroll,
    size: sizeProp = "$true",
    onActiveChange,
    dir,
    id
  } = props, SelectImpl = useAdaptIsActive() || !isWeb ? SelectSheetImpl : SelectInlineImpl, forceUpdate = React.useReducer(() => ({}), {})[1], [selectedItem, setSelectedItem] = React.useState(null), [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen || false,
    onChange: onOpenChange
  }), [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue2 || "",
    onChange: onValueChange,
    transition: true
  });
  React.useEffect(() => {
    open && emitValue(value);
  }, [open]), React.useEffect(() => {
    emitValue(value);
  }, [value]);
  const [activeIndex, setActiveIndex] = React.useState(0), [emitValue, valueSubscribe] = useEmitter(), [emitActiveIndex, activeIndexSubscribe] = useEmitter(), selectedIndexRef = React.useRef(null), activeIndexRef = React.useRef(null), listContentRef = React.useRef([]), [selectedIndex, setSelectedIndex] = React.useState(0), [valueNode, setValueNode] = React.useState(null);
  useIsomorphicLayoutEffect$2(() => {
    selectedIndexRef.current = selectedIndex, activeIndexRef.current = activeIndex;
  });
  const shouldRenderWebNative = native === true || native === "web" || Array.isArray(native) && native.includes("web"), setActiveIndexDebounced = useDebounce((index2) => {
    setActiveIndex((prev) => prev !== index2 ? (typeof index2 == "number" && emitActiveIndex(index2), index2) : prev);
  }, 1, {}, []);
  return /* @__PURE__ */ jsx(SelectItemParentProvider, {
    scope: __scopeSelect,
    initialValue: React.useMemo(() => value, [open]),
    size: sizeProp,
    activeIndexSubscribe,
    valueSubscribe,
    setOpen,
    id,
    onChange: React.useCallback((val) => {
      setValue(val), emitValue(val);
    }, []),
    onActiveChange: useEvent((...args) => {
      onActiveChange == null ? void 0 : onActiveChange(...args);
    }),
    setSelectedIndex,
    setValueAtIndex: React.useCallback((index2, value2) => {
      listContentRef.current[index2] = value2;
    }, []),
    shouldRenderWebNative,
    children: /* @__PURE__ */ jsx(SelectProvider, {
      scope: __scopeSelect,
      disablePreventBodyScroll,
      dir,
      blockSelection: false,
      fallback: false,
      selectedItem,
      setSelectedItem,
      forceUpdate,
      valueNode,
      onValueNodeChange: setValueNode,
      scopeKey: props.scopeKey,
      activeIndex,
      selectedIndex,
      setActiveIndex: setActiveIndexDebounced,
      value,
      open,
      native,
      children: /* @__PURE__ */ jsx(SelectSheetController, {
        onOpenChange: setOpen,
        __scopeSelect,
        children: shouldRenderWebNative ? children : /* @__PURE__ */ jsx(SelectImpl, {
          activeIndexRef,
          listContentRef,
          selectedIndexRef,
          ...props,
          open,
          value,
          children
        })
      })
    })
  });
}
Dimensions.addEventListener("change", () => {
  cbs.forEach((cb) => cb(window));
});
const cbs = /* @__PURE__ */ new Set();
const createTamagui = createTamagui$1;
const TamaguiProvider = ({
  children,
  ...props
}) => /* @__PURE__ */ jsx(TamaguiProvider$1, {
  ...props,
  children: /* @__PURE__ */ jsx(PortalProvider, {
    shouldAddRootHost: true,
    children
  })
});
const shorthands = {
  // web-only
  ussel: "userSelect",
  cur: "cursor",
  // tamagui
  pe: "pointerEvents",
  // text
  col: "color",
  ff: "fontFamily",
  fos: "fontSize",
  fost: "fontStyle",
  fow: "fontWeight",
  ls: "letterSpacing",
  lh: "lineHeight",
  ta: "textAlign",
  tt: "textTransform",
  ww: "wordWrap",
  // view
  ac: "alignContent",
  ai: "alignItems",
  als: "alignSelf",
  b: "bottom",
  bg: "backgroundColor",
  bbc: "borderBottomColor",
  bblr: "borderBottomLeftRadius",
  bbrr: "borderBottomRightRadius",
  bbw: "borderBottomWidth",
  blc: "borderLeftColor",
  blw: "borderLeftWidth",
  bc: "borderColor",
  br: "borderRadius",
  bs: "borderStyle",
  brw: "borderRightWidth",
  brc: "borderRightColor",
  btc: "borderTopColor",
  btlr: "borderTopLeftRadius",
  btrr: "borderTopRightRadius",
  btw: "borderTopWidth",
  bw: "borderWidth",
  dsp: "display",
  f: "flex",
  fb: "flexBasis",
  fd: "flexDirection",
  fg: "flexGrow",
  fs: "flexShrink",
  fw: "flexWrap",
  h: "height",
  jc: "justifyContent",
  l: "left",
  m: "margin",
  mah: "maxHeight",
  maw: "maxWidth",
  mb: "marginBottom",
  mih: "minHeight",
  miw: "minWidth",
  ml: "marginLeft",
  mr: "marginRight",
  mt: "marginTop",
  mx: "marginHorizontal",
  my: "marginVertical",
  o: "opacity",
  ov: "overflow",
  p: "padding",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pos: "position",
  pr: "paddingRight",
  pt: "paddingTop",
  px: "paddingHorizontal",
  py: "paddingVertical",
  r: "right",
  shac: "shadowColor",
  shar: "shadowRadius",
  shof: "shadowOffset",
  shop: "shadowOpacity",
  t: "top",
  w: "width",
  zi: "zIndex"
};
shorthands.bls = "borderLeftStyle";
shorthands.brs = "borderRightStyle";
shorthands.bts = "borderTopStyle";
shorthands.bbs = "borderBottomStyle";
shorthands.bxs = "boxSizing";
shorthands.bxsh = "boxShadow";
shorthands.ox = "overflowX";
shorthands.oy = "overflowY";
const defaultSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  true: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134
};
const body = createMainFont(
  {
    weight: {
      1: "400",
      7: "600"
    }
  },
  {
    sizeSize: (size2) => Math.round(size2),
    sizeLineHeight: (size2) => Math.round(size2 * 1.1 + (size2 >= 12 ? 10 : 4))
  }
);
const fonts = {
  body
};
function createMainFont(font = {}, {
  sizeLineHeight = (size2) => size2 + 10,
  sizeSize = (size2) => size2 * 1
} = {}) {
  const size2 = Object.fromEntries(
    Object.entries({
      ...defaultSizes,
      ...font.size
    }).map(([k, v]) => [k, sizeSize(+v)])
  );
  return createFont({
    family: '-apple-system, Inter, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    lineHeight: Object.fromEntries(Object.entries(size2).map(([k, v]) => [k, sizeLineHeight(v)])),
    weight: {
      4: "300"
    },
    letterSpacing: {
      4: 0
    },
    ...font,
    size: size2
  });
}
function t(a) {
  let res = {};
  for (const [ki, vi] of a) {
    res[ks[ki]] = vs[vi];
  }
  return res;
}
const vs = [
  "hsl(54, 89.4%, 72.1%)",
  "hsl(54, 40%, 14.3%)",
  "rgba(255,255,255,0)",
  "rgba(255,255,255,0.25)",
  "rgba(255,255,255,0.5)",
  "rgba(255,255,255,0.75)",
  "#fff",
  "#f8f8f8",
  "hsl(0, 0%, 96.3%)",
  "hsl(0, 0%, 94.1%)",
  "hsl(0, 0%, 92.0%)",
  "hsl(0, 0%, 90.0%)",
  "hsl(0, 0%, 88.5%)",
  "hsl(0, 0%, 81.0%)",
  "hsl(0, 0%, 56.1%)",
  "hsl(0, 0%, 50.3%)",
  "hsl(0, 0%, 42.5%)",
  "hsl(0, 0%, 9.0%)",
  "#000",
  "rgba(10,10,10,0)",
  "rgba(10,10,10,0.25)",
  "rgba(10,10,10,0.5)",
  "rgba(10,10,10,0.75)",
  "hsl(54, 54.0%, 98.5%)",
  "hsl(54, 100%, 93.5%)",
  "hsl(54, 100%, 88.9%)",
  "hsl(54, 100%, 83.6%)",
  "hsl(54, 97.9%, 78.0%)",
  "hsl(54, 80.4%, 65.0%)",
  "hsl(54, 90%, 62%)",
  "hsl(54, 100%, 58.0%)",
  "hsl(54, 90%, 40%)",
  "hsl(54, 80%, 30.0%)",
  "hsl(54, 55.0%, 15%)",
  "hsl(0, 0%, 99.0%)",
  "hsl(0, 0%, 97.3%)",
  "hsl(0, 0%, 95.1%)",
  "hsl(0, 0%, 93.0%)",
  "hsl(0, 0%, 90.9%)",
  "hsl(0, 0%, 88.7%)",
  "hsl(0, 0%, 85.8%)",
  "hsl(0, 0%, 78.0%)",
  "hsl(0, 0%, 52.3%)",
  "hsl(0, 0%, 43.5%)",
  "hsla(210, 60%, 80%, 0.7)",
  "hsla(120, 60%, 80%, 0.8)",
  "hsla(0, 60%, 80%, 0.7)",
  "hsla(270, 60%, 80%, 0.7)",
  "hsla(330, 60%, 80%, 0.7)",
  "hsl(210, 60%, 10%)",
  "hsl(120, 60%, 10%)",
  "hsl(0, 60%, 10%)",
  "hsl(270, 60%, 10%)",
  "hsl(330, 60%, 10%)",
  "rgba(0,0,0,0.05)",
  "rgba(0,0,0,0.1)",
  "#050505",
  "#151515",
  "#191919",
  "#232323",
  "#282828",
  "#323232",
  "#424242",
  "#494949",
  "#545454",
  "#626262",
  "#a5a5a5",
  "hsl(54, 20%, 5.5%)",
  "hsl(54, 20%, 6.7%)",
  "hsl(54, 20%, 8.7%)",
  "hsl(54, 30%, 10.4%)",
  "hsl(54, 40%, 12.1%)",
  "hsl(54, 40%, 18.4%)",
  "hsl(54, 100%, 25.0%)",
  "hsl(54, 92.0%, 40.0%)",
  "hsl(54, 100%, 60.0%)",
  "hsl(54, 100%, 80.0%)",
  "hsl(54, 100%, 91.0%)",
  "hsl(0, 0%, 8.5%)",
  "hsl(0, 0%, 11.0%)",
  "hsl(0, 0%, 13.6%)",
  "hsl(0, 0%, 15.8%)",
  "hsl(0, 0%, 17.9%)",
  "hsl(0, 0%, 20.5%)",
  "hsl(0, 0%, 24.3%)",
  "hsl(0, 0%, 31.2%)",
  "hsl(0, 0%, 43.9%)",
  "hsl(0, 0%, 49.4%)",
  "hsl(0, 0%, 62.8%)",
  "hsla(210, 60%, 40%, 0.6)",
  "hsla(120, 60%, 40%, 0.6)",
  "hsla(0, 60%, 40%, 0.6)",
  "hsla(270, 60%, 40%, 0.6)",
  "hsla(330, 60%, 40%, 0.6)",
  "hsl(210, 60%, 90%)",
  "hsl(120, 60%, 90%)",
  "hsl(0, 60%, 90%)",
  "hsl(270, 60%, 90%)",
  "hsl(330, 60%, 90%)",
  "rgba(0,0,0,0.12)",
  "rgba(0,0,0,0.2)",
  "hsla(0, 0%, 99.0%, 0)",
  "hsla(0, 0%, 99.0%, 0.25)",
  "hsla(0, 0%, 99.0%, 0.5)",
  "hsla(0, 0%, 99.0%, 0.75)",
  "hsla(0, 0%, 56.1%, 0.75)",
  "hsla(0, 0%, 56.1%, 0)",
  "hsla(0, 0%, 56.1%, 0.25)",
  "hsla(0, 0%, 56.1%, 0.5)",
  "hsla(54, 54.0%, 98.5%, 0)",
  "hsla(54, 54.0%, 98.5%, 0.25)",
  "hsla(54, 54.0%, 98.5%, 0.5)",
  "hsla(54, 54.0%, 98.5%, 0.75)",
  "hsla(54, 90%, 40%, 0)",
  "hsla(54, 90%, 40%, 0.25)",
  "hsla(54, 90%, 40%, 0.5)",
  "hsla(54, 90%, 40%, 0.75)",
  "hsla(0, 0%, 8.5%, 0)",
  "hsla(0, 0%, 8.5%, 0.125)",
  "hsla(0, 0%, 8.5%, 0.25)",
  "hsla(0, 0%, 8.5%, 0.375)",
  "hsla(0, 0%, 43.9%, 0.75)",
  "hsla(0, 0%, 43.9%, 0)",
  "hsla(0, 0%, 43.9%, 0.25)",
  "hsla(0, 0%, 43.9%, 0.5)",
  "hsla(54, 20%, 5.5%, 0)",
  "hsla(54, 20%, 5.5%, 0.125)",
  "hsla(54, 20%, 5.5%, 0.25)",
  "hsla(54, 20%, 5.5%, 0.375)",
  "hsla(54, 100%, 60.0%, 0)",
  "hsla(54, 100%, 60.0%, 0.25)",
  "hsla(54, 100%, 60.0%, 0.5)",
  "hsla(54, 100%, 60.0%, 0.75)"
];
const ks = [
  "accentBackground",
  "accentColor",
  "background0",
  "background025",
  "background05",
  "background075",
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
  "color9",
  "color10",
  "color11",
  "color12",
  "color13",
  "color0",
  "color025",
  "color05",
  "color075",
  "color",
  "background",
  "borderColor",
  "yellow1",
  "yellow2",
  "yellow3",
  "yellow4",
  "yellow5",
  "yellow6",
  "yellow7",
  "yellow8",
  "yellow9",
  "yellow10",
  "yellow11",
  "yellow12",
  "yellow13",
  "gray1",
  "gray2",
  "gray3",
  "gray4",
  "gray5",
  "gray6",
  "gray7",
  "gray8",
  "gray9",
  "gray10",
  "gray11",
  "gray12",
  "blue",
  "green",
  "red",
  "purple",
  "pink",
  "blueFg",
  "greenFg",
  "redFg",
  "purpleFg",
  "pinkFg",
  "shadowColor",
  "shadowColorStrong"
];
const n1 = t([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21], [22, 22], [23, 18], [24, 5], [25, 7], [26, 23], [27, 24], [28, 25], [29, 26], [30, 27], [31, 0], [32, 28], [33, 29], [34, 30], [35, 31], [36, 32], [37, 33], [38, 18], [39, 34], [40, 35], [41, 36], [42, 37], [43, 38], [44, 39], [45, 40], [46, 41], [47, 14], [48, 42], [49, 43], [50, 17], [51, 44], [52, 45], [53, 46], [54, 47], [55, 48], [56, 49], [57, 50], [58, 51], [59, 52], [60, 53], [61, 54], [62, 55]]);
const light = n1;
const n2 = t([[0, 1], [1, 0], [2, 19], [3, 20], [4, 21], [5, 22], [6, 56], [7, 57], [8, 58], [9, 59], [10, 60], [11, 61], [12, 62], [13, 63], [14, 64], [15, 65], [16, 66], [17, 6], [18, 6], [19, 2], [20, 3], [21, 4], [22, 5], [23, 6], [24, 22], [25, 57], [26, 67], [27, 68], [28, 69], [29, 70], [30, 71], [31, 1], [32, 72], [33, 73], [34, 74], [35, 75], [36, 76], [37, 77], [38, 6], [39, 78], [40, 79], [41, 80], [42, 81], [43, 82], [44, 83], [45, 84], [46, 85], [47, 86], [48, 87], [49, 88], [50, 37], [51, 89], [52, 90], [53, 91], [54, 92], [55, 93], [56, 94], [57, 95], [58, 96], [59, 97], [60, 98], [61, 99], [62, 100]]);
const dark = n2;
const n3 = t([[0, 23], [1, 18], [2, 101], [3, 102], [4, 103], [5, 104], [6, 34], [7, 35], [8, 36], [9, 37], [10, 38], [11, 39], [12, 40], [13, 41], [14, 14], [15, 42], [16, 43], [17, 17], [18, 105], [19, 106], [20, 107], [21, 108], [22, 105], [23, 105], [24, 104], [25, 35]]);
const light_gray = n3;
const n4 = t([[0, 34], [1, 17], [2, 109], [3, 110], [4, 111], [5, 112], [6, 23], [7, 24], [8, 25], [9, 26], [10, 27], [11, 0], [12, 28], [13, 29], [14, 30], [15, 31], [16, 32], [17, 33], [18, 18], [19, 113], [20, 114], [21, 115], [22, 116], [23, 18], [24, 112], [25, 24]]);
const light_yellow = n4;
const n5 = t([[0, 23], [1, 18], [2, 117], [3, 118], [4, 119], [5, 120], [6, 78], [7, 79], [8, 80], [9, 81], [10, 82], [11, 83], [12, 84], [13, 85], [14, 86], [15, 87], [16, 88], [17, 37], [18, 121], [19, 122], [20, 123], [21, 124], [22, 121], [23, 121], [24, 120], [25, 79]]);
const dark_gray = n5;
const n6 = t([[0, 34], [1, 17], [2, 125], [3, 126], [4, 127], [5, 128], [6, 67], [7, 68], [8, 69], [9, 70], [10, 71], [11, 1], [12, 72], [13, 73], [14, 74], [15, 75], [16, 76], [17, 77], [18, 6], [19, 129], [20, 130], [21, 131], [22, 132], [23, 6], [24, 128], [25, 68]]);
const dark_yellow = n6;
const themes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dark,
  dark_gray,
  dark_yellow,
  light,
  light_gray,
  light_yellow
}, Symbol.toStringTag, { value: "Module" }));
const gray$1 = {
  gray1: "hsl(0, 0%, 8.5%)",
  gray2: "hsl(0, 0%, 11.0%)",
  gray3: "hsl(0, 0%, 13.6%)",
  gray4: "hsl(0, 0%, 15.8%)",
  gray5: "hsl(0, 0%, 17.9%)",
  gray6: "hsl(0, 0%, 20.5%)",
  gray7: "hsl(0, 0%, 24.3%)",
  gray8: "hsl(0, 0%, 31.2%)",
  gray9: "hsl(0, 0%, 43.9%)",
  gray10: "hsl(0, 0%, 49.4%)",
  gray11: "hsl(0, 0%, 62.8%)",
  gray12: "hsl(0, 0%, 93.0%)"
};
const gray = {
  gray1: "hsl(0, 0%, 99.0%)",
  gray2: "hsl(0, 0%, 97.3%)",
  gray3: "hsl(0, 0%, 95.1%)",
  gray4: "hsl(0, 0%, 93.0%)",
  gray5: "hsl(0, 0%, 90.9%)",
  gray6: "hsl(0, 0%, 88.7%)",
  gray7: "hsl(0, 0%, 85.8%)",
  gray8: "hsl(0, 0%, 78.0%)",
  gray9: "hsl(0, 0%, 56.1%)",
  gray10: "hsl(0, 0%, 52.3%)",
  gray11: "hsl(0, 0%, 43.5%)",
  gray12: "hsl(0, 0%, 9.0%)"
};
const yellow = {
  yellow1: "hsl(54, 54.0%, 98.5%)",
  yellow2: "hsl(54, 100%, 93.5%)",
  yellow3: "hsl(54, 100%, 88.9%)",
  yellow4: "hsl(54, 100%, 83.6%)",
  yellow5: "hsl(54, 97.9%, 78.0%)",
  yellow6: "hsl(54, 89.4%, 72.1%)",
  yellow7: "hsl(54, 80.4%, 65.0%)",
  yellow8: "hsl(54, 90%, 62%)",
  yellow9: "hsl(54, 100%, 58.0%)",
  yellow10: "hsl(54, 90%, 40%)",
  yellow11: "hsl(54, 80%, 30.0%)",
  yellow12: "hsl(54, 55.0%, 15%)",
  yellow13: "#000"
};
const yellowDark = {
  yellow1: "hsl(54, 20%, 5.5%)",
  yellow2: "hsl(54, 20%, 6.7%)",
  yellow3: "hsl(54, 20%, 8.7%)",
  yellow4: "hsl(54, 30%, 10.4%)",
  yellow5: "hsl(54, 40%, 12.1%)",
  yellow6: "hsl(54, 40%, 14.3%)",
  yellow7: "hsl(54, 40%, 18.4%)",
  yellow8: "hsl(54, 100%, 25.0%)",
  yellow9: "hsl(54, 92.0%, 40.0%)",
  yellow10: "hsl(54, 100%, 60.0%)",
  yellow11: "hsl(54, 100%, 80.0%)",
  yellow12: "hsl(54, 100%, 91.0%)",
  yellow13: "#fff"
};
const colorTokens = {
  light: {
    yellow,
    gray
  },
  dark: {
    yellow: yellowDark,
    gray: gray$1
  }
};
const darkColors = {
  ...colorTokens.dark.yellow,
  ...colorTokens.dark.gray,
  blue: "hsla(210, 60%, 40%, 0.6)",
  green: "hsla(120, 60%, 40%, 0.6)",
  red: "hsla(0, 60%, 40%, 0.6)",
  purple: "hsla(270, 60%, 40%, 0.6)",
  pink: "hsla(330, 60%, 40%, 0.6)",
  blueFg: "hsl(210, 60%, 90%)",
  greenFg: "hsl(120, 60%, 90%)",
  redFg: "hsl(0, 60%, 90%)",
  purpleFg: "hsl(270, 60%, 90%)",
  pinkFg: "hsl(330, 60%, 90%)"
};
const lightColors = {
  ...colorTokens.light.yellow,
  ...colorTokens.light.gray,
  blue: "hsla(210, 60%, 80%, 0.7)",
  green: "hsla(120, 60%, 80%, 0.8)",
  red: "hsla(0, 60%, 80%, 0.7)",
  purple: "hsla(270, 60%, 80%, 0.7)",
  pink: "hsla(330, 60%, 80%, 0.7)",
  blueFg: "hsl(210, 60%, 10%)",
  greenFg: "hsl(120, 60%, 10%)",
  redFg: "hsl(0, 60%, 10%)",
  purpleFg: "hsl(270, 60%, 10%)",
  pinkFg: "hsl(330, 60%, 10%)"
};
const color = {
  white0: "rgba(255,255,255,0)",
  white075: "rgba(255,255,255,0.75)",
  white05: "rgba(255,255,255,0.5)",
  white025: "rgba(255,255,255,0.25)",
  black0: "rgba(10,10,10,0)",
  black075: "rgba(10,10,10,0.75)",
  black05: "rgba(10,10,10,0.5)",
  black025: "rgba(10,10,10,0.25)",
  white1: "#fff",
  white2: "#f8f8f8",
  white3: "hsl(0, 0%, 96.3%)",
  white4: "hsl(0, 0%, 94.1%)",
  white5: "hsl(0, 0%, 92.0%)",
  white6: "hsl(0, 0%, 90.0%)",
  white7: "hsl(0, 0%, 88.5%)",
  white8: "hsl(0, 0%, 81.0%)",
  white9: "hsl(0, 0%, 56.1%)",
  white10: "hsl(0, 0%, 50.3%)",
  white11: "hsl(0, 0%, 42.5%)",
  white12: "hsl(0, 0%, 9.0%)",
  black1: "#050505",
  black2: "#151515",
  black3: "#191919",
  black4: "#232323",
  black5: "#282828",
  black6: "#323232",
  black7: "#424242",
  black8: "#494949",
  black9: "#545454",
  black10: "#626262",
  black11: "#a5a5a5",
  black12: "#fff",
  ...postfixObjKeys(lightColors, "Light"),
  ...postfixObjKeys(darkColors, "Dark")
};
const brandColor = {
  light: color.yellow6Light,
  dark: color.yellow6Dark
};
(() => {
  const transparent = (hsl, opacity = 0) => hsl.replace(`%)`, `%, ${opacity})`).replace(`hsl(`, `hsla(`);
  const getColorPalette = (colors, accentColors, scheme) => {
    const colorPalette = Object.values(colors);
    const colorI = colorPalette.length - 4;
    const accentPalette = Object.values(accentColors);
    const accentBackground = accentPalette[0];
    const accentColor = accentPalette[accentPalette.length - 1];
    const isDark = scheme === "dark";
    const adjustForDarkness = isDark ? 0.5 : 1;
    return [
      accentBackground,
      transparent(colorPalette[0], 0),
      transparent(colorPalette[0], 0.25 * adjustForDarkness),
      transparent(colorPalette[0], 0.5 * adjustForDarkness),
      transparent(colorPalette[0], 0.75 * adjustForDarkness),
      ...colorPalette,
      transparent(colorPalette[colorI], 0.75),
      transparent(colorPalette[colorI], 0.5),
      transparent(colorPalette[colorI], 0.25),
      transparent(colorPalette[colorI], 0),
      accentColor
    ];
  };
  const lightPalette = [
    brandColor.light,
    color.white0,
    color.white025,
    color.white05,
    color.white075,
    color.white1,
    color.white2,
    color.white3,
    color.white4,
    color.white5,
    color.white6,
    color.white7,
    color.white8,
    color.white9,
    color.white10,
    color.white11,
    color.white12,
    "#000",
    color.black075,
    color.black05,
    color.black025,
    color.black0,
    brandColor.dark
  ];
  const darkPalette = [
    brandColor.dark,
    color.black0,
    color.black025,
    color.black05,
    color.black075,
    color.black1,
    color.black2,
    color.black3,
    color.black4,
    color.black5,
    color.black6,
    color.black7,
    color.black8,
    color.black9,
    color.black10,
    color.black11,
    color.black12,
    "#fff",
    color.white075,
    color.white05,
    color.white025,
    color.white0,
    brandColor.light
  ];
  const lightColorNames = objectKeys(colorTokens.light);
  const lightPalettes = objectFromEntries(
    lightColorNames.map(
      (key, index2) => [
        `light_${key}`,
        getColorPalette(
          colorTokens.light[key],
          colorTokens.light[lightColorNames[(index2 + 1) % lightColorNames.length]],
          "light"
        )
      ]
    )
  );
  const darkColorNames = objectKeys(colorTokens.dark);
  const darkPalettes = objectFromEntries(
    darkColorNames.map(
      (key, index2) => [
        `dark_${key}`,
        getColorPalette(
          colorTokens.dark[key],
          colorTokens.light[darkColorNames[(index2 + 1) % darkColorNames.length]],
          "dark"
        )
      ]
    )
  );
  const colorPalettes = {
    ...lightPalettes,
    ...darkPalettes
  };
  return {
    light: lightPalette,
    dark: darkPalette,
    ...colorPalettes
  };
})();
function postfixObjKeys(obj, postfix) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v]));
}
function objectFromEntries(arr) {
  return Object.fromEntries(arr);
}
function objectKeys(obj) {
  return Object.keys(obj);
}
const size = {
  $0: 0,
  "$0.25": 2,
  "$0.5": 4,
  "$0.75": 8,
  $1: 20,
  "$1.5": 24,
  $2: 28,
  "$2.5": 32,
  $3: 36,
  "$3.5": 40,
  $4: 44,
  $true: 44,
  "$4.5": 48,
  $5: 52,
  $6: 64,
  $7: 74,
  $8: 84,
  $9: 94,
  $10: 104,
  $11: 124,
  $12: 144,
  $13: 164,
  $14: 184,
  $15: 204,
  $16: 224,
  $17: 224,
  $18: 244,
  $19: 264,
  $20: 284
};
const spaces = Object.entries(size).map(([k, v]) => {
  return [k, sizeToSpace(v)];
});
function sizeToSpace(v) {
  if (v === 0) return 0;
  if (v === 2) return 0.5;
  if (v === 4) return 1;
  if (v === 8) return 1.5;
  if (v <= 16) return Math.round(v * 0.333);
  return Math.floor(v * 0.7 - 12);
}
const spacesNegative = spaces.slice(1).map(([k, v]) => [`-${k.slice(1)}`, -v]);
const space = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative)
};
const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500
};
const radius = {
  0: 0,
  1: 3,
  2: 5,
  3: 7,
  4: 9,
  true: 9,
  5: 10,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 34,
  11: 42,
  12: 50
};
const tokens = createTokens({
  color,
  radius,
  zIndex,
  space,
  size
});
function createAnimations(animations2) {
  const reactionListeners = /* @__PURE__ */ new WeakMap();
  return {
    animations: animations2,
    usePresence,
    ResetPresence,
    supportsCSSVars: true,
    useAnimatedNumber(initial) {
      const [val, setVal] = React__default.useState(initial), [onFinish, setOnFinish] = useState();
      return useIsomorphicLayoutEffect$2(() => {
        onFinish && (onFinish == null ? void 0 : onFinish(), setOnFinish(void 0));
      }, [onFinish]), {
        getInstance() {
          return setVal;
        },
        getValue() {
          return val;
        },
        setValue(next, config2, onFinish2) {
          setVal(next), setOnFinish(onFinish2);
        },
        stop() {
        }
      };
    },
    useAnimatedNumberReaction({
      value
    }, onValue) {
      React__default.useEffect(() => {
        const instance = value.getInstance();
        let queue = reactionListeners.get(instance);
        if (!queue) {
          const next = /* @__PURE__ */ new Set();
          reactionListeners.set(instance, next), queue = next;
        }
        return queue.add(onValue), () => {
          queue == null ? void 0 : queue.delete(onValue);
        };
      }, []);
    },
    useAnimatedNumberStyle(val, getStyle) {
      return getStyle(val.getValue());
    },
    useAnimations: ({
      props,
      presence,
      style,
      componentState,
      stateRef
    }) => {
      const isEntering = !!componentState.unmounted, isExiting = (presence == null ? void 0 : presence[0]) === false, sendExitComplete = presence == null ? void 0 : presence[1], [animationKey, animationConfig] = Array.isArray(props.animation) ? props.animation : [props.animation], animation = animations2[animationKey], keys = props.animateOnly ?? ["all"];
      return useIsomorphicLayoutEffect$2(() => {
        const host = stateRef.current.host;
        if (!sendExitComplete || !isExiting || !host) return;
        const node = host, onFinishAnimation = () => {
          sendExitComplete == null ? void 0 : sendExitComplete();
        };
        return node.addEventListener("transitionend", onFinishAnimation), node.addEventListener("transitioncancel", onFinishAnimation), () => {
          node.removeEventListener("transitionend", onFinishAnimation), node.removeEventListener("transitioncancel", onFinishAnimation);
        };
      }, [sendExitComplete, isExiting]), animation && (Array.isArray(style.transform) && (style.transform = transformsToString(style.transform)), style.transition = keys.map((key) => {
        const override = animations2[animationConfig == null ? void 0 : animationConfig[key]] ?? animation;
        return `${key} ${override}`;
      }).join(", ")), animation ? {
        style,
        className: isEntering ? "t_unmounted" : ""
      } : null;
    }
  };
}
const smoothBezier = "cubic-bezier(0.215, 0.610, 0.355, 1.000)";
const cssTransitions = {
  "100ms": "ease-in 100ms",
  "200ms": "ease-in 200ms",
  quick: `${smoothBezier} 500ms`,
  quicker: `${smoothBezier} 350ms`,
  quickest: `${smoothBezier} 200ms`
};
const animations = createAnimations(cssTransitions);
const selectionStyles = (theme) => theme.color5 ? {
  backgroundColor: theme.color5,
  color: theme.color11
} : null;
const media = createMedia({
  xl: { maxWidth: 1450 },
  lg: { maxWidth: 1180 },
  md: { maxWidth: 1020 },
  sm: { maxWidth: 800 },
  xs: { maxWidth: 660 },
  xxs: { maxWidth: 390 },
  gtXs: { minWidth: 660 + 1 },
  gtSm: { minWidth: 800 + 1 },
  gtMd: { minWidth: 1020 + 1 },
  gtLg: { minWidth: 1180 + 1 },
  gtXl: { minWidth: 1450 + 1 }
});
const config = createTamagui({
  animations,
  themes,
  media,
  tokens,
  fonts,
  selectionStyles,
  shorthands,
  settings: {
    mediaQueryDefaultActive: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true,
      // false
      xxs: false
    },
    defaultFont: "body",
    fastSchemeChange: true,
    shouldAddPrefersColorThemes: false,
    themeClassNameOnRoot: true,
    maxDarkLightNesting: 1
  }
});
function Layout() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.svg" })
    ] }),
    /* @__PURE__ */ jsx(LoadProgressBar, {}),
    /* @__PURE__ */ jsx(SchemeProvider, { children: /* @__PURE__ */ jsx(TamaguiRootProvider, { children: /* @__PURE__ */ jsx(Slot, {}) }) })
  ] });
}
const TamaguiRootProvider = ({ children }) => {
  const [scheme] = useColorScheme();
  return /* @__PURE__ */ jsx(TamaguiProvider, { disableInjectCSS: true, config, defaultTheme: scheme, disableRootThemeClass: true, children });
};
export {
  Layout as default
};
