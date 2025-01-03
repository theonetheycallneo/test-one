import { findFocusedRoute, getActionFromState as getActionFromStateDefault, getPathFromState as getPathFromStateDefault, getStateFromPath as getStateFromPathDefault } from "@react-navigation/core";
import isEqual from "fast-deep-equal";
import * as React from "react";
import createMemoryHistory from "./createMemoryHistory.mjs";
import { ServerLocationContext } from "../router/serverLocationContext.mjs";
import { appendBaseUrl } from "./getPathFromState.mjs";
const historyGlobal = createMemoryHistory();
typeof window < "u" && historyGlobal.listen(() => {
  globalThis.__vxrntodopath = window.location.pathname;
});
const findMatchingState = (a, b) => {
    if (a === void 0 || b === void 0 || a.key !== b.key) return [void 0, void 0];
    const aHistoryLength = a.history ? a.history.length : a.routes.length,
      bHistoryLength = b.history ? b.history.length : b.routes.length,
      aRoute = a.routes[a.index],
      bRoute = b.routes[b.index],
      aChildState = aRoute.state,
      bChildState = bRoute.state;
    return aHistoryLength !== bHistoryLength || aRoute.key !== bRoute.key || aChildState === void 0 || bChildState === void 0 || aChildState.key !== bChildState.key ? [a, b] : findMatchingState(aChildState, bChildState);
  },
  series = cb => {
    let queue = Promise.resolve();
    return () => {
      queue = queue.then(cb);
    };
  };
let linkingHandlers = [];
function useLinking(ref, {
  independent,
  enabled = !0,
  config,
  getStateFromPath = getStateFromPathDefault,
  getPathFromState = getPathFromStateDefault,
  getActionFromState = getActionFromStateDefault
}) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production" || independent) return;
    enabled !== !1 && linkingHandlers.length && console.error(["Looks like you have configured linking in multiple places. This is likely an error since deep links should only be handled in one place to avoid conflicts. Make sure that:", "- You don't have multiple NavigationContainers in the app each with 'linking' enabled", "- Only a single instance of the root component is rendered"].join(`
`).trim());
    const handler = Symbol();
    return enabled !== !1 && linkingHandlers.push(handler), () => {
      const index = linkingHandlers.indexOf(handler);
      index > -1 && linkingHandlers.splice(index, 1);
    };
  }, [enabled, independent]);
  const [history] = React.useState(historyGlobal),
    enabledRef = React.useRef(enabled),
    configRef = React.useRef(config),
    getStateFromPathRef = React.useRef(getStateFromPath),
    getPathFromStateRef = React.useRef(getPathFromState),
    getActionFromStateRef = React.useRef(getActionFromState);
  React.useEffect(() => {
    enabledRef.current = enabled, configRef.current = config, getStateFromPathRef.current = getStateFromPath, getPathFromStateRef.current = getPathFromState, getActionFromStateRef.current = getActionFromState;
  });
  const server = {
      location: React.useContext(ServerLocationContext)
    },
    getInitialState = React.useCallback(() => {
      let value;
      if (enabledRef.current) {
        const location2 = server?.location ?? (typeof window < "u" ? window.location : void 0),
          path = location2 ? location2.pathname + location2.search : void 0;
        path && (value = getStateFromPathRef.current(path, configRef.current));
      }
      const thenable = {
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then(onfulfilled) {
          return Promise.resolve(onfulfilled ? onfulfilled(value) : value);
        },
        catch() {
          return thenable;
        }
      };
      return thenable;
    }, []),
    previousIndexRef = React.useRef(void 0),
    previousStateRef = React.useRef(void 0),
    pendingPopStatePathRef = React.useRef(void 0);
  return React.useEffect(() => (previousIndexRef.current = history.index, history.listen(() => {
    const navigation = ref.current;
    if (!navigation || !enabled) return;
    const {
        location: location2
      } = window,
      path = location2.pathname + location2.search,
      index = history.index,
      previousIndex = previousIndexRef.current ?? 0;
    previousIndexRef.current = index, pendingPopStatePathRef.current = path;
    const record = history.get(index);
    if (record?.path === path && record?.state) {
      navigation.resetRoot(record.state);
      return;
    }
    const state = getStateFromPathRef.current(path, configRef.current);
    if (state) {
      const rootState = navigation.getRootState();
      if (state.routes.some(r => !rootState?.routeNames.includes(r.name))) {
        console.warn("The navigation state parsed from the URL contains routes not present in the root navigator. This usually means that the linking configuration doesn't match the navigation structure. See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.");
        return;
      }
      if (index > previousIndex) {
        const action = getActionFromStateRef.current(state, configRef.current);
        if (action !== void 0) try {
          navigation.dispatch(action);
        } catch (e) {
          console.warn(`An error occurred when trying to handle the link '${path}': ${typeof e == "object" && e != null && "message" in e ? e.message : e}`);
        } else navigation.resetRoot(state);
      } else navigation.resetRoot(state);
    } else navigation.resetRoot(state);
  })), [enabled, history, ref]), React.useEffect(() => {
    if (!enabled) return;
    const getPathForRoute = (route, state) => {
      if (route?.path) {
        const stateForPath = getStateFromPathRef.current(route.path, configRef.current);
        if (stateForPath) {
          const focusedRoute = findFocusedRoute(stateForPath);
          if (focusedRoute && focusedRoute.name === route.name && isEqual(focusedRoute.params, route.params)) return appendBaseUrl(route.path);
        }
      }
      return getPathFromStateRef.current(state, configRef.current);
    };
    if (ref.current) {
      const state = ref.current.getRootState();
      if (state) {
        const route = findFocusedRoute(state),
          path = getPathForRoute(route, state);
        previousStateRef.current === void 0 && (previousStateRef.current = state), history.replace({
          path,
          state
        });
      }
    }
    const onStateChange = async () => {
      const navigation = ref.current;
      if (!navigation || !enabled) return;
      const previousState = previousStateRef.current,
        state = navigation.getRootState();
      if (!state) return;
      const pendingPath = pendingPopStatePathRef.current,
        route = findFocusedRoute(state),
        path = getPathForRoute(route, state);
      previousStateRef.current = state, pendingPopStatePathRef.current = void 0;
      const [previousFocusedState, focusedState] = findMatchingState(previousState, state);
      if (previousFocusedState && focusedState &&
      // We should only handle push/pop if path changed from what was in last `popstate`
      // Otherwise it's likely a change triggered by `popstate`
      path !== pendingPath) {
        const historyDelta = (focusedState.history ? focusedState.history.length : focusedState.routes.length) - (previousFocusedState.history ? previousFocusedState.history.length : previousFocusedState.routes.length);
        if (historyDelta > 0) history.push({
          path,
          state
        });else if (historyDelta < 0) {
          const nextIndex = history.backIndex({
              path
            }),
            currentIndex = history.index;
          try {
            nextIndex !== -1 && nextIndex < currentIndex &&
            // We should only go back if the entry exists and it's less than current index
            history.get(nextIndex - currentIndex) ? await history.go(nextIndex - currentIndex) : await history.go(historyDelta), history.replace({
              path,
              state
            });
          } catch {}
        } else history.replace({
          path,
          state
        });
      } else history.replace({
        path,
        state
      });
    };
    return ref.current?.addListener("state", series(onStateChange));
  }, [enabled, history, ref]), {
    getInitialState
  };
}
export { useLinking as default, series };
//# sourceMappingURL=useLinking.mjs.map
