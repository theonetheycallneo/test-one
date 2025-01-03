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
export {
  validatePathConfig as default
};
//# sourceMappingURL=validatePathConfig.js.map
