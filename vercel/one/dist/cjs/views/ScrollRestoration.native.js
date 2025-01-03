"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var ScrollRestoration_exports = {};
__export(ScrollRestoration_exports, {
  ScrollRestoration: () => ScrollRestoration
});
module.exports = __toCommonJS(ScrollRestoration_exports);
var import_react = require("react"), import_lastAction = require("../router/lastAction"), import_router = require("../router/router"), KEY = "one-sr", getState = function() {
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
    disable == null || disable();
    var popStateController = new AbortController();
    window.addEventListener("popstate", function() {
      didPop = !0, (0, import_lastAction.setLastAction)();
    }, {
      signal: popStateController.signal
    });
    var disposeOnLoadState = (0, import_router.subscribeToLoadingState)(function(state) {
      state === "loading" && rememberScrollPosition();
    }), disposeOnRootState = (0, import_router.subscribeToRootState)(function(state) {
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
  return (0, import_react.useEffect)(function() {
    return configure(props);
  }, [
    props.disable
  ]), null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollRestoration
});
//# sourceMappingURL=ScrollRestoration.js.map
