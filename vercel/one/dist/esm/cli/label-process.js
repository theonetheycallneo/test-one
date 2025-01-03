import { homedir } from "node:os";
function labelProcess(title) {
  const home = homedir(), cwd = process.cwd();
  process.title = `Onejs:${title} > ${cwd.replace(home, "~")}`;
}
export {
  labelProcess
};
//# sourceMappingURL=label-process.js.map
