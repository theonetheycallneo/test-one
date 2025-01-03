import { nanoid } from "nanoid/non-secure";
function createMemoryHistory() {
  var index = 0, items = [], pending = [], interrupt = function() {
    pending.forEach(function(it) {
      var cb = it.cb;
      it.cb = function() {
        return cb(!0);
      };
    });
  }, history = {
    get index() {
      var _window_history_state, id = (_window_history_state = window.history.state) === null || _window_history_state === void 0 ? void 0 : _window_history_state.id;
      if (id) {
        var index1 = items.findIndex(function(item) {
          return item.id === id;
        });
        return index1 > -1 ? index1 : 0;
      }
      return 0;
    },
    get(index2) {
      return items[index2];
    },
    backIndex(param) {
      for (var { path } = param, i = index - 1; i >= 0; i--) {
        var item = items[i];
        if (item.path === path)
          return i;
      }
      return -1;
    },
    push(param) {
      var { path, state } = param;
      interrupt();
      var id = nanoid();
      items = items.slice(0, index + 1), items.push({
        path,
        state,
        id
      }), index = items.length - 1, window.history.pushState({
        id
      }, "", path);
    },
    replace(param) {
      var { path, state } = param, _window_history_state;
      interrupt();
      var _window_history_state_id, id = (_window_history_state_id = (_window_history_state = window.history.state) === null || _window_history_state === void 0 ? void 0 : _window_history_state.id) !== null && _window_history_state_id !== void 0 ? _window_history_state_id : nanoid(), pathWithHash = path;
      !items.length || items.findIndex(function(item) {
        return item.id === id;
      }) < 0 ? (pathWithHash = pathWithHash + location.hash, items = [
        {
          path: pathWithHash,
          state,
          id
        }
      ], index = 0) : (items[index].path === path && (pathWithHash = pathWithHash + location.hash), items[index] = {
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
      var nextIndex = index + n, lastItemIndex = items.length - 1;
      if (n < 0 && !items[nextIndex] ? (n = -index, index = 0) : n > 0 && nextIndex > lastItemIndex ? (n = lastItemIndex - index, index = lastItemIndex) : index = nextIndex, n !== 0)
        return new Promise(function(resolve, reject) {
          var done = function(interrupted) {
            if (clearTimeout(timer), interrupted) {
              reject(new Error("History was changed during navigation."));
              return;
            }
            var { title } = window.document;
            window.document.title = "", window.document.title = title, resolve();
          };
          pending.push({
            ref: done,
            cb: done
          });
          var timer = setTimeout(function() {
            var index2 = pending.findIndex(function(it) {
              return it.ref === done;
            });
            index2 > -1 && (pending[index2].cb(), pending.splice(index2, 1));
          }, 100), onPopState = function() {
            var _window_history_state, id = (_window_history_state = window.history.state) === null || _window_history_state === void 0 ? void 0 : _window_history_state.id, currentIndex = items.findIndex(function(item) {
              return item.id === id;
            });
            index = Math.max(currentIndex, 0);
            var last = pending.pop();
            window.removeEventListener("popstate", onPopState), last?.cb();
          };
          window.addEventListener("popstate", onPopState), window.history.go(n);
        });
    },
    // The `popstate` event is triggered when history changes, except `pushState` and `replaceState`
    // If we call `history.go(n)` ourselves, we don't want it to trigger the listener
    // Here we normalize it so that only external changes (e.g. user pressing back/forward) trigger the listener
    listen(listener) {
      var onPopState = function() {
        pending.length || listener();
      };
      return window.addEventListener("popstate", onPopState), function() {
        return window.removeEventListener("popstate", onPopState);
      };
    }
  };
  return history;
}
export {
  createMemoryHistory as default
};
//# sourceMappingURL=createMemoryHistory.js.map
