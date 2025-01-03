function removeUndefined(obj) {
  const result = {};
  for (const key in obj) obj[key] !== void 0 && (result[key] = obj[key]);
  return result;
}
export { removeUndefined };
//# sourceMappingURL=removeUndefined.mjs.map
