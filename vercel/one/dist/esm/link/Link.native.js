import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Platform, Text } from "react-native";
import { resolveHref } from "./href";
import { useLinkTo } from "./useLinkTo";
var Link = /* @__PURE__ */ React.forwardRef(function(param, ref) {
  var {
    href,
    replace,
    push,
    // TODO: This does not prevent default on the anchor tag.
    asChild,
    rel,
    target,
    download,
    ...rest
  } = param, style = useInteropClassName(rest), hrefAttrs = useHrefAttrs({
    asChild,
    rel,
    target,
    download
  }), resolvedHref = React.useMemo(function() {
    if (href == null)
      throw new Error("Link: href is required");
    return resolveHref(href);
  }, [
    href
  ]), props = useLinkTo({
    href: resolvedHref,
    replace
  }), onPress = function(e) {
    if ("onPress" in rest) {
      var _rest_onPress;
      (_rest_onPress = rest.onPress) === null || _rest_onPress === void 0 || _rest_onPress.call(rest, e);
    }
    props.onPress(e);
  }, Element = asChild ? Slot : Text;
  return /* @__PURE__ */ _jsx(Element, {
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
  return Platform.OS !== "web" ? props.style : React.useMemo(function() {
    if (props.className == null)
      return props.style;
    var cssStyle = {
      $$css: !0,
      __routerLinkClassName: props.className
    };
    return Array.isArray(props.style) ? [
      ...props.style,
      cssStyle
    ] : [
      props.style,
      cssStyle
    ];
  }, [
    props.style,
    props.className
  ]);
}
var useHrefAttrs = Platform.select({
  web: function(param) {
    var { asChild, rel, target, download } = param;
    return React.useMemo(function() {
      var hrefAttrs = {
        rel,
        target,
        download
      };
      return asChild ? hrefAttrs : {
        hrefAttrs
      };
    }, [
      asChild,
      rel,
      target,
      download
    ]);
  },
  default: function() {
    return {};
  }
});
export {
  Link
};
//# sourceMappingURL=Link.js.map
