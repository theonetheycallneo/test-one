async function run(args) {
  const { prebuild } = await import("vxrn"), { platform } = args;
  await prebuild({
    root: process.cwd(),
    platform
  });
}
export {
  run
};
//# sourceMappingURL=prebuild.js.map
