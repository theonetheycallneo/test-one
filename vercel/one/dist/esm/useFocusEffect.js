import * as React from "react";
import { useOptionalNavigation } from "./link/useLoadedNavigation";
function useFocusEffect(effect, do_not_pass_a_second_prop) {
  const navigation = useOptionalNavigation();
  do_not_pass_a_second_prop !== void 0 && console.error(`You passed a second argument to 'useFocusEffect', but it only accepts one argument. If you want to pass a dependency array, you can use 'React.useCallback':

useFocusEffect(
  React.useCallback(() => {
    // Your code here
  }, [depA, depB])
);

See usage guide: https://reactnavigation.org/docs/use-focus-effect`), React.useEffect(() => {
    if (!navigation)
      return;
    let isFocused = !1, cleanup;
    const callback = () => {
      const destroy = effect();
      if (destroy === void 0 || typeof destroy == "function")
        return destroy;
      if (process.env.NODE_ENV !== "production") {
        let message = "An effect function must not return anything besides a function, which is used for clean-up.";
        destroy === null ? message += " You returned 'null'. If your effect does not require clean-up, return 'undefined' (or nothing)." : typeof destroy.then == "function" ? message += `

It looks like you wrote 'useFocusEffect(async () => ...)' or returned a Promise. Instead, write the async function inside your effect and call it immediately:

useFocusEffect(
  React.useCallback(() => {
    async function fetchData() {
      // You can await here
      const response = await MyAPI.getData(someId);
      // ...
    }

    fetchData();
  }, [someId])
);

See usage guide: https://reactnavigation.org/docs/use-focus-effect` : message += ` You returned '${JSON.stringify(destroy)}'.`, console.error(message);
      }
    };
    navigation.isFocused() && (cleanup = callback(), isFocused = !0);
    const unsubscribeFocus = navigation.addListener("focus", () => {
      isFocused || (cleanup !== void 0 && cleanup(), cleanup = callback(), isFocused = !0);
    }), unsubscribeBlur = navigation.addListener("blur", () => {
      cleanup !== void 0 && cleanup(), cleanup = void 0, isFocused = !1;
    });
    return () => {
      cleanup !== void 0 && cleanup(), unsubscribeFocus(), unsubscribeBlur();
    };
  }, [effect, navigation]);
}
export {
  useFocusEffect
};
//# sourceMappingURL=useFocusEffect.js.map
