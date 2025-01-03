function hasUrlProtocolPrefix(href) {
  return /^[\w\d_+.-]+:\/\//.test(href);
}
function isWellKnownUri(href) {
  return /^(https?|mailto|tel|sms|geo|maps|market|itmss?|itms-apps|content|file):/.test(href);
}
function shouldLinkExternally(href) {
  return !/^[./]/.test(href) && (hasUrlProtocolPrefix(href) || isWellKnownUri(href));
}
export {
  hasUrlProtocolPrefix,
  isWellKnownUri,
  shouldLinkExternally
};
//# sourceMappingURL=url.js.map
