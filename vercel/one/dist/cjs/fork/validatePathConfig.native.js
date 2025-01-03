"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var validatePathConfig_exports = {};
__export(validatePathConfig_exports, {
  default: () => validatePathConfig
});
module.exports = __toCommonJS(validatePathConfig_exports);
var formatToList = function(items) {
  return items.map(function(key) {
    return `- ${key}`;
  }).join(`
`);
};
function validatePathConfig(config) {
  var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, validKeys = [
    "initialRouteName",
    "screens",
    "_route"
  ];
  root || validKeys.push("path", "exact", "stringify", "parse");
  var invalidKeys = Object.keys(config).filter(function(key) {
    return !validKeys.includes(key);
  });
  if (invalidKeys.length)
    throw new Error(`Found invalid properties in the configuration:
${formatToList(invalidKeys)}

Did you forget to specify them under a 'screens' property?

You can only specify the following properties:
${formatToList(validKeys)}

See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.`);
  config.screens && Object.entries(config.screens).forEach(function(param) {
    var [_, value] = param;
    typeof value != "string" && validatePathConfig(value, !1);
  });
}
//# sourceMappingURL=validatePathConfig.js.map
