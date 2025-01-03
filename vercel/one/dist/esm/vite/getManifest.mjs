import { createRoutesManifest } from "../server/createRoutesManifest.mjs";
import { globDir } from "../utils/globDir.mjs";
function getManifest() {
  const routePaths = globDir("app");
  return createRoutesManifest(routePaths, {
    platform: "web"
  });
}
export { getManifest };
//# sourceMappingURL=getManifest.mjs.map
