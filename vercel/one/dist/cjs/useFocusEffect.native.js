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
var useFocusEffect_exports = {};
__export(useFocusEffect_exports, {
  useFocusEffect: () => useFocusEffect
});
module.exports = __toCommonJS(useFocusEffect_exports);
var React = __toESM(require("react"), 1), import_useLoadedNavigation = require("./link/useLoadedNavigation");
function useFocusEffect(effect, do_not_pass_a_second_prop) {
  var navigation = (0, import_useLoadedNavigation.useOptionalNavigation)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFocusEffect
});
//# sourceMappingURL=useFocusEffect.js.map
