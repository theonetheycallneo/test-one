var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import React__default, { memo } from "react";
import { X as cjsExports } from "../_virtual_one-entry.js";
import { x as styled, R as View, U as usePropsAndStyle, W as Text, L as getVariable, X as getTokenValue, Y as useSchemeSetting } from "./index-CsfU4fKn.js";
import "react-dom";
import "react-dom/client";
import "react-dom/server.browser";
const StyledImage = styled(View, {
  name: "Image",
  tag: "img"
}), Image = StyledImage.styleable((inProps, ref) => {
  const {
    // exclude native only props
    blurRadius,
    capInsets,
    defaultSource,
    fadeDuration,
    loadingIndicatorSource,
    onLoadEnd,
    onPartialLoad,
    progressiveRenderingEnabled,
    resizeMethod,
    resizeMode,
    tintColor,
    ...rest
  } = inProps;
  return /* @__PURE__ */ jsx(StyledImage, {
    ref,
    ...rest
  });
}), func = () => {
};
Image.getSize = func;
Image.getSizeWithHeaders = func;
Image.prefetch = func;
Image.prefetchWithMetadata = func;
Image.abortPrefetch = func;
Image.queryCache = func;
React__default.keep;
function themed(Component, optsIn = {}) {
  const opts = {
    defaultThemeColor: process.env.DEFAULT_ICON_THEME_COLOR || "$color",
    defaultStrokeWidth: 2,
    fallbackColor: "#000",
    resolveValues: process.env.TAMAGUI_ICON_COLOR_RESOLVE || "auto",
    ...optsIn
  };
  return (propsIn) => {
    const [props, style, theme] = usePropsAndStyle(propsIn, {
      ...opts,
      forComponent: Text,
      resolveValues: opts.resolveValues
    }), defaultColor = opts.defaultThemeColor, colorIn = style.color || (defaultColor ? theme[defaultColor] : void 0) || (props.disableTheme ? null : theme.color) || opts.fallbackColor, color = getVariable(colorIn), size = typeof props.size == "string" ? getTokenValue(props.size, "size") : props.size, strokeWidth = typeof props.strokeWidth == "string" ? getTokenValue(props.strokeWidth, "size") : props.strokeWidth ?? `${opts.defaultStrokeWidth}`, finalProps = {
      ...props,
      color,
      size,
      strokeWidth,
      style
    };
    return /* @__PURE__ */ jsx(Component, {
      ...finalProps
    });
  };
}
const PRESS_RETENTION_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};
const {
  Mixin
} = cjsExports.Touchable;
const {
  touchableHandleStartShouldSetResponder,
  touchableHandleResponderTerminationRequest,
  touchableHandleResponderGrant,
  touchableHandleResponderMove,
  touchableHandleResponderRelease,
  touchableHandleResponderTerminate,
  touchableGetInitialState
} = Mixin;
const SvgTouchableMixin = {
  ...Mixin,
  touchableHandleStartShouldSetResponder(e) {
    const {
      onStartShouldSetResponder
    } = this.props;
    if (onStartShouldSetResponder) {
      return onStartShouldSetResponder(e);
    } else {
      return touchableHandleStartShouldSetResponder.call(this, e);
    }
  },
  touchableHandleResponderTerminationRequest(e) {
    const {
      onResponderTerminationRequest
    } = this.props;
    if (onResponderTerminationRequest) {
      return onResponderTerminationRequest(e);
    } else {
      return touchableHandleResponderTerminationRequest.call(this, e);
    }
  },
  touchableHandleResponderGrant(e) {
    const {
      onResponderGrant
    } = this.props;
    if (onResponderGrant) {
      return onResponderGrant(e);
    } else {
      return touchableHandleResponderGrant.call(this, e);
    }
  },
  touchableHandleResponderMove(e) {
    const {
      onResponderMove
    } = this.props;
    if (onResponderMove) {
      return onResponderMove(e);
    } else {
      return touchableHandleResponderMove.call(this, e);
    }
  },
  touchableHandleResponderRelease(e) {
    const {
      onResponderRelease
    } = this.props;
    if (onResponderRelease) {
      return onResponderRelease(e);
    } else {
      return touchableHandleResponderRelease.call(this, e);
    }
  },
  touchableHandleResponderTerminate(e) {
    const {
      onResponderTerminate
    } = this.props;
    if (onResponderTerminate) {
      return onResponderTerminate(e);
    } else {
      return touchableHandleResponderTerminate.call(this, e);
    }
  },
  touchableHandlePress(e) {
    const {
      onPress
    } = this.props;
    onPress && onPress(e);
  },
  touchableHandleActivePressIn(e) {
    const {
      onPressIn
    } = this.props;
    onPressIn && onPressIn(e);
  },
  touchableHandleActivePressOut(e) {
    const {
      onPressOut
    } = this.props;
    onPressOut && onPressOut(e);
  },
  touchableHandleLongPress(e) {
    const {
      onLongPress
    } = this.props;
    onLongPress && onLongPress(e);
  },
  touchableGetPressRectOffset() {
    const {
      pressRetentionOffset
    } = this.props;
    return pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },
  touchableGetHitSlop() {
    const {
      hitSlop
    } = this.props;
    return hitSlop;
  },
  touchableGetHighlightDelayMS() {
    const {
      delayPressIn
    } = this.props;
    return delayPressIn || 0;
  },
  touchableGetLongPressDelayMS() {
    const {
      delayLongPress
    } = this.props;
    return delayLongPress === 0 ? 0 : delayLongPress || 500;
  },
  touchableGetPressOutDelayMS() {
    const {
      delayPressOut
    } = this.props;
    return delayPressOut || 0;
  }
};
const touchKeys = Object.keys(SvgTouchableMixin);
const touchVals = touchKeys.map((key) => SvgTouchableMixin[key]);
const numTouchKeys = touchKeys.length;
const SvgTouchableMixin$1 = (target) => {
  for (let i = 0; i < numTouchKeys; i++) {
    const key = touchKeys[i];
    const val = touchVals[i];
    if (typeof val === "function") {
      target[key] = val.bind(target);
    } else {
      target[key] = val;
    }
  }
  target.state = touchableGetInitialState();
};
function resolve(styleProp, cleanedProps) {
  if (styleProp) {
    return cjsExports.StyleSheet ? [styleProp, cleanedProps] : (
      // Compatibility for arrays of styles in plain react web
      styleProp[Symbol.iterator] ? Object.assign({}, ...styleProp, cleanedProps) : Object.assign({}, styleProp, cleanedProps)
    );
  } else {
    return cleanedProps;
  }
}
var transform;
var hasRequiredTransform;
function requireTransform() {
  if (hasRequiredTransform) return transform;
  hasRequiredTransform = 1;
  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }
  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }
  peg$subclass(peg$SyntaxError, Error);
  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },
      "class": function(expectation) {
        var escapedParts = "", i;
        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
        }
        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },
      any: function(expectation) {
        return "any character";
      },
      end: function(expectation) {
        return "end of input";
      },
      other: function(expectation) {
        return expectation.description;
      }
    };
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected2) {
      var descriptions = new Array(expected2.length), i, j;
      for (i = 0; i < expected2.length; i++) {
        descriptions[i] = describeExpectation(expected2[i]);
      }
      descriptions.sort();
      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }
      switch (descriptions.length) {
        case 1:
          return descriptions[0];
        case 2:
          return descriptions[0] + " or " + descriptions[1];
        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }
    function describeFound(found2) {
      return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };
  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {}, peg$startRuleFunctions = {
      transformList: peg$parsetransformList
    }, peg$startRuleFunction = peg$parsetransformList, peg$c0 = function(ts) {
      return ts;
    }, peg$c1 = function(t, ts) {
      return multiply_matrices(t, ts);
    }, peg$c2 = "matrix", peg$c3 = peg$literalExpectation("matrix", false), peg$c4 = "(", peg$c5 = peg$literalExpectation("(", false), peg$c6 = ")", peg$c7 = peg$literalExpectation(")", false), peg$c8 = function(a, b, c, d, e, f) {
      return [a, c, e, b, d, f];
    }, peg$c9 = "translate", peg$c10 = peg$literalExpectation("translate", false), peg$c11 = function(tx, ty) {
      return [1, 0, tx, 0, 1, ty || 0];
    }, peg$c12 = "scale", peg$c13 = peg$literalExpectation("scale", false), peg$c14 = function(sx, sy) {
      return [sx, 0, 0, 0, sy === null ? sx : sy, 0];
    }, peg$c15 = "rotate", peg$c16 = peg$literalExpectation("rotate", false), peg$c17 = function(angle, c) {
      var cos = Math.cos(deg2rad * angle);
      var sin = Math.sin(deg2rad * angle);
      if (c !== null) {
        var x = c[0];
        var y = c[1];
        return [cos, -sin, cos * -x + -sin * -y + x, sin, cos, sin * -x + cos * -y + y];
      }
      return [cos, -sin, 0, sin, cos, 0];
    }, peg$c18 = "skewX", peg$c19 = peg$literalExpectation("skewX", false), peg$c20 = function(angle) {
      return [1, Math.tan(deg2rad * angle), 0, 0, 1, 0];
    }, peg$c21 = "skewY", peg$c22 = peg$literalExpectation("skewY", false), peg$c23 = function(angle) {
      return [1, 0, 0, Math.tan(deg2rad * angle), 1, 0];
    }, peg$c24 = function(f) {
      return parseFloat(f.join(""));
    }, peg$c25 = function(i) {
      return parseInt(i.join(""));
    }, peg$c26 = function(n) {
      return n;
    }, peg$c27 = function(n1, n2) {
      return [n1, n2];
    }, peg$c28 = ",", peg$c29 = peg$literalExpectation(",", false), peg$c30 = function(ds) {
      return ds.join("");
    }, peg$c31 = function(f) {
      return f.join("");
    }, peg$c32 = function(d) {
      return d.join("");
    }, peg$c33 = peg$otherExpectation("fractionalConstant"), peg$c34 = ".", peg$c35 = peg$literalExpectation(".", false), peg$c36 = function(d1, d2) {
      return [d1 ? d1.join("") : null, ".", d2.join("")].join("");
    }, peg$c37 = /^[eE]/, peg$c38 = peg$classExpectation(["e", "E"], false, false), peg$c39 = function(e) {
      return [e[0], e[1], e[2].join("")].join("");
    }, peg$c40 = /^[+\-]/, peg$c41 = peg$classExpectation(["+", "-"], false, false), peg$c42 = /^[0-9]/, peg$c43 = peg$classExpectation([["0", "9"]], false, false), peg$c44 = /^[ \t\r\n]/, peg$c45 = peg$classExpectation([" ", "	", "\r", "\n"], false, false), peg$currPos = 0, peg$posDetailsCache = [{
      line: 1,
      column: 1
    }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function peg$literalExpectation(text, ignoreCase) {
      return {
        type: "literal",
        text,
        ignoreCase
      };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts,
        inverted,
        ignoreCase
      };
    }
    function peg$endExpectation() {
      return {
        type: "end"
      };
    }
    function peg$otherExpectation(description) {
      return {
        type: "other",
        description
      };
    }
    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos], p;
      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }
        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };
        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }
          p++;
        }
        peg$posDetailsCache[pos] = details;
        return details;
      }
    }
    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }
    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected);
    }
    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parsetransformList() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetransforms();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s1 = peg$c0(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsetransforms() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$parsetransform();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecommaWsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsecommaWsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetransforms();
          if (s3 !== peg$FAILED) {
            s1 = peg$c1(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsetransform();
      }
      return s0;
    }
    function peg$parsetransform() {
      var s0;
      s0 = peg$parsematrix();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetranslate();
        if (s0 === peg$FAILED) {
          s0 = peg$parsescale();
          if (s0 === peg$FAILED) {
            s0 = peg$parserotate();
            if (s0 === peg$FAILED) {
              s0 = peg$parseskewX();
              if (s0 === peg$FAILED) {
                s0 = peg$parseskewY();
              }
            }
          }
        }
      }
      return s0;
    }
    function peg$parsematrix() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c2) {
        s1 = peg$c2;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c3);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWsp();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsenumber();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsecommaWsp();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsenumber();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsecommaWsp();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsenumber();
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parsecommaWsp();
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parsenumber();
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parsecommaWsp();
                                if (s14 !== peg$FAILED) {
                                  s15 = peg$parsenumber();
                                  if (s15 !== peg$FAILED) {
                                    s16 = [];
                                    s17 = peg$parsewsp();
                                    while (s17 !== peg$FAILED) {
                                      s16.push(s17);
                                      s17 = peg$parsewsp();
                                    }
                                    if (s16 !== peg$FAILED) {
                                      if (input.charCodeAt(peg$currPos) === 41) {
                                        s17 = peg$c6;
                                        peg$currPos++;
                                      } else {
                                        s17 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c7);
                                        }
                                      }
                                      if (s17 !== peg$FAILED) {
                                        s1 = peg$c8(s5, s7, s9, s11, s13, s15);
                                        s0 = s1;
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsetranslate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c9) {
        s1 = peg$c9;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c10);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspNumber();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c11(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsescale() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c13);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspNumber();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c14(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parserotate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c16);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspTwoNumbers();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c17(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewX() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c18) {
        s1 = peg$c18;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c19);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsewsp();
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsewsp();
                }
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c6;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c7);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s1 = peg$c20(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewY() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c21) {
        s1 = peg$c21;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c22);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsewsp();
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsewsp();
                }
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c6;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c7);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s1 = peg$c23(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsenumber() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsesign();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsefloatingPointConstant();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c24(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseintegerConstant();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s1 = peg$c25(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsecommaWspNumber() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          s1 = peg$c26(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWspTwoNumbers() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecommaWsp();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsenumber();
            if (s4 !== peg$FAILED) {
              s1 = peg$c27(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWsp() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomma();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      return s0;
    }
    function peg$parsecomma() {
      var s0;
      if (input.charCodeAt(peg$currPos) === 44) {
        s0 = peg$c28;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }
      return s0;
    }
    function peg$parseintegerConstant() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 !== peg$FAILED) {
        s1 = peg$c30(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parsefloatingPointConstant() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsefractionalConstant();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseexponent();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c31(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsedigitSequence();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexponent();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s1 = peg$c32(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsefractionalConstant() {
      var s0, s1, s2, s3;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c34;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedigitSequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c36(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c34;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c35);
            }
          }
          if (s2 !== peg$FAILED) {
            s1 = peg$c32(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c33);
        }
      }
      return s0;
    }
    function peg$parseexponent() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c37.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c38);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsesign();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsedigitSequence();
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c39(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parsesign() {
      var s0;
      if (peg$c40.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c41);
        }
      }
      return s0;
    }
    function peg$parsedigitSequence() {
      var s0, s1;
      s0 = [];
      s1 = peg$parsedigit();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsedigit();
        }
      } else {
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsedigit() {
      var s0;
      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c43);
        }
      }
      return s0;
    }
    function peg$parsewsp() {
      var s0;
      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c45);
        }
      }
      return s0;
    }
    var deg2rad = Math.PI / 180;
    function multiply_matrices(l, r) {
      var al = l[0];
      var cl = l[1];
      var el = l[2];
      var bl = l[3];
      var dl = l[4];
      var fl = l[5];
      var ar = r[0];
      var cr = r[1];
      var er = r[2];
      var br = r[3];
      var dr = r[4];
      var fr = r[5];
      var a = al * ar + cl * br;
      var c = al * cr + cl * dr;
      var e = al * er + cl * fr + el;
      var b = bl * ar + dl * br;
      var d = bl * cr + dl * dr;
      var f = bl * er + dl * fr + fl;
      return [a, c, e, b, d, f];
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }
  transform = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
  return transform;
}
requireTransform();
function transformsArrayToProps(transformObjectsArray) {
  const props = {};
  transformObjectsArray === null || transformObjectsArray === void 0 ? void 0 : transformObjectsArray.forEach((transformObject) => {
    const keys = Object.keys(transformObject);
    if (keys.length !== 1) {
      console.error("You must specify exactly one property per transform object.");
    }
    const key = keys[0];
    const value = transformObject[key];
    props[key] = value;
  });
  return props;
}
const hasTouchableProperty = (props) => props.onPress || props.onPressIn || props.onPressOut || props.onLongPress;
const camelCaseToDashed = (camelCase) => {
  return camelCase.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};
