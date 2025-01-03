import {
  useNavigation as useUpstreamNavigation
} from "@react-navigation/native";
import React from "react";
import { getNameFromFilePath } from "./matchers";
import { useContextKey } from "./Route";
function useNavigation(parent) {
  const navigation = useUpstreamNavigation(), contextKey = useContextKey(), normalizedParent = React.useMemo(() => {
    if (!parent)
      return null;
    const normalized = getNameFromFilePath(parent);
    return parent.startsWith(".") ? relativePaths(contextKey, parent) : normalized;
  }, [contextKey, parent]);
  if (normalizedParent != null) {
    const parentNavigation = navigation.getParent(normalizedParent);
    if (!parentNavigation)
      throw new Error(
        `Could not find parent navigation with route "${parent}".` + (normalizedParent !== parent ? ` (normalized: ${normalizedParent})` : "")
      );
    return parentNavigation;
  }
  return navigation;
}
function resolveParentId(contextKey, parentId) {
  return parentId ? parentId.startsWith(".") ? getNameFromFilePath(relativePaths(contextKey, parentId)) : getNameFromFilePath(parentId) : null;
}
function relativePaths(from, to) {
  const fromParts = from.split("/").filter(Boolean), toParts = to.split("/").filter(Boolean);
  for (const part of toParts)
    if (part === "..") {
      if (fromParts.length === 0)
        throw new Error(`Cannot resolve path "${to}" relative to "${from}"`);
      fromParts.pop();
    } else part === "." || fromParts.push(part);
  return "/" + fromParts.join("/");
}
export {
  resolveParentId,
  useNavigation
};
//# sourceMappingURL=useNavigation.js.map
