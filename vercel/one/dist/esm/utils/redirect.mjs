import { getURL } from "../getURL.mjs";
import { router } from "../imperative-api.mjs";
const redirect = (path, status) => {
  if (process.env.VITE_ENVIRONMENT === "client") {
    router.navigate(path);
    return;
  }
  return Response.redirect(path[0] === "/" ? `${getURL()}${path}` : path, status);
};
export { redirect };
//# sourceMappingURL=redirect.mjs.map
