import { useEffect } from "react";
import { setLastAction } from "../router/lastAction";
import { subscribeToLoadingState, subscribeToRootState } from "../router/router";
const KEY = "one-sr", getState = () => JSON.parse(sessionStorage.getItem(KEY) || "{}");
let isFirstLoad = !0;
function restorePosition() {
  try {
    const saved = getState()[window.location.pathname];
    typeof saved == "number" && setTimeout(() => {
      window.scrollTo(0, saved);
    });
  } catch (error) {
    console.error("Error restoring scroll position", error), sessionStorage.removeItem(KEY);
  }
}
let didPop = !1;
function rememberScrollPosition() {
  didPop = !1;
  const state = getState();
  state[window.location.pathname] = window.scrollY, sessionStorage.setItem(KEY, JSON.stringify(state));
}
let disable = null;
function configure(props) {
  if (typeof window > "u" || !window.addEventListener)
    return;
  disable?.();
  const popStateController = new AbortController();
  window.addEventListener(
    "popstate",
    () => {
      didPop = !0, setLastAction();
    },
    {
      signal: popStateController.signal
    }
  );
  const disposeOnLoadState = subscribeToLoadingState((state) => {
    state === "loading" && rememberScrollPosition();
  }), disposeOnRootState = subscribeToRootState((state) => {
    if (isFirstLoad) {
      isFirstLoad = !1;
      return;
    }
    state.linkOptions?.scroll !== !1 && (didPop ? props.disable !== "restore" && restorePosition() : window.scrollTo(0, 0));
  });
  return disable = () => {
    popStateController.abort(), disposeOnLoadState(), disposeOnRootState();
  }, disable;
}
function ScrollRestoration(props) {
  return useEffect(() => configure(props), [props.disable]), null;
}
export {
  ScrollRestoration
};
//# sourceMappingURL=ScrollRestoration.js.map
