var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var ScrollRestoration_exports = {};
__export(ScrollRestoration_exports, {
  ScrollRestoration: () => ScrollRestoration
});
module.exports = __toCommonJS(ScrollRestoration_exports);
var import_react = require("react"),
  import_lastAction = require("../router/lastAction.cjs"),
  import_router = require("../router/router.cjs");
const KEY = "one-sr",
  getState = () => JSON.parse(sessionStorage.getItem(KEY) || "{}");
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
  if (typeof window > "u" || !window.addEventListener) return;
  disable?.();
  const popStateController = new AbortController();
  window.addEventListener("popstate", () => {
    didPop = !0, (0, import_lastAction.setLastAction)();
  }, {
    signal: popStateController.signal
  });
  const disposeOnLoadState = (0, import_router.subscribeToLoadingState)(state => {
      state === "loading" && rememberScrollPosition();
    }),
    disposeOnRootState = (0, import_router.subscribeToRootState)(state => {
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
  return (0, import_react.useEffect)(() => configure(props), [props.disable]), null;
}