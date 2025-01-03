import { useRouter } from "../hooks";
import { useFocusEffect } from "../useFocusEffect";
function Redirect(param) {
  var { href } = param, router = useRouter();
  return useFocusEffect(function() {
    try {
      router.replace(href);
    } catch (error) {
      console.error(error);
    }
  }), null;
}
export {
  Redirect
};
//# sourceMappingURL=Redirect.js.map
