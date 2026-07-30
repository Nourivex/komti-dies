/**
 * CanvasErrorBoundary — Catches R3F errors while suppressing dev-mode attribute conflicts.
 */
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    // Suppress dev-mode attribute conflicts (e.g. TanStack Router dev attributes on R3F elements)
    if (
      error?.message?.includes("data-tsd") ||
      error?.message?.includes("Cannot set") ||
      error?.message?.includes("setAttribute") ||
      error?.message?.includes("R3F")
    ) {
      return { hasError: false };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (
      error.message?.includes("data-tsd-source") ||
      error.message?.includes("Cannot set")
    ) {
      console.warn("[TIKA] R3F dev attribute conflict suppressed");
      return;
    }
    console.error("[TIKA] Canvas error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Visualisasi 3D sedang memuat ulang...
          </div>
        )
      );
    }
    return this.props.children;
  }
}
