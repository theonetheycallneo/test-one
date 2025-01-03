import { useLayoutEffect, useState } from "react";
function useQuery(q, enable = !0) {
  const queryImpl = q,
    [snapshot, setSnapshot] = useState(void 0),
    [, setView] = useState(void 0);
  return useLayoutEffect(() => {
    if (enable) {
      const view = q.materialize();
      setView(view);
      const unsubscribe = view.addListener(snapshot2 => {
        setSnapshot(structuredClone(snapshot2));
      });
      return view.hydrate(), () => {
        unsubscribe(), view.destroy();
      };
    }
    return setSnapshot(queryImpl.singular ? void 0 : []), setView(void 0), () => {};
  }, [JSON.stringify(enable ? q.ast : null)]), snapshot;
}
export { useQuery };
//# sourceMappingURL=useQueryZero.mjs.map
