import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CAREER_PROFILES,
  PROGRAMS,
  CAREER_PROGRAM_MAP,
} from "@/lib/navigator-data";
import type { CareerMatch } from "@/lib/navigator-scoring";

interface CareerAccordionProps {
  matches: CareerMatch[];
}

export function CareerAccordion({ matches }: CareerAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto max-w-2xl space-y-3"
    >
      {matches.map((match) => {
        const profile = CAREER_PROFILES.find((p) => p.id === match.careerId);
        if (!profile) return null;

        const matchedPrograms = CAREER_PROGRAM_MAP.filter(
          (m) => m.career === match.careerId,
        )
          .map((m) => PROGRAMS.find((p) => p.code === m.programCode))
          .filter(Boolean);

        return (
          <AccordionItem
            key={match.careerId}
            value={match.careerId}
            className="glass-panel overflow-hidden rounded-2xl border-glass-border"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose/30 bg-rose/10 text-sm font-bold text-rose">
                  {match.matchPercent}%
                </span>
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.tagline}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5">
              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {profile.description}
              </p>

              {/* Skills */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-foreground/70">
                  Skill Utama:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-glass-border bg-background/60 px-2.5 py-0.5 text-[0.65rem] text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Salary */}
              {profile.avgSalary && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">
                    Gaji rata-rata:{" "}
                    <strong className="text-foreground">
                      {profile.avgSalary}
                    </strong>
                  </p>
                </div>
              )}

              {/* Related programs */}
              {matchedPrograms.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-foreground/70">
                    Jurusan Terkait:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedPrograms.map((prog) =>
                      prog ? (
                        <span
                          key={prog.code}
                          className="rounded-full border border-rose/20 bg-rose/5 px-2.5 py-0.5 text-[0.65rem] text-rose/80"
                        >
                          {prog.name}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
              )}

              {/* Why matches */}
              {match.reasons.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-foreground/70">
                    Kenapa direkomendasikan:
                  </p>
                  <ul className="space-y-1">
                    {match.reasons.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-rose" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
