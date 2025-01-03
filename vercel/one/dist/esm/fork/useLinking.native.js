import { getActionFromState as getActionFromStateDefault, getStateFromPath as getStateFromPathDefault } from "@react-navigation/core";
import * as React from "react";
import { Linking, Platform } from "react-native";
import { extractExpoPathFromURL } from "./extractPathFromURL";
var linkingHandlers = [];
function useLinking(ref, param) {
  var {
    // enabled = true,
    // prefixes,
    filter,
    config,
    getInitialURL = function() {
      return Promise.race([
        Linking.getInitialURL(),
        new Promise(function(resolve) {
          return (
            // Timeout in 150ms if `getInitialState` doesn't resolve
            // Workaround for https://github.com/facebook/react-native/issues/25675
            setTimeout(resolve, 150)
          );
        })
      ]);
    },
    subscribe = function(listener) {
      var callback = function(param2) {
        var { url } = param2;
        return listener(url);
      }, subscription = Linking.addEventListener("url", callback);
      return function() {
        subscription?.remove();
      };
    },
    getStateFromPath = getStateFromPathDefault,
    getActionFromState = getActionFromStateDefault
  } = param;
  React.useEffect(function() {
    if (process.env.NODE_ENV !== "production") {
      // enabled !== false &&
      linkingHandlers.length && console.error([
        "Looks like you have configured linking in multiple places. This is likely an error since deep links should only be handled in one place to avoid conflicts. Make sure that:",
        "- You don't have multiple NavigationContainers in the app each with 'linking' enabled",
        "- Only a single instance of the root component is rendered",
        Platform.OS === "android" ? "- You have set 'android:launchMode=singleTask' in the '<activity />' section of the 'AndroidManifest.xml' file to avoid launching multiple instances" : ""
      ].join(`
`).trim());
      var handler = Symbol();
      return linkingHandlers.push(handler), function() {
        var index = linkingHandlers.indexOf(handler);
        index > -1 && linkingHandlers.splice(index, 1);
      };
    }
  }, []);
  var filterRef = React.useRef(filter), configRef = React.useRef(config), getInitialURLRef = React.useRef(getInitialURL), getStateFromPathRef = React.useRef(getStateFromPath), getActionFromStateRef = React.useRef(getActionFromState);
  React.useEffect(function() {
    filterRef.current = filter, configRef.current = config, getInitialURLRef.current = getInitialURL, getStateFromPathRef.current = getStateFromPath, getActionFromStateRef.current = getActionFromState;
  });
  var getStateFromURL = React.useCallback(function(url) {
    if (!(!url || filterRef.current && !filterRef.current(url))) {
      var path = extractExpoPathFromURL(url);
      return path !== void 0 ? getStateFromPathRef.current(path, configRef.current) : void 0;
    }
  }, []), getInitialState = React.useCallback(function() {
    var url = getInitialURLRef.current();
    if (url != null && typeof url != "string")
      return url.then(function(url2) {
        var state2 = getStateFromURL(url2);
        return state2;
      });
    var state = getStateFromURL(url), thenable = {
      // biome-ignore lint/suspicious/noThenProperty: <explanation>
      then(onfulfilled) {
        return onfulfilled?.(state), thenable;
      },
      catch() {
        return thenable;
      }
    };
    return thenable;
  }, [
    getStateFromURL
  ]);
  return React.useEffect(function() {
    var listener = function(url) {
      var navigation = ref.current, state = navigation ? getStateFromURL(url) : void 0;
      if (navigation && state) {
        var rootState = navigation.getRootState();
        if (state.routes.some(function(r) {
          return !rootState?.routeNames.includes(r.name);
        })) {
          console.warn("The navigation state parsed from the URL contains routes not present in the root navigator. This usually means that the linking configuration doesn't match the navigation structure. See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.");
          return;
        }
        var action = getActionFromStateRef.current(state, configRef.current);
        if (action !== void 0)
          try {
            navigation.dispatch(action);
          } catch (e) {
            console.warn(`An error occurred when trying to handle the link '${url}': ${typeof e == "object" && e != null && "message" in e ? e.message : e}`);
          }
        else
          navigation.resetRoot(state);
      }
    };
    return subscribe(listener);
  }, [
    // enabled,
    getStateFromURL,
    ref,
    subscribe
  ]), {
    getInitialState
  };
}
export {
  useLinking as default
};
//# sourceMappingURL=useLinking.native.js.map
