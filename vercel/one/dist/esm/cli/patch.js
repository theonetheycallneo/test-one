async function run(args) {
  const { patch } = await import("vxrn");
  await patch({
    root: process.cwd()
  });
}
export {
  run
};
//# sourceMappingURL=patch.js.map
