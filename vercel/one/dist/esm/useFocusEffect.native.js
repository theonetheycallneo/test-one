import * as React from "react";
import { useOptionalNavigation } from "./link/useLoadedNavigation";
function useFocusEffect(effect, do_not_pass_a_second_prop) {
  var navigation = useOptionalNavigation();
  if (do_not_pass_a_second_prop !== void 0) {
    var message = `You passed a second argument to 'useFocusEffect', but it only accepts one argument. If you want to pass a dependency array, you can use 'React.useCallback':

useFocusEffect(
  React.useCallback(() => {
    // Your code here
  }, [depA, depB])
);

See usage guide: https://reactnavigation.org/docs/use-focus-effect`;
    console.error(message);
  }
  React.useEffect(function() {
    if (navigation) {
      var isFocused = !1, cleanup, callback = function() {
        var destroy = effect();
        if (destroy === void 0 || typeof destroy == "function")
          return destroy;
        if (process.env.NODE_ENV !== "production") {
          var message2 = "An effect function must not return anything besides a function, which is used for clean-up.";
          destroy === null ? message2 += " You returned 'null'. If your effect does not require clean-up, return 'undefined' (or nothing)." : typeof destroy.then == "function" ? message2 += `

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

See usage guide: https://reactnavigation.org/docs/use-focus-effect` : message2 += ` You returned '${JSON.stringify(destroy)}'.`, console.error(message2);
        }
      };
      navigation.isFocused() && (cleanup = callback(), isFocused = !0);
      var unsubscribeFocus = navigation.addListener("focus", function() {
        isFocused || (cleanup !== void 0 && cleanup(), cleanup = callback(), isFocused = !0);
      }), unsubscribeBlur = navigation.addListener("blur", function() {
        cleanup !== void 0 && cleanup(), cleanup = void 0, isFocused = !1;
      });
      return function() {
        cleanup !== void 0 && cleanup(), unsubscribeFocus(), unsubscribeBlur();
      };
    }
  }, [
    effect,
    navigation
  ]);
}
export {
  useFocusEffect
};
//# sourceMappingURL=useFocusEffect.js.map