function stringifyTransformProps(transformProps) {
  const transformArray = [];
  if (transformProps.translate != null) {
    transformArray.push(`translate(${transformProps.translate})`);
  }
  if (transformProps.translateX != null || transformProps.translateY != null) {
    transformArray.push(`translate(${transformProps.translateX || 0}, ${transformProps.translateY || 0})`);
  }
  if (transformProps.scale != null) {
    transformArray.push(`scale(${transformProps.scale})`);
  }
  if (transformProps.scaleX != null || transformProps.scaleY != null) {
    transformArray.push(`scale(${transformProps.scaleX || 1}, ${transformProps.scaleY || 1})`);
  }
  if (transformProps.rotation != null) {
    transformArray.push(`rotate(${transformProps.rotation})`);
  }
  if (transformProps.skewX != null) {
    transformArray.push(`skewX(${transformProps.skewX})`);
  }
  if (transformProps.skewY != null) {
    transformArray.push(`skewY(${transformProps.skewY})`);
  }
  return transformArray;
}
function parseTransformProp(transform2, props) {
  const transformArray = [];
  props && transformArray.push(...stringifyTransformProps(props));
  if (Array.isArray(transform2)) {
    if (typeof transform2[0] === "number") {
      transformArray.push(`matrix(${transform2.join(" ")})`);
    } else {
      const stringifiedProps = transformsArrayToProps(transform2);
      transformArray.push(...stringifyTransformProps(stringifiedProps));
    }
  } else if (typeof transform2 === "string") {
    transformArray.push(transform2);
  }
  return transformArray.length ? transformArray.join(" ") : void 0;
}
const prepare = function(self) {
  let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : self.props;
  const {
    transform: transform2,
    origin,
    originX,
    originY,
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    style,
    forwardedRef,
    gradientTransform,
    patternTransform,
    ...rest
  } = props;
  const clean = {
    ...hasTouchableProperty(props) ? {
      onStartShouldSetResponder: self.touchableHandleStartShouldSetResponder,
      onResponderTerminationRequest: self.touchableHandleResponderTerminationRequest,
      onResponderGrant: self.touchableHandleResponderGrant,
      onResponderMove: self.touchableHandleResponderMove,
      onResponderRelease: self.touchableHandleResponderRelease,
      onResponderTerminate: self.touchableHandleResponderTerminate
    } : null,
    ...rest
  };
  if (origin != null) {
    clean["transform-origin"] = origin.toString().replace(",", " ");
  } else if (originX != null || originY != null) {
    clean["transform-origin"] = `${originX || 0} ${originY || 0}`;
  }
  const parsedTransform = parseTransformProp(transform2, props);
  if (parsedTransform) {
    clean.transform = parsedTransform;
  }
  const parsedGradientTransform = parseTransformProp(gradientTransform);
  if (parsedGradientTransform) {
    clean.gradientTransform = parsedGradientTransform;
  }
  const parsedPatternTransform = parseTransformProp(patternTransform);
  if (parsedPatternTransform) {
    clean.patternTransform = parsedPatternTransform;
  }
  clean.ref = (el) => {
    self.elementRef.current = el;
    if (typeof forwardedRef === "function") {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };
  const styles = {};
  if (fontFamily != null) {
    styles.fontFamily = fontFamily;
  }
  if (fontSize != null) {
    styles.fontSize = fontSize;
  }
  if (fontWeight != null) {
    styles.fontWeight = fontWeight;
  }
  if (fontStyle != null) {
    styles.fontStyle = fontStyle;
  }
  clean.style = resolve(style, styles);
  return clean;
};
const getBoundingClientRect = (node) => {
  if (node) {
    const isElement = node.nodeType === 1;
    if (isElement && typeof node.getBoundingClientRect === "function") {
      return node.getBoundingClientRect();
    }
  }
  throw new Error("Can not get boundingClientRect of " + node || "undefined");
};
const measureLayout = (node, callback) => {
  const relativeNode = node === null || node === void 0 ? void 0 : node.parentNode;
  if (relativeNode) {
    setTimeout(() => {
      const relativeRect = getBoundingClientRect(relativeNode);
      const {
        height,
        left,
        top,
        width
      } = getBoundingClientRect(node);
      const x = left - relativeRect.left;
      const y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};
function remeasure() {
  const tag = this.state.touchable.responderID;
  if (tag === null) {
    return;
  }
  measureLayout(tag, this._handleQueryLayout);
}
class WebShape extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "elementRef", /* @__PURE__ */ React.createRef());
    __publicField(this, "lastMergedProps", {});
    if (hasTouchableProperty(props)) {
      SvgTouchableMixin$1(this);
    }
    this._remeasureMetricsOnActivation = remeasure.bind(this);
  }
  prepareProps(props) {
    return props;
  }
  /**
   * disclaimer: I am not sure why the props are wrapped in a `style` attribute here, but that's how reanimated calls it
   */
  setNativeProps(props) {
    const merged = Object.assign({}, this.props, this.lastMergedProps, props.style);
    this.lastMergedProps = merged;
    const clean = prepare(this, this.prepareProps(merged));
    const current = this.elementRef.current;
    if (current) {
      for (const cleanAttribute of Object.keys(clean)) {
        const cleanValue = clean[cleanAttribute];
        switch (cleanAttribute) {
          case "ref":
          case "children":
            break;
          case "style":
            for (const partialStyle of [].concat(clean.style ?? [])) {
              Object.assign(current.style, partialStyle);
            }
            break;
          default:
            current.setAttribute(camelCaseToDashed(cleanAttribute), cleanValue);
            break;
        }
      }
    }
  }
  render() {
    if (!this.tag) {
      throw new Error("When extending `WebShape` you need to overwrite either `tag` or `render`!");
    }
    this.lastMergedProps = {};
    return cjsExports.unstable_createElement(this.tag, prepare(this, this.prepareProps(this.props)));
  }
}
class Circle extends WebShape {
  constructor() {
    super(...arguments);
    __publicField(this, "tag", "circle");
  }
}
class Path extends WebShape {
  constructor() {
    super(...arguments);
    __publicField(this, "tag", "path");
  }
}
function encodeSvg(svgString) {
  return svgString.replace("<svg", ~svgString.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"').replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
class Svg extends WebShape {
  constructor() {
    super(...arguments);
    __publicField(this, "tag", "svg");
  }
  toDataURL(callback) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const ref = this.elementRef.current;
    if (ref === null) {
      return;
    }
    const rect = getBoundingClientRect(ref);
    const width = Number(options.width) || rect.width;
    const height = Number(options.height) || rect.height;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.appendChild(ref.cloneNode(true));
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context === null || context === void 0 ? void 0 : context.drawImage(img, 0, 0);
      callback(canvas.toDataURL().replace("data:image/png;base64,", ""));
    };
    img.src = `data:image/svg+xml;utf8,${encodeSvg(new window.XMLSerializer().serializeToString(svg))}`;
  }
}
const Icon$2 = (props) => {
  const {
    color = "black",
    size = 24,
    ...otherProps
  } = props;
  return /* @__PURE__ */ jsx(Svg, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...otherProps,
    children: /* @__PURE__ */ jsx(Path, {
      d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
      stroke: color
    })
  });
};
Icon$2.displayName = "Moon";
const Moon = memo(themed(Icon$2));
const Icon$1 = (props) => {
  const {
    color = "black",
    size = 24,
    ...otherProps
  } = props;
  return /* @__PURE__ */ jsxs(Svg, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...otherProps,
    children: [/* @__PURE__ */ jsx(Circle, {
      cx: "12",
      cy: "12",
      r: "4",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M12 2v2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M12 20v2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m4.93 4.93 1.41 1.41",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m17.66 17.66 1.41 1.41",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M2 12h2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M20 12h2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m6.34 17.66-1.41 1.41",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m19.07 4.93-1.41 1.41",
      stroke: color
    })]
  });
};
Icon$1.displayName = "Sun";
const Sun = memo(themed(Icon$1));
const Icon = (props) => {
  const {
    color = "black",
    size = 24,
    ...otherProps
  } = props;
  return /* @__PURE__ */ jsxs(Svg, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...otherProps,
    children: [/* @__PURE__ */ jsx(Path, {
      d: "M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M12 2v2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M12 20v2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m4.9 4.9 1.4 1.4",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m17.7 17.7 1.4 1.4",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M2 12h2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "M20 12h2",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m6.3 17.7-1.4 1.4",
      stroke: color
    }), /* @__PURE__ */ jsx(Path, {
      d: "m19.1 4.9-1.4 1.4",
      stroke: color
    })]
  });
};
Icon.displayName = "SunMoon";
const SunMoon = memo(themed(Icon));
const _cn$1 = "  _dsp-flex _ai-stretch _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-0 _pe-auto ";
const schemeSettings = ["light", "dark", "system"];
function ToggleThemeButton() {
  const {
    onPress,
    Icon: Icon2
  } = useToggleTheme();
  return /* @__PURE__ */ jsx("div", { onClick: onPress, className: _cn$1, children: /* @__PURE__ */ jsx(Icon2, { size: 22 }) });
}
function useToggleTheme() {
  const [{
    setting,
    scheme
  }, setSchemeSetting] = useSchemeSetting();
  const Icon2 = setting === "system" ? SunMoon : setting === "dark" ? Moon : Sun;
  return {
    setting,
    scheme,
    Icon: Icon2,
    onPress: () => {
      const next = setting === "system" ? scheme === "light" ? "dark" : "light" : schemeSettings[(schemeSettings.indexOf(setting) + 1) % 3];
      setSchemeSetting(next);
    }
  };
}
const oneBall = "/assets/app-icon-DXK4YC68.png";
const _cn2 = "  _ff-f-family _dsp-inline _bxs-border-box _ww-break-word _whiteSpace-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _col-color _fos-20px font_body ";
const _cn = "  _dsp-flex _fb-auto _bxs-border-box _pos-relative _miw-0px _fs-1 _fd-column _bg-color1 _mih-10037 _gap-t-space-4 _ai-center _jc-center _fg-1 ";
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { className: _cn, children: [
    /* @__PURE__ */ jsx("span", { className: _cn2, children: "Hello, world" }),
    /* @__PURE__ */ jsx(Image, { src: oneBall, width: 128, height: 128 }),
    /* @__PURE__ */ jsx(ToggleThemeButton, {})
  ] });
}
export {
  HomePage
};
