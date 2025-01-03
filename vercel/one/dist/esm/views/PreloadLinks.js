import { useEffect } from "react";
import { preloadRoute } from "../router/router";
import { getURL } from "../getURL";
function PreloadLinks() {
  return typeof window < "u" && import.meta.env.PROD && useEffect(() => {
    const url = getURL(), controller = new AbortController();
    return document.addEventListener(
      "mouseover",
      (e) => {
        let target = e.target;
        if (!(target instanceof HTMLElement) || (target = target instanceof HTMLAnchorElement ? target : target.closest("a"), !(target instanceof HTMLAnchorElement))) return;
        const href = target.getAttribute("href");
        (href?.[0] === "/" || href?.[0].startsWith(url)) && preloadRoute(href.replace(url, ""));
      },
      {
        passive: !0,
        signal: controller.signal
      }
    ), () => {
      controller.abort();
    };
  }, []), null;
}
export {
  PreloadLinks
};
//# sourceMappingURL=PreloadLinks.js.map
