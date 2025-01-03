import { useNavigationContainerRef } from "@react-navigation/native";
import { initialize } from "./router";
import * as routerStore from "./router";
let initialized = !1;
function useInitializeOneRouter(context, initialLocation) {
  const navigationRef = useNavigationContainerRef();
  return initialized || (initialize(context, navigationRef, initialLocation), initialized = !0), routerStore;
}
function resetState() {
  initialized = !1, resetReactNavigationContexts();
}
globalThis.__vxrnresetState = resetState;
function resetReactNavigationContexts() {
  const contexts = "__react_navigation__elements_contexts";
  globalThis[contexts] = /* @__PURE__ */ new Map();
}
export {
  resetState,
  useInitializeOneRouter
};
//# sourceMappingURL=useInitializeOneRouter.js.map
