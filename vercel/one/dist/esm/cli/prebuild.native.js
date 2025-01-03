async function run(args) {
  var { prebuild } = await import("vxrn"), { platform } = args;
  await prebuild({
    root: process.cwd(),
    platform
  });
}
export {
  run
};
//# sourceMappingURL=prebuild.js.map
