import logoUhn from "@/assets/uhn.png";

export function Footer() {
  return (
    <footer className="relative px-6 pb-14 pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-px w-full bg-[var(--gradient-line)]" />
        <div className="mt-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <img src={logoUhn} alt="" className="h-10 w-10 shrink-0 object-contain" aria-hidden />
            <div>
              <p className="font-display text-lg font-semibold">Informatics Experience Center</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fakultas Informatika · Universitas Harkat Negeri
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground sm:text-right">
            <p className="font-medium text-foreground/85">Interactive Exhibition</p>
            <p className="mt-1">Dies Natalis 2026</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground/70">
          © 2026 Universitas Harkat Negeri. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
