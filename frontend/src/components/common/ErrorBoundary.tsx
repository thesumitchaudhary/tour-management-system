import { Component, type PropsWithChildren, type ReactNode } from "react";
export default class ErrorBoundary extends Component<PropsWithChildren<{ fallback?: ReactNode }>, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? (this.props.fallback ?? <p role="alert">Something went wrong.</p>) : this.props.children; }
}
