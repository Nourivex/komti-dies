import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
      aria-label={isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-amber-400" />
          <span className="text-muted-foreground">Terang</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-indigo-400" />
          <span className="text-muted-foreground">Gelap</span>
        </>
      )}
    </button>
  );
}
