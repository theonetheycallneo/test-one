import FSExtra from "fs-extra";
import { writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { globbedRoutesToRouteContext } from "../useViteRoutes.mjs";
import { globDir } from "../utils/globDir.mjs";
import { getTypedRoutesDeclarationFile } from "./getTypedRoutesDeclarationFile.mjs";
async function generateRouteTypes(outFile) {
  const routes = globDir("app").reduce((acc, cur) => (acc[cur] = {}, acc), {}),
    context = globbedRoutesToRouteContext(routes),
    declarations = getTypedRoutesDeclarationFile(context);
  await FSExtra.ensureDir(dirname(outFile)), await writeFile(outFile, declarations);
}
export { generateRouteTypes };
//# sourceMappingURL=generateRouteTypes.mjs.map
