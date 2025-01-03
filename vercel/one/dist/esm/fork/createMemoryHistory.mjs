import { nanoid } from "nanoid/non-secure";
function createMemoryHistory() {
  let index = 0,
    items = [];
  const pending = [],
    interrupt = () => {
      pending.forEach(it => {
        const cb = it.cb;
        it.cb = () => cb(!0);
      });
    };
  return {
    get index() {
      const id = window.history.state?.id;
      if (id) {
        const index2 = items.findIndex(item => item.id === id);
        return index2 > -1 ? index2 : 0;
      }
      return 0;
    },
    get(index2) {
      return items[index2];
    },
    backIndex({
      path
    }) {
      for (let i = index - 1; i >= 0; i--) if (items[i].path === path) return i;
      return -1;
    },
    push({
      path,
      state
    }) {
      interrupt();
      const id = nanoid();
      items = items.slice(0, index + 1), items.push({
        path,
        state,
        id
      }), index = items.length - 1, window.history.pushState({
        id
      }, "", path);
    },
    replace({
      path,
      state
    }) {
      interrupt();
      const id = window.history.state?.id ?? nanoid();
      let pathWithHash = path;
      !items.length || items.findIndex(item => item.id === id) < 0 ? (pathWithHash = pathWithHash + location.hash, items = [{
        path: pathWithHash,
        state,
        id
      }], index = 0) : (items[index].path === path && (pathWithHash = pathWithHash + location.hash), items[index] = {
        path,
        state,
        id
      }), window.history.replaceState({
        id
      }, "", pathWithHash);
    },
    // `history.go(n)` is asynchronous, there are couple of things to keep in mind:
    // - it won't do anything if we can't go `n` steps, the `popstate` event won't fire.
    // - each `history.go(n)` call will trigger a separate `popstate` event with correct location.
    // - the `popstate` event fires before the next frame after calling `history.go(n)`.
    // This method differs from `history.go(n)` in the sense that it'll go back as many steps it can.
    go(n) {
      interrupt();
      const nextIndex = index + n,
        lastItemIndex = items.length - 1;
      if (n < 0 && !items[nextIndex] ? (n = -index, index = 0) : n > 0 && nextIndex > lastItemIndex ? (n = lastItemIndex - index, index = lastItemIndex) : index = nextIndex, n !== 0) return new Promise((resolve, reject) => {
        const done = interrupted => {
          if (clearTimeout(timer), interrupted) {
            reject(new Error("History was changed during navigation."));
            return;
          }
          const {
            title
          } = window.document;
          window.document.title = "", window.document.title = title, resolve();
        };
        pending.push({
          ref: done,
          cb: done
        });
        const timer = setTimeout(() => {
            const index2 = pending.findIndex(it => it.ref === done);
            index2 > -1 && (pending[index2].cb(), pending.splice(index2, 1));
          }, 100),
          onPopState = () => {
            const id = window.history.state?.id,
              currentIndex = items.findIndex(item => item.id === id);
            index = Math.max(currentIndex, 0);
            const last = pending.pop();
            window.removeEventListener("popstate", onPopState), last?.cb();
          };
        window.addEventListener("popstate", onPopState), window.history.go(n);
      });
    },
    // The `popstate` event is triggered when history changes, except `pushState` and `replaceState`
    // If we call `history.go(n)` ourselves, we don't want it to trigger the listener
    // Here we normalize it so that only external changes (e.g. user pressing back/forward) trigger the listener
    listen(listener) {
      const onPopState = () => {
        pending.length || listener();
      };
      return window.addEventListener("popstate", onPopState), () => window.removeEventListener("popstate", onPopState);
    }
  };
}
export { createMemoryHistory as default };
//# sourceMappingURL=createMemoryHistory.mjs.map
