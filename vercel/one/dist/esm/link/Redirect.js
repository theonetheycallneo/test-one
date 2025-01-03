import { useRouter } from "../hooks";
import { useFocusEffect } from "../useFocusEffect";
function Redirect({ href }) {
  const router = useRouter();
  return useFocusEffect(() => {
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
