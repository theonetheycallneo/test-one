async function run(args) {
  var { runAndroid } = await import("vxrn");
  await runAndroid({
    root: process.cwd()
  });
}
export {
  run
};
//# sourceMappingURL=runAndroid.js.map
