function isResponse(res) {
  return res instanceof Response || typeof res.status == "number" && "body" in res && typeof res.ok == "boolean";
}
export {
  isResponse
};
//# sourceMappingURL=isResponse.js.map
