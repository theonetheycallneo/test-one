import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { HeadModule } from "./HeadModule";
import { getStaticUrlFromOneRouter } from "./url";
import { useParams, useUnstableGlobalHref, usePathname, useSegments } from "../hooks";
function urlToId(url) {
  return url.replace(/[^a-zA-Z0-9]/g, "-");
}
function getLastSegment(path) {
  var _path_split_pop, lastSegment = (_path_split_pop = path.split("/").pop()) !== null && _path_split_pop !== void 0 ? _path_split_pop : "";
  return lastSegment.replace(/\.[^/.]+$/, "").split("?")[0];
}
function useAddressableLink() {
  var pathname = useUnstableGlobalHref(), params = useParams(), url = getStaticUrlFromOneRouter(pathname);
  return {
    url,
    pathname,
    params
  };
}
function useMetaChildren(children) {
  return React.useMemo(function() {
    var renderableChildren = [], metaChildren = [];
    return React.Children.forEach(children, function(child) {
      /* @__PURE__ */ React.isValidElement(child) && (typeof child.type == "string" ? metaChildren.push(child) : renderableChildren.push(child));
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
  var { url: href, pathname } = useAddressableLink(), previousMeta = React.useRef([]), cachedActivity = React.useRef({}), sortedMeta = React.useMemo(function() {
    return serializedMetaChildren(meta);
  }, [
    meta
  ]), url = React.useMemo(function() {
    var urlMeta = sortedMeta.find(function(child) {
      return child.type === "meta" && child.props.property === "og:url";
    });
    if (urlMeta) {
      var _urlMeta_props_content;
      return !((_urlMeta_props_content = urlMeta.props.content) === null || _urlMeta_props_content === void 0) && _urlMeta_props_content.startsWith("/") ? getStaticUrlFromOneRouter(urlMeta.props.content) : urlMeta.props.content;
    }
    return href;
  }, [
    sortedMeta,
    href
  ]), title = React.useMemo(function() {
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
  ]), activity = React.useMemo(function() {
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
  var isFocused = useIsFocused();
  return isFocused ? /* @__PURE__ */ _jsx(FocusedHead, {
    ...props
  }) : /* @__PURE__ */ _jsx(UnfocusedHead, {});
}
function UnfocusedHead(props) {
  var { children } = useMetaChildren(props.children);
  return /* @__PURE__ */ _jsx(_Fragment, {
    children
  });
}
function FocusedHead(props) {
  var { metaChildren, children } = useMetaChildren(props.children), activity = useActivityFromMetaChildren(metaChildren);
  return useRegisterCurrentActivity(activity), /* @__PURE__ */ _jsx(_Fragment, {
    children
  });
}
var activities = /* @__PURE__ */ new Map();
function useRegisterCurrentActivity(activity) {
  var activityId = urlToId(usePathname() || "/"), cascadingId = urlToId(useSegments().join("-") || "-"), cascadingActivity = React.useMemo(function() {
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
  ]), previousActivity = React.useRef(null);
  React.useEffect(function() {
    if (!cascadingActivity)
      return function() {
      };
    if (previousActivity.current && deepObjectCompare(previousActivity.current, cascadingActivity))
      return function() {
      };
    if (previousActivity.current = cascadingActivity, !cascadingActivity.id)
      throw new Error("Activity must have an ID");
    return (cascadingActivity.isEligibleForHandoff || cascadingActivity.isEligibleForSearch) && Head?.createActivity(cascadingActivity), function() {
    };
  }, [
    cascadingActivity
  ]), React.useEffect(function() {
    return function() {
      activityId && (HeadModule === null || HeadModule === void 0 || HeadModule.suspendActivity(activityId));
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
HeadNative.Provider = React.Fragment;
function HeadShim(props) {
  return null;
}
HeadShim.Provider = React.Fragment;
var Head = HeadModule ? HeadNative : HeadShim;
Object.assign(Head, HeadModule);
export {
  Head
};
//# sourceMappingURL=Head.ios.js.map
