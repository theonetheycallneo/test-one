import React from "react";
import { StyleSheet, Text } from "react-native-web";
import { Fragment, jsx } from "react/jsx-runtime";
function Unmatched() {
  return /* @__PURE__ */jsx(Text, {
    children: "unmmatched!!!!!!!!!"
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 36,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomColor: "#323232",
    borderBottomWidth: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center"
  },
  link: {
    color: "rgba(255,255,255,0.4)",
    textAlign: "center"
  }
});
export { Unmatched };
//# sourceMappingURL=Unmatched.mjs.map
