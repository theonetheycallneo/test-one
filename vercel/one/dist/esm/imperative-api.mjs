import * as store from "./router/router.mjs";
const router = {
  navigate: store.navigate,
  push: store.push,
  dismiss: store.dismiss,
  dismissAll: store.dismissAll,
  canDismiss: store.canDismiss,
  replace: store.replace,
  back: store.goBack,
  canGoBack: store.canGoBack,
  setParams: params => store.setParams(params),
  subscribe: store.subscribeToRootState,
  onLoadState: store.subscribeToLoadingState
};
export { router };
//# sourceMappingURL=imperative-api.mjs.map
