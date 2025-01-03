import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native-web";
import { SafeAreaView } from "react-native-safe-area-context";
function ErrorBoundary({
  error,
  retry
}) {
  const Wrapper = React.useContext(BottomTabBarHeightContext) ? View : SafeAreaView;
  return console.error("error", error), null;
}
export { ErrorBoundary };
//# sourceMappingURL=ErrorBoundary.mjs.map
