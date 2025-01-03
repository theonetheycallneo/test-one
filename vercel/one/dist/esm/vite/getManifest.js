import { createRoutesManifest } from "../server/createRoutesManifest";
import { globDir } from "../utils/globDir";
function getManifest() {
  const routePaths = globDir("app");
  return createRoutesManifest(routePaths, {
    platform: "web"
  });
}
export {
  getManifest
};
//# sourceMappingURL=getManifest.js.map
