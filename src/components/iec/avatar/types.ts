/**
 * TIKA Video Avatar System Types
 *
 * Clean decoupled types for the TIKA state machine and avatar renderer.
 */

export type TikaAvatarState =
  "idle" | "listening" | "thinking" | "speaking" | "offline" | "error";

export interface TikaAvatarAssetConfig {
  mp4?: string;
  webm?: string;
  poster?: string;
}

export interface TikaAvatarProps {
  /**
   * Current avatar state machine state.
   * 'idle' | 'listening' | 'thinking' | 'speaking' | 'offline' | 'error'
   */
  state: TikaAvatarState;

  /** Optional CSS classes for the container */
  className?: string;

  /**
   * Dedicated asset base path (default: '/tika').
   * Allows assets to be served locally or easily moved to CDN / object storage.
   */
  basePath?: string;

  /** Custom asset overrides per state if using external CDN URLs */
  customAssets?: Partial<Record<TikaAvatarState, TikaAvatarAssetConfig>>;

  /** Fallback poster image URL */
  fallbackPoster?: string;

  /** Whether to show the floating status badge pill (e.g. "TIKA - Online") */
  showStatusBadge?: boolean;

  /** Status badge position */
  badgePosition?: "bottom-center" | "bottom-left" | "top-right";

  /** Custom status label overrides */
  statusLabels?: Partial<Record<TikaAvatarState, string>>;

  /** Accessibility label for screen readers */
  ariaLabel?: string;

  /** Called when video fails to load or play */
  onError?: (error: unknown) => void;
}
