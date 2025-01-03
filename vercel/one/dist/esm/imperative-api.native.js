import * as store from "./router/router";
var router = {
  navigate: store.navigate,
  push: store.push,
  dismiss: store.dismiss,
  dismissAll: store.dismissAll,
  canDismiss: store.canDismiss,
  replace: store.replace,
  back: store.goBack,
  canGoBack: store.canGoBack,
  setParams: function(params) {
    return store.setParams(params);
  },
  subscribe: store.subscribeToRootState,
  onLoadState: store.subscribeToLoadingState
};
export {
  router
};
//# sourceMappingURL=imperative-api.js.map
