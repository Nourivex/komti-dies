import { useState, useEffect, useRef, useCallback, memo } from "react";
import type {
  TikaAvatarProps,
  TikaAvatarState,
  TikaAvatarAssetConfig,
} from "./types";

/**
 * Next likely state map for targeted progressive preloading.
 * Prevents loading all avatar videos at once.
 */
const NEXT_LIKELY_STATE: Record<TikaAvatarState, TikaAvatarState | null> = {
  idle: "listening",
  listening: "thinking",
  thinking: "speaking",
  speaking: "idle",
  offline: null,
  error: null,
};

const DEFAULT_STATUS_LABELS: Record<
  TikaAvatarState,
  { label: string; dotClass: string }
> = {
  idle: { label: "✨ Online", dotClass: "bg-emerald-400" },
  listening: {
    label: "👂 Mendengarkan...",
    dotClass: "bg-sky-400 animate-pulse",
  },
  thinking: { label: "🤔 Berpikir...", dotClass: "bg-amber-400 animate-pulse" },
  speaking: { label: "🗣️ Berbicara...", dotClass: "bg-rose animate-pulse" },
  offline: { label: "⚪ Offline", dotClass: "bg-slate-500" },
  error: { label: "⚠️ Mode Hemat Daya", dotClass: "bg-amber-500" },
};

