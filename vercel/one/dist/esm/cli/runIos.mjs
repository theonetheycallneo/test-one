async function run(args) {
  const {
    runIos
  } = await import("vxrn");
  await runIos({
    root: process.cwd()
  });
}
export { run };
//# sourceMappingURL=runIos.mjs.map
