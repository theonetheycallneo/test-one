var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
}, __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default")), __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var src_exports = {};
__export(src_exports, {
  ErrorBoundary: () => import_ErrorBoundary.ErrorBoundary,
  Head: () => import_head.Head,
  Link: () => import_Link.Link,
  LoadProgressBar: () => import_LoadProgressBar.LoadProgressBar,
  Navigator: () => import_Navigator.Navigator,
  Redirect: () => import_Redirect.Redirect,
  Root: () => import_Root.Root,
  SafeAreaView: () => import_react_native_safe_area_context.SafeAreaView,
  ScrollRestoration: () => import_ScrollRestoration.ScrollRestoration,
  Slot: () => import_Navigator.Slot,
  Stack: () => import_Stack.Stack,
  Tabs: () => import_Tabs.Tabs,
  createApp: () => import_createApp.createApp,
  createRoute: () => import_createRoute.createRoute,
  getURL: () => import_getURL.getURL,
  href: () => import_href.href,
  isResponse: () => import_isResponse.isResponse,
  onClientLoaderResolve: () => import_clientLoaderResolver.onClientLoaderResolve,
  redirect: () => import_redirect.redirect,
  render: () => import_render.render,
  route: () => import_createRoute.route,
  router: () => import_imperative_api.router,
  routerStore: () => routerStore,
  useActiveParams: () => import_hooks.useActiveParams,
  useFocusEffect: () => import_useFocusEffect.useFocusEffect,
  useGlobalSearchParams: () => import_hooks2.useGlobalSearchParams,
  useLinkTo: () => import_useLinkTo.useLinkTo,
  useLoader: () => import_useLoader.useLoader,
  useLocalSearchParams: () => import_hooks2.useLocalSearchParams,
  useNavigation: () => import_useNavigation.useNavigation,
  useNavigationContainerRef: () => import_hooks.useNavigationContainerRef,
  useParams: () => import_hooks.useParams,
  usePathname: () => import_hooks.usePathname,
  useRootNavigationState: () => import_hooks.useRootNavigationState,
  useRouter: () => import_hooks.useRouter,
  useSegments: () => import_hooks.useSegments,
  useUnstableGlobalHref: () => import_hooks.useUnstableGlobalHref,
  withLayoutContext: () => import_withLayoutContext.withLayoutContext
});
module.exports = __toCommonJS(src_exports);
var import_createApp = require("./createApp"), import_imperative_api = require("./imperative-api"), import_createRoute = require("./createRoute"), import_clientLoaderResolver = require("./clientLoaderResolver"), import_render = require("./render"), import_Root = require("./Root"), routerStore = __toESM(require("./router/router"), 1), import_Stack = require("./layouts/Stack"), import_Tabs = require("./layouts/Tabs"), import_react_native_safe_area_context = require("react-native-safe-area-context"), import_Navigator = require("./views/Navigator"), import_ErrorBoundary = require("./views/ErrorBoundary"), import_ScrollRestoration = require("./views/ScrollRestoration"), import_LoadProgressBar = require("./views/LoadProgressBar"), import_Link = require("./link/Link"), import_Redirect = require("./link/Redirect"), import_head = require("./head"), import_useLinkTo = require("./link/useLinkTo"), import_hooks = require("./hooks"), import_hooks2 = require("./hooks"), import_withLayoutContext = require("./layouts/withLayoutContext"), import_isResponse = require("./utils/isResponse"), import_getURL = require("./getURL"), import_redirect = require("./utils/redirect"), import_href = require("./href");
__reExport(src_exports, require("@vxrn/universal-color-scheme"), module.exports);
var import_useFocusEffect = require("./useFocusEffect"), import_useNavigation = require("./useNavigation"), import_useLoader = require("./useLoader");
//# sourceMappingURL=index.js.map