export const TikaAvatar = memo(function TikaAvatar({
  state = "idle",
  className = "",
  basePath = "/tika",
  customAssets,
  fallbackPoster,
  showStatusBadge = false,
  badgePosition = "bottom-center",
  statusLabels,
  ariaLabel,
  onError,
}: TikaAvatarProps) {
  // Respect user's motion preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Detect low performance or data saver
  const [useStaticFallback, setUseStaticFallback] = useState(false);

  // Double-buffering state: alternate between slot 'A' and slot 'B'
  const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
  const [slotAState, setSlotAState] = useState<TikaAvatarState>(state);
  const [slotBState, setSlotBState] = useState<TikaAvatarState | null>(null);
  const [slotAReady, setSlotAReady] = useState(false);
  const [slotBReady, setSlotBReady] = useState(false);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeSlotRef = useRef<"A" | "B">(activeSlot);
  activeSlotRef.current = activeSlot;

  // Detect accessibility and performance constraints
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Check Data Saver capability if available
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      setUseStaticFallback(true);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Helper to resolve asset URLs
  const getAsset = useCallback(
    (s: TikaAvatarState): TikaAvatarAssetConfig => {
      if (customAssets?.[s]) {
        return customAssets[s]!;
      }
      return {
        webm: `${basePath}/${s}.webm`,
        mp4: `${basePath}/${s}.mp4`,
        poster: `${basePath}/poster.webp`,
      };
    },
    [basePath, customAssets],
  );

  const posterSrc = fallbackPoster || `${basePath}/offline.webp`;
  const isStaticMode =
    state === "offline" ||
    state === "error" ||
    prefersReducedMotion ||
    useStaticFallback;

  // Next likely state URL for targeted preloading
  const nextLikelyState = NEXT_LIKELY_STATE[state];
  const nextLikelyAsset = nextLikelyState ? getAsset(nextLikelyState) : null;

  // Handle state transitions with seamless double-buffered crossfade
  useEffect(() => {
    if (isStaticMode) {
      // Pause both videos in static mode
      videoRefA.current?.pause();
      videoRefB.current?.pause();
      return;
    }

    const currentSlot = activeSlotRef.current;
    const incomingSlot = currentSlot === "A" ? "B" : "A";
    const currentVideo =
      currentSlot === "A" ? videoRefA.current : videoRefB.current;
    const incomingVideo =
      incomingSlot === "A" ? videoRefA.current : videoRefB.current;

    // Set incoming slot state
    if (incomingSlot === "A") {
      setSlotAState(state);
      setSlotAReady(false);
    } else {
      setSlotBState(state);
      setSlotBReady(false);
    }

    if (incomingVideo) {
      incomingVideo.load();
      const playPromise = incomingVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Playback blocked or failed (e.g. low-power mode on mobile)
          console.warn(
            "[TIKA Avatar] Video autoplay prevented, falling back to static poster",
            err,
          );
          setUseStaticFallback(true);
          onError?.(err);
        });
      }
    }

    // Safety timeout: transition anyway after 400ms even if canplay event delayed
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveSlot(incomingSlot);
      if (incomingSlot === "A") setSlotAReady(true);
      else setSlotBReady(true);

      // Pause old video after transition crossfade
      setTimeout(() => {
        currentVideo?.pause();
      }, 350);
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state, isStaticMode, onError]);

  // When incoming video has enough data to play smoothly
  const handleCanPlay = useCallback(
    (slot: "A" | "B") => {
      if (slot === "A") {
        setSlotAReady(true);
        if (activeSlot !== "A") {
          setActiveSlot("A");
          setTimeout(() => videoRefB.current?.pause(), 350);
        }
      } else {
        setSlotBReady(true);
        if (activeSlot !== "B") {
          setActiveSlot("B");
          setTimeout(() => videoRefA.current?.pause(), 350);
        }
      }
    },
    [activeSlot],
  );

  const handleVideoError = useCallback(
    (slot: "A" | "B", err: unknown) => {
      console.warn(`[TIKA Avatar] Video slot ${slot} playback error:`, err);
      setUseStaticFallback(true);
      onError?.(err);
    },
    [onError],
  );

  const statusInfo = DEFAULT_STATUS_LABELS[state] || DEFAULT_STATUS_LABELS.idle;
  const currentStatusLabel = statusLabels?.[state] || statusInfo.label;

  const badgePositionClasses = {
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
  }[badgePosition];

  return (
    <div
      className={`relative select-none overflow-hidden ${className}`}
      role="img"
      aria-label={
        ariaLabel || `TIKA Campus Assistant - Status: ${currentStatusLabel}`
      }
    >
      {/* Background Poster (Always rendered behind videos to prevent black flash) */}
      <img
        src={posterSrc}
        alt="TIKA Avatar"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
      />

      {/* HTML5 Video Layer A */}
      {!isStaticMode && (
        <video
          ref={videoRefA}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onCanPlay={() => handleCanPlay("A")}
          onError={(e) => handleVideoError("A", e)}
          className={`absolute inset-0 h-full w-full object-contain pointer-events-none transition-opacity duration-300 ease-in-out ${
            activeSlot === "A" && slotAReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {slotAState && (
            <>
              <source src={getAsset(slotAState).webm} type="video/webm" />
              <source src={getAsset(slotAState).mp4} type="video/mp4" />
            </>
          )}
        </video>
      )}

      {/* HTML5 Video Layer B */}
      {!isStaticMode && slotBState && (
        <video
          ref={videoRefB}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onCanPlay={() => handleCanPlay("B")}
          onError={(e) => handleVideoError("B", e)}
          className={`absolute inset-0 h-full w-full object-contain pointer-events-none transition-opacity duration-300 ease-in-out ${
            activeSlot === "B" && slotBReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={getAsset(slotBState).webm} type="video/webm" />
          <source src={getAsset(slotBState).mp4} type="video/mp4" />
        </video>
      )}

      {/* Targeted Preloader: ONLY preload the single next likely state video */}
      {!isStaticMode && nextLikelyAsset && (
        <video
          preload="auto"
          muted
          playsInline
          src={nextLikelyAsset.mp4}
          className="hidden pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Optional Status Badge Pill */}
      {showStatusBadge && (
        <div
          className={`absolute ${badgePositionClasses} pointer-events-none z-10`}
        >
          <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-lg backdrop-blur-md">
            <span className={`h-2 w-2 rounded-full ${statusInfo.dotClass}`} />
            <span className="text-xs font-semibold text-foreground">TIKA</span>
            <span className="text-[0.7rem] text-muted-foreground">
              {currentStatusLabel}
            </span>
          </div>
        </div>
      )}

      {/* Screen Reader Status Notification */}
      <span className="sr-only" aria-live="polite">
        {currentStatusLabel}
      </span>
    </div>
  );
});
