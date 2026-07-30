import { motion } from "motion/react";
import { Info, Sun, Moon } from "lucide-react";
import { Cta } from "./Cta";
import logoUhn from "@/assets/uhn.png";

const nav = [
  { label: "Pengalaman", href: "#pengalaman" },
  { label: "Statistik", href: "#statistik" },
  { label: "Tentang IEC", href: "#tentang" },
];

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8"
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 pl-4 pr-2.5 sm:pl-6">
        <a href="#top" className="flex items-center gap-3.5">
          <img
            src={logoUhn}
            alt="Logo UHN"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <div className="leading-tight">
            <p className="font-display text-[0.82rem] font-semibold tracking-tight sm:text-sm">
              Universitas Harkat Negeri
            </p>
            <p className="text-[0.68rem] text-muted-foreground sm:text-xs">
              Fakultas Informatika · Experience Center
            </p>
          </div>
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigasi utama"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-border bg-glass transition-all duration-300 hover:border-rose/40 hover:scale-105"
            aria-label={isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-400" />
            )}
          </button>

          <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground md:inline">
            Dies Natalis 2026
          </span>
          <Cta
            href="#tentang"
            variant="glass"
            size="sm"
            className="rounded-full"
          >
            Tentang IEC
            <Info className="h-3.5 w-3.5" aria-hidden />
          </Cta>
        </div>
      </div>
    </motion.header>
  );
}
