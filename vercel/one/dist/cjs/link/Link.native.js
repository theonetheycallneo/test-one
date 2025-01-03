"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Link_exports = {};
__export(Link_exports, {
  Link: () => Link
});
module.exports = __toCommonJS(Link_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_react_slot = require("@radix-ui/react-slot"), React = __toESM(require("react"), 1), import_react_native = require("react-native"), import_href = require("./href"), import_useLinkTo = require("./useLinkTo"), Link = /* @__PURE__ */ React.forwardRef(function(param, ref) {
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
    return (0, import_href.resolveHref)(href);
  }, [
    href
  ]), props = (0, import_useLinkTo.useLinkTo)({
    href: resolvedHref,
    replace
  }), onPress = function(e) {
    if ("onPress" in rest) {
      var _rest_onPress;
      (_rest_onPress = rest.onPress) === null || _rest_onPress === void 0 || _rest_onPress.call(rest, e);
    }
    props.onPress(e);
  }, Element = asChild ? import_react_slot.Slot : import_react_native.Text;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Element, {
    ref,
    ...props,
    ...hrefAttrs,
    ...rest,
    style: asChild ? null : style,
    ...import_react_native.Platform.select({
      web: {
        onClick: onPress
      },
      default: {
        onPress
      }
    })
  });
});
Link.resolveHref = import_href.resolveHref;
function useInteropClassName(props) {
  return import_react_native.Platform.OS !== "web" ? props.style : React.useMemo(function() {
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
var useHrefAttrs = import_react_native.Platform.select({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Link
});
//# sourceMappingURL=Link.js.map
