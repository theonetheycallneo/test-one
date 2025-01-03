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
var Head_ios_exports = {};
__export(Head_ios_exports, {
  Head: () => Head
});
module.exports = __toCommonJS(Head_ios_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_core = require("@react-navigation/core"), import_react = __toESM(require("react"), 1), import_HeadModule = require("./HeadModule"), import_url = require("./url"), import_hooks = require("../hooks");
function urlToId(url) {
  return url.replace(/[^a-zA-Z0-9]/g, "-");
}
function getLastSegment(path) {
  var _path_split_pop, lastSegment = (_path_split_pop = path.split("/").pop()) !== null && _path_split_pop !== void 0 ? _path_split_pop : "";
  return lastSegment.replace(/\.[^/.]+$/, "").split("?")[0];
}
function useAddressableLink() {
  var pathname = (0, import_hooks.useUnstableGlobalHref)(), params = (0, import_hooks.useParams)(), url = (0, import_url.getStaticUrlFromOneRouter)(pathname);
  return {
    url,
    pathname,
    params
  };
}
function useMetaChildren(children) {
  return import_react.default.useMemo(function() {
    var renderableChildren = [], metaChildren = [];
    return import_react.default.Children.forEach(children, function(child) {
      /* @__PURE__ */ import_react.default.isValidElement(child) && (typeof child.type == "string" ? metaChildren.push(child) : renderableChildren.push(child));
    }), {
      children: renderableChildren,
      metaChildren
    };
  }, [
    children
  ]);
}
function serializedMetaChildren(meta) {
  var validMeta = meta.filter(function(child) {
    return child.type === "meta" || child.type === "title";
  });
  return validMeta.map(function(child) {
    return child.type === "title" ? {
      type: "title",
      props: {
        children: typeof child.props.children == "string" ? child.props.children : void 0
      }
    } : {
      type: "meta",
      props: {
        property: typeof child.props.property == "string" ? child.props.property : void 0,
        content: typeof child.props.content == "string" ? child.props.content : void 0
      }
    };
  });
}
function useActivityFromMetaChildren(meta) {
  var { url: href, pathname } = useAddressableLink(), previousMeta = import_react.default.useRef([]), cachedActivity = import_react.default.useRef({}), sortedMeta = import_react.default.useMemo(function() {
    return serializedMetaChildren(meta);
  }, [
    meta
  ]), url = import_react.default.useMemo(function() {
    var urlMeta = sortedMeta.find(function(child) {
      return child.type === "meta" && child.props.property === "og:url";
    });
    if (urlMeta) {
      var _urlMeta_props_content;
      return !((_urlMeta_props_content = urlMeta.props.content) === null || _urlMeta_props_content === void 0) && _urlMeta_props_content.startsWith("/") ? (0, import_url.getStaticUrlFromOneRouter)(urlMeta.props.content) : urlMeta.props.content;
    }
    return href;
  }, [
    sortedMeta,
    href
  ]), title = import_react.default.useMemo(function() {
    var titleTag = sortedMeta.find(function(child) {
      return child.type === "title";
    });
    if (titleTag) {
      var _titleTag_props_children;
      return (_titleTag_props_children = titleTag.props.children) !== null && _titleTag_props_children !== void 0 ? _titleTag_props_children : "";
    }
    var titleMeta = sortedMeta.find(function(child) {
      return child.type === "meta" && child.props.property === "og:title";
    });
    if (titleMeta) {
      var _titleMeta_props_content;
      return (_titleMeta_props_content = titleMeta.props.content) !== null && _titleMeta_props_content !== void 0 ? _titleMeta_props_content : "";
    }
    return getLastSegment(pathname);
  }, [
    sortedMeta,
    pathname
  ]), activity = import_react.default.useMemo(function() {
    if (previousMeta.current && cachedActivity.current && deepObjectCompare(previousMeta.current, sortedMeta))
      return cachedActivity.current;
    previousMeta.current = sortedMeta;
    var userActivity = {};
    return sortedMeta.forEach(function(child) {
      if (
        // <meta />
        child.type === "meta"
      ) {
        var { property, content } = child.props;
        switch (property) {
          case "og:description":
            userActivity.description = content;
            break;
          // Custom properties
          case "expo:handoff":
            userActivity.isEligibleForHandoff = isTruthy(content);
            break;
          case "expo:spotlight":
            userActivity.isEligibleForSearch = isTruthy(content);
            break;
        }
      }
    }), cachedActivity.current = userActivity, userActivity;
  }, [
    sortedMeta
  ]), parsedActivity = {
    keywords: [
      title
    ],
    ...activity,
    title,
    webpageURL: url,
    activityType: Head.activities.INDEXED_ROUTE,
    userInfo: {
      // TODO: This may need to be  versioned in the future, e.g. `_v1` if we change the format.
      href
    }
  };
  return parsedActivity;
}
function isTruthy(value) {
  return [
    !0,
    "true"
  ].includes(value);
}
function HeadNative(props) {
  var isFocused = (0, import_core.useIsFocused)();
  return isFocused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusedHead, {
    ...props
  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnfocusedHead, {});
}
function UnfocusedHead(props) {
  var { children } = useMetaChildren(props.children);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children
  });
}
function FocusedHead(props) {
  var { metaChildren, children } = useMetaChildren(props.children), activity = useActivityFromMetaChildren(metaChildren);
  return useRegisterCurrentActivity(activity), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children
  });
}
var activities = /* @__PURE__ */ new Map();
function useRegisterCurrentActivity(activity) {
  var activityId = urlToId((0, import_hooks.usePathname)() || "/"), cascadingId = urlToId((0, import_hooks.useSegments)().join("-") || "-"), cascadingActivity = import_react.default.useMemo(function() {
    var cascadingActivity2 = activities.has(cascadingId) ? {
      ...activities.get(cascadingId),
      ...activity,
      id: activityId
    } : {
      ...activity,
      id: activityId
    };
    return activities.set(cascadingId, cascadingActivity2), cascadingActivity2;
  }, [
    cascadingId,
    activityId,
    activity
  ]), previousActivity = import_react.default.useRef(null);
  import_react.default.useEffect(function() {
    if (!cascadingActivity)
      return function() {
      };
    if (previousActivity.current && deepObjectCompare(previousActivity.current, cascadingActivity))
      return function() {
      };
    if (previousActivity.current = cascadingActivity, !cascadingActivity.id)
      throw new Error("Activity must have an ID");
    return (cascadingActivity.isEligibleForHandoff || cascadingActivity.isEligibleForSearch) && (Head == null || Head.createActivity(cascadingActivity)), function() {
    };
  }, [
    cascadingActivity
  ]), import_react.default.useEffect(function() {
    return function() {
      activityId && (import_HeadModule.HeadModule === null || import_HeadModule.HeadModule === void 0 || import_HeadModule.HeadModule.suspendActivity(activityId));
    };
  }, [
    activityId
  ]);
}
function deepObjectCompare(a, b) {
  if (typeof a != typeof b)
    return !1;
  if (typeof a == "object") {
    if (Array.isArray(a) !== Array.isArray(b))
      return !1;
    if (Array.isArray(a))
      return a.length !== b.length ? !1 : a.every(function(item, index) {
        return deepObjectCompare(item, b[index]);
      });
    if (a === null || b === null)
      return a === b;
    var aKeys = Object.keys(a), bKeys = Object.keys(b);
    return aKeys.length !== bKeys.length ? !1 : aKeys.every(function(key) {
      return deepObjectCompare(a[key], b[key]);
    });
  }
  return a === b;
}
HeadNative.Provider = import_react.default.Fragment;
function HeadShim(props) {
  return null;
}
HeadShim.Provider = import_react.default.Fragment;
var Head = import_HeadModule.HeadModule ? HeadNative : HeadShim;
Object.assign(Head, import_HeadModule.HeadModule);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Head
});
//# sourceMappingURL=Head.ios.js.map
