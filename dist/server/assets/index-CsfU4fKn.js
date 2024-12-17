var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { Y as useColorSchemeSetting, Q as useIsomorphicLayoutEffect$1, Z as setColorScheme, $ as useColorScheme$1, q as getDefaultExportFromCjs } from "../_virtual_one-entry.js";
import * as React from "react";
import React__default, { createContext, useMemo, useContext, forwardRef, Children, cloneElement, useRef, isValidElement, useState, version, memo } from "react";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
const storageKey = "vxrn-scheme", getSetting$1 = () => typeof localStorage < "u" && localStorage.getItem(storageKey) || "system", SchemeContext = createContext({
  setting: "system",
  scheme: "light"
}), useColorScheme = () => {
  const [state] = useColorScheme$1();
  return [state, setSchemeSetting];
};
function useSchemeSetting() {
  return [useContext(SchemeContext), setSchemeSetting];
}
function setSchemeSetting(next) {
  typeof localStorage < "u" && localStorage.setItem(storageKey, next), setColorScheme(next);
}
function SchemeProvider({
  children,
  // defaults to tamagui-compatible
  getClassName = (name) => `t_${name}`
}) {
  const [colorSchemeSetting] = useColorSchemeSetting(), [colorScheme] = useColorScheme();
  return useIsomorphicLayoutEffect$1(() => {
    setColorScheme(getSetting$1());
    const toAdd = getClassName(colorScheme), {
      classList
    } = document.documentElement;
    if (!classList.contains(toAdd)) {
      const toRemove = colorScheme === "light" ? "dark" : "light";
      classList.remove(getClassName(toRemove)), classList.add(toAdd);
    }
  }, [colorScheme]), /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("script", {
      dangerouslySetInnerHTML: {
        __html: `let d = document.documentElement.classList
          d.remove('${getClassName("light")}')
            d.remove('${getClassName("dark")}')
          let e = localStorage.getItem('${storageKey}')
          let t =
            'system' === e || !e
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
              : e === 'dark'
          t ? d.add('${getClassName("dark")}') : d.add('${getClassName("light")}')
          `
      }
    }), /* @__PURE__ */ jsx(SchemeContext.Provider, {
      value: useMemo(() => ({
        scheme: colorScheme,
        setting: colorSchemeSetting
      }), [colorScheme, colorSchemeSetting]),
      children
    })]
  });
}
const cache$4 = /* @__PURE__ */ new Map();
let cacheSize = 0;
const simpleHash = (strIn, hashMin = 10) => {
  if (cache$4.has(strIn)) return cache$4.get(strIn);
  let str = strIn;
  str[0] === "v" && str.startsWith("var(") && (str = str.slice(6, str.length - 1));
  let hash = 0, valids = "", added = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (hashMin !== "strict" && added <= hashMin) {
      const char = str.charCodeAt(i);
      if (char === 46) {
        valids += "--";
        continue;
      }
      if (isValidCSSCharCode(char)) {
        added++, valids += str[i];
        continue;
      }
    }
    hash = hashChar(hash, str[i]);
  }
  const res = valids + (hash ? Math.abs(hash) : "");
  return cacheSize > 1e4 && (cache$4.clear(), cacheSize = 0), cache$4.set(strIn, res), cacheSize++, res;
}, hashChar = (hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0;
function isValidCSSCharCode(code) {
  return (
    // A-Z
    code >= 65 && code <= 90 || // a-z
    code >= 97 && code <= 122 || // _
    code === 95 || // -
    code === 45 || // 0-9
    code >= 48 && code <= 57
  );
}
function composeEventHandlers(og, next, {
  checkDefaultPrevented = true
} = {}) {
  return !og || !next ? next || og || void 0 : (event) => {
    if (og == null ? void 0 : og(event), !event || !(checkDefaultPrevented && "defaultPrevented" in event) || // @ts-ignore
    "defaultPrevented" in event && !event.defaultPrevented) return next == null ? void 0 : next(event);
  };
}
const StyleObjectProperty = 0, StyleObjectIdentifier = 2, StyleObjectPseudo = 3, StyleObjectRules = 4;
const isWeb = true, isWindowDefined = typeof window < "u", isServer = !isWindowDefined, isClient = isWindowDefined, useIsomorphicLayoutEffect = isServer ? React__default.useEffect : React__default.useLayoutEffect, isWebTouchable = isClient && ("ontouchstart" in window || navigator.maxTouchPoints > 0), isTouchable = isWebTouchable, isAndroid = false, isIos = process.env.TEST_NATIVE_PLATFORM === "ios", currentPlatform = "web";
const textColors = {
  color: true,
  textDecorationColor: true,
  textShadowColor: true
}, tokenCategories = {
  radius: {
    borderRadius: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    // logical
    borderStartStartRadius: true,
    borderStartEndRadius: true,
    borderEndStartRadius: true,
    borderEndEndRadius: true
  },
  size: {
    width: true,
    height: true,
    minWidth: true,
    minHeight: true,
    maxWidth: true,
    maxHeight: true,
    blockSize: true,
    minBlockSize: true,
    maxBlockSize: true,
    inlineSize: true,
    minInlineSize: true,
    maxInlineSize: true
  },
  zIndex: {
    zIndex: true
  },
  color: {
    backgroundColor: true,
    borderColor: true,
    borderBlockStartColor: true,
    borderBlockEndColor: true,
    borderBlockColor: true,
    borderBottomColor: true,
    borderInlineColor: true,
    borderInlineStartColor: true,
    borderInlineEndColor: true,
    borderTopColor: true,
    borderLeftColor: true,
    borderRightColor: true,
    borderEndColor: true,
    borderStartColor: true,
    shadowColor: true,
    ...textColors,
    outlineColor: true,
    caretColor: true
  }
}, stylePropsUnitless = {
  WebkitLineClamp: true,
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexOrder: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowGap: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnGap: true,
  gridColumnStart: true,
  gridTemplateColumns: true,
  gridTemplateAreas: true,
  lineClamp: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  scaleZ: true,
  shadowOpacity: true
}, stylePropsTransform = {
  x: true,
  y: true,
  scale: true,
  perspective: true,
  scaleX: true,
  scaleY: true,
  skewX: true,
  skewY: true,
  matrix: true,
  rotate: true,
  rotateY: true,
  rotateX: true,
  rotateZ: true
}, stylePropsView = {
  backfaceVisibility: true,
  borderBottomEndRadius: true,
  borderBottomStartRadius: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderBlockWidth: true,
  borderBlockEndWidth: true,
  borderBlockStartWidth: true,
  borderInlineWidth: true,
  borderInlineEndWidth: true,
  borderInlineStartWidth: true,
  borderStyle: true,
  borderBlockStyle: true,
  borderBlockEndStyle: true,
  borderBlockStartStyle: true,
  borderInlineStyle: true,
  borderInlineEndStyle: true,
  borderInlineStartStyle: true,
  borderTopEndRadius: true,
  borderTopStartRadius: true,
  borderTopWidth: true,
  borderWidth: true,
  transform: true,
  transformOrigin: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  borderEndWidth: true,
  borderStartWidth: true,
  bottom: true,
  display: true,
  end: true,
  flexBasis: true,
  flexDirection: true,
  flexWrap: true,
  gap: true,
  columnGap: true,
  rowGap: true,
  justifyContent: true,
  left: true,
  margin: true,
  marginBlock: true,
  marginBlockEnd: true,
  marginBlockStart: true,
  marginInline: true,
  marginInlineStart: true,
  marginInlineEnd: true,
  marginBottom: true,
  marginEnd: true,
  marginHorizontal: true,
  marginLeft: true,
  marginRight: true,
  marginStart: true,
  marginTop: true,
  marginVertical: true,
  overflow: true,
  padding: true,
  paddingBottom: true,
  paddingInline: true,
  paddingBlock: true,
  paddingBlockStart: true,
  paddingInlineEnd: true,
  paddingInlineStart: true,
  paddingEnd: true,
  paddingHorizontal: true,
  paddingLeft: true,
  paddingRight: true,
  paddingStart: true,
  paddingTop: true,
  paddingVertical: true,
  position: true,
  right: true,
  start: true,
  top: true,
  inset: true,
  insetBlock: true,
  insetBlockEnd: true,
  insetBlockStart: true,
  insetInline: true,
  insetInlineEnd: true,
  insetInlineStart: true,
  direction: true,
  shadowOffset: true,
  shadowRadius: true,
  ...tokenCategories.color,
  ...tokenCategories.radius,
  ...tokenCategories.size,
  ...tokenCategories.radius,
  ...stylePropsTransform,
  ...stylePropsUnitless,
  boxShadow: true,
  filter: true,
  // RN doesn't support specific border styles per-edge
  transition: true,
  textWrap: true,
  backdropFilter: true,
  background: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  backgroundClip: true,
  backgroundColor: true,
  backgroundImage: true,
  backgroundOrigin: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundSize: true,
  borderBottomStyle: true,
  borderImage: true,
  borderLeftStyle: true,
  borderRightStyle: true,
  borderTopStyle: true,
  boxSizing: true,
  caretColor: true,
  clipPath: true,
  contain: true,
  containerType: true,
  content: true,
  cursor: true,
  float: true,
  mask: true,
  maskBorder: true,
  maskBorderMode: true,
  maskBorderOutset: true,
  maskBorderRepeat: true,
  maskBorderSlice: true,
  maskBorderSource: true,
  maskBorderWidth: true,
  maskClip: true,
  maskComposite: true,
  maskImage: true,
  maskMode: true,
  maskOrigin: true,
  maskPosition: true,
  maskRepeat: true,
  maskSize: true,
  maskType: true,
  mixBlendMode: true,
  objectFit: true,
  objectPosition: true,
  outlineOffset: true,
  outlineStyle: true,
  outlineWidth: true,
  overflowBlock: true,
  overflowInline: true,
  overflowX: true,
  overflowY: true,
  pointerEvents: true,
  scrollbarWidth: true,
  textEmphasis: true,
  touchAction: true,
  transformStyle: true,
  userSelect: true,
  ...{}
}, stylePropsFont = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  letterSpacing: true,
  lineHeight: true,
  textTransform: true
}, stylePropsTextOnly = {
  ...stylePropsFont,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  ...textColors,
  textShadowOffset: true,
  textShadowRadius: true,
  userSelect: true,
  selectable: true,
  verticalAlign: true,
  whiteSpace: true,
  wordWrap: true,
  textOverflow: true,
  textDecorationDistance: true,
  cursor: true,
  WebkitLineClamp: true,
  WebkitBoxOrient: true
}, stylePropsText = {
  ...stylePropsView,
  ...stylePropsTextOnly
}, stylePropsAll = stylePropsText, validPseudoKeys = {
  enterStyle: true,
  exitStyle: true,
  hoverStyle: true,
  pressStyle: true,
  focusStyle: true,
  disabledStyle: true,
  focusVisibleStyle: true
}, validStyles = {
  ...validPseudoKeys,
  ...stylePropsView
};
let conf$2;
const getSetting = (key) => {
  return conf$2.settings[key] ?? // @ts-expect-error
  conf$2[key];
}, setConfig = (next) => {
  conf$2 = next;
}, getConfig = () => {
  if (!conf$2) throw new Error("Err0");
  return conf$2;
}, getConfigMaybe = () => conf$2;
let tokensMerged;
function setTokens(_) {
  tokensMerged = _;
}
const getTokens = ({
  prefixed
} = {}) => {
  const {
    tokens,
    tokensParsed
  } = conf$2;
  return prefixed === false ? tokens : prefixed === true ? tokensParsed : tokensMerged;
}, getTokenObject = (value, group) => {
  var _a2, _b;
  return conf$2.specificTokens[value] ?? (group ? (_a2 = tokensMerged[group]) == null ? void 0 : _a2[value] : (_b = tokensMerged[Object.keys(tokensMerged).find((cat) => tokensMerged[cat][value]) || ""]) == null ? void 0 : _b[value]);
}, getToken = (value, group, useVariable = isWeb) => {
  const token = getTokenObject(value, group);
  return useVariable ? token == null ? void 0 : token.variable : token == null ? void 0 : token.val;
}, getTokenValue = (value, group) => {
  if (!(value === "unset" || value === "auto")) return getToken(value, group, false);
}, getThemes = () => conf$2.themes, configListeners = /* @__PURE__ */ new Set(), onConfiguredOnce = (cb) => {
  conf$2 ? cb(conf$2) : configListeners.add(cb);
};
function constructCSSVariableName(name) {
  return `var(--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${name})`;
}
const createVariable = (props, skipHash = false) => {
  if (!skipHash && isVariable(props)) return props;
  const {
    key,
    name,
    val
  } = props;
  return {
    isVar: true,
    key,
    name: skipHash ? name : simpleHash(name, 40),
    val,
    variable: skipHash ? constructCSSVariableName(name) : createCSSVariable(name)
  };
};
function variableToString(vrble, getValue = false) {
  return isVariable(vrble) ? !getValue && isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable(v) {
  return v && typeof v == "object" && "isVar" in v;
}
function getVariable(nameOrVariable, group = "size") {
  var _a2;
  if (nameOrVariable == null ? void 0 : nameOrVariable.dynamic) return nameOrVariable;
  if (setDidGetVariableValue(true), isVariable(nameOrVariable)) return variableToString(nameOrVariable);
  const tokens = getConfig().tokensParsed;
  return variableToString(((_a2 = tokens[group]) == null ? void 0 : _a2[nameOrVariable]) ?? nameOrVariable);
}
let accessed = false;
const setDidGetVariableValue = (val) => accessed = val, didGetVariableValue = () => accessed;
function getVariableValue(v, group) {
  if (isVariable(v)) return setDidGetVariableValue(true), v.val;
  return v;
}
const createCSSVariable = (nameProp, includeVar = true) => {
  const name = simpleHash(nameProp, 60);
  return includeVar ? constructCSSVariableName(name) : name;
};
const scannedCache = /* @__PURE__ */ new WeakMap(), allSelectors = {}, allRules = {}, insertedTransforms = {}, getAllSelectors = () => allSelectors, getAllRules = () => Object.values(allRules);
function listenForSheetChanges() {
  if (!isClient) return;
  new MutationObserver((entries) => {
    for (const entry of entries) if (entry instanceof HTMLStyleElement && entry.sheet || entry instanceof HTMLLinkElement && entry.href.endsWith(".css")) {
      scanAllSheets();
      break;
    }
  }).observe(document.head, {
    childList: true
  });
}
let lastScannedSheets = null;
function scanAllSheets(collectThemes = false, tokens) {
  if (!isClient) return;
  let themes;
  const sheets = document.styleSheets || [], prev = lastScannedSheets, current = new Set(sheets);
  for (const sheet2 of current) if (sheet2) {
    const out = updateSheetStyles(sheet2, false, collectThemes, tokens);
    out && (themes = out);
  }
  if (lastScannedSheets = current, prev) for (const sheet2 of prev) sheet2 && !current.has(sheet2) && updateSheetStyles(sheet2, true);
  return themes;
}
const bailAfterEnv = process.env.TAMAGUI_BAIL_AFTER_SCANNING_X_CSS_RULES, bailAfter = bailAfterEnv ? +bailAfterEnv : 700;
function updateSheetStyles(sheet2, remove = false, collectThemes = false, tokens) {
  var _a2, _b;
  let rules;
  try {
    if (rules = sheet2.cssRules, !rules) return;
  } catch {
    return;
  }
  const firstSelector = (_a2 = getTamaguiSelector(rules[0], collectThemes)) == null ? void 0 : _a2[0], lastSelector = (_b = getTamaguiSelector(rules[rules.length - 1], collectThemes)) == null ? void 0 : _b[0], cacheKey = `${rules.length}${firstSelector}${lastSelector}`, lastScanned = scannedCache.get(sheet2);
  if (!remove && lastScanned === cacheKey) return;
  const len = rules.length;
  let fails = 0, dedupedThemes;
  const nameToTheme = {};
  for (let i = 0; i < len; i++) {
    const rule = rules[i];
    if (!(rule instanceof CSSStyleRule)) continue;
    const response = getTamaguiSelector(rule, collectThemes);
    if (response) fails = 0;
    else {
      if (fails++, fails > bailAfter) return;
      continue;
    }
    const [identifier, cssRule, isTheme] = response;
    if (isTheme) {
      const deduped = addThemesFromCSS(cssRule, tokens);
      if (deduped) {
        for (const name of deduped.names) nameToTheme[name] ? (Object.apply(nameToTheme[name], deduped.theme), deduped.names = deduped.names.filter((x) => x !== name)) : nameToTheme[name] = deduped.theme;
        dedupedThemes || (dedupedThemes = []), dedupedThemes.push(deduped);
      }
      continue;
    }
  }
  return scannedCache.set(sheet2, cacheKey), dedupedThemes;
}
let colorVarToVal, rootComputedStyle = null;
function addThemesFromCSS(cssStyleRule, tokens) {
  const selectors2 = cssStyleRule.selectorText.split(",");
  if (!selectors2.length) return;
  if (tokens && !colorVarToVal) {
    colorVarToVal = {};
    for (const key in tokens.color) {
      const token = tokens.color[key];
      colorVarToVal[token.name] = token.val;
    }
  }
  const rules = (cssStyleRule.cssText || "").slice(cssStyleRule.selectorText.length + 2, -1).split(";"), values = {};
  for (const rule of rules) {
    const sepI = rule.indexOf(":");
    if (sepI === -1) continue;
    const varIndex = rule.indexOf("--");
    let key = rule.slice(varIndex === -1 ? 0 : varIndex + 2, sepI);
    process.env.TAMAGUI_CSS_VARIABLE_PREFIX && (key = key.replace(process.env.TAMAGUI_CSS_VARIABLE_PREFIX, ""));
    const val = rule.slice(sepI + 2);
    let value;
    if (val[0] === "v" && val.startsWith("var(")) {
      const varName = val.slice(6, -1), tokenVal = colorVarToVal[varName];
      tokenVal ? value = tokenVal : (rootComputedStyle || (rootComputedStyle = getComputedStyle(document.body)), value = rootComputedStyle.getPropertyValue("--" + varName));
    } else value = val;
    values[key] = createVariable({
      key,
      name: key,
      val: value
    }, true);
  }
  const names = /* @__PURE__ */ new Set();
  for (const selector of selectors2) {
    const lastThemeSelectorIndex = selector.lastIndexOf(".t_"), name = selector.slice(lastThemeSelectorIndex).slice(3), [schemeChar] = selector[lastThemeSelectorIndex - 5], scheme = schemeChar === "d" ? "dark" : schemeChar === "i" ? "light" : "", themeName = scheme && scheme !== name ? `${scheme}_${name}` : name;
    !themeName || themeName === "light_dark" || themeName === "dark_light" || names.add(themeName);
  }
  return {
    names: [...names],
    theme: values
  };
}
function getTamaguiSelector(rule, collectThemes = false) {
  if (rule instanceof CSSStyleRule) {
    const text = rule.selectorText;
    if (text[0] === ":" && text[1] === "r") {
      if (text.startsWith(":root ._")) return [getIdentifierFromTamaguiSelector(text), rule];
      if (collectThemes && /^(:root\s?(\.t_[a-z0-9_]+\s*)+(,)?\s*)+$/i.test(text)) return [
        text.slice(0, 20),
        // just used as uid
        rule,
        true
      ];
    }
  } else if (rule instanceof CSSMediaRule) return rule.cssRules.length > 1 ? void 0 : getTamaguiSelector(rule.cssRules[0]);
}
const getIdentifierFromTamaguiSelector = (selector) => {
  const dotIndex = selector.indexOf(":");
  return dotIndex > -1 ? selector.slice(7, dotIndex) : selector.slice(7);
};
process.env.TAMAGUI_INSERT_SELECTOR_TRIES ? +process.env.TAMAGUI_INSERT_SELECTOR_TRIES : 1;
const matchMedia = typeof window < "u" && window.matchMedia || matchMediaFallback;
function matchMediaFallback(_) {
  return {
    match: (a, b) => false,
    addListener() {
    },
    removeListener() {
    },
    matches: false
  };
}
const pseudoDescriptorsBase = {
  // order of keys here important! in priority order
  hoverStyle: {
    name: "hover",
    priority: 1
  },
  pressStyle: {
    name: "active",
    stateKey: "press",
    priority: 2
  },
  focusVisibleStyle: {
    name: "focus-visible",
    priority: 3,
    stateKey: "focusVisible"
  },
  focusStyle: {
    name: "focus",
    priority: 3
  },
  disabledStyle: {
    name: "disabled",
    priority: 4,
    stateKey: "disabled"
  }
}, pseudoPriorities = {
  hover: 1,
  press: 2,
  focus: 3,
  focusVisible: 3,
  disabled: 4
}, pseudoDescriptors = {
  ...pseudoDescriptorsBase,
  enterStyle: {
    name: "enter",
    selector: ".t_unmounted",
    priority: 4
  },
  exitStyle: {
    name: "exit",
    priority: 5
  }
};
function getDisableSSR(componentContext) {
  return (componentContext == null ? void 0 : componentContext.disableSSR) ?? getSetting("disableSSR");
}
let mediaState = (
  // development only safeguard
  {}
);
const mediaQueryConfig = {}, getMedia = () => mediaState, mediaKeys = /* @__PURE__ */ new Set(), mediaKeyRegex = /\$(platform|theme|group)-/, isMediaKey = (key) => {
  if (mediaKeys.has(key)) return true;
  if (key[0] === "$") {
    const match = key.match(mediaKeyRegex);
    if (match) return match[1];
  }
  return false;
};
let initState;
const defaultMediaImportance = Object.keys(pseudoDescriptors).length;
let mediaKeysOrdered;
const getMediaKeyImportance = (key) => {
  return getConfig().settings.mediaPropOrder ? defaultMediaImportance : mediaKeysOrdered.indexOf(key) + 100;
}, dispose = /* @__PURE__ */ new Set();
let mediaVersion = 0;
const configureMedia = (config) => {
  const {
    media
  } = config, mediaQueryDefaultActive = getSetting("mediaQueryDefaultActive");
  if (media) {
    mediaVersion++;
    for (const key in media) mediaState[key] = (mediaQueryDefaultActive == null ? void 0 : mediaQueryDefaultActive[key]) || false, mediaKeys.add(`$${key}`);
    Object.assign(mediaQueryConfig, media), initState = {
      ...mediaState
    }, mediaKeysOrdered = Object.keys(media), setupMediaListeners();
  }
};
function unlisten() {
  dispose.forEach((cb) => cb()), dispose.clear();
}
let setupVersion = -1;
function setupMediaListeners() {
  if (!isServer && true && setupVersion !== mediaVersion) {
    setupVersion = mediaVersion, unlisten();
    for (const key in mediaQueryConfig) {
      let update = function() {
        const next = !!getMatch().matches;
        next !== mediaState[key] && (mediaState = {
          ...mediaState,
          [key]: next
        }, updateCurrentState());
      };
      const str = mediaObjectToString(mediaQueryConfig[key], key), getMatch = () => matchMedia(str), match = getMatch();
      if (!match) throw new Error("⚠️ No match");
      match.addListener(update), dispose.add(() => {
        match.removeListener(update);
      }), update();
    }
  }
}
const listeners = /* @__PURE__ */ new Set();
let flushing = false, flushVersion = -1;
function updateCurrentState() {
  flushing && flushVersion === mediaVersion || (flushVersion = mediaVersion, flushing = true, Promise.resolve().then(() => {
    flushing = false, listeners.forEach((cb) => cb(mediaState));
  }));
}
const States = /* @__PURE__ */ new WeakMap();
function setMediaShouldUpdate(ref, enabled, keys) {
  const cur = States.get(ref);
  (!cur || cur.enabled !== enabled || keys) && States.set(ref, {
    ...cur,
    enabled,
    keys
  });
}
function subscribe(subscriber) {
  return listeners.add(subscriber), () => {
    listeners.delete(subscriber);
  };
}
const CurrentKeysMap = /* @__PURE__ */ new WeakMap();
function useMedia(cc, debug) {
  const initialState = getSetting("disableSSR") || getDisableSSR(cc) || !isWeb ? mediaState : initState, [state, setState] = React__default.useState(initialState);
  CurrentKeysMap.get(setState) || CurrentKeysMap.set(setState, /* @__PURE__ */ new Set());
  const currentKeys = CurrentKeysMap.get(setState);
  function getSnapshot(cur) {
    if (!currentKeys) return cur;
    for (const key of currentKeys) if (mediaState[key] !== cur[key]) return mediaState;
    return cur;
  }
  let isRendering = true;
  const isInitialState = state === initialState;
  return useIsomorphicLayoutEffect(() => {
    isRendering = false;
  }), useIsomorphicLayoutEffect(() => {
    const update = () => setState((prev) => getSnapshot(prev));
    update();
    const tm = setTimeout(() => {
      currentKeys.size && update();
    }), dispose2 = subscribe(update);
    return () => {
      dispose2(), clearTimeout(tm);
    };
  }, [setState]), new Proxy(state, {
    get(_, key) {
      if (isRendering && !disableMediaTouch && typeof key == "string" && (currentKeys.add(key), state[key] !== mediaState[key] && !isInitialState)) {
        const next = getSnapshot(state);
        next !== state && setState(next);
      }
      return Reflect.get(state, key);
    }
  });
}
let disableMediaTouch = false;
function getMediaState(mediaGroups, layout) {
  disableMediaTouch = true;
  let res;
  try {
    res = Object.fromEntries([...mediaGroups].map((mediaKey) => [mediaKey, mediaKeyMatch(mediaKey, layout)]));
  } finally {
    disableMediaTouch = false;
  }
  return res;
}
const getMediaImportanceIfMoreImportant = (mediaKey, key, importancesUsed, isSizeMedia) => {
  const importance = isSizeMedia && !getSetting("mediaPropOrder") ? getMediaKeyImportance(mediaKey) : defaultMediaImportance;
  return !importancesUsed[key] || importance > importancesUsed[key] ? importance : null;
};
function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).toLowerCase();
}
const cache$3 = /* @__PURE__ */ new WeakMap(), cachedMediaKeyToQuery = {};
function mediaObjectToString(query, key) {
  if (typeof query == "string") return query;
  if (cache$3.has(query)) return cache$3.get(query);
  const res = Object.entries(query).map(([feature, value]) => (feature = camelToHyphen(feature), typeof value == "string" ? `(${feature}: ${value})` : (typeof value == "number" && /[height|width]$/.test(feature) && (value = `${value}px`), `(${feature}: ${value})`))).join(" and ");
  return key && (cachedMediaKeyToQuery[key] = res), cache$3.set(query, res), res;
}
function mediaKeyMatch(key, dimensions) {
  const mediaQueries = mediaQueryConfig[key];
  return Object.keys(mediaQueries).every((query) => {
    const expectedVal = +mediaQueries[query], isMax = query.startsWith("max"), isWidth = query.endsWith("Width"), givenVal = dimensions[isWidth ? "width" : "height"];
    return isMax ? givenVal < expectedVal : givenVal > expectedVal;
  });
}
const THEME_NAME_SEPARATOR = "_", THEME_CLASSNAME_PREFIX = "t_", stackDefaultStyles = {}, webViewFlexCompatStyles = {
  display: "flex",
  alignItems: "stretch",
  flexDirection: "column",
  flexBasis: "auto",
  boxSizing: "border-box",
  position: "relative",
  minHeight: 0,
  minWidth: 0,
  flexShrink: 0
};
Object.assign(stackDefaultStyles, webViewFlexCompatStyles);
const emptyState = {
  name: ""
};
function getHasThemeUpdatingProps(props) {
  return !!(props.name || props.componentName || props.inverse || props.reset);
}
let uid = 0;
class ThemeManager {
  constructor(props = {}, parentManager) {
    __publicField(this, "id", 0);
    __publicField(this, "themeListeners", /* @__PURE__ */ new Set());
    __publicField(this, "parentManager", null);
    __publicField(this, "state", emptyState);
    __publicField(this, "_allKeys", null);
    __publicField(this, "_selfListener");
    this.props = props;
    if (uid = (uid + 1) % Number.MAX_VALUE, this.id = uid, parentManager === "root") {
      this.updateStateFromProps(props, false);
      return;
    }
    if (!parentManager) throw "❌ 000";
    if (this.parentManager = parentManager, !this.updateStateFromProps(props, false)) return parentManager;
  }
  updateStateFromProps(props = this.props || {}, shouldNotify = true) {
    if (this.props = props, props.forceTheme) return this.state.theme = props.forceTheme, this.state.name = props.name || "", this.updateState(this.state, true), this.state;
    const nextState = this.getStateIfChanged(props);
    if (nextState) return this.updateState(nextState, shouldNotify), nextState;
  }
  getParents() {
    const parents = [];
    let current = this;
    for (; current; ) parents.push(current), current = current.parentManager;
    return parents;
  }
  updateState(nextState, shouldNotify = true) {
    this.state = nextState, this._allKeys = null;
  }
  getStateIfChanged(props = this.props, state = this.state, parentManager = this.parentManager) {
    const _ = this.getState(props, parentManager);
    if (state && state !== emptyState && !_) return parentManager == null ? void 0 : parentManager.state;
    if (this.getStateShouldChange(_, state)) return _;
  }
  getStateShouldChange(nextState, state = this.state) {
    return !(!(nextState == null ? void 0 : nextState.theme) || nextState.theme === (state == null ? void 0 : state.theme));
  }
  getState(props = this.props, parentManager = this.parentManager) {
    return getState(props, parentManager) || null;
  }
  get allKeys() {
    var _a2;
    return this._allKeys || (this._allKeys = /* @__PURE__ */ new Set([...((_a2 = this.parentManager) == null ? void 0 : _a2.allKeys) || [], ...Object.keys(this.state.theme || {})])), this._allKeys;
  }
  notify(forced = false) {
    this.themeListeners.forEach((cb) => cb(this.state.name, this, forced));
  }
  selfUpdate() {
    var _a2;
    (_a2 = this._selfListener) == null ? void 0 : _a2.call(this, this.state.name, this, "self");
  }
  onChangeTheme(cb, debugId) {
    return debugId === true && (this._selfListener = cb), this.themeListeners.add(cb), () => {
      this.themeListeners.delete(cb);
    };
  }
}
function getState(props, manager) {
  var _a2, _b;
  if (props.name && props.reset) throw new Error("❌004");
  if (!getHasThemeUpdatingProps(props)) return null;
  const themes = getThemes(), [allManagers, componentManagers] = getManagers(manager), isDirectParentAComponentTheme = !!(manager == null ? void 0 : manager.state.isComponent), startIndex = props.reset && !isDirectParentAComponentTheme ? 1 : 0;
  let baseManager = allManagers[startIndex], parentManager = allManagers[startIndex + 1];
  if (!baseManager && props.reset) return null;
  const {
    componentName
  } = props;
  let result = null, baseName = (baseManager == null ? void 0 : baseManager.state.name) || "";
  (baseManager == null ? void 0 : baseManager.state.isComponent) && (baseName = baseName.replace(/_[A-Z][A-Za-z]+/, ""));
  const nextName = props.reset ? baseName : props.name || "", allComponentThemes = componentManagers.map((x) => (x == null ? void 0 : x.state.name) || "");
  isDirectParentAComponentTheme && allComponentThemes.shift();
  const base = baseName.split(THEME_NAME_SEPARATOR), max = base.length, min = props.componentName && !nextName ? max : 0;
  for (let i = max; i >= min; i--) {
    let prefix = base.slice(0, i).join(THEME_NAME_SEPARATOR);
    props.inverse && (prefix = inverseThemeName(prefix));
    let potentials = [];
    if (prefix && prefix !== baseName && prefix.includes(nextName) && potentials.push(prefix), nextName && potentials.unshift(prefix ? `${prefix}_${nextName}` : nextName), i === 1) {
      const lastSegment = potentials.findIndex((x) => !x.includes("_"));
      lastSegment > 0 && potentials.splice(lastSegment, 0, nextName);
    }
    if (componentName && !props.reset) {
      const baseLen = base.length;
      let componentPotentials = [];
      if (nextName && baseLen > 1) {
        const beforeSeparator = base[0];
        componentPotentials.push(`${beforeSeparator}_${nextName}_${componentName}`);
      }
      if (componentPotentials.push(`${prefix}_${componentName}`), nextName) {
        if (i > baseLen) {
          const prefixLessOne = base.slice(0, i - 1).join(THEME_NAME_SEPARATOR);
          if (prefixLessOne) {
            const lessSpecific = `${prefixLessOne}_${nextName}_${componentName}`;
            componentPotentials.unshift(lessSpecific);
          }
        }
        const moreSpecific = `${prefix}_${nextName}_${componentName}`;
        componentPotentials.unshift(moreSpecific);
      }
      potentials = [...componentPotentials, ...potentials, ...allComponentThemes];
    }
    const found = potentials.find((t) => t in themes);
    if (found) {
      const names = found.split("_"), [firstName, ...restNames] = names, lastName = names[names.length - 1], isComponent = lastName[0] === lastName[0].toUpperCase(), scheme = firstName === "light" ? "light" : firstName === "dark" ? "dark" : void 0, pre = THEME_CLASSNAME_PREFIX, className = `${pre}sub_theme ${pre}${!scheme || !restNames.length ? firstName : restNames.join("_")}`, parentName = (_b = (_a2 = baseManager || parentManager) == null ? void 0 : _a2.state) == null ? void 0 : _b.name;
      result = {
        name: found,
        parentName,
        theme: themes[found],
        className,
        isComponent,
        isSchemeFixed: props.name === "light" || props.name === "dark",
        scheme
      };
      break;
    }
  }
  return result;
}
const inverseThemeName = (themeName) => themeName.startsWith("light") ? themeName.replace(/^light/, "dark") : themeName.replace(/^dark/, "light");
function getManagers(themeManager) {
  const comp = [], all2 = [];
  let cur = themeManager;
  for (; cur; ) all2.push(cur), cur.state.isComponent && comp.push(cur), cur = cur.parentManager;
  return [all2, comp];
}
const ThemeManagerIDContext = React__default.createContext(1);
const callImmediate = (cb) => cb();
function createShallowSetState(setter, isDisabled2, transition, debug) {
  return (next) => {
    callImmediate(() => {
      setter((prev) => mergeIfNotShallowEqual(prev, next, isDisabled2));
    });
  };
}
function mergeIfNotShallowEqual(prev, next, isDisabled2, debug) {
  if (isDisabled2 || !prev || !next || isEqualShallow(prev, next)) return prev || next;
  return {
    ...prev,
    ...next
  };
}
function isEqualShallow(prev, next) {
  for (const key in next) if (prev[key] !== next[key]) return false;
  return true;
}
const emptyProps = {
  name: null
};
let cached;
function getDefaultThemeProxied() {
  if (cached) return cached;
  const config = getConfig(), name = config.themes.light ? "light" : Object.keys(config.themes)[0], defaultTheme = config.themes[name];
  return cached = getThemeProxied({
    theme: defaultTheme,
    name
  }), cached;
}
const useTheme = (props = emptyProps) => {
  const [_, theme] = useThemeWithState(props);
  return theme || getDefaultThemeProxied();
}, useThemeWithState = (props) => {
  const keys = React__default.useRef([]), changedThemeState = useChangeThemeEffect(props, false, keys.current, isServer ? void 0 : () => {
    var _a2;
    const next = ((_a2 = props.shouldUpdate) == null ? void 0 : _a2.call(props)) ?? (keys.current.length > 0 ? true : void 0);
    return next;
  }), {
    themeManager,
    state
  } = changedThemeState;
  const themeProxied = React__default.useMemo(() => (keys.current = [], !themeManager || !(state == null ? void 0 : state.theme) ? {} : getThemeProxied(state, props.deopt, themeManager, keys.current, props.debug)), [state == null ? void 0 : state.theme, themeManager, props.deopt, props.debug]);
  return [changedThemeState, themeProxied];
};
function getThemeProxied({
  theme,
  name,
  scheme
}, deopt = false, themeManager, keys, debug) {
  if (!theme) return {};
  getConfig();
  function track(key) {
    keys && !keys.includes(key) && (keys.length || setTimeout(() => {
      themeManager == null ? void 0 : themeManager.selfUpdate();
    }), keys.push(key), false);
  }
  return new Proxy(theme, {
    has(_, key) {
      if (Reflect.has(theme, key)) return true;
      if (typeof key == "string") return key[0] === "$" && (key = key.slice(1)), themeManager == null ? void 0 : themeManager.allKeys.has(key);
    },
    get(_, key) {
      if (
        // dont ask me, idk why but on hermes you can see that useTheme()[undefined] passes in STRING undefined to proxy
        // if someone is crazy enough to use "undefined" as a theme key then this not working is on them
        key !== "undefined" && typeof key == "string"
      ) {
        const keyString = key[0] === "$" ? key.slice(1) : key, val = theme[keyString];
        if (val && typeof val == "object") return new Proxy(val, {
          // when they touch the actual value we only track it
          // if its a variable (web), its ignored!
          get(_2, subkey) {
            if (subkey === "val") globalThis.tamaguiAvoidTracking || track(keyString);
            else if (subkey === "get") return (platform) => getVariable(val);
            return Reflect.get(val, subkey);
          }
        });
      }
      return Reflect.get(_, key);
    }
  });
}
const activeThemeManagers = /* @__PURE__ */ new Set(), _uidToManager = /* @__PURE__ */ new WeakMap(), _idToUID = {}, getId = (id) => _idToUID[id], getThemeManager = (id) => _uidToManager.get(getId(id)), registerThemeManager = (t) => {
  if (!_idToUID[t.id]) {
    const id = _idToUID[t.id] = {};
    _uidToManager.set(id, t);
  }
}, useChangeThemeEffect = (props, isRoot = false, keys, shouldUpdate) => {
  const {
    disable
  } = props, parentManagerId = React__default.useContext(ThemeManagerIDContext), parentManager = getThemeManager(parentManagerId);
  if (!isRoot && !parentManager || disable) return {
    isNewTheme: false,
    state: parentManager == null ? void 0 : parentManager.state,
    themeManager: parentManager
  };
  const [themeState, setThemeState] = React__default.useState(createState), {
    state,
    mounted,
    isNewTheme,
    themeManager,
    prevState
  } = themeState, isInversingOnMount = !!(!themeState.mounted && props.inverse);
  function getShouldUpdateTheme(manager = themeManager, nextState, prevState2 = state, forceShouldChange = false) {
    const forceUpdate = shouldUpdate == null ? void 0 : shouldUpdate();
    if (!manager || !forceShouldChange && forceUpdate === false) return;
    const next = nextState || manager.getState(props, parentManager);
    if (forceShouldChange) return next;
    if (next && !(forceUpdate !== true && !manager.getStateShouldChange(next, prevState2))) return next;
  }
  if (isServer || (React__default.useLayoutEffect(() => {
    themeManager && state && prevState && state !== prevState && themeManager.notify();
  }, [state]), React__default.useEffect(() => {
    if (!themeManager) return;
    if (props.inverse && !mounted) {
      setThemeState((prev) => createState({
        ...prev,
        mounted: true
      }));
      return;
    }
    (isNewTheme || getShouldUpdateTheme(themeManager)) && (activeThemeManagers.add(themeManager), setThemeState(createState));
    const selfListenerDispose = themeManager.onChangeTheme((_a2, _b, forced) => {
      forced && setThemeState((prev) => createState(prev, forced !== "self"));
    }, true), disposeChangeListener = parentManager == null ? void 0 : parentManager.onChangeTheme((name, manager, forced) => {
      const force = forced || (shouldUpdate == null ? void 0 : shouldUpdate()) || props.deopt || void 0, shouldTryUpdate = force ?? !!((keys == null ? void 0 : keys.length) || isNewTheme);
      shouldTryUpdate && setThemeState((prev) => createState(prev, force));
    }, themeManager.id);
    return () => {
      selfListenerDispose(), disposeChangeListener == null ? void 0 : disposeChangeListener(), isNewTheme && activeThemeManagers.delete(themeManager);
    };
  }, [themeManager, parentManager, isNewTheme, props.componentName, props.inverse, props.name, props.reset, mounted]), false), isInversingOnMount) return {
    isNewTheme: false,
    inversed: false,
    themeManager: parentManager,
    state: {
      name: "",
      ...parentManager == null ? void 0 : parentManager.state,
      className: ""
    }
  };
  return {
    state,
    isNewTheme,
    inversed: !!props.inverse,
    themeManager
  };
  function createState(prev, force = false) {
    if (prev && (shouldUpdate == null ? void 0 : shouldUpdate()) === false && !force) return prev;
    let themeManager2 = parentManager, state2;
    if (getHasThemeUpdatingProps(props)) {
      const getNewThemeManager = () => new ThemeManager(props, isRoot ? "root" : parentManager);
      if (prev == null ? void 0 : prev.themeManager) {
        themeManager2 = prev.themeManager;
        const forceChange = force || !!(keys == null ? void 0 : keys.length), next = themeManager2.getState(props, parentManager), nextState = getShouldUpdateTheme(themeManager2, next, prev.state, forceChange);
        nextState ? (state2 = nextState, !prev.isNewTheme && !isRoot ? themeManager2 = getNewThemeManager() : themeManager2.updateState(nextState)) : prev.isNewTheme && parentManager && !next && (themeManager2 = parentManager);
      } else themeManager2 = getNewThemeManager(), state2 = {
        ...themeManager2.state
      };
    }
    const isNewTheme2 = !!(themeManager2 !== parentManager || props.inverse);
    isNewTheme2 && registerThemeManager(themeManager2);
    const mounted2 = !getSetting("disableSSR") ? isRoot || (prev == null ? void 0 : prev.mounted) : true;
    state2 || (isNewTheme2 ? state2 = themeManager2.state : (state2 = parentManager.state, themeManager2 = parentManager));
    const response = {
      themeManager: themeManager2,
      isNewTheme: isNewTheme2,
      mounted: mounted2,
      inversed: props.inverse
    }, shouldReturnPrev = prev && !force && // isEqualShallow uses the second arg as the keys so this should compare without state first...
    isEqualShallow(prev, response) && // ... and then compare just the state, because we make a new state obj but is likely the same
    isEqualShallow(prev.state, state2);
    if (prev && shouldReturnPrev) return prev;
    if (response.state = state2, response.prevState = prev == null ? void 0 : prev.state, false) ;
    return response;
  }
};
function setRef(ref, value) {
  typeof ref == "function" ? ref(value) : ref && (ref.current = value);
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}
function objectIdentityKey(obj) {
  let k = "";
  for (const key in obj) {
    k += key;
    const arg = obj[key];
    let type = typeof arg;
    if (!arg || type !== "object" && type !== "function") k += type + arg;
    else if (cache$2.has(arg)) k += cache$2.get(arg);
    else {
      let v = Math.random();
      cache$2.set(arg, v), k += v;
    }
  }
  return k;
}
const cache$2 = /* @__PURE__ */ new WeakMap();
function createStyledContext(defaultValues) {
  const OGContext = React__default.createContext(defaultValues), OGProvider = OGContext.Provider, Context = OGContext, scopedContexts = /* @__PURE__ */ new Map();
  function getOrCreateScopedContext(scope) {
    let ScopedContext = scopedContexts.get(scope);
    return ScopedContext || (ScopedContext = React__default.createContext(defaultValues), scopedContexts.set(scope, ScopedContext)), ScopedContext;
  }
  const Provider = ({
    children,
    scope,
    ...values
  }) => {
    const next = React__default.useMemo(() => ({
      // this ! is a workaround for ts error
      ...defaultValues,
      ...values
    }), [objectIdentityKey(values)]);
    let Provider2 = OGProvider;
    return scope && (Provider2 = getOrCreateScopedContext(scope).Provider), /* @__PURE__ */ jsx(Provider2, {
      value: next,
      children
    });
  }, useStyledContext = (scope) => {
    const context = scope ? getOrCreateScopedContext(scope) : OGContext;
    return React__default.useContext(context);
  };
  return Context.Provider = Provider, Context.props = defaultValues, Context.context = OGContext, Context.useStyledContext = useStyledContext, Context;
}
const ComponentContext = createStyledContext({
  disableSSR: void 0,
  inText: false,
  language: null,
  animationDriver: null,
  groups: {
    emit: null,
    subscribe: null,
    state: {}
  }
});
const defaultComponentState = {
  hover: false,
  press: false,
  pressIn: false,
  focus: false,
  focusVisible: false,
  unmounted: true,
  disabled: false
}, defaultComponentStateMounted = {
  ...defaultComponentState,
  unmounted: false
};
const accessibilityDirectMap = {};
{
  const items = {
    Hidden: true,
    ActiveDescendant: true,
    Atomic: true,
    AutoComplete: true,
    Busy: true,
    Checked: true,
    ColumnCount: "colcount",
    ColumnIndex: "colindex",
    ColumnSpan: "colspan",
    Current: true,
    Details: true,
    ErrorMessage: true,
    Expanded: true,
    HasPopup: true,
    Invalid: true,
    Label: true,
    Level: true,
    Modal: true,
    Multiline: true,
    MultiSelectable: true,
    Orientation: true,
    Owns: true,
    Placeholder: true,
    PosInSet: true,
    Pressed: true,
    RoleDescription: true,
    RowCount: true,
    RowIndex: true,
    RowSpan: true,
    Selected: true,
    SetSize: true,
    Sort: true,
    ValueMax: true,
    ValueMin: true,
    ValueNow: true,
    ValueText: true
  };
  for (const key in items) {
    let val = items[key];
    val === true && (val = key.toLowerCase()), accessibilityDirectMap[`accessibility${key}`] = `aria-${val}`;
  }
}
function getGroupPropParts(groupProp) {
  const mediaQueries = getMedia(), [_, name, part3, part4] = groupProp.split("-");
  let pseudo;
  const media = part3 in mediaQueries ? part3 : void 0;
  return media ? pseudo = part4 : pseudo = part3, {
    name,
    pseudo,
    media
  };
}
const MEDIA_SEP = "_";
let prefixes = null, selectors = null;
const groupPseudoToPseudoCSSMap = {
  press: "active"
}, specificities = new Array(5).fill(0).map((_, i) => new Array(i).fill(":root").join(""));
function getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme = false, precedenceImportancePrefix = "") {
  const selectorStart = styleInner.lastIndexOf(":root") + 5, selectorEnd = styleInner.lastIndexOf("{"), selector = styleInner.slice(selectorStart, selectorEnd), precedenceSpace = getSetting("themeClassNameOnRoot") && isTheme ? "" : " ", pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0, pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "", presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`, mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [selector, `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`];
}
const createMediaStyle = (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) => {
  const [property, , identifier, pseudoIn, rules] = styleObject, enableMediaPropOrder = getSetting("mediaPropOrder"), isTheme = type === "theme", isPlatform = type === "platform", isGroup = type === "group", isNonWindowMedia = isTheme || isPlatform || isGroup, negKey = "", ogPrefix = identifier.slice(0, identifier.indexOf("-") + 1), id = `${ogPrefix}${MEDIA_SEP}${mediaKeyIn.replace("-", "")}${negKey}${MEDIA_SEP}`;
  let styleRule = "", groupPriority = "", groupMediaKey, containerName, nextIdentifier = identifier.replace(ogPrefix, id), styleInner = rules.map((rule) => rule.replace(identifier, nextIdentifier)).join(";"), isHover = false;
  if (isNonWindowMedia) {
    let specificity = (priority || 0) + (isGroup || isPlatform ? 1 : 0);
    if (isTheme || isGroup) {
      const groupParts = getGroupPropParts(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn), {
        name,
        media,
        pseudo
      } = groupParts;
      groupMediaKey = media, isGroup && (containerName = name), (pseudo === "press" || pseudoIn === "active") && (specificity += 2), pseudo === "hover" && (isHover = true);
      const [selector, nextSelector] = getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme, specificities[specificity]);
      styleRule = styleInner.replace(selector, nextSelector);
    } else styleRule = `${specificities[specificity]}${styleInner}`;
  }
  if (!isNonWindowMedia || groupMediaKey) {
    if (!selectors) {
      const mediaKeys2 = Object.keys(mediaQueries);
      selectors = Object.fromEntries(mediaKeys2.map((key) => [key, mediaObjectToString(mediaQueries[key])])), enableMediaPropOrder || (prefixes = Object.fromEntries(mediaKeys2.map((k, index2) => [k, new Array(index2 + 1).fill(":root").join("")])));
    }
    const mediaKey = groupMediaKey || mediaKeyIn, mediaSelector = selectors[mediaKey], mediaQuery = `${""}${mediaSelector}`, precedenceImportancePrefix = groupMediaKey ? groupPriority : enableMediaPropOrder && priority ? (
      // this new array should be cached
      specificities[priority]
    ) : (
      // @ts-ignore
      prefixes[mediaKey]
    ), prefix = groupMediaKey ? `@container ${containerName}` : "@media";
    groupMediaKey && (styleInner = styleRule), styleInner.includes(prefix) ? styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace("and screen and", "and") : styleRule = `${prefix} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`, groupMediaKey && (styleRule = `@supports (contain: ${getSetting("webContainerType") || "inline-size"}) {${styleRule}}`);
  }
  return isHover && (styleRule = `@media (hover:hover){${styleRule}}`), [property, void 0, nextIdentifier, void 0, [styleRule]];
};
const defaultOffset = {
  height: 0,
  width: 0
};
var normalizeColor_1;
var hasRequiredNormalizeColor;
function requireNormalizeColor() {
  if (hasRequiredNormalizeColor) return normalizeColor_1;
  hasRequiredNormalizeColor = 1;
  function normalizeColor2(color) {
    if (typeof color === "number") {
      if (color >>> 0 === color && color >= 0 && color <= 4294967295) {
        return color;
      }
      return null;
    }
    if (typeof color !== "string") {
      return null;
    }
    const matchers = getMatchers();
    let match;
    if (match = matchers.hex6.exec(color)) {
      return parseInt(match[1] + "ff", 16) >>> 0;
    }
    const colorFromKeyword = normalizeKeyword(color);
    if (colorFromKeyword != null) {
      return colorFromKeyword;
    }
    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 | // r
      parse255(match[2]) << 16 | // g
      parse255(match[3]) << 8 | // b
      255) >>> // a
      0;
    }
    if (match = matchers.rgba.exec(color)) {
      if (match[6] !== void 0) {
        return (parse255(match[6]) << 24 | // r
        parse255(match[7]) << 16 | // g
        parse255(match[8]) << 8 | // b
        parse1(match[9])) >>> // a
        0;
      }
      return (parse255(match[2]) << 24 | // r
      parse255(match[3]) << 16 | // g
      parse255(match[4]) << 8 | // b
      parse1(match[5])) >>> // a
      0;
    }
    if (match = matchers.hex3.exec(color)) {
      return parseInt(
        match[1] + match[1] + // r
        match[2] + match[2] + // g
        match[3] + match[3] + // b
        "ff",
        // a
        16
      ) >>> 0;
    }
    if (match = matchers.hex8.exec(color)) {
      return parseInt(match[1], 16) >>> 0;
    }
    if (match = matchers.hex4.exec(color)) {
      return parseInt(
        match[1] + match[1] + // r
        match[2] + match[2] + // g
        match[3] + match[3] + // b
        match[4] + match[4],
        // a
        16
      ) >>> 0;
    }
    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(
        parse360(match[1]),
        // h
        parsePercentage(match[2]),
        // s
        parsePercentage(match[3])
        // l
      ) | 255) >>> // a
      0;
    }
    if (match = matchers.hsla.exec(color)) {
      if (match[6] !== void 0) {
        return (hslToRgb(
          parse360(match[6]),
          // h
          parsePercentage(match[7]),
          // s
          parsePercentage(match[8])
          // l
        ) | parse1(match[9])) >>> // a
        0;
      }
      return (hslToRgb(
        parse360(match[2]),
        // h
        parsePercentage(match[3]),
        // s
        parsePercentage(match[4])
        // l
      ) | parse1(match[5])) >>> // a
      0;
    }
    if (match = matchers.hwb.exec(color)) {
      return (hwbToRgb(
        parse360(match[1]),
        // h
        parsePercentage(match[2]),
        // w
        parsePercentage(match[3])
        // b
      ) | 255) >>> // a
      0;
    }
    return null;
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }
  function hwbToRgb(h, w, b) {
    if (w + b >= 1) {
      const gray = Math.round(w * 255 / (w + b));
      return gray << 24 | gray << 16 | gray << 8;
    }
    const red = hue2rgb(0, 1, h + 1 / 3) * (1 - w - b) + w;
    const green = hue2rgb(0, 1, h) * (1 - w - b) + w;
    const blue = hue2rgb(0, 1, h - 1 / 3) * (1 - w - b) + w;
    return Math.round(red * 255) << 24 | Math.round(green * 255) << 16 | Math.round(blue * 255) << 8;
  }
  const NUMBER = "[-+]?\\d*\\.?\\d+";
  const PERCENTAGE = NUMBER + "%";
  function call(...args) {
    return "\\(\\s*(" + args.join(")\\s*,?\\s*(") + ")\\s*\\)";
  }
  function callWithSlashSeparator(...args) {
    return "\\(\\s*(" + args.slice(0, args.length - 1).join(")\\s*,?\\s*(") + ")\\s*/\\s*(" + args[args.length - 1] + ")\\s*\\)";
  }
  function commaSeparatedCall(...args) {
    return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  let cachedMatchers;
  function getMatchers() {
    if (cachedMatchers === void 0) {
      cachedMatchers = {
        rgb: new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER)),
        rgba: new RegExp(
          "rgba(" + commaSeparatedCall(NUMBER, NUMBER, NUMBER, NUMBER) + "|" + callWithSlashSeparator(NUMBER, NUMBER, NUMBER, NUMBER) + ")"
        ),
        hsl: new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hsla: new RegExp(
          "hsla(" + commaSeparatedCall(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + "|" + callWithSlashSeparator(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + ")"
        ),
        hwb: new RegExp("hwb" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/
      };
    }
    return cachedMatchers;
  }
  function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0) {
      return 0;
    }
    if (int > 255) {
      return 255;
    }
    return int;
  }
  function parse360(str) {
    const int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = parseFloat(str);
    if (num < 0) {
      return 0;
    }
    if (num > 1) {
      return 255;
    }
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    const int = parseFloat(str);
    if (int < 0) {
      return 0;
    }
    if (int > 100) {
      return 1;
    }
    return int / 100;
  }
  function normalizeKeyword(name) {
    switch (name) {
      case "transparent":
        return 0;
      // http://www.w3.org/TR/css3-color/#svg-color
      case "aliceblue":
        return 4042850303;
      case "antiquewhite":
        return 4209760255;
      case "aqua":
        return 16777215;
      case "aquamarine":
        return 2147472639;
      case "azure":
        return 4043309055;
      case "beige":
        return 4126530815;
      case "bisque":
        return 4293182719;
      case "black":
        return 255;
      case "blanchedalmond":
        return 4293643775;
      case "blue":
        return 65535;
      case "blueviolet":
        return 2318131967;
      case "brown":
        return 2771004159;
      case "burlywood":
        return 3736635391;
      case "burntsienna":
        return 3934150143;
      case "cadetblue":
        return 1604231423;
      case "chartreuse":
        return 2147418367;
      case "chocolate":
        return 3530104575;
      case "coral":
        return 4286533887;
      case "cornflowerblue":
        return 1687547391;
      case "cornsilk":
        return 4294499583;
      case "crimson":
        return 3692313855;
      case "cyan":
        return 16777215;
      case "darkblue":
        return 35839;
      case "darkcyan":
        return 9145343;
      case "darkgoldenrod":
        return 3095792639;
      case "darkgray":
        return 2846468607;
      case "darkgreen":
        return 6553855;
      case "darkgrey":
        return 2846468607;
      case "darkkhaki":
        return 3182914559;
      case "darkmagenta":
        return 2332068863;
      case "darkolivegreen":
        return 1433087999;
      case "darkorange":
        return 4287365375;
      case "darkorchid":
        return 2570243327;
      case "darkred":
        return 2332033279;
      case "darksalmon":
        return 3918953215;
      case "darkseagreen":
        return 2411499519;
      case "darkslateblue":
        return 1211993087;
      case "darkslategray":
        return 793726975;
      case "darkslategrey":
        return 793726975;
      case "darkturquoise":
        return 13554175;
      case "darkviolet":
        return 2483082239;
      case "deeppink":
        return 4279538687;
      case "deepskyblue":
        return 12582911;
      case "dimgray":
        return 1768516095;
      case "dimgrey":
        return 1768516095;
      case "dodgerblue":
        return 512819199;
      case "firebrick":
        return 2988581631;
      case "floralwhite":
        return 4294635775;
      case "forestgreen":
        return 579543807;
      case "fuchsia":
        return 4278255615;
      case "gainsboro":
        return 3705462015;
      case "ghostwhite":
        return 4177068031;
      case "gold":
        return 4292280575;
      case "goldenrod":
        return 3668254975;
      case "gray":
        return 2155905279;
      case "green":
        return 8388863;
      case "greenyellow":
        return 2919182335;
      case "grey":
        return 2155905279;
      case "honeydew":
        return 4043305215;
      case "hotpink":
        return 4285117695;
      case "indianred":
        return 3445382399;
      case "indigo":
        return 1258324735;
      case "ivory":
        return 4294963455;
      case "khaki":
        return 4041641215;
      case "lavender":
        return 3873897215;
      case "lavenderblush":
        return 4293981695;
      case "lawngreen":
        return 2096890111;
      case "lemonchiffon":
        return 4294626815;
      case "lightblue":
        return 2916673279;
      case "lightcoral":
        return 4034953471;
      case "lightcyan":
        return 3774873599;
      case "lightgoldenrodyellow":
        return 4210742015;
      case "lightgray":
        return 3553874943;
      case "lightgreen":
        return 2431553791;
      case "lightgrey":
        return 3553874943;
      case "lightpink":
        return 4290167295;
      case "lightsalmon":
        return 4288707327;
      case "lightseagreen":
        return 548580095;
      case "lightskyblue":
        return 2278488831;
      case "lightslategray":
        return 2005441023;
      case "lightslategrey":
        return 2005441023;
      case "lightsteelblue":
        return 2965692159;
      case "lightyellow":
        return 4294959359;
      case "lime":
        return 16711935;
      case "limegreen":
        return 852308735;
      case "linen":
        return 4210091775;
      case "magenta":
        return 4278255615;
      case "maroon":
        return 2147483903;
      case "mediumaquamarine":
        return 1724754687;
      case "mediumblue":
        return 52735;
      case "mediumorchid":
        return 3126187007;
      case "mediumpurple":
        return 2473647103;
      case "mediumseagreen":
        return 1018393087;
      case "mediumslateblue":
        return 2070474495;
      case "mediumspringgreen":
        return 16423679;
      case "mediumturquoise":
        return 1221709055;
      case "mediumvioletred":
        return 3340076543;
      case "midnightblue":
        return 421097727;
      case "mintcream":
        return 4127193855;
      case "mistyrose":
        return 4293190143;
      case "moccasin":
        return 4293178879;
      case "navajowhite":
        return 4292783615;
      case "navy":
        return 33023;
      case "oldlace":
        return 4260751103;
      case "olive":
        return 2155872511;
      case "olivedrab":
        return 1804477439;
      case "orange":
        return 4289003775;
      case "orangered":
        return 4282712319;
      case "orchid":
        return 3664828159;
      case "palegoldenrod":
        return 4008225535;
      case "palegreen":
        return 2566625535;
      case "paleturquoise":
        return 2951671551;
      case "palevioletred":
        return 3681588223;
      case "papayawhip":
        return 4293907967;
      case "peachpuff":
        return 4292524543;
      case "peru":
        return 3448061951;
      case "pink":
        return 4290825215;
      case "plum":
        return 3718307327;
      case "powderblue":
        return 2967529215;
      case "purple":
        return 2147516671;
      case "rebeccapurple":
        return 1714657791;
      case "red":
        return 4278190335;
      case "rosybrown":
        return 3163525119;
      case "royalblue":
        return 1097458175;
      case "saddlebrown":
        return 2336560127;
      case "salmon":
        return 4202722047;
      case "sandybrown":
        return 4104413439;
      case "seagreen":
        return 780883967;
      case "seashell":
        return 4294307583;
      case "sienna":
        return 2689740287;
      case "silver":
        return 3233857791;
      case "skyblue":
        return 2278484991;
      case "slateblue":
        return 1784335871;
      case "slategray":
        return 1887473919;
      case "slategrey":
        return 1887473919;
      case "snow":
        return 4294638335;
      case "springgreen":
        return 16744447;
      case "steelblue":
        return 1182971135;
      case "tan":
        return 3535047935;
      case "teal":
        return 8421631;
      case "thistle":
        return 3636451583;
      case "tomato":
        return 4284696575;
      case "turquoise":
        return 1088475391;
      case "violet":
        return 4001558271;
      case "wheat":
        return 4125012991;
      case "white":
        return 4294967295;
      case "whitesmoke":
        return 4126537215;
      case "yellow":
        return 4294902015;
      case "yellowgreen":
        return 2597139199;
    }
    return null;
  }
  normalizeColor_1 = normalizeColor2;
  return normalizeColor_1;
}
var normalizeColorExports = requireNormalizeColor();
const index = /* @__PURE__ */ getDefaultExportFromCjs(normalizeColorExports);
const normalizeColor$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [normalizeColorExports]);
const norm = index || normalizeColor$1, normalizeCSSColor = norm;
function rgba(colorInt) {
  const r = Math.round((colorInt & 4278190080) >>> 24), g = Math.round((colorInt & 16711680) >>> 16), b = Math.round((colorInt & 65280) >>> 8), a = ((colorInt & 255) >>> 0) / 255;
  return {
    r,
    g,
    b,
    a
  };
}
const normalizeColor = (color, opacity) => {
  if (color) {
    if (color[0] === "$") return color;
    if (color.startsWith("var(")) {
      if (typeof opacity == "number" && opacity < 1) return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
    } else {
      const rgba3 = getRgba(color);
      if (rgba3) {
        const colors = `${rgba3.r},${rgba3.g},${rgba3.b}`;
        return opacity === 1 ? `rgb(${colors})` : `rgba(${colors},${opacity ?? rgba3.a ?? 1})`;
      }
    }
    return color;
  }
}, getRgba = (color) => {
  const colorNum = normalizeCSSColor(color);
  if (colorNum != null) return rgba(colorNum);
};
function normalizeShadow({
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius
}) {
  var _a2;
  const {
    height,
    width
  } = shadowOffset || defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    shadowColor: normalizeColor(shadowColor, 1),
    shadowOpacity: shadowOpacity ?? (shadowColor ? (_a2 = getRgba(shadowColor)) == null ? void 0 : _a2.a : 1)
  };
}
function fixStyles(style) {
  var _a2;
  (style.shadowRadius != null || style.shadowColor || style.shadowOpacity != null || style.shadowOffset) && Object.assign(style, normalizeShadow(style));
  for (const key in borderDefaults) key in style && (style[_a2 = borderDefaults[key]] || (style[_a2] = "solid"));
}
const borderDefaults = {
  borderWidth: "borderStyle",
  borderBottomWidth: "borderBottomStyle",
  borderTopWidth: "borderTopStyle",
  borderLeftWidth: "borderLeftStyle",
  borderRightWidth: "borderRightStyle"
  // TODO: need to add borderBlock and borderInline here, but they are alot and might impact performance
};
const stylePropsAllPlusTransforms = {
  ...stylePropsAll,
  translateX: true,
  translateY: true
};
function normalizeValueWithProperty(value, property = "") {
  if (stylePropsUnitless[property] || property && !stylePropsAllPlusTransforms[property] || typeof value == "boolean") return value;
  let res = value;
  return value && typeof value == "object" ? value : (typeof value == "number" ? res = `${value}px` : property && (res = `${res}`), res);
}
const rcache = {};
function reverseMapClassNameToValue(key, className) {
  const cssRule = getAllSelectors()[className];
  if (rcache[cssRule]) return rcache[cssRule];
  if (!cssRule) {
    return;
  }
  const cssVal = cssRule.replace(/.*:/, "").replace(/;.*/, "").trim();
  let res;
  return cssVal.startsWith("var(") ? res = cssVal : stylePropsUnitless[key] ? res = +cssVal : cssVal.endsWith("px") ? res = +cssVal.replace("px", "") : res = cssVal, rcache[cssRule] = res, res;
}
function transformsToString(transforms) {
  return transforms.map(
    // { scale: 2 } => 'scale(2)'
    // { translateX: 20 } => 'translateX(20px)'
    // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
    (transform) => {
      const type = Object.keys(transform)[0], value = transform[type];
      return type === "matrix" || type === "matrix3d" ? `${type}(${value.join(",")})` : `${type}(${normalizeValueWithProperty(value, type)})`;
    }
  ).join(" ");
}
function getStylesAtomic(style) {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    if (key === "$$css") continue;
    const val = style[key];
    if (key in pseudoDescriptors) val && out.push(...getStyleAtomic(val, pseudoDescriptors[key]));
    else if (isMediaKey(key)) for (const subKey in val) {
      const so = getStyleObject(val, subKey);
      so && (so[0] = key, out.push(so));
    }
    else {
      const so = getStyleObject(style, key);
      so && out.push(so);
    }
  }
  return out;
}
const getStyleAtomic = (style, pseudo) => {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    const so = getStyleObject(style, key, pseudo);
    so && out.push(so);
  }
  return out;
};
let conf$1 = null;
const getStyleObject = (style, key, pseudo) => {
  let val = style[key];
  if (val == null) return;
  key === "transform" && Array.isArray(style.transform) && (val = transformsToString(val));
  const value = normalizeValueWithProperty(val, key), hash = simpleHash(typeof value == "string" ? value : `${value}`), pseudoPrefix = pseudo ? `0${pseudo.name}-` : "";
  conf$1 || (conf$1 = getConfigMaybe());
  const identifier = `_${(conf$1 == null ? void 0 : conf$1.inverseShorthands[key]) || key}-${pseudoPrefix}${hash}`, rules = createAtomicRules(identifier, key, value, pseudo);
  return [
    // array for performance
    key,
    value,
    identifier,
    pseudo == null ? void 0 : pseudo.name,
    rules
  ];
};
function styleToCSS(style) {
  const {
    shadowOffset,
    shadowRadius,
    shadowColor,
    shadowOpacity
  } = style;
  if (shadowRadius || shadowColor) {
    const offset = shadowOffset || defaultOffset, width = normalizeValueWithProperty(offset.width), height = normalizeValueWithProperty(offset.height), radius = normalizeValueWithProperty(shadowRadius), color = normalizeColor(shadowColor, shadowOpacity), shadow = `${width} ${height} ${radius} ${color}`;
    style.boxShadow = style.boxShadow ? `${style.boxShadow}, ${shadow}` : shadow, delete style.shadowOffset, delete style.shadowRadius, delete style.shadowColor, delete style.shadowOpacity;
  }
  const {
    textShadowColor,
    textShadowOffset,
    textShadowRadius
  } = style;
  if (textShadowColor || textShadowOffset || textShadowRadius) {
    const {
      height,
      width
    } = textShadowOffset || defaultOffset, radius = textShadowRadius || 0, color = normalizeValueWithProperty(textShadowColor, "textShadowColor");
    if (color && (height !== 0 || width !== 0 || radius !== 0)) {
      const blurRadius = normalizeValueWithProperty(radius), offsetX = normalizeValueWithProperty(width), offsetY = normalizeValueWithProperty(height);
      style.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    }
    delete style.textShadowColor, delete style.textShadowOffset, delete style.textShadowRadius;
  }
}
function createDeclarationBlock(style, important = false) {
  let next = "";
  for (const [key, value] of style) next += `${hyphenateStyleName(key)}:${value}${important ? " !important" : ""};`;
  return `{${next}}`;
}
const hcache = {}, toHyphenLower = (match) => `-${match.toLowerCase()}`, hyphenateStyleName = (key) => {
  if (key in hcache) return hcache[key];
  const val = key.replace(/[A-Z]/g, toHyphenLower);
  return hcache[key] = val, val;
}, selectorPriority = (() => {
  const res = {};
  for (const key in pseudoDescriptors) {
    const pseudo = pseudoDescriptors[key];
    res[pseudo.name] = `${[...Array(pseudo.priority)].map(() => ":root").join("")} `;
  }
  return res;
})();
function createAtomicRules(identifier, property, value, pseudo) {
  const pseudoIdPostfix = pseudo ? pseudo.name === "disabled" ? "[aria-disabled]" : `:${pseudo.name}` : "", pseudoSelector = pseudo == null ? void 0 : pseudo.selector;
  let selector = pseudo ? pseudoSelector ? `${pseudoSelector} .${identifier}` : `${selectorPriority[pseudo.name]} .${identifier}${pseudoIdPostfix}` : `:root .${identifier}`;
  pseudoSelector === pseudoDescriptors.enterStyle.selector && (selector = `${selector}, .${identifier}${pseudoSelector}`);
  const important = !!pseudo;
  let rules = [];
  switch (property) {
    // Equivalent to using '::placeholder'
    case "placeholderTextColor": {
      const block = createDeclarationBlock([["color", value], ["opacity", 1]], important);
      rules.push(`${selector}::placeholder${block}`);
      break;
    }
    // all webkit prefixed rules
    case "backgroundClip":
    case "userSelect": {
      const webkitProperty = `Webkit${`${property[0].toUpperCase()}${property.slice(1)}`}`, block = createDeclarationBlock([[property, value], [webkitProperty, value]], important);
      rules.push(`${selector}${block}`);
      break;
    }
    // Polyfill for additional 'pointer-events' values
    case "pointerEvents": {
      let finalValue = value;
      value === "auto" || value === "box-only" ? (finalValue = "auto", value === "box-only" && rules.push(`${selector}>*${boxOnly}`)) : (value === "none" || value === "box-none") && (finalValue = "none", value === "box-none" && rules.push(`${selector}>*${boxNone}`));
      const block = createDeclarationBlock([["pointerEvents", finalValue]], true);
      rules.push(`${selector}${block}`);
      break;
    }
    default: {
      const block = createDeclarationBlock([[property, value]], important);
      rules.push(`${selector}${block}`);
      break;
    }
  }
  return (pseudo == null ? void 0 : pseudo.name) === "hover" && (rules = rules.map((r) => `@media (hover) {${r}}`)), rules;
}
const boxNone = createDeclarationBlock([["pointerEvents", "auto"]], true), boxOnly = createDeclarationBlock([["pointerEvents", "none"]], true);
function isActivePlatform(key) {
  if (!key.startsWith("$platform")) return true;
  const platform = key.slice(10);
  return (
    // web, ios, android
    platform === currentPlatform || // web, native
    platform === "web"
  );
}
function isActiveTheme(key, activeThemeName) {
  if (key.startsWith("$theme-")) return key.slice(7).startsWith(activeThemeName);
}
const webToNativeDynamicExpansion = {}, webToNativeExpansion = {};
const neg1Flex = [["flexGrow", 0], ["flexShrink", 1], ["flexBasis", "auto"]];
function expandStyle(key, value) {
  if (key === "flex") return value === -1 ? neg1Flex : [["flexGrow", value], ["flexShrink", 1], ["flexBasis", getConfig().settings.styleCompat === "react-native" ? 0 : "auto"]];
  switch (key) {
    case "textAlignVertical":
      return [["verticalAlign", value === "center" ? "middle" : value]];
    case "writingDirection":
      return [["direction", value]];
  }
  if (key in EXPANSIONS) return EXPANSIONS[key].map((key2) => [key2, value]);
  if (key in webToNativeExpansion) return webToNativeExpansion[key].map((key2) => [key2, value]);
  if (key in webToNativeDynamicExpansion) return webToNativeDynamicExpansion[key](value);
}
const all = ["Top", "Right", "Bottom", "Left"], horiz = ["Right", "Left"], vert = ["Top", "Bottom"], xy = ["X", "Y"], EXPANSIONS = {
  borderColor: ["TopColor", "RightColor", "BottomColor", "LeftColor"],
  borderRadius: ["TopLeftRadius", "TopRightRadius", "BottomRightRadius", "BottomLeftRadius"],
  borderWidth: ["TopWidth", "RightWidth", "BottomWidth", "LeftWidth"],
  margin: all,
  marginHorizontal: horiz,
  marginVertical: vert,
  overscrollBehavior: xy,
  padding: all,
  paddingHorizontal: horiz,
  paddingVertical: vert,
  ...{
    // react-native only supports borderStyle
    borderStyle: ["TopStyle", "RightStyle", "BottomStyle", "LeftStyle"],
    // react-native doesn't support X / Y
    overflow: xy
  }
};
for (const parent in EXPANSIONS) {
  const prefix = parent.slice(0, ((_a = /[A-Z]/.exec(parent)) == null ? void 0 : _a.index) ?? parent.length);
  EXPANSIONS[parent] = EXPANSIONS[parent].map((k) => `${prefix}${k}`);
}
const isObj = (x) => x && !Array.isArray(x) && typeof x == "object";
function normalizeStyle$1(style, disableNormalize = false) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in pseudoDescriptors || // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle$1(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : normalizeValueWithProperty(prop, key), out = expandStyle(key, value);
    out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
  }
  return fixStyles(res), res;
}
const cache$1 = /* @__PURE__ */ new WeakMap(), getVariantExtras = (styleState) => {
  if (cache$1.has(styleState)) return cache$1.get(styleState);
  const {
    props,
    conf: conf2,
    context,
    theme
  } = styleState;
  let fonts = conf2.fontsParsed;
  (context == null ? void 0 : context.language) && (fonts = getFontsForLanguage(conf2.fontsParsed, context.language));
  const next = {
    fonts,
    tokens: conf2.tokensParsed,
    theme,
    get fontFamily() {
      return getVariableValue(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || getVariableValue(styleState.conf.defaultFont);
    },
    get font() {
      return fonts[this.fontFamily] || (!props.fontFamily || props.fontFamily[0] === "$" ? fonts[styleState.conf.defaultFont] : void 0);
    },
    props
  };
  return cache$1.set(styleState, next), next;
}, fontLanguageCache = /* @__PURE__ */ new WeakMap();
function getFontsForLanguage(fonts, language) {
  if (fontLanguageCache.has(language)) return fontLanguageCache.get(language);
  const next = {
    ...fonts,
    ...Object.fromEntries(Object.entries(language).map(([name, lang]) => {
      if (lang === "default") return [];
      const langKey = `$${name}_${lang}`;
      return [`$${name}`, fonts[langKey]];
    }))
  };
  return fontLanguageCache.set(language, next), next;
}
const skipProps = {
  untilMeasured: 1,
  animation: 1,
  space: 1,
  animateOnly: 1,
  disableClassName: 1,
  debug: 1,
  componentName: 1,
  disableOptimization: 1,
  tag: 1,
  style: 1,
  // handled after loop so pseudos set usedKeys and override it if necessary
  group: 1,
  themeInverse: 1,
  animatePresence: 1
};
const propMapper = (key, value, styleState) => {
  var _a2;
  if (lastFontFamilyToken = null, key === "elevationAndroid") return;
  const {
    conf: conf2,
    styleProps,
    fontFamily,
    staticConfig
  } = styleState;
  if (value === "unset") {
    const unsetVal = (_a2 = conf2.unset) == null ? void 0 : _a2[key];
    if (unsetVal != null) value = unsetVal;
    else return;
  }
  styleProps.fallbackProps && (styleState.props = styleProps.fallbackProps);
  const {
    variants
  } = staticConfig;
  if (!styleProps.noExpand && variants && key in variants) {
    const variantValue = resolveVariants(key, value, styleProps, styleState, "");
    if (variantValue) return variantValue;
  }
  if (styleProps.disableExpandShorthands || key in conf2.shorthands && (key = conf2.shorthands[key]), value && (value[0] === "$" ? value = getTokenForKey(key, value, styleProps.resolveValues, styleState) : isVariable(value) && (value = resolveVariableValue(key, value, styleProps.resolveValues))), value != null) {
    const result = (styleProps.noExpand ? null : expandStyle(key, value)) || [[key, value]];
    return key === "fontFamily" && lastFontFamilyToken && fontFamilyCache.set(result, lastFontFamilyToken), result;
  }
}, resolveVariants = (key, value, styleProps, styleState, parentVariantKey) => {
  const {
    staticConfig,
    conf: conf2,
    debug
  } = styleState, {
    variants
  } = staticConfig;
  if (!variants) return;
  let variantValue = getVariantDefinition(variants[key], value, conf2);
  if (!variantValue) {
    if (process.env.TAMAGUI_WARN_ON_MISSING_VARIANT === "1" && typeof value != "boolean") {
      const name = staticConfig.componentName || "[UnnamedComponent]";
      console.warn(`No variant found: ${name} has variant "${key}", but no matching value "${value}"`);
    }
    return;
  }
  if (typeof variantValue == "function") {
    const fn = variantValue, extras = getVariantExtras(styleState);
    variantValue = fn(value, extras);
  }
  let fontFamilyResult;
  if (isObj(variantValue)) {
    const fontFamilyUpdate = variantValue.fontFamily || variantValue[conf2.inverseShorthands.fontFamily];
    fontFamilyUpdate && (fontFamilyResult = getFontFamilyFromNameOrVariable(fontFamilyUpdate, conf2), styleState.fontFamily = fontFamilyResult, false), variantValue = resolveTokensAndVariants(key, variantValue, styleProps, styleState, parentVariantKey);
  }
  if (variantValue) {
    const expanded = normalizeStyle$1(variantValue, !!styleProps.noNormalize);
    const next = Object.entries(expanded);
    return fontFamilyResult && fontFamilyResult[0] === "$" && fontFamilyCache.set(next, getVariableValue(fontFamilyResult)), next;
  }
};
function getFontFamilyFromNameOrVariable(input, conf2) {
  if (isVariable(input)) {
    const val = variableToFontNameCache.get(input);
    if (val) return val;
    for (const key in conf2.fontsParsed) {
      const familyVariable = conf2.fontsParsed[key].family;
      if (isVariable(familyVariable) && (variableToFontNameCache.set(familyVariable, key), familyVariable === input)) return key;
    }
  } else if (typeof input == "string" && input[0] === "$") return input;
}
const variableToFontNameCache = /* @__PURE__ */ new WeakMap(), fontFamilyCache = /* @__PURE__ */ new WeakMap(), getPropMappedFontFamily = (expanded) => expanded && fontFamilyCache.get(expanded), resolveTokensAndVariants = (key, value, styleProps, styleState, parentVariantKey) => {
  const {
    conf: conf2,
    staticConfig,
    debug,
    theme
  } = styleState, {
    variants
  } = staticConfig, res = {};
  for (const _key in value) {
    const subKey = conf2.shorthands[_key] || _key, val = value[_key];
    if (!(!styleProps.noSkip && subKey in skipProps)) {
      if (styleProps.noExpand) res[subKey] = val;
      else if (variants && subKey in variants) {
        if (parentVariantKey && parentVariantKey === key) res[subKey] = // SYNC WITH *1
        val[0] === "$" ? getTokenForKey(subKey, val, styleProps.resolveValues, styleState) : val;
        else {
          const variantOut = resolveVariants(subKey, val, styleProps, styleState, key);
          if (variantOut) for (const [key2, val2] of variantOut) val2 != null && (key2 in pseudoDescriptors ? (res[key2] ?? (res[key2] = {}), Object.assign(res[key2], val2)) : res[key2] = val2);
        }
        continue;
      }
      if (isVariable(val)) {
        res[subKey] = resolveVariableValue(subKey, val, styleProps.resolveValues);
        continue;
      }
      if (typeof val == "string") {
        const fVal = (
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps.resolveValues, styleState) : val
        );
        res[subKey] = fVal;
        continue;
      }
      if (isObj(val)) {
        const subObject = resolveTokensAndVariants(subKey, val, styleProps, styleState, key);
        res[subKey] ?? (res[subKey] = {}), Object.assign(res[subKey], subObject);
      } else res[subKey] = val;
    }
  }
  return res;
}, tokenCats = ["size", "color", "radius", "space", "zIndex"].map((name) => ({
  name,
  spreadName: `...${name}`
}));
function getVariantDefinition(variant, value, conf2) {
  if (typeof variant == "function") return variant;
  const exact = variant[value];
  if (exact) return exact;
  if (value != null) {
    const {
      tokensParsed
    } = conf2;
    for (const {
      name,
      spreadName
    } of tokenCats) if (spreadName in variant && value in tokensParsed[name]) return variant[spreadName];
    const fontSizeVariant = variant["...fontSize"];
    if (fontSizeVariant && conf2.fontSizeTokens.has(value)) return fontSizeVariant;
  }
  return variant[`:${typeof value}`] || variant["..."];
}
const fontShorthand = {
  fontSize: "size",
  fontWeight: "weight"
};
let lastFontFamilyToken = null;
const getTokenForKey = (key, value, resolveAs = "none", styleState) => {
  var _a2, _b, _c, _d;
  if (resolveAs === "none") return value;
  const {
    theme,
    conf: conf2 = getConfig(),
    context,
    fontFamily,
    staticConfig
  } = styleState, tokensParsed = conf2.tokensParsed;
  let valOrVar, hasSet = false;
  const customTokenAccept = (_a2 = staticConfig == null ? void 0 : staticConfig.accept) == null ? void 0 : _a2[key];
  if (customTokenAccept) {
    const val = (theme == null ? void 0 : theme[value]) ?? tokensParsed[customTokenAccept][value];
    val != null && (resolveAs = "value", valOrVar = val, hasSet = true);
  }
  if (theme && value in theme) valOrVar = theme[value], hasSet = true;
  else {
    if (value in conf2.specificTokens) hasSet = true, valOrVar = conf2.specificTokens[value];
    else {
      switch (key) {
        case "fontFamily": {
          valOrVar = ((_b = ((context == null ? void 0 : context.language) ? getFontsForLanguage(conf2.fontsParsed, context.language) : conf2.fontsParsed)[value]) == null ? void 0 : _b.family) || value, lastFontFamilyToken = value, hasSet = true;
          break;
        }
        case "fontSize":
        case "lineHeight":
        case "letterSpacing":
        case "fontWeight": {
          const fam = fontFamily || conf2.defaultFontToken;
          if (fam) {
            const fontsParsed = (context == null ? void 0 : context.language) ? getFontsForLanguage(conf2.fontsParsed, context.language) : conf2.fontsParsed;
            valOrVar = ((_d = (_c = fontsParsed[fam] || fontsParsed[conf2.defaultFontToken]) == null ? void 0 : _c[fontShorthand[key] || key]) == null ? void 0 : _d[value]) || value, hasSet = true;
          }
          break;
        }
      }
      for (const cat in tokenCategories) if (key in tokenCategories[cat]) {
        const res = tokensParsed[cat][value];
        res != null && (valOrVar = res, hasSet = true);
      }
    }
    if (!hasSet) {
      const spaceVar = tokensParsed.space[value];
      spaceVar != null && (valOrVar = spaceVar, hasSet = true);
    }
  }
  if (hasSet) {
    const out = resolveVariableValue(key, valOrVar, resolveAs);
    return out;
  }
};
function resolveVariableValue(key, valOrVar, resolveValues) {
  if (resolveValues === "none") return valOrVar;
  if (isVariable(valOrVar)) {
    if (resolveValues === "value") return valOrVar.val;
    const get = valOrVar == null ? void 0 : valOrVar.get;
    return typeof get == "function" ? get(resolveValues === "web" ? "web" : void 0) : valOrVar.variable;
  }
  return valOrVar;
}
const sortString = (a, b) => a < b ? -1 : a > b ? 1 : 0;
let conf;
const PROP_SPLIT = "-";
function isValidStyleKey(key, staticConfig) {
  var _a2;
  return (staticConfig.validStyles || (staticConfig.isText || staticConfig.isInput ? stylePropsText : validStyles))[key] || ((_a2 = staticConfig.accept) == null ? void 0 : _a2[key]);
}
const getSplitStyles = (props, staticConfig, theme, themeName, componentState, styleProps, parentSplitStyles, context, elementType, debug) => {
  var _a2, _b, _c, _d, _e, _f, _g;
  conf = conf || getConfig(), styleProps.isAnimated && conf.animations.isReactNative && !styleProps.noNormalize && (styleProps.noNormalize = "values");
  const {
    shorthands
  } = conf, {
    isHOC,
    isText,
    isInput,
    variants,
    isReactNative,
    inlineProps,
    inlineWhenUnflattened,
    parentStaticConfig,
    acceptsClassName
  } = staticConfig, viewProps = {}, mediaState$1 = styleProps.mediaState || mediaState, usedKeys = {}, shouldDoClasses = acceptsClassName && isWeb && !styleProps.noClass, rulesToInsert = {}, classNames = {}, transforms = {};
  let pseudos = null, space = props.space, hasMedia = false, dynamicThemeAccess, pseudoGroups, mediaGroups;
  props.className || "";
  let mediaStylesSeen = 0;
  const styleState = {
    classNames,
    conf,
    props,
    styleProps,
    componentState,
    staticConfig,
    style: null,
    theme,
    usedKeys,
    viewProps,
    context,
    debug
  };
  const {
    asChild
  } = props, {
    accept
  } = staticConfig, {
    noSkip,
    disableExpandShorthands,
    noExpand
  } = styleProps, {
    webContainerType
  } = conf.settings, parentVariants = parentStaticConfig == null ? void 0 : parentStaticConfig.variants;
  for (const keyOg in props) {
    let keyInit = keyOg, valInit = props[keyInit];
    if (accept) {
      const accepted = accept[keyInit];
      if ((accepted === "style" || accepted === "textStyle") && valInit && typeof valInit == "object") {
        viewProps[keyInit] = getSubStyle(styleState, keyInit, valInit, styleProps.noClass);
        continue;
      }
    }
    if (disableExpandShorthands || keyInit in shorthands && (keyInit = shorthands[keyInit]), keyInit === "className" || keyInit in usedKeys || asChild && webViewFlexCompatStyles[keyInit] === valInit) continue;
    if (keyInit in skipProps && !noSkip && !isHOC) {
      if (keyInit === "group") {
        const identifier = `t_group_${valInit}`, containerCSS = ["continer", void 0, identifier, void 0, [`.${identifier} { container-name: ${valInit}; container-type: ${webContainerType || "inline-size"}; }`]];
        addStyleToInsertRules(rulesToInsert, containerCSS);
      }
      continue;
    }
    const valInitType = typeof valInit, isValidStyleKeyInit = isValidStyleKey(keyInit, staticConfig);
    if (staticConfig.isReactNative && keyInit.startsWith("data-")) {
      keyInit = keyInit.replace("data-", ""), viewProps.dataSet || (viewProps.dataSet = {}), viewProps.dataSet[keyInit] = valInit;
      continue;
    }
    if (isValidStyleKeyInit && valInitType === "string" && valInit[0] === "_") {
      const isValidClassName = keyInit in validStyles, isMediaOrPseudo2 = !isValidClassName && // media are flattened for some reason to color-hover keys,
      // we should probably just leave them in place to avoid extra complexity
      keyInit.includes(PROP_SPLIT) && validStyles[keyInit.split(PROP_SPLIT)[0]];
      if (isValidClassName || isMediaOrPseudo2) {
        shouldDoClasses ? (mergeClassName(transforms, classNames, keyInit, valInit, isMediaOrPseudo2), styleState.style && delete styleState.style[keyInit]) : (styleState.style || (styleState.style = {}), styleState.style[keyInit] = reverseMapClassNameToValue(keyInit, valInit), delete classNames[keyInit]);
        continue;
      }
    }
    if (keyInit === "dataSet") {
      for (const keyInit2 in valInit) viewProps[`data-${hyphenate(keyInit2)}`] = valInit[keyInit2];
      continue;
    }
    if (!noExpand) {
      if (keyInit === "disabled" && valInit === true && (viewProps["aria-disabled"] = true, (elementType === "button" || elementType === "form" || elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.disabled = true), !(variants == null ? void 0 : variants.disabled))) continue;
      if (keyInit === "testID") {
        viewProps[isReactNative ? keyInit : "data-testid"] = valInit;
        continue;
      }
      if (keyInit === "id" || keyInit === "nativeID") {
        viewProps.id = valInit;
        continue;
      }
      let didUseKeyInit = false;
      if (isReactNative) {
        if (keyInit in accessibilityDirectMap || keyInit.startsWith("accessibility")) {
          viewProps[keyInit] = valInit;
          continue;
        }
      } else {
        if (didUseKeyInit = true, keyInit in accessibilityDirectMap) {
          viewProps[accessibilityDirectMap[keyInit]] = valInit;
          continue;
        }
        switch (keyInit) {
          case "accessibilityRole": {
            valInit === "none" ? viewProps.role = "presentation" : viewProps.role = accessibilityRoleToWebRole[valInit] || valInit;
            continue;
          }
          case "accessibilityLabelledBy":
          case "accessibilityFlowTo":
          case "accessibilityControls":
          case "accessibilityDescribedBy": {
            viewProps[`aria-${keyInit.replace("accessibility", "").toLowerCase()}`] = processIDRefList(valInit);
            continue;
          }
          case "accessibilityKeyShortcuts": {
            Array.isArray(valInit) && (viewProps["aria-keyshortcuts"] = valInit.join(" "));
            continue;
          }
          case "accessibilityLiveRegion": {
            viewProps["aria-live"] = valInit === "none" ? "off" : valInit;
            continue;
          }
          case "accessibilityReadOnly": {
            viewProps["aria-readonly"] = valInit, (elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.readOnly = true);
            continue;
          }
          case "accessibilityRequired": {
            viewProps["aria-required"] = valInit, (elementType === "input" || elementType === "select" || elementType === "textarea") && (viewProps.required = valInit);
            continue;
          }
          default:
            didUseKeyInit = false;
        }
      }
      if (didUseKeyInit) continue;
    }
    const isShorthand = keyInit in shorthands;
    let isVariant = !isValidStyleKeyInit && variants && keyInit in variants;
    const isStyleLikeKey = isShorthand || isValidStyleKeyInit || isVariant;
    let isPseudo = keyInit in validPseudoKeys, isMedia = !isStyleLikeKey && !isPseudo && isMediaKey(keyInit), isMediaOrPseudo = !!(isMedia || isPseudo);
    if (isMediaOrPseudo && keyInit.startsWith("$group-")) {
      const name = keyInit.split("-")[1];
      (context == null ? void 0 : context.groups.subscribe) && !(context == null ? void 0 : context.groups.state[name]) && (keyInit = keyInit.replace("$group-", "$group-true-"));
    }
    const isStyleProp = isValidStyleKeyInit || isMediaOrPseudo || isVariant && !noExpand || isShorthand;
    if (isStyleProp && (asChild === "except-style" || asChild === "except-style-web")) continue;
    const shouldPassProp = !isStyleProp && isHOC || // is in parent variants
    isHOC && parentVariants && keyInit in parentVariants || (inlineProps == null ? void 0 : inlineProps.has(keyInit)), parentVariant = parentVariants == null ? void 0 : parentVariants[keyInit], isHOCShouldPassThrough = !!(isHOC && (isShorthand || isValidStyleKeyInit || isMediaOrPseudo || parentVariant || keyInit in skipProps)), shouldPassThrough = shouldPassProp || isHOCShouldPassThrough;
    if (shouldPassThrough && (passDownProp(viewProps, keyInit, valInit, isMediaOrPseudo), !isVariant)) {
      continue;
    }
    if (!noSkip && keyInit in skipProps) {
      continue;
    }
    (isText || isInput) && valInit && (keyInit === "fontFamily" || keyInit === shorthands.fontFamily) && valInit in conf.fontsParsed && (styleState.fontFamily = valInit);
    const avoidPropMap = isMediaOrPseudo || !isVariant && !isValidStyleKeyInit, expanded = avoidPropMap ? null : propMapper(keyInit, valInit, styleState);
    if (!avoidPropMap) {
      if (!expanded) continue;
      const next = getPropMappedFontFamily(expanded);
      next && (styleState.fontFamily = next);
    }
    let key = keyInit, val = valInit;
    const max = expanded ? expanded.length : 1;
    for (let i = 0; i < max; i++) {
      if (expanded) {
        const [k, v] = expanded[i];
        key = k, val = v;
      }
      if (val == null || key in usedKeys) continue;
      if (isPseudo = key in validPseudoKeys, isMedia = !isPseudo && !isValidStyleKeyInit && isMediaKey(key), isMediaOrPseudo = !!(isMedia || isPseudo), isVariant = variants && key in variants, ((inlineProps == null ? void 0 : inlineProps.has(key)) || false === "is_static") && (viewProps[key] = props[key] ?? val), styleProps.noExpand && isPseudo || isHOC && (isMediaOrPseudo || ((_a2 = parentStaticConfig == null ? void 0 : parentStaticConfig.variants) == null ? void 0 : _a2[keyInit]))) {
        passDownProp(viewProps, key, val, isMediaOrPseudo);
        continue;
      }
      if (isPseudo) {
        if (!val) continue;
        const pseudoStyleObject = getSubStyle(styleState, key, val, styleProps.noClass), descriptor = pseudoDescriptors[key], isEnter = key === "enterStyle", isExit = key === "exitStyle";
        if (!descriptor) continue;
        if ((!shouldDoClasses || false === "is_static") && (pseudos || (pseudos = {}), pseudos[key] || (pseudos[key] = {}), false === "is_static")) {
          Object.assign(pseudos[key], pseudoStyleObject);
          continue;
        }
        if (shouldDoClasses && !isExit) {
          const pseudoStyles = getStyleAtomic(pseudoStyleObject, descriptor);
          for (const psuedoStyle of pseudoStyles) {
            const fullKey = `${psuedoStyle[StyleObjectProperty]}${PROP_SPLIT}${descriptor.name}`;
            fullKey in usedKeys || (addStyleToInsertRules(rulesToInsert, psuedoStyle), mergeClassName(transforms, classNames, fullKey, psuedoStyle[StyleObjectIdentifier], isMediaOrPseudo, true));
          }
        }
        if (!shouldDoClasses || isExit || isEnter) {
          const descriptorKey = descriptor.stateKey || descriptor.name;
          let isDisabled2 = componentState[descriptorKey] === false;
          isExit && (isDisabled2 = !styleProps.isExiting), isEnter && componentState.unmounted === false && (isDisabled2 = true);
          const importance = descriptor.priority;
          for (const pkey in pseudoStyleObject) {
            const val2 = pseudoStyleObject[pkey];
            if (isDisabled2) applyDefaultStyle(pkey, styleState);
            else {
              const curImportance = usedKeys[pkey] || 0, shouldMerge = importance >= curImportance;
              shouldMerge && (pseudos || (pseudos = {}), pseudos[key] || (pseudos[key] = {}), pseudos[key][pkey] = val2, mergeStyle(styleState, pkey, val2));
            }
          }
          if (!isDisabled2) for (const key2 in val) {
            const k = shorthands[key2] || key2;
            usedKeys[k] = Math.max(importance, usedKeys[k] || 0);
          }
        }
        continue;
      }
      if (isMedia) {
        if (!val) continue;
        const hasSpace = val.space, mediaKeyShort = key.slice(isMedia == "theme" ? 7 : 1);
        if (hasMedia || (hasMedia = true), (hasSpace || !shouldDoClasses || styleProps.willBeAnimated) && (typeof hasMedia != "object" && (hasMedia = {}), hasMedia[mediaKeyShort] = true), isMedia === "platform" && !isActivePlatform(key)) continue;
        if (shouldDoClasses) {
          const mediaStyle = getSubStyle(styleState, key, val, false);
          if (hasSpace && (delete mediaStyle.space, mediaState$1[mediaKeyShort])) {
            const importance = getMediaImportanceIfMoreImportant(mediaKeyShort, "space", usedKeys, true);
            importance && (space = val.space, usedKeys.space = importance, false);
          }
          const mediaStyles = getStylesAtomic(mediaStyle), priority = mediaStylesSeen;
          mediaStylesSeen += 1;
          for (const style of mediaStyles) {
            const property = style[0];
            if (property[0] === "$" && !isActivePlatform(property)) continue;
            const out = createMediaStyle(style, mediaKeyShort, mediaQueryConfig, isMedia, false, priority);
            const fullKey = `${style[StyleObjectProperty]}${PROP_SPLIT}${mediaKeyShort}${style[StyleObjectPseudo] || ""}`;
            fullKey in usedKeys || (addStyleToInsertRules(rulesToInsert, out), mergeClassName(transforms, classNames, fullKey, out[StyleObjectIdentifier], true, true));
          }
        } else {
          let mergeMediaStyle = function(key2, val2) {
            styleState.style || (styleState.style = {}), mergeMediaByImportance(styleState, mediaKeyShort, key2, val2, usedKeys, mediaState$1[mediaKeyShort], importanceBump) && key2 === "fontFamily" && (styleState.fontFamily = mediaStyle.fontFamily);
          };
          const isThemeMedia = isMedia === "theme", isGroupMedia = isMedia === "group";
          if (!isThemeMedia && !(isMedia === "platform") && !isGroupMedia) {
            if (!mediaState$1[mediaKeyShort]) {
              continue;
            }
          }
          const mediaStyle = getSubStyle(styleState, key, val, true);
          let importanceBump = 0;
          if (isThemeMedia) {
            if (dynamicThemeAccess = true, !(themeName === mediaKeyShort || themeName.startsWith(mediaKeyShort))) continue;
          } else if (isGroupMedia) {
            const groupInfo = getGroupPropParts(mediaKeyShort), groupName = groupInfo.name, groupContext = context == null ? void 0 : context.groups.state[groupName];
            if (!groupContext) {
              continue;
            }
            const groupPseudoKey = groupInfo.pseudo, groupMediaKey = groupInfo.media, componentGroupState = (_b = componentState.group) == null ? void 0 : _b[groupName];
            if (groupMediaKey) {
              mediaGroups || (mediaGroups = /* @__PURE__ */ new Set()), mediaGroups.add(groupMediaKey);
              const mediaState2 = componentGroupState == null ? void 0 : componentGroupState.media;
              let isActive = mediaState2 == null ? void 0 : mediaState2[groupMediaKey];
              if (!mediaState2 && groupContext.layout && (isActive = mediaKeyMatch(groupMediaKey, groupContext.layout)), !isActive) {
                for (const pkey in mediaStyle) applyDefaultStyle(pkey, styleState);
                continue;
              }
              importanceBump = 2;
            }
            if (groupPseudoKey) {
              pseudoGroups || (pseudoGroups = /* @__PURE__ */ new Set()), pseudoGroups.add(groupName);
              const isActive = (_c = (componentGroupState || // fallback to context initially
              context.groups.state[groupName]).pseudo) == null ? void 0 : _c[groupPseudoKey], priority = pseudoPriorities[groupPseudoKey];
              if (!isActive) {
                for (const pkey in mediaStyle) applyDefaultStyle(pkey, styleState);
                continue;
              }
              importanceBump = priority;
            }
          }
          for (const subKey in mediaStyle) {
            if (subKey === "space") {
              space = valInit.space;
              continue;
            }
            if (subKey[0] === "$") {
              if (!isActivePlatform(subKey) || !isActiveTheme(subKey, themeName)) continue;
              for (const subSubKey in mediaStyle[subKey]) mergeMediaStyle(subSubKey, mediaStyle[subKey][subSubKey]);
            } else mergeMediaStyle(subKey, mediaStyle[subKey]);
          }
        }
        continue;
      }
      if (
        // is HOC we can just pass through the styles as props
        // this fixes issues where style prop got merged with wrong priority
        !isHOC && isValidStyleKey(key, staticConfig)
      ) {
        mergeStyle(styleState, key, val);
        continue;
      }
      if (!isVariant) {
        if (styleProps.styledContextProps && key in styleProps.styledContextProps) continue;
        viewProps[key] = val;
      }
    }
  }
  if (!(styleProps.noNormalize === false) && (styleState.style && (fixStyles(styleState.style), !isReactNative && styleToCSS(styleState.style)), styleState.flatTransforms && (styleState.style || (styleState.style = {}), Object.entries(styleState.flatTransforms).sort(([a], [b]) => sortString(a, b)).forEach(([key, val]) => {
    mergeTransform(styleState.style, key, val, true);
  })), parentSplitStyles)) {
    if (shouldDoClasses) for (const key in parentSplitStyles.classNames) {
      const val = parentSplitStyles.classNames[key];
      styleState.style && key in styleState.style || key in classNames || (classNames[key] = val);
    }
    if (!shouldDoClasses) for (const key in parentSplitStyles.style) key in classNames || styleState.style && key in styleState.style || (styleState.style || (styleState.style = {}), styleState.style[key] = parentSplitStyles.style[key]);
  }
  if (!styleProps.noNormalize && !staticConfig.isReactNative && !staticConfig.isHOC && (!styleProps.isAnimated || conf.animations.supportsCSSVars) && Array.isArray((_d = styleState.style) == null ? void 0 : _d.transform) && (styleState.style.transform = transformsToString(styleState.style.transform)), styleState.style && shouldDoClasses) {
    let retainedStyles, shouldRetain = false;
    if (!styleState.style.$$css) {
      const atomic = getStylesAtomic(styleState.style);
      for (const atomicStyle of atomic) {
        const [key, value, identifier] = atomicStyle, isAnimatedAndAnimateOnly = styleProps.isAnimated && styleProps.noClass && ((_e = props.animateOnly) == null ? void 0 : _e.includes(key)), nonAnimatedAnimateOnly = !isAnimatedAndAnimateOnly && !styleProps.isAnimated && ((_f = props.animateOnly) == null ? void 0 : _f.includes(key));
        isAnimatedAndAnimateOnly ? (retainedStyles || (retainedStyles = {}), retainedStyles[key] = styleState.style[key]) : nonAnimatedAnimateOnly ? (retainedStyles || (retainedStyles = {}), retainedStyles[key] = value, shouldRetain = true) : (addStyleToInsertRules(rulesToInsert, atomicStyle), mergeClassName(transforms, classNames, key, identifier, false, true));
      }
      (shouldRetain || false !== "is_static") && (styleState.style = retainedStyles || {});
    }
    if (transforms) for (const namespace in transforms) {
      if (!transforms[namespace]) {
        continue;
      }
      const [hash, val] = transforms[namespace], identifier = `_transform${hash}`;
      if (isClient && !insertedTransforms[identifier]) {
        const rule = `.${identifier} { transform: ${val}; }`;
        addStyleToInsertRules(rulesToInsert, [namespace, val, identifier, void 0, [rule]]);
      }
      classNames[namespace] = identifier;
    }
  }
  if (isReactNative) viewProps.tabIndex === 0 && (viewProps.accessible ?? (viewProps.accessible = true));
  else if (viewProps.tabIndex == null) {
    const isFocusable = viewProps.focusable ?? viewProps.accessible;
    viewProps.focusable && delete viewProps.focusable;
    const role = viewProps.role;
    isFocusable === false && (viewProps.tabIndex = "-1"), // These native elements are focusable by default
    elementType === "a" || elementType === "button" || elementType === "input" || elementType === "select" || elementType === "textarea" ? (isFocusable === false || props.accessibilityDisabled === true) && (viewProps.tabIndex = "-1") : (
      // These roles are made focusable by default
      (role === "button" || role === "checkbox" || role === "link" || role === "radio" || // @ts-expect-error (consistent with RNW)
      role === "textbox" || role === "switch") && isFocusable !== false && (viewProps.tabIndex = "0")
    ), isFocusable && (viewProps.tabIndex = "0", delete viewProps.focusable);
  }
  const styleProp = props.style;
  if (styleProp) if (isHOC) viewProps.style = normalizeStyle(styleProp);
  else {
    const isArray = Array.isArray(styleProp), len = isArray ? styleProp.length : 1;
    for (let i = 0; i < len; i++) {
      const style = isArray ? styleProp[i] : styleProp;
      style && (style.$$css ? Object.assign(styleState.classNames, style) : (styleState.style || (styleState.style = {}), Object.assign(styleState.style, normalizeStyle(style))));
    }
  }
  const result = {
    space,
    hasMedia,
    fontFamily: styleState.fontFamily,
    viewProps,
    style: styleState.style,
    pseudos,
    classNames,
    rulesToInsert,
    dynamicThemeAccess,
    pseudoGroups,
    mediaGroups
  };
  if (!(asChild === "except-style" || asChild === "except-style-web")) {
    const style = styleState.style;
    {
      let fontFamily = isText || isInput ? styleState.fontFamily || ((_g = staticConfig.defaultProps) == null ? void 0 : _g.fontFamily) : null;
      fontFamily && fontFamily[0] === "$" && (fontFamily = fontFamily.slice(1));
      const fontFamilyClassName = fontFamily ? `font_${fontFamily}` : "", groupClassName = props.group ? `t_group_${props.group}` : "", componentNameFinal = props.componentName || staticConfig.componentName, componentClassName = props.asChild || !componentNameFinal ? "" : `is_${componentNameFinal}`;
      let classList = [];
      componentClassName && classList.push(componentClassName), fontFamilyClassName && classList.push(fontFamilyClassName), classNames && classList.push(Object.values(classNames).join(" ")), groupClassName && classList.push(groupClassName), props.className && classList.push(props.className);
      const finalClassName = classList.join(" ");
      if (styleProps.noMergeStyle) finalClassName && (viewProps.className = finalClassName);
      else if (styleProps.isAnimated && !conf.animations.supportsCSSVars && isReactNative) style && (viewProps.style = style);
      else if (isReactNative) {
        const cnStyles = {
          $$css: true
        };
        for (const name of finalClassName.split(" ")) cnStyles[name] = name;
        viewProps.style = [...Array.isArray(style) ? style : [style], cnStyles];
      } else finalClassName && (viewProps.className = finalClassName), style && (viewProps.style = style);
    }
  }
  return result;
};
function mergeClassName(transforms, classNames, key, val, isMediaOrPseudo = false, isInsertingNow = false) {
  if (val) if (!isInsertingNow && val[0] === "_" && val.startsWith("_transform-")) {
    const ns = isMediaOrPseudo ? key : "transform";
    let transform = insertedTransforms[val];
    isClient && !transform && (scanAllSheets(), transform = insertedTransforms[val], !transform && isWeb && val[0] !== "_" && (transform = val)), transforms[ns] || (transforms[ns] = ["", ""]), transforms[ns][0] += val.replace("_transform", ""), transform && (transforms[ns][1] += transform);
  } else classNames[key] = val;
}
function mergeStyle(styleState, key, val, disableNormalize = false) {
  const {
    classNames,
    viewProps,
    usedKeys,
    styleProps,
    staticConfig
  } = styleState;
  if ((val == null ? void 0 : val[0]) === "_") classNames[key] = val, usedKeys[key] || (usedKeys[key] = 1);
  else if (key in stylePropsTransform) styleState.flatTransforms || (styleState.flatTransforms = {}), styleState.flatTransforms[key] = val;
  else {
    const out = !disableNormalize && !styleProps.noNormalize ? normalizeValueWithProperty(val, key) : val;
    staticConfig.accept && key in staticConfig.accept ? viewProps[key] = out : (styleState.style || (styleState.style = {}), styleState.style[key] = out);
  }
}
const getSubStyle = (styleState, subKey, styleIn, avoidMergeTransform) => {
  const {
    staticConfig,
    conf: conf2,
    styleProps
  } = styleState, styleOut = {};
  for (let key in styleIn) {
    const val = styleIn[key];
    key = conf2.shorthands[key] || key;
    const expanded = propMapper(key, val, styleState);
    if (!(!expanded || !staticConfig.isHOC && key in skipProps && !styleProps.noSkip)) for (let [skey, sval] of expanded) skey in validPseudoKeys && (sval = getSubStyle(styleState, skey, sval, avoidMergeTransform)), !avoidMergeTransform && skey in stylePropsTransform ? mergeTransform(styleOut, skey, sval) : styleOut[skey] = styleProps.noNormalize ? sval : normalizeValueWithProperty(sval, key);
  }
  return styleProps.noNormalize || fixStyles(styleOut), styleOut;
};
React__default.useInsertionEffect || useIsomorphicLayoutEffect;
const useSplitStyles = (a, b, c, d, e, f, g, h, i, j) => {
  conf = conf || getConfig();
  const res = getSplitStyles(a, b, c, d, e, f, g, h, i, j);
  return res;
};
function addStyleToInsertRules(rulesToInsert, styleObject) {
  {
    const identifier = styleObject[StyleObjectIdentifier];
    rulesToInsert[identifier] = styleObject;
  }
}
function processIDRefList(idRefList) {
  return Array.isArray(idRefList) ? idRefList.join(" ") : idRefList;
}
const defaultColor = process.env.TAMAGUI_DEFAULT_COLOR || "rgba(0,0,0,0)", animatableDefaults = {
  ...Object.fromEntries(Object.entries(tokenCategories.color).map(([k, v]) => [k, defaultColor])),
  opacity: 1,
  scale: 1,
  rotate: "0deg",
  rotateY: "0deg",
  rotateX: "0deg",
  x: 0,
  y: 0,
  borderRadius: 0
}, lowercaseHyphenate = (match) => `-${match.toLowerCase()}`, hyphenate = (str) => str.replace(/[A-Z]/g, lowercaseHyphenate), mergeTransform = (obj, key, val, backwards = false) => {
  typeof obj.transform != "string" && (obj.transform || (obj.transform = []), obj.transform[backwards ? "unshift" : "push"]({
    [mapTransformKeys[key] || key]: val
  }));
}, mapTransformKeys = {
  x: "translateX",
  y: "translateY"
}, accessibilityRoleToWebRole = {
  adjustable: "slider",
  header: "heading",
  image: "img",
  link: "link",
  none: "presentation",
  summary: "region"
};
function passDownProp(viewProps, key, val, shouldMergeObject = false) {
  if (shouldMergeObject) {
    const next = {
      ...viewProps[key],
      ...val
    };
    delete viewProps[key], viewProps[key] = next;
  } else viewProps[key] = val;
}
function mergeMediaByImportance(styleState, mediaKey, key, value, importancesUsed, isSizeMedia, importanceBump, debugProp) {
  let importance = getMediaImportanceIfMoreImportant(mediaKey, key, importancesUsed, isSizeMedia);
  if (importanceBump && (importance = (importance || 0) + importanceBump), importance === null) return false;
  if (importancesUsed[key] = importance, key in pseudoDescriptors) {
    const descriptor = pseudoDescriptors[key], descriptorKey = descriptor.stateKey || descriptor.name;
    if (styleState.componentState[descriptorKey] === false) return false;
    for (const subKey in value) mergeStyle(styleState, subKey, value[subKey]);
  } else mergeStyle(styleState, key, value);
  return true;
}
function normalizeStyle(style) {
  const out = {};
  for (const key in style) {
    const val = style[key];
    key in stylePropsTransform ? mergeTransform(out, key, val) : out[key] = normalizeValueWithProperty(val, key);
  }
  return Array.isArray(out.transform) && (out.transform = transformsToString(out.transform)), fixStyles(out), out;
}
function applyDefaultStyle(pkey, styleState) {
  const defaultValues = animatableDefaults[pkey];
  defaultValues != null && !(pkey in styleState.usedKeys) && (!styleState.style || !(pkey in styleState.style)) && mergeStyle(styleState, pkey, defaultValues);
}
const mergeProps = (a, b, inverseShorthands) => {
  const out = {};
  for (const key in a) mergeProp(out, a, b, key);
  if (b) for (const key in b) mergeProp(out, b, void 0, key);
  return out;
};
function mergeProp(out, a, b, key, inverseShorthands) {
  const longhand = null, val = a[key];
  if (key in pseudoDescriptors || mediaKeys.has(key)) {
    out[key] = {
      ...out[key],
      ...val
    };
    return;
  }
  b && (key in b || longhand) || (out[key] = val);
}
const hooks = {};
function setupHooks(next) {
  Object.assign(hooks, next);
}
const setElementProps = (node) => {
  var _a2;
  (_a2 = hooks.setElementProps) == null ? void 0 : _a2.call(hooks, node);
};
const subscribeToContextGroup = ({
  disabled = false,
  setStateShallow,
  pseudoGroups,
  mediaGroups,
  componentContext,
  state
}) => {
  var _a2, _b;
  if (pseudoGroups || mediaGroups) {
    const current = {
      pseudo: {},
      media: {}
    };
    return (_b = (_a2 = componentContext.groups) == null ? void 0 : _a2.subscribe) == null ? void 0 : _b.call(_a2, (name, {
      layout,
      pseudo
    }) => {
      if (pseudo && (pseudoGroups == null ? void 0 : pseudoGroups.has(String(name)))) Object.assign(current.pseudo, pseudo), persist();
      else if (layout && mediaGroups) {
        const mediaState2 = getMediaState(mediaGroups, layout), next = mergeIfNotShallowEqual(current.media, mediaState2);
        next !== current.media && (Object.assign(current.media, next), persist());
      }
      function persist() {
        const group = {
          ...state.group,
          [name]: current
        };
        setStateShallow({
          group
        });
      }
    });
  }
};
const Theme = forwardRef(function({
  children,
  ...props
}, ref) {
  if (props.disable) return children;
  const isRoot = !!props._isRoot, themeState = useChangeThemeEffect(props, isRoot);
  let finalChildren = props["disable-child-theme"] ? Children.map(children, (child) => cloneElement(child, {
    "data-disable-theme": true
  })) : children;
  if (ref) try {
    React__default.Children.only(finalChildren), finalChildren = cloneElement(finalChildren, {
      ref
    });
  } catch {
  }
  const stateRef = useRef({
    hasEverThemed: false
  });
  return getThemedChildren(themeState, finalChildren, props, isRoot, stateRef);
});
Theme.displayName = "Theme";
Theme.avoidForwardRef = true;
function getThemedChildren(themeState, children, props, isRoot = false, stateRef) {
  const {
    themeManager,
    isNewTheme
  } = themeState;
  if (!themeManager) return children;
  const {
    shallow,
    forceClassName
  } = props;
  let shouldRenderChildrenWithTheme = isNewTheme || isRoot || "inverse" in props || "name" in props || "reset" in props || "forceClassName" in props || stateRef.current.hasEverThemed;
  if (shouldRenderChildrenWithTheme && (stateRef.current.hasEverThemed = true), !shouldRenderChildrenWithTheme) return children;
  let next = children;
  shallow && (next = Children.toArray(children).map((child) => isValidElement(child) ? cloneElement(child, void 0, /* @__PURE__ */ jsx(Theme, {
    name: themeManager.state.parentName,
    children: child.props.children
  })) : child));
  const elementsWithContext = /* @__PURE__ */ jsx(ThemeManagerIDContext.Provider, {
    value: themeManager.id,
    children: next
  });
  return forceClassName === false ? elementsWithContext : wrapThemeElements({
    children: elementsWithContext,
    themeState,
    forceClassName,
    isRoot
  });
}
function wrapThemeElements({
  children,
  themeState,
  forceClassName,
  isRoot
}) {
  var _a2;
  if (isRoot && forceClassName === false) return children;
  const inverse = themeState.inversed, requiresExtraWrapper = typeof inverse == "boolean" || forceClassName, {
    className,
    style
  } = getThemeClassNameAndStyle(themeState, isRoot);
  let themedChildren = /* @__PURE__ */ jsx("span", {
    className: `${className} _dsp_contents is_Theme`,
    style,
    children
  });
  if (requiresExtraWrapper) {
    const name = ((_a2 = themeState.state) == null ? void 0 : _a2.name) || "", inverseClassName = name.startsWith("light") ? "t_light is_inversed" : name.startsWith("dark") ? "t_dark is_inversed" : "";
    themedChildren = /* @__PURE__ */ jsx("span", {
      className: `${inverse ? inverseClassName : ""} _dsp_contents`,
      children: themedChildren
    });
  }
  return themedChildren;
}
const emptyObj = {};
function getThemeClassNameAndStyle(themeState, isRoot = false) {
  var _a2, _b;
  if (!themeState.isNewTheme) return {
    className: "",
    style: emptyObj
  };
  const themeColor = ((_a2 = themeState.state) == null ? void 0 : _a2.theme) && themeState.isNewTheme ? variableToString(themeState.state.theme.color) : "", style = themeColor ? {
    color: themeColor
  } : void 0;
  let className = ((_b = themeState.state) == null ? void 0 : _b.className) || "";
  return isRoot && (className = className.replace("t_sub_theme", "")), {
    style,
    className
  };
}
function themeable(Component, staticConfig) {
  const withTheme = React__default.forwardRef(function(props, ref) {
    const {
      themeInverse,
      theme,
      componentName,
      themeReset,
      ...rest
    } = props;
    let overriddenContextProps;
    const context = staticConfig == null ? void 0 : staticConfig.context;
    if (context) for (const key in context.props) {
      const val = props[key];
      val !== void 0 && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = val);
    }
    const element = (
      // @ts-expect-error its ok
      /* @__PURE__ */ jsx(Component, {
        ref,
        ...rest,
        "data-disable-theme": true
      })
    ), filteredProps = {
      componentName: componentName || (staticConfig == null ? void 0 : staticConfig.componentName)
    };
    "debug" in props && (filteredProps.debug = props.debug), "theme" in props && (filteredProps.name = props.theme), "themeInverse" in props && (filteredProps.inverse = props.themeInverse), "themeReset" in props && (filteredProps.reset = themeReset);
    let contents = /* @__PURE__ */ jsx(Theme, {
      "disable-child-theme": true,
      ...filteredProps,
      children: element
    });
    if (context) {
      const Provider = context.Provider, contextValue = React__default.useContext(context);
      contents = /* @__PURE__ */ jsx(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: contents
      });
    }
    return contents;
  });
  return withTheme.displayName = `Themed(${(Component == null ? void 0 : Component.displayName) || (Component == null ? void 0 : Component.name) || "Anonymous"})`, withTheme;
}
function wrapStyleTags(styles, content) {
  return styles.length ? /* @__PURE__ */ jsxs(Fragment, {
    children: [content, styles.map((styleObject) => {
      const identifier = styleObject[StyleObjectIdentifier];
      return /* @__PURE__ */ jsx("style", {
        href: `t_${identifier}`,
        precedence: "default",
        children: styleObject[StyleObjectRules].join(`
`)
      }, identifier);
    })]
  }) : content;
}
const useComponentState = (props, {
  animationDriver,
  groups
}, staticConfig, config) => {
  var _a2;
  const useAnimations = animationDriver == null ? void 0 : animationDriver.useAnimations, stateRef = useRef(void 0);
  stateRef.current || (stateRef.current = {});
  const hasAnimationProp = !!("animation" in props || props.style && hasAnimatedStyleValue(props.style)), supportsCSSVars = animationDriver == null ? void 0 : animationDriver.supportsCSSVars, curStateRef = stateRef.current, willBeAnimatedClient = !!(!!(hasAnimationProp && !staticConfig.isHOC && useAnimations) || curStateRef.hasAnimated), willBeAnimated = !isServer && willBeAnimatedClient;
  willBeAnimated && !curStateRef.hasAnimated && (curStateRef.hasAnimated = true);
  const {
    disableClassName
  } = props, presence = willBeAnimated && props.animatePresence !== false && ((_a2 = animationDriver == null ? void 0 : animationDriver.usePresence) == null ? void 0 : _a2.call(animationDriver)) || null, presenceState = presence == null ? void 0 : presence[2], isExiting = (presenceState == null ? void 0 : presenceState.isPresent) === false, isEntering = (presenceState == null ? void 0 : presenceState.isPresent) === true && presenceState.initial !== false, hasEnterStyle = !!props.enterStyle, hasAnimationThatNeedsHydrate = hasAnimationProp && ((animationDriver == null ? void 0 : animationDriver.isReactNative) || !supportsCSSVars), initialState = hasEnterStyle || isEntering || hasAnimationThatNeedsHydrate || // disableClassName doesnt work server side, only client, so needs hydrate
  // this is just for a better ux, supports css variables for light/dark, media queries, etc
  disableClassName ? (
    // on the very first render we switch all spring animation drivers to css rendering
    // this is because we need to use css variables, which they don't support to do proper SSR
    // without flickers of the wrong colors.
    // but once we do that initial hydration and we are in client side rendering mode,
    // we can avoid the extra re-render on mount
    defaultComponentState
  ) : defaultComponentStateMounted, disabled = isDisabled(props);
  disabled != null && (initialState.disabled = disabled);
  const states = useState(initialState), state = props.forceStyle ? {
    ...states[0],
    [props.forceStyle]: true
  } : states[0], setState = states[1], isHydrated = state.unmounted === false;
  let isAnimated = willBeAnimated;
  hasAnimationThatNeedsHydrate && !staticConfig.isHOC && state.unmounted === true && (isAnimated = false, curStateRef.willHydrate = true), disabled !== state.disabled && (state.disabled = disabled, disabled && Object.assign(state, defaultComponentStateMounted), setState({
    ...state
  }));
  let setStateShallow = createShallowSetState(setState, disabled, false, props.debug);
  if (presenceState && isAnimated && isHydrated && staticConfig.variants) {
    const {
      enterVariant,
      exitVariant,
      enterExitVariant,
      custom
    } = presenceState;
    isObj(custom) && Object.assign(props, custom);
    const exv = exitVariant ?? enterExitVariant, env = enterVariant ?? enterExitVariant;
    state.unmounted && env && staticConfig.variants[env] ? props[env] = true : isExiting && exv && (props[exv] = exitVariant !== enterExitVariant);
  }
  let noClass = !!props.forceStyle;
  if (!isServer || isHydrated) {
    const isAnimatedAndHydrated = isAnimated && !supportsCSSVars, isClassNameDisabled = !staticConfig.acceptsClassName && (config.disableSSR || !state.unmounted), isDisabledManually = disableClassName && !state.unmounted;
    (isAnimatedAndHydrated || isDisabledManually || isClassNameDisabled) && (noClass = true, false);
  }
  const groupName = props.group;
  if (groupName && !curStateRef.group) {
    const listeners2 = /* @__PURE__ */ new Set();
    curStateRef.group = {
      listeners: listeners2,
      emit(name, state2) {
        listeners2.forEach((l) => l(name, state2));
      },
      subscribe(cb) {
        return listeners2.add(cb), () => {
          listeners2.delete(cb);
        };
      }
    };
  }
  if (groupName) {
    const groupContextState = groups.state, og = setStateShallow;
    setStateShallow = (state2) => {
      og(state2), curStateRef.group.emit(groupName, {
        pseudo: state2
      });
      const next = {
        ...groupContextState[groupName],
        ...state2
      };
      groupContextState[groupName] = next;
    };
  }
  return {
    curStateRef,
    disabled,
    groupName,
    hasAnimationProp,
    hasEnterStyle,
    isAnimated,
    isExiting,
    isHydrated,
    presence,
    presenceState,
    setState,
    setStateShallow,
    noClass,
    state,
    stateRef,
    supportsCSSVars,
    willBeAnimated,
    willBeAnimatedClient
  };
};
function hasAnimatedStyleValue(style) {
  return Object.keys(style).some((k) => {
    const val = style[k];
    return val && typeof val == "object" && "_animation" in val;
  });
}
const isDisabled = (props) => {
  var _a2;
  return props.disabled || ((_a2 = props.accessibilityState) == null ? void 0 : _a2.disabled) || props["aria-disabled"] || props.accessibilityDisabled || false;
};
const is19 = version.startsWith("19."), Slot = memo(forwardRef(function(props, forwardedRef) {
  const {
    children,
    ...slotProps
  } = props;
  if (isValidElement(children)) {
    const mergedProps = mergeSlotProps(children, slotProps);
    return cloneElement(children, children.type.avoidForwardRef ? mergedProps : {
      ...mergedProps,
      ref: composeRefs(forwardedRef, is19 ? children.props.ref : children.ref)
    });
  }
  return Children.count(children) > 1 ? Children.only(null) : null;
}));
const pressMap = {
  onPress: "onClick",
  onPressOut: "onMouseUp",
  onPressIn: "onMouseDown"
};
function mergeSlotProps(child, slotProps) {
  const childProps = child.props, overrideProps = {
    ...childProps
  }, isHTMLChild = typeof child.type == "string";
  if (isHTMLChild) for (const key in pressMap) key in slotProps && (slotProps[pressMap[key]] = slotProps[key], delete slotProps[key]);
  for (let propName in childProps) {
    const slotPropValue = slotProps[propName], childPropValue = childProps[propName];
    isHTMLChild && propName in pressMap && (propName = pressMap[propName], delete overrideProps[propName]), handleRegex.test(propName) ? overrideProps[propName] = composeEventHandlers(childPropValue, slotPropValue) : propName === "style" ? overrideProps[propName] = {
      ...slotPropValue,
      ...childPropValue
    } : propName === "className" && (overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" "));
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}
const handleRegex = /^on[A-Z]/;
const componentSetStates = /* @__PURE__ */ new Set();
if (typeof document < "u") {
  const cancelTouches = () => {
    componentSetStates.forEach((setState) => setState((prev) => prev.press || prev.pressIn ? {
      ...prev,
      press: false,
      pressIn: false
    } : prev)), componentSetStates.clear();
  };
  addEventListener("mouseup", cancelTouches), addEventListener("touchend", cancelTouches), addEventListener("touchcancel", cancelTouches);
}
const lastInteractionWasKeyboard = {
  value: false
};
globalThis.document && (document.addEventListener("keydown", () => {
  lastInteractionWasKeyboard.value = true;
}), document.addEventListener("mousedown", () => {
  lastInteractionWasKeyboard.value = false;
}), document.addEventListener("mousemove", () => {
  lastInteractionWasKeyboard.value = false;
}));
function createComponent(staticConfig) {
  const {
    componentName
  } = staticConfig;
  let config = null, defaultProps = staticConfig.defaultProps;
  onConfiguredOnce((conf2) => {
    var _a2;
    if (config = conf2, componentName) {
      const defaultForComponent = (_a2 = conf2.defaultProps) == null ? void 0 : _a2[componentName];
      defaultForComponent && (defaultProps = {
        ...defaultForComponent,
        ...defaultProps
      });
    }
  });
  const {
    Component,
    isText,
    isZStack,
    isHOC
  } = staticConfig;
  const component = React__default.forwardRef((propsIn, forwardedRef) => {
    var _a2, _b, _c, _d, _e, _f;
    const componentContext = React__default.useContext(ComponentContext);
    let styledContextProps, overriddenContextProps, contextValue;
    const {
      context,
      isReactNative
    } = staticConfig;
    if (context && (contextValue = React__default.useContext(context), contextValue)) {
      for (const key in context.props) {
        const propVal = propsIn[key];
        if (propVal === void 0) {
          const val = contextValue == null ? void 0 : contextValue[key];
          val !== void 0 && (styledContextProps || (styledContextProps = {}), styledContextProps[key] = val);
        }
        const finalVal = propVal ?? (defaultProps == null ? void 0 : defaultProps[key]);
        finalVal !== void 0 && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = finalVal);
      }
    }
    const curDefaultProps = styledContextProps ? {
      ...defaultProps,
      ...styledContextProps
    } : defaultProps;
    let props = propsIn;
    curDefaultProps && (props = mergeProps(curDefaultProps, propsIn));
    const debugProp = props.debug, componentName2 = props.componentName || staticConfig.componentName;
    !process.env.TAMAGUI_IS_CORE_NODE && false;
    const animationDriver = componentContext.animationDriver, useAnimations = animationDriver == null ? void 0 : animationDriver.useAnimations, {
      curStateRef,
      disabled,
      groupName,
      hasAnimationProp,
      hasEnterStyle,
      isAnimated,
      isExiting,
      isHydrated,
      presence,
      presenceState,
      setState,
      setStateShallow,
      noClass,
      state,
      stateRef,
      supportsCSSVars,
      willBeAnimated,
      willBeAnimatedClient
    } = useComponentState(props, componentContext, staticConfig, config);
    const hasTextAncestor = !!(isText && componentContext.inText);
    const isTaggable = !Component || typeof Component == "string", tagProp = props.tag, element = isTaggable && tagProp || Component;
    let elementType = isText ? element || "span" : element || (hasTextAncestor ? "span" : "div");
    animationDriver && isAnimated && (elementType = animationDriver[isText ? "Text" : "View"] || elementType);
    const disableTheme = props["data-disable-theme"] || isHOC;
    props.themeShallow && (curStateRef.themeShallow = true);
    const themeStateProps = {
      componentName: componentName2,
      disable: disableTheme,
      shallow: curStateRef.themeShallow,
      debug: debugProp
    };
    if ("themeInverse" in props && (themeStateProps.inverse = props.themeInverse), "theme" in props && (themeStateProps.name = props.theme), typeof curStateRef.isListeningToTheme == "boolean" && (themeStateProps.shouldUpdate = () => stateRef.current.isListeningToTheme), false) ;
    const [themeState, theme] = useThemeWithState(themeStateProps);
    elementType = Component || elementType;
    const mediaState2 = useMedia(componentContext);
    setDidGetVariableValue(false);
    const resolveValues = (
      // if HOC + mounted + has animation prop, resolve as value so it passes non-variable to child
      isAnimated && !supportsCSSVars || isHOC && state.unmounted == false && hasAnimationProp ? "value" : "auto"
    ), styleProps = {
      mediaState: mediaState2,
      noClass,
      resolveValues,
      isExiting,
      isAnimated,
      willBeAnimated,
      styledContextProps
    }, themeName = ((_a2 = themeState == null ? void 0 : themeState.state) == null ? void 0 : _a2.name) || "";
    const splitStyles = useSplitStyles(props, staticConfig, theme, themeName, state, styleProps, null, componentContext, elementType, debugProp);
    props.group && props.untilMeasured === "hide" && !curStateRef.hasMeasured && (splitStyles.style || (splitStyles.style = {}), splitStyles.style.opacity = 0), curStateRef.isListeningToTheme = splitStyles.dynamicThemeAccess;
    const hasRuntimeMediaKeys = splitStyles.hasMedia && splitStyles.hasMedia !== true, shouldListenForMedia = didGetVariableValue() || hasRuntimeMediaKeys || noClass && splitStyles.hasMedia === true, mediaListeningKeys = hasRuntimeMediaKeys ? splitStyles.hasMedia : null;
    setMediaShouldUpdate(stateRef, shouldListenForMedia, mediaListeningKeys);
    const {
      viewProps: viewPropsIn,
      pseudos,
      style: splitStylesStyle,
      classNames,
      space
    } = splitStyles, propsWithAnimation = props, {
      asChild,
      children,
      themeShallow,
      spaceDirection: _spaceDirection,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      separator,
      // ignore from here on out
      forceStyle: _forceStyle,
      // @ts-ignore  for next/link compat etc
      onClick,
      theme: _themeProp,
      ...nonTamaguiProps
    } = viewPropsIn;
    let viewProps = nonTamaguiProps;
    !isTaggable && props.forceStyle && (viewProps.forceStyle = props.forceStyle), isHOC && _themeProp && (viewProps.theme = _themeProp), tagProp && elementType.acceptTagProp && (viewProps.tag = tagProp);
    let animationStyles;
    if (
      // if it supports css vars we run it on server too to get matching initial style
      (supportsCSSVars ? willBeAnimatedClient : willBeAnimated) && useAnimations && !isHOC
    ) {
      const animations = useAnimations({
        props: propsWithAnimation,
        // if hydrating, send empty style
        style: splitStylesStyle || {},
        presence,
        componentState: state,
        styleProps,
        theme: (_b = themeState.state) == null ? void 0 : _b.theme,
        pseudos: pseudos || null,
        staticConfig,
        stateRef
      });
      (isAnimated || supportsCSSVars) && animations && (animationStyles = animations.style, viewProps.style = animationStyles, animations.className && (viewProps.className = `${state.unmounted === "should-enter" ? "t_unmounted " : ""}${viewProps.className || ""} ${animations.className}`));
    }
    groupName && (nonTamaguiProps.onLayout = composeEventHandlers(nonTamaguiProps.onLayout, (e) => {
      stateRef.current.group.emit(groupName, {
        layout: e.nativeEvent.layout
      }), !stateRef.current.hasMeasured && props.untilMeasured === "hide" && setState((prev) => ({
        ...prev
      })), stateRef.current.hasMeasured = true;
    })), viewProps = ((_c = hooks.usePropsTransform) == null ? void 0 : _c.call(hooks, elementType, nonTamaguiProps, stateRef, curStateRef.willHydrate)) || nonTamaguiProps, curStateRef.composedRef || (curStateRef.composedRef = composeRefs((x) => stateRef.current.host = x, forwardedRef, setElementProps)), viewProps.ref = curStateRef.composedRef;
    const {
      pseudoGroups,
      mediaGroups
    } = splitStyles, unPress = () => setStateShallow({
      press: false,
      pressIn: false
    });
    React__default.useEffect(() => {
      if (disabled) return;
      let tm;
      if (state.unmounted === true && hasEnterStyle) {
        setStateShallow({
          unmounted: "should-enter"
        });
        return;
      }
      if (state.unmounted) return tm = setTimeout(() => {
        setStateShallow({
          unmounted: false
        });
      }), () => clearTimeout(tm);
      const dispose2 = subscribeToContextGroup({
        disabled,
        componentContext,
        setStateShallow,
        state,
        mediaGroups,
        pseudoGroups
      });
      return () => {
        clearTimeout(tm), dispose2 == null ? void 0 : dispose2(), componentSetStates.delete(setState);
      };
    }, [state.unmounted, disabled, pseudoGroups ? Object.keys([...pseudoGroups]).join("") : 0, mediaGroups ? Object.keys([...mediaGroups]).join("") : 0]);
    const runtimePressStyle = !disabled && noClass && (pseudos == null ? void 0 : pseudos.pressStyle), runtimeFocusStyle = !disabled && noClass && (pseudos == null ? void 0 : pseudos.focusStyle), runtimeFocusVisibleStyle = !disabled && noClass && (pseudos == null ? void 0 : pseudos.focusVisibleStyle), attachFocus = !!(runtimePressStyle || runtimeFocusStyle || runtimeFocusVisibleStyle || onFocus || onBlur), attachPress = !!(groupName || runtimePressStyle || onPress || onPressOut || onPressIn || onMouseDown || onMouseUp || onLongPress || onClick || (pseudos == null ? void 0 : pseudos.focusVisibleStyle)), runtimeHoverStyle = !disabled && noClass && (pseudos == null ? void 0 : pseudos.hoverStyle), needsHoverState = !!(groupName || runtimeHoverStyle || onHoverIn || onHoverOut), attachHover = !!(groupName || needsHoverState || onMouseEnter || onMouseLeave), shouldAttach = !disabled && !props.asChild && !!(attachFocus || attachPress || attachHover || runtimePressStyle || runtimeHoverStyle || runtimeFocusStyle), needsPressState = !!(groupName || runtimePressStyle);
    const events = shouldAttach ? {
      onPressOut: attachPress ? (e) => {
        unPress(), onPressOut == null ? void 0 : onPressOut(e), onMouseUp == null ? void 0 : onMouseUp(e);
      } : void 0,
      ...(attachHover || attachPress) && {
        onMouseEnter: (e) => {
          const next = {};
          needsHoverState && (next.hover = true), needsPressState && state.pressIn && (next.press = true), setStateShallow(next), onHoverIn == null ? void 0 : onHoverIn(e), onMouseEnter == null ? void 0 : onMouseEnter(e);
        },
        onMouseLeave: (e) => {
          const next = {};
          needsHoverState && (next.hover = false), needsPressState && state.pressIn && (next.press = false, next.pressIn = false), setStateShallow(next), onHoverOut == null ? void 0 : onHoverOut(e), onMouseLeave == null ? void 0 : onMouseLeave(e);
        }
      },
      onPressIn: attachPress ? (e) => {
        (runtimePressStyle || groupName) && setStateShallow({
          press: true,
          pressIn: true
        }), onPressIn == null ? void 0 : onPressIn(e), onMouseDown == null ? void 0 : onMouseDown(e), componentSetStates.add(setState);
      } : void 0,
      onPress: attachPress ? (e) => {
        unPress(), onClick == null ? void 0 : onClick(e), onPress == null ? void 0 : onPress(e), onLongPress == null ? void 0 : onLongPress(e);
      } : void 0,
      ...attachFocus && {
        onFocus: (e) => {
          (pseudos == null ? void 0 : pseudos.focusVisibleStyle) ? setTimeout(() => {
            setStateShallow({
              focus: true,
              focusVisible: !!lastInteractionWasKeyboard.value
            });
          }, 0) : setStateShallow({
            focus: true,
            focusVisible: false
          }), onFocus == null ? void 0 : onFocus(e);
        },
        onBlur: (e) => {
          setStateShallow({
            focus: false,
            focusVisible: false
          }), onBlur == null ? void 0 : onBlur(e);
        }
      }
    } : null;
    events && !isReactNative && Object.assign(viewProps, getWebEvents(events)), (_d = hooks.useEvents) == null ? void 0 : _d.call(hooks, viewProps, events, splitStyles, setStateShallow, staticConfig);
    const direction = props.spaceDirection || "both";
    let content = !children || asChild ? children : spacedChildren({
      separator,
      children,
      space,
      direction,
      isZStack,
      debug: debugProp
    });
    if (asChild) {
      elementType = Slot;
      {
        const passEvents = getWebEvents({
          onPress,
          onLongPress,
          onPressIn,
          onPressOut,
          onMouseUp,
          onMouseDown,
          onMouseEnter,
          onMouseLeave
        }, asChild === "web" || asChild === "except-style-web");
        Object.assign(viewProps, passEvents);
      }
    }
    let useChildrenResult;
    hooks.useChildren && (useChildrenResult = hooks.useChildren(elementType, content, viewProps, events, staticConfig)), useChildrenResult ? content = useChildrenResult : content = React__default.createElement(elementType, viewProps, content);
    const ResetPresence = (_e = config == null ? void 0 : config.animations) == null ? void 0 : _e.ResetPresence;
    ResetPresence && willBeAnimated && (hasEnterStyle || presenceState) && content && typeof content != "string" && (content = /* @__PURE__ */ jsx(ResetPresence, {
      children: content
    }));
    const groupState = curStateRef.group, subGroupContext = React__default.useMemo(() => {
      var _a3, _b2;
      if (!(!groupState || !groupName)) return groupState.listeners.clear(), {
        ...componentContext.groups,
        // change reference so as we mutate it doesn't affect siblings etc
        state: {
          ...componentContext.groups.state,
          [groupName]: {
            pseudo: defaultComponentStateMounted,
            // capture just initial width and height if they exist
            // will have top, left, width, height (not x, y)
            layout: {
              width: fromPx((_a3 = splitStyles.style) == null ? void 0 : _a3.width),
              height: fromPx((_b2 = splitStyles.style) == null ? void 0 : _b2.height)
            }
          }
        },
        emit: groupState.emit,
        subscribe: groupState.subscribe
      };
    }, [groupName]);
    if (groupName && subGroupContext && (content = /* @__PURE__ */ jsx(ComponentContext.Provider, {
      ...componentContext,
      groups: subGroupContext,
      children: content
    })), content = disableTheme ? content : getThemedChildren(themeState, content, themeStateProps, false, stateRef), isReactNative && !asChild && (content = /* @__PURE__ */ jsx("span", {
      className: "_dsp_contents",
      ...isHydrated && events && getWebEvents(events),
      children: content
    })), staticConfig.context) {
      const contextProps = staticConfig.context.props;
      for (const key in contextProps) (viewProps.style && key in viewProps.style || key in viewProps) && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = ((_f = viewProps.style) == null ? void 0 : _f[key]) ?? viewProps[key]);
    }
    if (overriddenContextProps) {
      const Provider = staticConfig.context.Provider;
      content = /* @__PURE__ */ jsx(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: content
      });
    }
    const {
      rulesToInsert
    } = splitStyles;
    if (content = wrapStyleTags(Object.values(rulesToInsert), content), false) ;
    return content;
  });
  staticConfig.componentName && (component.displayName = staticConfig.componentName);
  let res = component;
  (process.env.TAMAGUI_FORCE_MEMO || staticConfig.memo) && (res = React__default.memo(res)), res.staticConfig = staticConfig;
  function extendStyledConfig(extended) {
    return {
      ...staticConfig,
      ...extended,
      neverFlatten: true,
      isHOC: true,
      isStyledHOC: false
    };
  }
  function extractable(Component2, extended) {
    return Component2.staticConfig = extendStyledConfig(extended), Component2.styleable = styleable, Component2;
  }
  function styleable(Component2, options) {
    var _a2;
    let out = ((_a2 = Component2.render) == null ? void 0 : _a2.length) === 2 ? Component2 : React__default.forwardRef(Component2);
    const extendedConfig = extendStyledConfig(options == null ? void 0 : options.staticConfig);
    return out = (options == null ? void 0 : options.disableTheme) ? out : themeable(out, extendedConfig), process.env.TAMAGUI_MEMOIZE_STYLEABLE && (out = React__default.memo(out)), out.staticConfig = extendedConfig, out.styleable = styleable, out;
  }
  return res.extractable = extractable, res.styleable = styleable, res;
}
function getWebEvents(events, webStyle = true) {
  return {
    onMouseEnter: events.onMouseEnter,
    onMouseLeave: events.onMouseLeave,
    [webStyle ? "onClick" : "onPress"]: events.onPress,
    onMouseDown: events.onPressIn,
    onMouseUp: events.onPressOut,
    onTouchStart: events.onPressIn,
    onTouchEnd: events.onPressOut,
    onFocus: events.onFocus,
    onBlur: events.onBlur
  };
}
const getSpacerSize = (size, {
  tokens
}) => {
  size = size === true ? "$true" : size;
  const sizePx = tokens.space[size] ?? size;
  return {
    width: sizePx,
    height: sizePx,
    minWidth: sizePx,
    minHeight: sizePx
  };
}, Spacer = createComponent({
  acceptsClassName: true,
  memo: true,
  componentName: "Spacer",
  validStyles,
  defaultProps: {
    ...stackDefaultStyles,
    // avoid nesting issues
    tag: "span",
    size: true,
    pointerEvents: "none"
  },
  variants: {
    size: {
      "...": getSpacerSize
    },
    flex: {
      true: {
        flexGrow: 1
      }
    },
    direction: {
      horizontal: {
        height: 0,
        minHeight: 0
      },
      vertical: {
        width: 0,
        minWidth: 0
      },
      both: {}
    }
  }
});
function spacedChildren(props) {
  var _a2, _b, _c;
  const {
    isZStack,
    children,
    space,
    direction,
    spaceFlex,
    separator,
    ensureKeys
  } = props, hasSpace = !!(space || spaceFlex), hasSeparator = separator != null, areChildrenArray = Array.isArray(children);
  if (!ensureKeys && !(hasSpace || hasSeparator || isZStack)) return children;
  const childrenList = areChildrenArray ? children : React__default.Children.toArray(children);
  if (childrenList.length <= 1 && !isZStack && !((_b = (_a2 = childrenList[0]) == null ? void 0 : _a2.type) == null ? void 0 : _b.shouldForwardSpace)) return children;
  const final = [];
  for (let [index2, child] of childrenList.entries()) {
    const isEmpty = child == null || Array.isArray(child) && child.length === 0;
    if (!isEmpty && React__default.isValidElement(child) && ((_c = child.type) == null ? void 0 : _c.shouldForwardSpace) && (child = React__default.cloneElement(child, {
      space,
      spaceFlex,
      separator,
      key: child.key
    })), isEmpty || !child || child.key && !isZStack ? final.push(child) : final.push(/* @__PURE__ */ jsx(React__default.Fragment, {
      children: isZStack ? /* @__PURE__ */ jsx(AbsoluteFill, {
        children: child
      }) : child
    }, `${index2}0t`)), isUnspaced(child) && index2 === 0 || isZStack) continue;
    const next = childrenList[index2 + 1];
    next && !isEmpty && !isUnspaced(next) && (separator ? (hasSpace && final.push(createSpacer({
      key: `_${index2}_00t`,
      direction,
      space,
      spaceFlex
    })), final.push(/* @__PURE__ */ jsx(React__default.Fragment, {
      children: separator
    }, `${index2}03t`)), hasSpace && final.push(createSpacer({
      key: `_${index2}01t`,
      direction,
      space,
      spaceFlex
    }))) : final.push(createSpacer({
      key: `_${index2}02t`,
      direction,
      space,
      spaceFlex
    })));
  }
  return final;
}
function createSpacer({
  key,
  direction,
  space,
  spaceFlex
}) {
  return /* @__PURE__ */ jsx(Spacer, {
    size: space,
    direction,
    ...typeof spaceFlex < "u" && {
      flex: spaceFlex === true ? 1 : spaceFlex === false ? 0 : spaceFlex
    }
  }, key);
}
function isUnspaced(child) {
  const t = child == null ? void 0 : child.type;
  return (t == null ? void 0 : t.isVisuallyHidden) || (t == null ? void 0 : t.isUnspaced);
}
const AbsoluteFill = createComponent({
  defaultProps: {
    ...stackDefaultStyles,
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: "box-none"
  }
}), fromPx = (val) => typeof val != "string" ? val : +val.replace("px", "");
const mergeVariants = (parentVariants, ourVariants, level = 0) => {
  const variants = {};
  for (const key in ourVariants) {
    const parentVariant = parentVariants == null ? void 0 : parentVariants[key], ourVariant = ourVariants[key];
    !parentVariant || typeof ourVariant == "function" ? variants[key] = ourVariant : parentVariant && !ourVariant ? variants[key] = parentVariant[key] : level === 0 ? variants[key] = mergeVariants(parentVariant, ourVariant, level + 1) : variants[key] = {
      ...parentVariant,
      ...ourVariant
    };
  }
  return {
    ...parentVariants,
    ...variants
  };
};
const ReactNativeStaticConfigs = /* @__PURE__ */ new WeakMap();
function getReactNativeConfig(Component) {
  var _a2;
  if (Component) return Component.getSize && Component.prefetch ? RNConfigs.Image : Component.displayName === "Text" && Component.render ? RNConfigs.Text : Component.render && (Component.displayName === "ScrollView" || Component.displayName === "View") ? RNConfigs.default : ((_a2 = Component.State) == null ? void 0 : _a2.blurTextInput) ? RNConfigs.TextInput : ReactNativeStaticConfigs.get(Component);
}
const RNConfigs = {
  Image: {
    isReactNative: true,
    inlineProps: /* @__PURE__ */ new Set(["src", "width", "height"])
  },
  Text: {
    isReactNative: true,
    isText: true
  },
  TextInput: {
    isReactNative: true,
    isInput: true,
    isText: true
  },
  default: {
    isReactNative: true
  }
};
function styled(ComponentIn, options, staticExtractionOptions) {
  const parentStaticConfig = ComponentIn.staticConfig, isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  let Component = (parentStaticConfig == null ? void 0 : parentStaticConfig.isHOC) && !(parentStaticConfig == null ? void 0 : parentStaticConfig.isStyledHOC) || isPlainStyledComponent ? ComponentIn : (parentStaticConfig == null ? void 0 : parentStaticConfig.Component) || ComponentIn;
  const reactNativeConfig = parentStaticConfig ? void 0 : getReactNativeConfig(Component), isReactNative = !!(reactNativeConfig || (staticExtractionOptions == null ? void 0 : staticExtractionOptions.isReactNative) || (parentStaticConfig == null ? void 0 : parentStaticConfig.isReactNative)), staticConfigProps = (() => {
    let {
      variants,
      name,
      defaultVariants,
      acceptsClassName: acceptsClassNameProp,
      context,
      ...defaultProps
    } = options || {}, parentDefaultVariants, parentDefaultProps;
    if (parentStaticConfig && !(parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC)) {
      const pdp = parentStaticConfig.defaultProps;
      for (const key in pdp) {
        const val = pdp[key];
        parentStaticConfig.defaultVariants && key in parentStaticConfig.defaultVariants && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultVariants || (parentDefaultVariants = {}), parentDefaultVariants[key] = val), key in defaultProps || (parentDefaultProps || (parentDefaultProps = {}), parentDefaultProps[key] = pdp[key]);
      }
      parentStaticConfig.variants && (variants = mergeVariants(parentStaticConfig.variants, variants));
    }
    (parentDefaultProps || defaultVariants || parentDefaultVariants) && (defaultProps = {
      ...parentDefaultProps,
      ...parentDefaultVariants,
      ...defaultProps,
      ...defaultVariants
    }), (parentStaticConfig == null ? void 0 : parentStaticConfig.isHOC) && name && (defaultProps.componentName = name);
    const isText = !!((staticExtractionOptions == null ? void 0 : staticExtractionOptions.isText) || (parentStaticConfig == null ? void 0 : parentStaticConfig.isText)), acceptsClassName = (staticExtractionOptions == null ? void 0 : staticExtractionOptions.acceptsClassName) ?? acceptsClassNameProp ?? (isPlainStyledComponent || isReactNative || (parentStaticConfig == null ? void 0 : parentStaticConfig.isHOC) && (parentStaticConfig == null ? void 0 : parentStaticConfig.acceptsClassName)), conf2 = {
      ...parentStaticConfig,
      ...staticExtractionOptions,
      ...!isPlainStyledComponent && {
        Component
      },
      // @ts-expect-error
      variants,
      defaultProps,
      defaultVariants,
      componentName: name || (parentStaticConfig == null ? void 0 : parentStaticConfig.componentName),
      isReactNative,
      isText,
      acceptsClassName,
      context,
      ...reactNativeConfig,
      isStyledHOC: !!(parentStaticConfig == null ? void 0 : parentStaticConfig.isHOC),
      parentStaticConfig
    };
    return (defaultProps.children || !acceptsClassName || context) && (conf2.neverFlatten = true), conf2;
  })(), component = createComponent(staticConfigProps || {});
  for (const key in ComponentIn) key !== "propTypes" && (key in component || (component[key] = ComponentIn[key]));
  return component;
}
const Stack$1 = createComponent({
  acceptsClassName: true,
  defaultProps: stackDefaultStyles,
  validStyles
});
Stack$1.displayName = "Stack";
function useProps(props, opts) {
  const [propsOut, styleOut] = usePropsAndStyle(props, {
    ...opts,
    noExpand: true,
    noNormalize: true,
    resolveValues: "none"
  });
  return {
    ...propsOut,
    ...styleOut
  };
}
function usePropsAndStyle(props, opts) {
  var _a2, _b;
  const staticConfig = ((_a2 = opts == null ? void 0 : opts.forComponent) == null ? void 0 : _a2.staticConfig) ?? Stack$1.staticConfig, [themeState, theme] = useThemeWithState({
    componentName: staticConfig.componentName,
    name: "theme" in props ? props.theme : void 0,
    inverse: "themeInverse" in props ? props.themeInverse : void 0
  }), componentContext = React__default.useContext(ComponentContext), {
    state,
    disabled,
    setStateShallow
  } = useComponentState(props, componentContext, staticConfig, getConfig()), mediaState2 = useMedia(), splitStyles = useSplitStyles(props, staticConfig, theme, ((_b = themeState.state) == null ? void 0 : _b.name) || "", state, {
    isAnimated: false,
    mediaState: mediaState2,
    noSkip: true,
    noMergeStyle: true,
    noClass: true,
    resolveValues: "auto",
    ...opts
  }, null, componentContext), {
    mediaGroups,
    pseudoGroups
  } = splitStyles;
  return React__default.useEffect(() => {
    if (!disabled) {
      if (state.unmounted) {
        setStateShallow({
          unmounted: false
        });
        return;
      }
      return subscribeToContextGroup({
        disabled,
        componentContext,
        setStateShallow,
        state,
        mediaGroups,
        pseudoGroups
      });
    }
  }, [disabled, pseudoGroups ? Object.keys([...pseudoGroups]).join("") : 0, mediaGroups ? Object.keys([...mediaGroups]).join("") : 0]), [splitStyles.viewProps, splitStyles.style || {}, theme, mediaState2];
}
const View$1 = createComponent({
  acceptsClassName: true,
  defaultProps: stackDefaultStyles,
  validStyles
});
const ellipseStyle = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, defaultWebStyle = {
  display: "inline",
  // display: inline breaks css transform styles
  boxSizing: "border-box",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  margin: 0
}, ellipsisStyle = ellipseStyle, Text$1 = createComponent({
  acceptsClassName: true,
  isText: true,
  defaultProps: {
    fontFamily: "unset",
    ...defaultWebStyle
  },
  inlineWhenUnflattened: /* @__PURE__ */ new Set(["fontFamily"]),
  variants: {
    numberOfLines: {
      1: ellipseStyle,
      ":number": (numberOfLines) => numberOfLines >= 1 ? {
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden"
      } : null
    },
    selectable: {
      true: {
        userSelect: "text",
        cursor: "text"
      },
      false: {
        userSelect: "none",
        cursor: "default"
      }
    },
    /**
     * @deprecated Use ellipsis instead
     */
    ellipse: {
      true: ellipsisStyle
    },
    ellipsis: {
      true: ellipsisStyle
    }
  },
  validStyles: {
    ...validStyles,
    ...stylePropsTextOnly
  }
});
Text$1.displayName = "Text";
const keyName = "__reactResponderId", canUseDOM = !!(typeof window < "u" && window.document && window.document.createElement), getBoundingClientRect$1 = (node) => {
  if (node && node.nodeType === 1 && node.getBoundingClientRect) return node.getBoundingClientRect();
};
function getEventPath(domEvent) {
  var _a2;
  if (domEvent.type === "selectionchange") {
    const target = (_a2 = window.getSelection()) == null ? void 0 : _a2.anchorNode;
    return composedPathFallback(target);
  }
  return domEvent.composedPath != null ? domEvent.composedPath() : composedPathFallback(domEvent.target);
}
function composedPathFallback(target) {
  const path = [];
  for (; target != null && target !== document.body; ) path.push(target), target = target.parentNode;
  return path;
}
function getResponderId(node) {
  return node != null ? node[keyName] : null;
}
function setResponderId(node, id) {
  node != null && (node[keyName] = id);
}
function getResponderPaths(domEvent) {
  const idPath = [], nodePath = [], eventPath = getEventPath(domEvent);
  for (let i = 0; i < eventPath.length; i++) {
    const node = eventPath[i], id = getResponderId(node);
    id != null && (idPath.push(id), nodePath.push(node));
  }
  return {
    idPath,
    nodePath
  };
}
function getLowestCommonAncestor(pathA, pathB) {
  let pathALength = pathA.length, pathBLength = pathB.length;
  if (
    // If either path is empty
    pathALength === 0 || pathBLength === 0 || // If the last elements aren't the same there can't be a common ancestor
    // that is connected to the responder system
    pathA[pathALength - 1] !== pathB[pathBLength - 1]
  ) return null;
  let itemA = pathA[0], indexA = 0, itemB = pathB[0], indexB = 0;
  pathALength - pathBLength > 0 && (indexA = pathALength - pathBLength, itemA = pathA[indexA], pathALength = pathBLength), pathBLength - pathALength > 0 && (indexB = pathBLength - pathALength, itemB = pathB[indexB], pathBLength = pathALength);
  let depth = pathALength;
  for (; depth--; ) {
    if (itemA === itemB) return itemA;
    itemA = pathA[indexA++], itemB = pathB[indexB++];
  }
  return null;
}
function hasTargetTouches(target, touches) {
  if (!touches || touches.length === 0) return false;
  for (let i = 0; i < touches.length; i++) {
    const node = touches[i].target;
    if (node != null && target.contains(node)) return true;
  }
  return false;
}
function hasValidSelection(domEvent) {
  return domEvent.type === "selectionchange" ? isSelectionValid() : domEvent.type === "select";
}
function isPrimaryPointerDown(domEvent) {
  const {
    altKey,
    button,
    buttons,
    ctrlKey,
    type
  } = domEvent, isTouch = type === "touchstart" || type === "touchmove", isPrimaryMouseDown = type === "mousedown" && (button === 0 || buttons === 1), isPrimaryMouseMove = type === "mousemove" && buttons === 1, noModifiers = altKey === false && ctrlKey === false;
  return !!(isTouch || isPrimaryMouseDown && noModifiers || isPrimaryMouseMove && noModifiers);
}
function isSelectionValid() {
  const selection = window.getSelection();
  if (!selection) return false;
  const string = selection.toString(), anchorNode = selection.anchorNode, focusNode = selection.focusNode, isTextNode = anchorNode && anchorNode.nodeType === window.Node.TEXT_NODE || focusNode && focusNode.nodeType === window.Node.TEXT_NODE;
  return string.length >= 1 && string !== `
` && !!isTextNode;
}
const emptyFunction = () => {
}, emptyObject$2 = {}, emptyArray = [];
function normalizeIdentifier(identifier) {
  return identifier > 20 ? identifier % 20 : identifier;
}
function createResponderEvent(domEvent, responderTouchHistoryStore2) {
  let rect, propagationWasStopped = false, changedTouches, touches;
  const domEventChangedTouches = domEvent.changedTouches, domEventType = domEvent.type, metaKey = domEvent.metaKey === true, shiftKey = domEvent.shiftKey === true, force = (domEventChangedTouches == null ? void 0 : domEventChangedTouches[0].force) || 0, identifier = normalizeIdentifier((domEventChangedTouches == null ? void 0 : domEventChangedTouches[0].identifier) || 0), clientX = (domEventChangedTouches == null ? void 0 : domEventChangedTouches[0].clientX) || domEvent.clientX, clientY = (domEventChangedTouches == null ? void 0 : domEventChangedTouches[0].clientY) || domEvent.clientY, pageX = (domEventChangedTouches == null ? void 0 : domEventChangedTouches[0].pageX) || domEvent.pageX, pageY = (domEventChangedTouches == null ? void 0 : domEventChangedTouches[0].pageY) || domEvent.pageY, preventDefault = typeof domEvent.preventDefault == "function" ? domEvent.preventDefault.bind(domEvent) : emptyFunction, timestamp = domEvent.timeStamp;
  function normalizeTouches(touches2) {
    return Array.prototype.slice.call(touches2).map((touch) => ({
      force: touch.force,
      identifier: normalizeIdentifier(touch.identifier),
      get locationX() {
        return locationX(touch.clientX);
      },
      get locationY() {
        return locationY(touch.clientY);
      },
      pageX: touch.pageX,
      pageY: touch.pageY,
      target: touch.target,
      timestamp
    }));
  }
  if (domEventChangedTouches != null) changedTouches = normalizeTouches(domEventChangedTouches), touches = normalizeTouches(domEvent.touches);
  else {
    const emulatedTouches = [{
      force,
      identifier,
      get locationX() {
        return locationX(clientX);
      },
      get locationY() {
        return locationY(clientY);
      },
      pageX,
      pageY,
      target: domEvent.target,
      timestamp
    }];
    changedTouches = emulatedTouches, touches = domEventType === "mouseup" || domEventType === "dragstart" ? emptyArray : emulatedTouches;
  }
  const responderEvent = {
    bubbles: true,
    cancelable: true,
    // `currentTarget` is set before dispatch
    currentTarget: null,
    defaultPrevented: domEvent.defaultPrevented,
    dispatchConfig: emptyObject$2,
    eventPhase: domEvent.eventPhase,
    isDefaultPrevented() {
      return domEvent.defaultPrevented;
    },
    isPropagationStopped() {
      return propagationWasStopped;
    },
    isTrusted: domEvent.isTrusted,
    nativeEvent: {
      altKey: false,
      ctrlKey: false,
      metaKey,
      shiftKey,
      changedTouches,
      force,
      identifier,
      get locationX() {
        return locationX(clientX);
      },
      get locationY() {
        return locationY(clientY);
      },
      pageX,
      pageY,
      target: domEvent.target,
      timestamp,
      touches,
      type: domEventType
    },
    persist: emptyFunction,
    preventDefault,
    stopPropagation() {
      propagationWasStopped = true;
    },
    target: domEvent.target,
    timeStamp: timestamp,
    touchHistory: responderTouchHistoryStore2.touchHistory
  };
  function locationX(x) {
    if (rect = rect || getBoundingClientRect$1(responderEvent.currentTarget), rect) return x - rect.left;
  }
  function locationY(y) {
    if (rect = rect || getBoundingClientRect$1(responderEvent.currentTarget), rect) return y - rect.top;
  }
  return responderEvent;
}
const MOUSE_DOWN = "mousedown", MOUSE_MOVE = "mousemove", MOUSE_UP = "mouseup", MOUSE_CANCEL = "dragstart", TOUCH_START = "touchstart", TOUCH_MOVE = "touchmove", TOUCH_END = "touchend", TOUCH_CANCEL = "touchcancel", SCROLL = "scroll", SELECT = "select", SELECTION_CHANGE = "selectionchange";
function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}
function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}
function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}
function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}
function isScroll(eventType) {
  return eventType === SCROLL;
}
function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
}
class ResponderTouchHistoryStore {
  constructor() {
    __publicField(this, "_touchHistory", {
      touchBank: [],
      //Array<TouchRecord>
      numberActiveTouches: 0,
      // If there is only one active touch, we remember its location. This prevents
      // us having to loop through all of the touches all the time in the most
      // common case.
      indexOfSingleActiveTouch: -1,
      mostRecentTimeStamp: 0
    });
  }
  recordTouchTrack(topLevelType, nativeEvent) {
    var _a2;
    const touchHistory = this._touchHistory;
    if (isMoveish(topLevelType)) nativeEvent.changedTouches.forEach((touch) => recordTouchMove(touch, touchHistory));
    else if (isStartish(topLevelType)) nativeEvent.changedTouches.forEach((touch) => recordTouchStart(touch, touchHistory)), touchHistory.numberActiveTouches = nativeEvent.touches.length, touchHistory.numberActiveTouches === 1 && (touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier);
    else if (isEndish(topLevelType) && (nativeEvent.changedTouches.forEach((touch) => recordTouchEnd(touch, touchHistory)), touchHistory.numberActiveTouches = nativeEvent.touches.length, touchHistory.numberActiveTouches === 1)) {
      const {
        touchBank
      } = touchHistory;
      for (let i = 0; i < touchBank.length; i++) if ((_a2 = touchBank[i]) == null ? void 0 : _a2.touchActive) {
        touchHistory.indexOfSingleActiveTouch = i;
        break;
      }
    }
  }
  get touchHistory() {
    return this._touchHistory;
  }
}
const MAX_TOUCH_BANK = 20;
function timestampForTouch(touch) {
  return touch.timeStamp || touch.timestamp;
}
function createTouchRecord(touch) {
  return {
    touchActive: true,
    startPageX: touch.pageX,
    startPageY: touch.pageY,
    startTimeStamp: timestampForTouch(touch),
    currentPageX: touch.pageX,
    currentPageY: touch.pageY,
    currentTimeStamp: timestampForTouch(touch),
    previousPageX: touch.pageX,
    previousPageY: touch.pageY,
    previousTimeStamp: timestampForTouch(touch)
  };
}
function resetTouchRecord(touchRecord, touch) {
  touchRecord.touchActive = true, touchRecord.startPageX = touch.pageX, touchRecord.startPageY = touch.pageY, touchRecord.startTimeStamp = timestampForTouch(touch), touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchRecord.previousPageX = touch.pageX, touchRecord.previousPageY = touch.pageY, touchRecord.previousTimeStamp = timestampForTouch(touch);
}
function getTouchIdentifier({
  identifier
}) {
  return identifier == null && console.error("Touch object is missing identifier."), identifier;
}
function recordTouchStart(touch, touchHistory) {
  const identifier = getTouchIdentifier(touch), touchRecord = touchHistory.touchBank[identifier];
  touchRecord ? resetTouchRecord(touchRecord, touch) : touchHistory.touchBank[identifier] = createTouchRecord(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
}
function recordTouchMove(touch, touchHistory) {
  const touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  touchRecord ? (touchRecord.touchActive = true, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn(`Cannot record touch move without a touch start.
`, `Touch Move: ${printTouch(touch)}
`, `Touch Bank: ${printTouchBank(touchHistory)}`);
}
function recordTouchEnd(touch, touchHistory) {
  const touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  touchRecord ? (touchRecord.touchActive = false, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn(`Cannot record touch end without a touch start.
`, `Touch End: ${printTouch(touch)}
`, `Touch Bank: ${printTouchBank(touchHistory)}`);
}
function printTouch(touch) {
  return JSON.stringify({
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    timestamp: timestampForTouch(touch)
  });
}
function printTouchBank(touchHistory) {
  const {
    touchBank
  } = touchHistory;
  let printed = JSON.stringify(touchBank.slice(0, MAX_TOUCH_BANK));
  return touchBank.length > MAX_TOUCH_BANK && (printed += ` (original size: ${touchBank.length})`), printed;
}
const emptyObject$1 = {}, startRegistration = ["onStartShouldSetResponderCapture", "onStartShouldSetResponder", {
  bubbles: true
}], moveRegistration = ["onMoveShouldSetResponderCapture", "onMoveShouldSetResponder", {
  bubbles: true
}], scrollRegistration = ["onScrollShouldSetResponderCapture", "onScrollShouldSetResponder", {
  bubbles: false
}], shouldSetResponderEvents = {
  touchstart: startRegistration,
  mousedown: startRegistration,
  touchmove: moveRegistration,
  mousemove: moveRegistration,
  scroll: scrollRegistration
}, emptyResponder = {
  id: null,
  idPath: null,
  node: null
}, responderListenersMap = /* @__PURE__ */ new Map();
let isEmulatingMouseEvents = false, trackedTouchCount = 0, currentResponder = {
  id: null,
  node: null,
  idPath: null
};
const responderTouchHistoryStore = new ResponderTouchHistoryStore();
function changeCurrentResponder(responder) {
  currentResponder = responder;
}
function getResponderConfig(id) {
  const config = responderListenersMap.get(id);
  return config ?? emptyObject$1;
}
function eventListener(domEvent) {
  const eventType = domEvent.type, eventTarget = domEvent.target;
  if (eventType === "touchstart" && (isEmulatingMouseEvents = true), (eventType === "touchmove" || trackedTouchCount > 1) && (isEmulatingMouseEvents = false), // Ignore browser emulated mouse events
  eventType === "mousedown" && isEmulatingMouseEvents || eventType === "mousemove" && isEmulatingMouseEvents || // Ignore mousemove if a mousedown didn't occur first
  eventType === "mousemove" && trackedTouchCount < 1) return;
  if (isEmulatingMouseEvents && eventType === "mouseup") {
    trackedTouchCount === 0 && (isEmulatingMouseEvents = false);
    return;
  }
  const isStartEvent = isStartish(eventType) && isPrimaryPointerDown(domEvent), isMoveEvent = isMoveish(eventType), isEndEvent = isEndish(eventType), isScrollEvent = isScroll(eventType), isSelectionChangeEvent = isSelectionChange(eventType), responderEvent = createResponderEvent(domEvent, responderTouchHistoryStore);
  (isStartEvent || isMoveEvent || isEndEvent) && (domEvent.touches ? trackedTouchCount = domEvent.touches.length : isStartEvent ? trackedTouchCount = 1 : isEndEvent && (trackedTouchCount = 0), responderTouchHistoryStore.recordTouchTrack(eventType, responderEvent.nativeEvent));
  let eventPaths = getResponderPaths(domEvent), wasNegotiated = false, wantsResponder;
  if (isStartEvent || isMoveEvent || isScrollEvent && trackedTouchCount > 0) {
    const currentResponderIdPath = currentResponder.idPath, eventIdPath = eventPaths.idPath;
    if (currentResponderIdPath != null && eventIdPath != null) {
      const lowestCommonAncestor = getLowestCommonAncestor(currentResponderIdPath, eventIdPath);
      if (lowestCommonAncestor != null) {
        const index2 = eventIdPath.indexOf(lowestCommonAncestor) + (lowestCommonAncestor === currentResponder.id ? 1 : 0);
        eventPaths = {
          idPath: eventIdPath.slice(index2),
          nodePath: eventPaths.nodePath.slice(index2)
        };
      } else eventPaths = null;
    }
    eventPaths != null && (wantsResponder = findWantsResponder(eventPaths, domEvent, responderEvent), wantsResponder != null && (attemptTransfer(responderEvent, wantsResponder), wasNegotiated = true));
  }
  if (currentResponder.id != null && currentResponder.node != null) {
    const {
      id,
      node
    } = currentResponder, {
      onResponderStart,
      onResponderMove,
      onResponderEnd,
      onResponderRelease,
      onResponderTerminate,
      onResponderTerminationRequest
    } = getResponderConfig(id);
    if (responderEvent.bubbles = false, responderEvent.cancelable = false, responderEvent.currentTarget = node, isStartEvent) onResponderStart != null && (responderEvent.dispatchConfig.registrationName = "onResponderStart", onResponderStart(responderEvent));
    else if (isMoveEvent) onResponderMove != null && (responderEvent.dispatchConfig.registrationName = "onResponderMove", onResponderMove(responderEvent));
    else {
      const isTerminateEvent = isCancelish(eventType) || // native context menu
      eventType === "contextmenu" || // window blur
      eventType === "blur" && eventTarget === window || // responder (or ancestors) blur
      eventType === "blur" && eventTarget.contains(node) && domEvent.relatedTarget !== node || // native scroll without using a pointer
      isScrollEvent && trackedTouchCount === 0 || // native scroll on node that is parent of the responder (allow siblings to scroll)
      isScrollEvent && eventTarget.contains(node) && eventTarget !== node || // native select/selectionchange on node
      isSelectionChangeEvent && hasValidSelection(domEvent), isReleaseEvent = isEndEvent && !isTerminateEvent && !hasTargetTouches(node, domEvent.touches);
      if (isEndEvent && onResponderEnd != null && (responderEvent.dispatchConfig.registrationName = "onResponderEnd", onResponderEnd(responderEvent)), isReleaseEvent && (onResponderRelease != null && (responderEvent.dispatchConfig.registrationName = "onResponderRelease", onResponderRelease(responderEvent)), changeCurrentResponder(emptyResponder)), isTerminateEvent) {
        let shouldTerminate = true;
        (eventType === "contextmenu" || eventType === "scroll" || eventType === "selectionchange") && (wasNegotiated ? shouldTerminate = false : onResponderTerminationRequest != null && (responderEvent.dispatchConfig.registrationName = "onResponderTerminationRequest", onResponderTerminationRequest(responderEvent) === false && (shouldTerminate = false))), shouldTerminate && (onResponderTerminate != null && (responderEvent.dispatchConfig.registrationName = "onResponderTerminate", onResponderTerminate(responderEvent)), changeCurrentResponder(emptyResponder), isEmulatingMouseEvents = false, trackedTouchCount = 0);
      }
    }
  }
}
function findWantsResponder(eventPaths, domEvent, responderEvent) {
  const shouldSetCallbacks = shouldSetResponderEvents[domEvent.type];
  if (shouldSetCallbacks != null) {
    const {
      idPath,
      nodePath
    } = eventPaths, shouldSetCallbackCaptureName = shouldSetCallbacks[0], shouldSetCallbackBubbleName = shouldSetCallbacks[1], {
      bubbles
    } = shouldSetCallbacks[2], check = (id, node, callbackName) => {
      const shouldSetCallback = getResponderConfig(id)[callbackName];
      if (shouldSetCallback != null && (responderEvent.currentTarget = node, shouldSetCallback(responderEvent) === true)) {
        const prunedIdPath = idPath.slice(idPath.indexOf(id));
        return {
          id,
          node,
          idPath: prunedIdPath
        };
      }
    };
    for (let i = idPath.length - 1; i >= 0; i--) {
      const id = idPath[i], node = nodePath[i], result = check(id, node, shouldSetCallbackCaptureName);
      if (result != null) return result;
      if (responderEvent.isPropagationStopped() === true) return;
    }
    if (bubbles) for (let i = 0; i < idPath.length; i++) {
      const id = idPath[i], node = nodePath[i], result = check(id, node, shouldSetCallbackBubbleName);
      if (result != null) return result;
      if (responderEvent.isPropagationStopped() === true) return;
    }
    else {
      const id = idPath[0], node = nodePath[0];
      if (domEvent.target === node) return check(id, node, shouldSetCallbackBubbleName);
    }
  }
}
function attemptTransfer(responderEvent, wantsResponder) {
  const {
    id: currentId,
    node: currentNode
  } = currentResponder, {
    id,
    node
  } = wantsResponder, {
    onResponderGrant,
    onResponderReject
  } = getResponderConfig(id);
  if (responderEvent.bubbles = false, responderEvent.cancelable = false, responderEvent.currentTarget = node, currentId == null) onResponderGrant != null && (responderEvent.currentTarget = node, responderEvent.dispatchConfig.registrationName = "onResponderGrant", onResponderGrant(responderEvent)), changeCurrentResponder(wantsResponder);
  else {
    const {
      onResponderTerminate,
      onResponderTerminationRequest
    } = getResponderConfig(currentId);
    let allowTransfer = true;
    onResponderTerminationRequest != null && (responderEvent.currentTarget = currentNode, responderEvent.dispatchConfig.registrationName = "onResponderTerminationRequest", onResponderTerminationRequest(responderEvent) === false && (allowTransfer = false)), allowTransfer ? (onResponderTerminate != null && (responderEvent.currentTarget = currentNode, responderEvent.dispatchConfig.registrationName = "onResponderTerminate", onResponderTerminate(responderEvent)), onResponderGrant != null && (responderEvent.currentTarget = node, responderEvent.dispatchConfig.registrationName = "onResponderGrant", onResponderGrant(responderEvent)), changeCurrentResponder(wantsResponder)) : onResponderReject != null && (responderEvent.currentTarget = node, responderEvent.dispatchConfig.registrationName = "onResponderReject", onResponderReject(responderEvent));
  }
}
const documentEventsCapturePhase = ["blur", "scroll"], documentEventsBubblePhase = [
  // mouse
  "mousedown",
  "mousemove",
  "mouseup",
  "dragstart",
  // touch
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  // other
  "contextmenu",
  "select",
  "selectionchange"
], isTamaguiResponderActive = Symbol();
function attachListeners() {
  canUseDOM && !window[isTamaguiResponderActive] && (window.addEventListener("blur", eventListener), documentEventsBubblePhase.forEach((eventType) => {
    document.addEventListener(eventType, eventListener);
  }), documentEventsCapturePhase.forEach((eventType) => {
    document.addEventListener(eventType, eventListener, true);
  }), window[isTamaguiResponderActive] = true);
}
function addNode(id, node, config) {
  setResponderId(node, id), responderListenersMap.set(id, config);
}
function removeNode(id) {
  currentResponder.id === id && terminateResponder(), responderListenersMap.has(id) && responderListenersMap.delete(id);
}
function terminateResponder() {
  const {
    id,
    node
  } = currentResponder;
  if (id != null && node != null) {
    const {
      onResponderTerminate
    } = getResponderConfig(id);
    if (onResponderTerminate != null) {
      const event = createResponderEvent({}, responderTouchHistoryStore);
      event.currentTarget = node, onResponderTerminate(event);
    }
    changeCurrentResponder(emptyResponder);
  }
  isEmulatingMouseEvents = false, trackedTouchCount = 0;
}
const emptyObject = {}, Attached = /* @__PURE__ */ new WeakMap(), Ids = /* @__PURE__ */ new WeakMap();
function useResponderEvents(hostRef, configIn = emptyObject) {
  var _a2;
  const config = getResponderConfigIfDefined(configIn), node = ((_a2 = hostRef == null ? void 0 : hostRef.current) == null ? void 0 : _a2.host) || (hostRef == null ? void 0 : hostRef.current);
  React.useEffect(() => {
    if (config === emptyObject) return;
    attachListeners(), Ids.has(hostRef) || Ids.set(hostRef, `${Math.random()}`);
    const id = Ids.get(hostRef);
    return addNode(id, node, config), Attached.set(hostRef, true), () => {
      removeNode(node), Attached.set(hostRef, false);
    };
  }, [config, hostRef]);
}
function getResponderConfigIfDefined({
  onMoveShouldSetResponder,
  onMoveShouldSetResponderCapture,
  onResponderEnd,
  onResponderGrant,
  onResponderMove,
  onResponderReject,
  onResponderRelease,
  onResponderStart,
  onResponderTerminate,
  onResponderTerminationRequest,
  onScrollShouldSetResponder,
  onScrollShouldSetResponderCapture,
  onSelectionChangeShouldSetResponder,
  onSelectionChangeShouldSetResponderCapture,
  onStartShouldSetResponder,
  onStartShouldSetResponderCapture
}) {
  return onMoveShouldSetResponder || onMoveShouldSetResponderCapture || onResponderEnd || onResponderGrant || onResponderMove || onResponderReject || onResponderRelease || onResponderStart || onResponderTerminate || onResponderTerminationRequest || onScrollShouldSetResponder || onScrollShouldSetResponderCapture || onSelectionChangeShouldSetResponder || onSelectionChangeShouldSetResponderCapture || onStartShouldSetResponder || onStartShouldSetResponderCapture ? {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  } : emptyObject;
}
function getBaseViews() {
  return null;
}
const getBoundingClientRect = (node) => {
  var _a2;
  if (!(!node || node.nodeType !== 1)) return (_a2 = node.getBoundingClientRect) == null ? void 0 : _a2.call(node);
};
const getRect = (node) => {
  const rect = getBoundingClientRect(node);
  if (!rect) return;
  const {
    x,
    y,
    top,
    left
  } = rect;
  return {
    x,
    y,
    width: node.offsetWidth,
    height: node.offsetHeight,
    top,
    left
  };
};
const LayoutHandlers = /* @__PURE__ */ new WeakMap(), resizeListeners = /* @__PURE__ */ new Set();
let resizeObserver = null;
if (typeof window < "u" && "ResizeObserver" in window && (resizeObserver = new ResizeObserver((entries) => {
  for (const {
    target
  } of entries) {
    const onLayout = LayoutHandlers.get(target);
    if (typeof onLayout != "function") return;
    measureElement(target).then((event) => {
      onLayout(event);
    });
  }
}), typeof window.addEventListener == "function")) {
  let tm;
  window.addEventListener("resize", () => {
    clearTimeout(tm), tm = setTimeout(() => {
      resizeListeners.forEach((cb) => cb());
    }, 4);
  });
}
const measureElement = async (target) => new Promise((res) => {
  measureLayout(target, null, (x, y, width, height, left, top) => {
    res({
      nativeEvent: {
        layout: {
          x,
          y,
          width,
          height,
          left,
          top
        },
        target
      },
      timeStamp: Date.now()
    });
  });
}), cache = /* @__PURE__ */ new WeakMap(), measureLayout = (node, relativeTo, callback) => {
  const relativeNode = relativeTo || (node == null ? void 0 : node.parentNode);
  if (relativeNode instanceof HTMLElement) {
    const now = Date.now();
    cache.set(node, now), Promise.all([getBoundingClientRectAsync(node), getBoundingClientRectAsync(relativeNode)]).then(([nodeDim, relativeNodeDim]) => {
      if (relativeNodeDim && nodeDim && cache.get(node) === now) {
        const {
          x,
          y,
          width,
          height,
          left,
          top
        } = getRelativeDimensions(nodeDim, relativeNodeDim);
        callback(x, y, width, height, left, top);
      }
    });
  }
}, getRelativeDimensions = (a, b) => {
  const {
    height,
    left,
    top,
    width
  } = a, x = left - b.left, y = top - b.top;
  return {
    x,
    y,
    width,
    height,
    left,
    top
  };
}, getBoundingClientRectAsync = (element) => new Promise((resolve) => {
  function fallbackToSync() {
    resolve(getBoundingClientRect(element));
  }
  const tm = setTimeout(fallbackToSync, 10);
  new IntersectionObserver((entries, ob) => {
    var _a2;
    clearTimeout(tm), ob.disconnect(), resolve((_a2 = entries[0]) == null ? void 0 : _a2.boundingClientRect);
  }, {
    threshold: 1e-4
  }).observe(element);
});
function useElementLayout(ref, onLayout) {
  var _a2;
  const node = (_a2 = ref.current) == null ? void 0 : _a2.host;
  node && onLayout && LayoutHandlers.set(node, onLayout), useIsomorphicLayoutEffect(() => {
    var _a3;
    if (!resizeObserver || !onLayout) return;
    const node2 = (_a3 = ref.current) == null ? void 0 : _a3.host;
    if (!node2) return;
    LayoutHandlers.set(node2, onLayout);
    const onResize = () => {
      measureElement(node2).then(onLayout);
    };
    return resizeListeners.add(onResize), resizeObserver.observe(node2), () => {
      LayoutHandlers.delete(node2), resizeListeners.delete(onResize), resizeObserver == null ? void 0 : resizeObserver.unobserve(node2);
    };
  }, [ref, !!onLayout]);
}
setupHooks({
  getBaseViews,
  setElementProps: (node) => {
    node && !node.measure && (node.measure || (node.measure = (callback) => measureLayout(node, null, callback)), node.measureLayout || (node.measureLayout = (relativeToNode, success) => measureLayout(node, relativeToNode, success)), node.measureInWindow || (node.measureInWindow = (callback) => {
      setTimeout(() => {
        const {
          height,
          left,
          top,
          width
        } = getRect(node);
        callback(left, top, width, height);
      }, 0);
    }));
  },
  usePropsTransform(elementType, propsIn, stateRef, willHydrate) {
    {
      const isDOM = typeof elementType == "string", {
        // remove event props handles by useResponderEvents
        onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture,
        onResponderEnd,
        onResponderGrant,
        onResponderMove,
        onResponderReject,
        onResponderRelease,
        onResponderStart,
        onResponderTerminate,
        onResponderTerminationRequest,
        onScrollShouldSetResponder,
        onScrollShouldSetResponderCapture,
        onSelectionChangeShouldSetResponder,
        onSelectionChangeShouldSetResponderCapture,
        onStartShouldSetResponder,
        onStartShouldSetResponderCapture,
        // android
        collapsable,
        focusable,
        // deprecated,
        accessible,
        accessibilityDisabled,
        onLayout,
        hrefAttrs,
        ...plainDOMProps
      } = propsIn;
      if ((willHydrate || isDOM) && (useElementLayout(stateRef, isDOM ? onLayout : void 0), useResponderEvents(stateRef, isDOM ? propsIn : void 0)), isDOM) {
        if (plainDOMProps.href && hrefAttrs) {
          const {
            download,
            rel,
            target
          } = hrefAttrs;
          download != null && (plainDOMProps.download = download), rel && (plainDOMProps.rel = rel), typeof target == "string" && (plainDOMProps.target = target.charAt(0) !== "_" ? `_${target}` : target);
        }
        return plainDOMProps;
      }
    }
  },
  useEvents(viewProps, events, {
    pseudos
  }, setStateShallow, staticConfig) {
  }
});
const View = View$1, Stack = Stack$1, Text = Text$1;
export {
  isServer as A,
  createStyledContext as B,
  ComponentContext as C,
  useMedia as D,
  isWeb as E,
  isIos as F,
  isAndroid as G,
  useComposedRefs as H,
  composeRefs as I,
  composeEventHandlers as J,
  useTheme as K,
  getVariable as L,
  useProps as M,
  Spacer as N,
  transformsToString as O,
  SchemeProvider as P,
  useColorScheme as Q,
  View$1 as R,
  Stack as S,
  THEME_CLASSNAME_PREFIX as T,
  usePropsAndStyle as U,
  View as V,
  Text as W,
  getTokenValue as X,
  useSchemeSetting as Y,
  createCSSVariable as a,
  getSetting as b,
  createVariable as c,
  sortString as d,
  getTokenObject as e,
  scanAllSheets as f,
  getVariableValue as g,
  configureMedia as h,
  isVariable as i,
  configListeners as j,
  setTokens as k,
  listenForSheetChanges as l,
  getAllRules as m,
  setConfig as n,
  getThemeManager as o,
  ThemeManagerIDContext as p,
  getConfig as q,
  isTouchable as r,
  simpleHash as s,
  isClient as t,
  useIsomorphicLayoutEffect as u,
  variableToString as v,
  Theme as w,
  styled as x,
  getTokens as y,
  Text$1 as z
};
