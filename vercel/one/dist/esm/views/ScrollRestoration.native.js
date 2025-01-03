import { useEffect } from "react";
import { setLastAction } from "../router/lastAction";
import { subscribeToLoadingState, subscribeToRootState } from "../router/router";
var KEY = "one-sr", getState = function() {
  return JSON.parse(sessionStorage.getItem(KEY) || "{}");
}, isFirstLoad = !0;
function restorePosition() {
  try {
    var positions = getState(), saved = positions[window.location.pathname];
    typeof saved == "number" && setTimeout(function() {
      window.scrollTo(0, saved);
    });
  } catch (error) {
    console.error("Error restoring scroll position", error), sessionStorage.removeItem(KEY);
  }
}
var didPop = !1;
function rememberScrollPosition() {
  didPop = !1;
  var state = getState();
  state[window.location.pathname] = window.scrollY, sessionStorage.setItem(KEY, JSON.stringify(state));
}
var disable = null;
function configure(props) {
  if (!(typeof window > "u" || !window.addEventListener)) {
    disable?.();
    var popStateController = new AbortController();
    window.addEventListener("popstate", function() {
      didPop = !0, setLastAction();
    }, {
      signal: popStateController.signal
    });
    var disposeOnLoadState = subscribeToLoadingState(function(state) {
      state === "loading" && rememberScrollPosition();
    }), disposeOnRootState = subscribeToRootState(function(state) {
      var _state_linkOptions;
      if (isFirstLoad) {
        isFirstLoad = !1;
        return;
      }
      ((_state_linkOptions = state.linkOptions) === null || _state_linkOptions === void 0 ? void 0 : _state_linkOptions.scroll) !== !1 && (didPop ? props.disable !== "restore" && restorePosition() : window.scrollTo(0, 0));
    });
    return disable = function() {
      popStateController.abort(), disposeOnLoadState(), disposeOnRootState();
    }, disable;
  }
}
function ScrollRestoration(props) {
  return useEffect(function() {
    return configure(props);
  }, [
    props.disable
  ]), null;
}
export {
  ScrollRestoration
};
//# sourceMappingURL=ScrollRestoration.js.map
