const CLIENT_BASE_URL = typeof window < "u" && window.location ? `${window.location.protocol}//${window.location.host}` : "";
function getURL() {
  return CLIENT_BASE_URL || process.env.ONE_SERVER_URL || "http://localhost";
}
export {
  getURL
};
//# sourceMappingURL=getURL.js.map
