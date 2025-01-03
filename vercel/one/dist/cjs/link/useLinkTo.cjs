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
var useLinkTo_exports = {};
__export(useLinkTo_exports, {
  useLinkTo: () => useLinkTo
});
module.exports = __toCommonJS(useLinkTo_exports);
var import_react_native = require("react-native-web"),
  import_getPathFromState = require("../fork/getPathFromState.cjs"),
  import_router = require("../router/router.cjs"),
  import_matchers = require("../matchers.cjs");
function eventShouldPreventDefault(e) {
  return e?.defaultPrevented ? !1 :
  // Only check MouseEvents
  !!("button" in e &&
  // ignore clicks with modifier keys
  !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey && (e.button == null || e.button === 0) &&
  // Only accept left clicks
  [void 0, null, "", "self"].includes(e.currentTarget.target));
}
function useLinkTo(props) {
  const {
      linkTo
    } = (0, import_router.useOneRouter)(),
    onPress = e => {
      const event = props.replace ? "REPLACE" : "PUSH";
      let shouldHandle = !1;
      import_react_native.Platform.OS !== "web" || !e ? shouldHandle = e ? !e.defaultPrevented : !0 : eventShouldPreventDefault(e) && (e.preventDefault(), shouldHandle = !0), shouldHandle && linkTo(props.href, event);
    };
  return {
    // Ensure there's always a value for href. Manually append the baseUrl to the href prop that shows in the static HTML.
    href: (0, import_getPathFromState.appendBaseUrl)((0, import_matchers.stripGroupSegmentsFromPath)(props.href) || "/"),
    role: "link",
    onPress
  };
}