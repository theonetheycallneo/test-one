"use strict";
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
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Try_exports = {};
__export(Try_exports, {
  Try: () => Try
});
module.exports = __toCommonJS(Try_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_react = __toESM(require("react"), 1);
function _assert_this_initialized(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _call_super(_this, derived, args) {
  return derived = _get_prototype_of(derived), _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Constructor;
}
function _define_property(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
function _get_prototype_of(o) {
  return _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: !0,
      configurable: !0
    }
  }), superClass && _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
  return call && (_type_of(call) === "object" || typeof call == "function") ? call : _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
  return _set_prototype_of = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _set_prototype_of(o, p);
}
function _type_of(obj) {
  "@swc/helpers - typeof";
  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
  try {
    var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_is_native_reflect_construct = function() {
    return !!result;
  })();
}
var Try = /* @__PURE__ */ function(_React_Component) {
  "use strict";
  _inherits(Try2, _React_Component);
  function Try2() {
    _class_call_check(this, Try2);
    var _this;
    return _this = _call_super(this, Try2, arguments), _define_property(_this, "state", {
      error: void 0
    }), _define_property(_this, "retry", function() {
      return new Promise(function(resolve) {
        _this.setState({
          error: void 0
        }, function() {
          resolve();
        });
      });
    }), _this;
  }
  return _create_class(Try2, [
    {
      key: "render",
      value: function() {
        var { error } = this.state, { catch: ErrorBoundary, children } = this.props;
        return error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
          error,
          retry: this.retry
        }) : children;
      }
    }
  ], [
    {
      key: "getDerivedStateFromError",
      value: function(error) {
        return {
          error
        };
      }
    }
  ]), Try2;
}(import_react.default.Component);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Try
});
//# sourceMappingURL=Try.js.map
