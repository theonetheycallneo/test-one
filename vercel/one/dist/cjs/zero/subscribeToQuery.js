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
var subscribeToQuery_exports = {};
__export(subscribeToQuery_exports, {
  subscribeToZeroQuery: () => subscribeToZeroQuery
});
module.exports = __toCommonJS(subscribeToQuery_exports);
function subscribeToZeroQuery(query, onUpdate) {
  const view = query.materialize();
  view.hydrate();
  const unsubscribe = view.addListener(onUpdate);
  return () => {
    unsubscribe(), view.destroy();
  };
}
//# sourceMappingURL=subscribeToQuery.js.map
