var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Drawer_exports = {};
__export(Drawer_exports, {
  Drawer: () => Drawer,
  default: () => Drawer_default
});
module.exports = __toCommonJS(Drawer_exports);
var import_drawer = require("@react-navigation/drawer"), import_withLayoutContext = require("./withLayoutContext");
const DrawerNavigator = (0, import_drawer.createDrawerNavigator)().Navigator, Drawer = (0, import_withLayoutContext.withLayoutContext)(DrawerNavigator);
var Drawer_default = Drawer;
//# sourceMappingURL=Drawer.js.map
