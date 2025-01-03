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
var makePluginWebOnly_exports = {};
__export(makePluginWebOnly_exports, {
  makePluginWebOnly: () => makePluginWebOnly
});
module.exports = __toCommonJS(makePluginWebOnly_exports);
function makePluginWebOnly(plugin) {
  const og = plugin.transform;
  return og && (plugin.transform = function (...args) {
    if (this.environment.name === "client") return og.call(this, ...args);
  }), plugin;
}