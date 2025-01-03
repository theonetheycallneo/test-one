import { useNavigation as useUpstreamNavigation } from "@react-navigation/native";
import React from "react";
import { getNameFromFilePath } from "./matchers";
import { useContextKey } from "./Route";
function useNavigation(parent) {
  var navigation = useUpstreamNavigation(), contextKey = useContextKey(), normalizedParent = React.useMemo(function() {
    if (!parent)
      return null;
    var normalized = getNameFromFilePath(parent);
    return parent.startsWith(".") ? relativePaths(contextKey, parent) : normalized;
  }, [
    contextKey,
    parent
  ]);
  if (normalizedParent != null) {
    var parentNavigation = navigation.getParent(normalizedParent);
    if (!parentNavigation)
      throw new Error(`Could not find parent navigation with route "${parent}".` + (normalizedParent !== parent ? ` (normalized: ${normalizedParent})` : ""));
    return parentNavigation;
  }
  return navigation;
}
function resolveParentId(contextKey, parentId) {
  return parentId ? parentId.startsWith(".") ? getNameFromFilePath(relativePaths(contextKey, parentId)) : getNameFromFilePath(parentId) : null;
}
function relativePaths(from, to) {
  var fromParts = from.split("/").filter(Boolean), toParts = to.split("/").filter(Boolean), _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = toParts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var part = _step.value;
      if (part === "..") {
        if (fromParts.length === 0)
          throw new Error(`Cannot resolve path "${to}" relative to "${from}"`);
        fromParts.pop();
      } else part === "." || fromParts.push(part);
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError)
        throw _iteratorError;
    }
  }
  return "/" + fromParts.join("/");
}
export {
  resolveParentId,
  useNavigation
};
//# sourceMappingURL=useNavigation.js.map
