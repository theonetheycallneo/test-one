function assertIsReady(navigationRef) {
  if (!navigationRef.isReady())
    throw new Error("Attempted to navigate before mounting the Root Layout component. Ensure the Root Layout component is rendering a Slot, or other navigator on the first render.");
}
export {
  assertIsReady
};
//# sourceMappingURL=assertIsReady.js.map
