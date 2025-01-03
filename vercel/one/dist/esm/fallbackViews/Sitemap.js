import { StyleSheet, Text } from "react-native-web";
import { jsx } from "react/jsx-runtime";
const INDENT = 24;
function getNavOptions() {
  return {
    title: "sitemap",
    headerShown: !1,
    presentation: "modal",
    animation: "default",
    headerLargeTitle: !1,
    headerTitleStyle: {
      color: "white"
    },
    headerTintColor: "white",
    headerLargeTitleStyle: {
      color: "white"
    },
    headerStyle: {
      backgroundColor: "black",
      // @ts-expect-error: mistyped
      borderBottomColor: "#323232"
    }
  };
}
function Sitemap() {
  return /* @__PURE__ */ jsx(Text, { children: "sitemap!!!!!!!!!" });
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "stretch"
  },
  main: {
    marginHorizontal: "auto",
    flex: 1,
    alignItems: "stretch"
  },
  scroll: {
    paddingHorizontal: 12,
    // flex: 1,
    // paddingTop: top + 12,
    alignItems: "stretch"
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#323232",
    borderRadius: 19,
    marginBottom: 12,
    overflow: "hidden"
  },
  itemPressable: {
    paddingHorizontal: INDENT,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filename: { color: "white", fontSize: 20, marginLeft: 12 },
  virtual: { textAlign: "right", color: "white" },
  image: { width: 24, height: 24, resizeMode: "contain" }
});
export {
  Sitemap,
  getNavOptions
};
//# sourceMappingURL=Sitemap.js.map
