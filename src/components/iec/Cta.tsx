import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const ctaVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--gradient-cta)] text-primary-foreground shadow-[0_18px_45px_-18px_var(--wine)] hover:shadow-[0_22px_60px_-14px_var(--rose)] hover:-translate-y-0.5",
        glass:
          "glass-panel text-foreground/90 hover:text-foreground hover:border-rose/40 hover:-translate-y-0.5",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = ComponentProps<"a"> & VariantProps<typeof ctaVariants>;

export function Cta({ className, variant, size, ...props }: CtaProps) {
  return <a className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}
