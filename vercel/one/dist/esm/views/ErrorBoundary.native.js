import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
function ErrorBoundary(param) {
  var { error, retry } = param, inTabBar = React.useContext(BottomTabBarHeightContext), Wrapper = inTabBar ? View : SafeAreaView;
  return console.error("error", error), null;
}
export {
  ErrorBoundary
};
//# sourceMappingURL=ErrorBoundary.js.map
