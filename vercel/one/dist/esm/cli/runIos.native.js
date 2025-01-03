async function run(args) {
  var { runIos } = await import("vxrn");
  await runIos({
    root: process.cwd()
  });
}
export {
  run
};
//# sourceMappingURL=runIos.js.map
