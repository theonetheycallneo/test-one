import { useRouter } from "../hooks.mjs";
import { useFocusEffect } from "../useFocusEffect.mjs";
function Redirect({
  href
}) {
  const router = useRouter();
  return useFocusEffect(() => {
    try {
      router.replace(href);
    } catch (error) {
      console.error(error);
    }
  }), null;
}
export { Redirect };
//# sourceMappingURL=Redirect.mjs.map
