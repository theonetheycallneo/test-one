import { getURL } from "../getURL";
import { router } from "../imperative-api";
const redirect = (path, status) => {
  if (process.env.VITE_ENVIRONMENT === "client") {
    router.navigate(path);
    return;
  }
  return Response.redirect(path[0] === "/" ? `${getURL()}${path}` : path, status);
};
export {
  redirect
};
//# sourceMappingURL=redirect.js.map
