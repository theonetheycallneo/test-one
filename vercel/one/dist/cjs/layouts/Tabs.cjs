var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var Tabs_exports = {};
__export(Tabs_exports, {
  Tabs: () => Tabs,
  default: () => Tabs_default
});
module.exports = __toCommonJS(Tabs_exports);
var import_bottom_tabs = require("@react-navigation/bottom-tabs"),
  import_react_native = require("react-native-web"),
  import_Link = require("../link/Link.cjs"),
  import_withLayoutContext = require("./withLayoutContext.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const BottomTabNavigator = (0, import_bottom_tabs.createBottomTabNavigator)().Navigator,
  Tabs = (0, import_withLayoutContext.withLayoutContext)(BottomTabNavigator, screens => screens.map(screen => {
    if (typeof screen.options != "function" && screen.options?.href !== void 0) {
      const {
        href,
        ...options
      } = screen.options;
      if (options.tabBarButton) throw new Error("Cannot use `href` and `tabBarButton` together.");
      return {
        ...screen,
        options: {
          ...options,
          tabBarButton: props => {
            if (href == null) return null;
            const children = import_react_native.Platform.OS === "web" ? props.children : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.Pressable, {
              children: props.children
            });
            return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Link.Link, {
              ...props,
              style: [{
                display: "flex"
              }, props.style],
              href,
              asChild: import_react_native.Platform.OS !== "web",
              children
            });
          }
        }
      };
    }
    return screen;
  }));
var Tabs_default = Tabs;