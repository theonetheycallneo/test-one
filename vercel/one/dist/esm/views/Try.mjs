import React from "react";
import { jsx } from "react/jsx-runtime";
class Try extends React.Component {
  state = {
    error: void 0
  };
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  retry = () => new Promise(resolve => {
    this.setState({
      error: void 0
    }, () => {
      resolve();
    });
  });
  render() {
    const {
        error
      } = this.state,
      {
        catch: ErrorBoundary,
        children
      } = this.props;
    return error ? /* @__PURE__ */jsx(ErrorBoundary, {
      error,
      retry: this.retry
    }) : children;
  }
}
export { Try };
//# sourceMappingURL=Try.mjs.map
