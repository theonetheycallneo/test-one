var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var useFocusEffect_exports = {};
__export(useFocusEffect_exports, {
  useFocusEffect: () => useFocusEffect
});
module.exports = __toCommonJS(useFocusEffect_exports);
var React = __toESM(require("react"), 1),
  import_useLoadedNavigation = require("./link/useLoadedNavigation.cjs");
function useFocusEffect(effect, do_not_pass_a_second_prop) {
  const navigation = (0, import_useLoadedNavigation.useOptionalNavigation)();
  do_not_pass_a_second_prop !== void 0 && console.error(`You passed a second argument to 'useFocusEffect', but it only accepts one argument. If you want to pass a dependency array, you can use 'React.useCallback':

useFocusEffect(
  React.useCallback(() => {
    // Your code here
  }, [depA, depB])
);

See usage guide: https://reactnavigation.org/docs/use-focus-effect`), React.useEffect(() => {
    if (!navigation) return;
    let isFocused = !1,
      cleanup;
    const callback = () => {
      const destroy = effect();
      if (destroy === void 0 || typeof destroy == "function") return destroy;
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
      }),
      unsubscribeBlur = navigation.addListener("blur", () => {
        cleanup !== void 0 && cleanup(), cleanup = void 0, isFocused = !1;
      });
    return () => {
      cleanup !== void 0 && cleanup(), unsubscribeFocus(), unsubscribeBlur();
    };
  }, [effect, navigation]);
}