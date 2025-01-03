const formatToList = items => items.map(key => `- ${key}`).join(`
`);
function validatePathConfig(config, root = !0) {
  const validKeys = ["initialRouteName", "screens", "_route"];
  root || validKeys.push("path", "exact", "stringify", "parse");
  const invalidKeys = Object.keys(config).filter(key => !validKeys.includes(key));
  if (invalidKeys.length) throw new Error(`Found invalid properties in the configuration:
${formatToList(invalidKeys)}

Did you forget to specify them under a 'screens' property?

You can only specify the following properties:
${formatToList(validKeys)}

See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.`);
  config.screens && Object.entries(config.screens).forEach(([_, value]) => {
    typeof value != "string" && validatePathConfig(value, !1);
  });
}
export { validatePathConfig as default };
//# sourceMappingURL=validatePathConfig.mjs.map
