"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Sitemap_exports = {};
__export(Sitemap_exports, {
  Sitemap: () => Sitemap,
  getNavOptions: () => getNavOptions
});
module.exports = __toCommonJS(Sitemap_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_react_native = require("react-native"), INDENT = 24;
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, {
    children: "sitemap!!!!!!!!!"
  });
}
var styles = import_react_native.StyleSheet.create({
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
  filename: {
    color: "white",
    fontSize: 20,
    marginLeft: 12
  },
  virtual: {
    textAlign: "right",
    color: "white"
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sitemap,
  getNavOptions
});
//# sourceMappingURL=Sitemap.js.map
