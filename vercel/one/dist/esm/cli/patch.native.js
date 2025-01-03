async function run(args) {
  var { patch } = await import("vxrn");
  await patch({
    root: process.cwd()
  });
}
export {
  run
};
//# sourceMappingURL=patch.js.map
