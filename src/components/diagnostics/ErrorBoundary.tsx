import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mb-4">{this.state.error?.message}</p>
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90" onClick={() => { this.setState({ hasError: false }); }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
