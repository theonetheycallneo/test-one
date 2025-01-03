import { useLayoutEffect, useState } from "react";
function useQuery(q) {
  var enable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, queryImpl = q, [snapshot, setSnapshot] = useState(void 0), [, setView] = useState(void 0);
  return useLayoutEffect(
    function() {
      if (enable) {
        var view = q.materialize();
        setView(view);
        var unsubscribe = view.addListener(function(snapshot2) {
          setSnapshot(structuredClone(snapshot2));
        });
        return view.hydrate(), function() {
          unsubscribe(), view.destroy();
        };
      }
      return setSnapshot(queryImpl.singular ? void 0 : []), setView(void 0), function() {
      };
    },
    //
    [
      JSON.stringify(enable ? q.ast : null)
    ]
  ), snapshot;
}
export {
  useQuery
};
//# sourceMappingURL=useQueryZero.js.map
