import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Platform, Text } from "react-native-web";
import { resolveHref } from "./href.mjs";
import { useLinkTo } from "./useLinkTo.mjs";
import { jsx } from "react/jsx-runtime";
const Link = React.forwardRef(function ({
  href,
  replace,
  push,
  // TODO: This does not prevent default on the anchor tag.
  asChild,
  rel,
  target,
  download,
  ...rest
}, ref) {
  const style = useInteropClassName(rest),
    hrefAttrs = useHrefAttrs({
      asChild,
      rel,
      target,
      download
    }),
    resolvedHref = React.useMemo(() => {
      if (href == null) throw new Error("Link: href is required");
      return resolveHref(href);
    }, [href]),
    props = useLinkTo({
      href: resolvedHref,
      replace
    }),
    onPress = e => {
      "onPress" in rest && rest.onPress?.(e), props.onPress(e);
    };
  return /* @__PURE__ */jsx(asChild ? Slot : Text, {
    ref,
    ...props,
    ...hrefAttrs,
    ...rest,
    style: asChild ? null : style,
    ...Platform.select({
      web: {
        onClick: onPress
      },
      default: {
        onPress
      }
    })
  });
});
Link.resolveHref = resolveHref;
function useInteropClassName(props) {
  return Platform.OS !== "web" ? props.style : React.useMemo(() => {
    if (props.className == null) return props.style;
    const cssStyle = {
      $$css: !0,
      __routerLinkClassName: props.className
    };
    return Array.isArray(props.style) ? [...props.style, cssStyle] : [props.style, cssStyle];
  }, [props.style, props.className]);
}
const useHrefAttrs = Platform.select({
  web: function ({
    asChild,
    rel,
    target,
    download
  }) {
    return React.useMemo(() => {
      const hrefAttrs = {
        rel,
        target,
        download
      };
      return asChild ? hrefAttrs : {
        hrefAttrs
      };
    }, [asChild, rel, target, download]);
  },
  default: function () {
    return {};
  }
});
export { Link };
//# sourceMappingURL=Link.mjs.map
