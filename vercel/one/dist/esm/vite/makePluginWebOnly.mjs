function makePluginWebOnly(plugin) {
  const og = plugin.transform;
  return og && (plugin.transform = function (...args) {
    if (this.environment.name === "client") return og.call(this, ...args);
  }), plugin;
}
export { makePluginWebOnly };
//# sourceMappingURL=makePluginWebOnly.mjs.map
