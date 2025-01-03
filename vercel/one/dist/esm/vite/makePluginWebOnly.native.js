function makePluginWebOnly(plugin) {
  var og = plugin.transform;
  return og && (plugin.transform = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
      args[_key] = arguments[_key];
    if (this.environment.name === "client")
      return og.call(this, ...args);
  }), plugin;
}
export {
  makePluginWebOnly
};
//# sourceMappingURL=makePluginWebOnly.js.map
