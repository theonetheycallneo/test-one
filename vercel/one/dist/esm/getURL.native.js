import getDevServer from "react-native/Libraries/Core/Devtools/getDevServer";
function getURL() {
  var url = process.env.ONE_SERVER_URL;
  if (__DEV__) {
    url || console.warn("The ONE_SERVER_URL environment variable is not set. While things will work in development mode as we'll be using your development server, you should still set ONE_SERVER_URL in your .env file for your production builds to work.");
    var { url: devServerUrl } = getDevServer();
    url = devServerUrl;
  }
  return url || (url = "http://one-server.example.com"), url.replace(/\/+$/, "");
}
export {
  getURL
};
//# sourceMappingURL=getURL.native.js.map
