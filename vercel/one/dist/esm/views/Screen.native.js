import { useIsomorphicLayoutEffect } from "@vxrn/use-isomorphic-layout-effect";
import { useNavigation } from "../useNavigation";
function Screen(param) {
  var { name, options } = param, navigation = useNavigation(name);
  return useIsomorphicLayoutEffect(function() {
    options && // React Navigation will infinitely loop in some cases if an empty object is passed to setOptions.
    // https://github.com/expo/router/issues/452
    Object.keys(options).length && navigation.setOptions(options);
  }, [
    navigation,
    options
  ]), null;
}
export {
  Screen
};
//# sourceMappingURL=Screen.js.map
