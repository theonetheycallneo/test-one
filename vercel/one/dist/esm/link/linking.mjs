import * as Linking from "expo-linking";
import { Platform } from "react-native-web";
import { adjustPathname } from "../fork/extractPathFromURL.mjs";
import getPathFromState from "../fork/getPathFromState.mjs";
import getStateFromPath from "../fork/getStateFromPath.mjs";
const isExpoGo = typeof expo < "u" && globalThis.expo?.modules?.ExpoGo;
function getInitialURL() {
  if (process.env.NODE_ENV === "test") return Linking.getInitialURL() ?? getRootURL();
  if (Platform.OS === "web") {
    if (typeof window > "u") return "";
    if (window.location?.href) return window.location.href;
  }
  return Promise.race([(async () => {
    const url = await Linking.getInitialURL();
    if (url && isExpoGo) {
      const parsed = Linking.parse(url);
      if (parsed.path === null || ["", "/"].includes(adjustPathname({
        hostname: parsed.hostname,
        pathname: parsed.path
      }))) return getRootURL();
    }
    return url ?? getRootURL();
  })(), new Promise(resolve =>
  // Timeout in 150ms if `getInitialState` doesn't resolve
  // Workaround for https://github.com/facebook/react-native/issues/25675
  setTimeout(() => resolve(getRootURL()), 150))]);
}
let _rootURL;
function getRootURL() {
  return _rootURL === void 0 && (_rootURL = Linking.createURL("/")), _rootURL;
}
function addEventListener(listener) {
  let callback;
  isExpoGo ? callback = ({
    url
  }) => {
    const parsed = Linking.parse(url);
    parsed.path === null || ["", "/"].includes(adjustPathname({
      hostname: parsed.hostname,
      pathname: parsed.path
    })) ? listener(getRootURL()) : listener(url);
  } : callback = ({
    url
  }) => listener(url);
  const subscription = Linking.addEventListener("url", callback);
  return () => {
    subscription?.remove?.();
  };
}
export { addEventListener, getInitialURL, getPathFromState, getRootURL, getStateFromPath };
//# sourceMappingURL=linking.mjs.map
