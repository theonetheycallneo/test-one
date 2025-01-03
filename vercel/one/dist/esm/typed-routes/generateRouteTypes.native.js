import FSExtra from "fs-extra";
import { writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { globbedRoutesToRouteContext } from "../useViteRoutes";
import { globDir } from "../utils/globDir";
import { getTypedRoutesDeclarationFile } from "./getTypedRoutesDeclarationFile";
async function generateRouteTypes(outFile) {
  var routePaths = globDir("app"), routes = routePaths.reduce(function(acc, cur) {
    return acc[cur] = {}, acc;
  }, {}), context = globbedRoutesToRouteContext(routes), declarations = getTypedRoutesDeclarationFile(context);
  await FSExtra.ensureDir(dirname(outFile)), await writeFile(outFile, declarations);
}
export {
  generateRouteTypes
};
//# sourceMappingURL=generateRouteTypes.js.map
