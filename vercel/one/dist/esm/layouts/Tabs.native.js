import { jsx as _jsx } from "react/jsx-runtime";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, Pressable } from "react-native";
import { Link } from "../link/Link";
import { withLayoutContext } from "./withLayoutContext";
var BottomTabNavigator = createBottomTabNavigator().Navigator, Tabs = withLayoutContext(BottomTabNavigator, function(screens) {
  return screens.map(function(screen) {
    var _screen_options;
    if (typeof screen.options != "function" && ((_screen_options = screen.options) === null || _screen_options === void 0 ? void 0 : _screen_options.href) !== void 0) {
      var { href, ...options } = screen.options;
      if (options.tabBarButton)
        throw new Error("Cannot use `href` and `tabBarButton` together.");
      return {
        ...screen,
        options: {
          ...options,
          tabBarButton: function(props) {
            if (href == null)
              return null;
            var children = Platform.OS === "web" ? props.children : /* @__PURE__ */ _jsx(Pressable, {
              children: props.children
            });
            return /* @__PURE__ */ _jsx(Link, {
              ...props,
              style: [
                {
                  display: "flex"
                },
                props.style
              ],
              href,
              asChild: Platform.OS !== "web",
              // biome-ignore lint/correctness/noChildrenProp: <explanation>
              children
            });
          }
        }
      };
    }
    return screen;
  });
}), Tabs_default = Tabs;
export {
  Tabs,
  Tabs_default as default
};
//# sourceMappingURL=Tabs.js.map
