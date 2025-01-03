let clientLoaderResolver = null,
  didRun = !1;
function onClientLoaderResolve(resolver) {
  if (didRun) throw new Error(process.env.NODE_ENV === "production" ? "Error 002" : "Error: You called onClientLoaderResolve after it was run, register it in your root _layout.tsx");
  clientLoaderResolver = resolver;
}
async function resolveClientLoader(props) {
  didRun = !0, clientLoaderResolver && (await clientLoaderResolver(props));
}
export { onClientLoaderResolve, resolveClientLoader };
//# sourceMappingURL=clientLoaderResolver.mjs.map
