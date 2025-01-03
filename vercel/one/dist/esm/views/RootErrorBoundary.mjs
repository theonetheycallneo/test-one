import React from "react";
class RootErrorBoundary extends React.Component {
  state = {
    hasError: !1
  };
  static getDerivedStateFromError(error) {
    return console.error("RootErrorBoundary.error", error), {
      hasError: !0
    };
  }
  componentDidCatch(error, info) {
    console.error(`RootErrorBoundary.error:
${printError(error)}
${info.componentStack}`);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
function printError(err) {
  return `${err instanceof Error ? `${err.message}
${err.stack}` : err}`;
}
export { RootErrorBoundary };
//# sourceMappingURL=RootErrorBoundary.mjs.map
