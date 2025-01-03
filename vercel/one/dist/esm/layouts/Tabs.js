import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { Platform, Pressable } from "react-native-web";
import { Link } from "../link/Link";
import { withLayoutContext } from "./withLayoutContext";
import { jsx } from "react/jsx-runtime";
const BottomTabNavigator = createBottomTabNavigator().Navigator, Tabs = withLayoutContext(BottomTabNavigator, (screens) => screens.map((screen) => {
  if (typeof screen.options != "function" && screen.options?.href !== void 0) {
    const { href, ...options } = screen.options;
    if (options.tabBarButton)
      throw new Error("Cannot use `href` and `tabBarButton` together.");
    return {
      ...screen,
      options: {
        ...options,
        tabBarButton: (props) => {
          if (href == null)
            return null;
          const children = Platform.OS === "web" ? props.children : /* @__PURE__ */ jsx(Pressable, { children: props.children });
          return /* @__PURE__ */ jsx(
            Link,
            {
              ...props,
              style: [{ display: "flex" }, props.style],
              href,
              asChild: Platform.OS !== "web",
              children
            }
          );
        }
      }
    };
  }
  return screen;
}));
var Tabs_default = Tabs;
export {
  Tabs,
  Tabs_default as default
};
//# sourceMappingURL=Tabs.js.map
