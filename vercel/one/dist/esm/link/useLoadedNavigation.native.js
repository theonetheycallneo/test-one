import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOneRouter } from "../router/router";
function useLoadedNavigation() {
  var { navigationRef } = useOneRouter(), navigation = useNavigation(), isMounted = useRef(!0), pending = useRef([]);
  useEffect(function() {
    return isMounted.current = !0, function() {
      isMounted.current = !1;
    };
  }, []);
  var flush = useCallback(function() {
    if (isMounted.current) {
      var pendingCallbacks = pending.current;
      pending.current = [], pendingCallbacks.forEach(function(callback) {
        callback(navigation);
      });
    }
  }, [
    navigation
  ]);
  useEffect(function() {
    navigationRef.current && flush();
  }, [
    flush,
    navigationRef
  ]);
  var push = useCallback(function(fn) {
    pending.current.push(fn), navigationRef.current && flush();
  }, [
    flush,
    navigationRef
  ]);
  return push;
}
function useOptionalNavigation() {
  var [navigation, setNavigation] = useState(null), loadNavigation = useLoadedNavigation();
  return useEffect(function() {
    loadNavigation(function(nav) {
      return setNavigation(nav);
    });
  }, [
    loadNavigation
  ]), navigation;
}
export {
  useLoadedNavigation,
  useOptionalNavigation
};
//# sourceMappingURL=useLoadedNavigation.js.map
