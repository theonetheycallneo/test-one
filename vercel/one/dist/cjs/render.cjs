var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var render_exports = {};
__export(render_exports, {
  render: () => render
});
module.exports = __toCommonJS(render_exports);
var import_react = require("react"),
  import_client = require("react-dom/client");
globalThis.__vxrnVersion ||= 0;
function render(element) {
  typeof document > "u" || (globalThis.__vxrnRoot ? (globalThis.__vxrnVersion++, globalThis.__vxrnRoot.render(element)) : (0, import_react.startTransition)(() => {
    if (globalThis.__vxrnIsSPA) {
      const root = (0, import_client.createRoot)(document.body);
      globalThis.__vxrnRoot = root, root.render(element);
    } else globalThis.__vxrnRoot = (0, import_client.hydrateRoot)(document.body, element, {
      onRecoverableError(...args) {
        console.groupCollapsed("[one] Non-critical recoverable React error occurred, expand group to see details"), console.error(...args), console.groupEnd();
      },
      // @ts-expect-error
      onUncaughtError(...args) {
        console.error("[one] onUncaughtError", ...args);
      },
      onCaughtError(...args) {
        console.error("[one] onCaughtError", ...args);
      }
    });
  }));
}