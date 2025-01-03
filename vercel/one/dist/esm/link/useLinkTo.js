import { Platform } from "react-native-web";
import { appendBaseUrl } from "../fork/getPathFromState";
import { useOneRouter } from "../router/router";
import { stripGroupSegmentsFromPath } from "../matchers";
function eventShouldPreventDefault(e) {
  return e?.defaultPrevented ? !1 : (
    // Only check MouseEvents
    !!("button" in e && // ignore clicks with modifier keys
    !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey && (e.button == null || e.button === 0) && // Only accept left clicks
    [void 0, null, "", "self"].includes(e.currentTarget.target))
  );
}
function useLinkTo(props) {
  const { linkTo } = useOneRouter(), onPress = (e) => {
    const event = props.replace ? "REPLACE" : "PUSH";
    let shouldHandle = !1;
    Platform.OS !== "web" || !e ? shouldHandle = e ? !e.defaultPrevented : !0 : eventShouldPreventDefault(e) && (e.preventDefault(), shouldHandle = !0), shouldHandle && linkTo(props.href, event);
  };
  return {
    // Ensure there's always a value for href. Manually append the baseUrl to the href prop that shows in the static HTML.
    href: appendBaseUrl(stripGroupSegmentsFromPath(props.href) || "/"),
    role: "link",
    onPress
  };
}
export {
  useLinkTo
};
//# sourceMappingURL=useLinkTo.js.map
