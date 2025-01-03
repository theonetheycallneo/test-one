import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
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
        return error ? /* @__PURE__ */ _jsx(ErrorBoundary, {
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
}(React.Component);
export {
  Try
};
//# sourceMappingURL=Try.js.map
