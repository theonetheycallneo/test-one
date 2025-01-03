import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOneRouter } from "../router/router";
function useLoadedNavigation() {
  const { navigationRef } = useOneRouter(), navigation = useNavigation(), isMounted = useRef(!0), pending = useRef([]);
  useEffect(() => (isMounted.current = !0, () => {
    isMounted.current = !1;
  }), []);
  const flush = useCallback(() => {
    if (isMounted.current) {
      const pendingCallbacks = pending.current;
      pending.current = [], pendingCallbacks.forEach((callback) => {
        callback(navigation);
      });
    }
  }, [navigation]);
  return useEffect(() => {
    navigationRef.current && flush();
  }, [flush, navigationRef]), useCallback(
    (fn) => {
      pending.current.push(fn), navigationRef.current && flush();
    },
    [flush, navigationRef]
  );
}
function useOptionalNavigation() {
  const [navigation, setNavigation] = useState(null), loadNavigation = useLoadedNavigation();
  return useEffect(() => {
    loadNavigation((nav) => setNavigation(nav));
  }, [loadNavigation]), navigation;
}
export {
  useLoadedNavigation,
  useOptionalNavigation
};
//# sourceMappingURL=useLoadedNavigation.js.map
