import React from "react";
import { useContextKey } from "../Route";
import { useSortedScreens } from "../useScreens";
import { Screen } from "../views/Screen";
import { jsx } from "react/jsx-runtime";
function useFilterScreenChildren(children, {
  isCustomNavigator,
  contextKey
} = {}) {
  return React.useMemo(() => {
    const customChildren = [], screens = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child && child.type === Screen) {
        if (!child.props.name)
          throw new Error(
            `<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must have a \`name\` prop when used as a child of a Layout Route.`
          );
        if (process.env.NODE_ENV !== "production" && ["children", "component", "getComponent"].some((key) => key in child.props))
          throw new Error(
            `<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must not have a \`children\`, \`component\`, or \`getComponent\` prop when used as a child of a Layout Route`
          );
        return child.props;
      }
      isCustomNavigator ? customChildren.push(child) : console.warn(
        `Layout children must be of type Screen, all other children are ignored. To use custom children, create a custom <Layout />. Update Layout Route at: "app${contextKey}/_layout"`
      );
    });
    if (process.env.NODE_ENV !== "production") {
      const names = screens?.map((screen) => screen.name);
      if (names && new Set(names).size !== names.length)
        throw new Error("Screen names must be unique: " + names);
    }
    return {
      screens,
      children: customChildren
    };
  }, [children, contextKey, isCustomNavigator]);
}
function withLayoutContext(Nav, processor) {
  const Navigator = React.forwardRef(
    ({ children: userDefinedChildren, ...props }, ref) => {
      const contextKey = useContextKey(), { screens } = useFilterScreenChildren(userDefinedChildren, {
        contextKey
      }), processed = processor ? processor(screens ?? []) : screens, sorted = useSortedScreens(processed ?? []);
      return sorted.length ? (
        // @ts-expect-error
        /* @__PURE__ */ jsx(Nav, { ...props, id: contextKey, ref, children: sorted })
      ) : null;
    }
  );
  return Navigator.Screen = Screen, Navigator;
}
export {
  useFilterScreenChildren,
  withLayoutContext
};
//# sourceMappingURL=withLayoutContext.js.map
