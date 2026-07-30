import {
  QUESTIONS,
  CAREER_PROFILES,
  CAREER_PROGRAM_MAP,
  CAREER_SKILL_GAPS,
  CAREER_ROADMAPS,
  RADAR_AXES,
  PROGRAMS,
  FACULTIES,
  type CareerId,
  type Question,
  type SkillGap,
  type RoadmapStep,
  type UniversityProgram,
  type UniversityFaculty,
  type CareerProgramMatch,
} from "./navigator-data";

export interface RadarScore {
  axis: string;
  score: number;
  maxScore: number;
}

export interface CareerMatch {
  careerId: CareerId;
  name: string;
  tagline: string;
  matchPercent: number;
  reasons: string[];
  topSkills: string[];
}

export interface SkillGapData {
  skill: string;
  current: number;
  required: number;
  level: "strong" | "learning" | "not_started";
}

export interface ProgramRecommendation {
  program: UniversityProgram;
  faculty: UniversityFaculty;
  matchReason: string;
  isPrimary: boolean;
}

export interface NavigatorResult {
  personaName: string;
  personaDescription: string;
  radarScores: RadarScore[];
  topCareer: CareerMatch;
  careerMatches: CareerMatch[];
  skillGaps: SkillGapData[];
  roadmap: RoadmapStep[];
  programs: ProgramRecommendation[];
}

/**
 * Build a lookup: for each question+option index, accumulate scores into buckets.
 */
function aggregateScores(answers: Map<number, number | number[]>): {
  careerScores: Partial<Record<CareerId, number>>;
  radarScores: {
    creativity: number;
    analytical: number;
    communication: number;
    collaboration: number;
    technical: number;
  };
} {
  const careerScores: Partial<Record<CareerId, number>> = {};
  const radarScores = {
    creativity: 0,
    analytical: 0,
    communication: 0,
    collaboration: 0,
    technical: 0,
  };

  for (const question of QUESTIONS) {
    const answer = answers.get(question.id);
    if (answer === undefined) continue;

    const selectedIndices = Array.isArray(answer) ? answer : [answer];

    for (const idx of selectedIndices) {
      const option = question.options[idx];
      if (!option) continue;

      // Accumulate career scores
      for (const [careerId, score] of Object.entries(option.scores)) {
        careerScores[careerId as CareerId] =
          (careerScores[careerId as CareerId] || 0) + score;
      }

      // Accumulate radar scores based on question section
      mapToRadar(radarScores, question, idx);
    }
  }

  return { careerScores, radarScores };
}

/**
 * Map question answers to radar dimensions based on which section & option characteristics.
 */
function mapToRadar(
  radar: {
    creativity: number;
    analytical: number;
    communication: number;
    collaboration: number;
    technical: number;
  },
  question: Question,
  optionIndex: number,
) {
  const qId = question.id;
  const idx = optionIndex;

  // Section-based heuristics combined with option position
  switch (qId) {
    case 1: // Minat activities
      if (idx === 0 || idx === 4) radar.technical += 3;
      if (idx === 1) radar.creativity += 3;
      if (idx === 2) radar.communication += 3;
      if (idx === 3) radar.analytical += 3;
      break;
    case 2: // School activities
      if (idx === 0) radar.technical += 3;
      if (idx === 1) radar.communication += 3;
      if (idx === 2) radar.creativity += 3;
      if (idx === 3) radar.analytical += 3;
      if (idx === 4) radar.communication += 2;
      break;
    case 3: // Problem solving
      if (idx === 0) radar.analytical += 3;
      if (idx === 1) radar.creativity += 3;
      if (idx === 2) radar.communication += 3;
      if (idx === 3) radar.technical += 3;
      break;
    case 4: // Preference
      if (idx === 0) radar.analytical += 2;
      if (idx === 1) radar.technical += 2;
      if (idx === 2) radar.creativity += 2;
      if (idx === 3) radar.technical += 2;
      break;
    case 5: // Skills
      if (idx <= 1 || idx === 4 || idx === 7 || idx === 8) radar.technical += 2;
      if (idx === 2 || idx === 6) radar.creativity += 2;
      if (idx === 3) radar.communication += 2;
      if (idx === 5) radar.technical += 2;
      break;
    case 6: // Work style
      if (idx === 0) radar.analytical += 2;
      if (idx === 1) radar.collaboration += 2;
      if (idx === 2) radar.communication += 2;
      break;
    case 7: // Work preference
      if (idx === 0) radar.creativity += 2;
      if (idx === 1 || idx === 2) radar.technical += 2;
      if (idx === 2) radar.communication += 1;
      if (idx === 3) radar.communication += 2;
      break;
    case 8: // Goals
      if (idx === 0) radar.analytical += 2;
      if (idx === 1) radar.creativity += 2;
      if (idx === 2) radar.communication += 2;
      if (idx === 3) radar.technical += 2;
      if (idx === 4) radar.collaboration += 2;
      break;
    case 9: // Dream work
      if (idx === 0) radar.technical += 3;
      if (idx === 1) radar.creativity += 3;
      if (idx === 2) radar.analytical += 3;
      if (idx === 3) radar.technical += 3;
      break;
  }
}

/**
 * Normalize scores to 0-100 range for radar display.
 */
function normalizeRadarScores(raw: {
  creativity: number;
  analytical: number;
  communication: number;
  collaboration: number;
  technical: number;
}): RadarScore[] {
  const maxRaw = Math.max(...Object.values(raw), 1);
  return RADAR_AXES.map((axis) => ({
    axis: axis.label,
    score: Math.round(
      ((raw[axis.key as keyof typeof raw] || 0) / maxRaw) * 100,
    ),
    maxScore: 100,
  }));
}

/**
 * Calculate career match percentages and return top N.
 */
function calculateCareerMatches(
  careerScores: Partial<Record<CareerId, number>>,
  topN: number = 3,
): CareerMatch[] {
  const maxScore = Math.max(...Object.values(careerScores).map(Number), 1);

  const matches = Object.entries(careerScores)
    .map(([id, score]) => {
      const profile = CAREER_PROFILES.find((p) => p.id === id);
      if (!profile) return null;

      const matchPercent = Math.round((score / maxScore) * 100);
      const reasons = generateReasons(id as CareerId, careerScores);

      return {
        careerId: id as CareerId,
        name: profile.name,
        tagline: profile.tagline,
        matchPercent,
        reasons,
        topSkills: profile.skills.slice(0, 3),
      };
    })
    .filter(Boolean) as CareerMatch[];

  matches.sort((a, b) => b.matchPercent - a.matchPercent);
  return matches.slice(0, topN);
}

/**
 * Generate human-readable reasons for why a career matches.
 */
function generateReasons(
  careerId: CareerId,
  scores: Partial<Record<CareerId, number>>,
): string[] {
  const reasons: string[] = [];
  const profile = CAREER_PROFILES.find((p) => p.id === careerId);
  if (!profile) return reasons;

  // Find strongest matching dimension
  const sorted = Object.entries(scores).sort(
    (a, b) => (b[1] || 0) - (a[1] || 0),
  );
  const topCareer = sorted[0]?.[0];
  if (topCareer === careerId) {
    reasons.push("Minat kamu paling kuat di bidang ini");
  }

  // Add skill-based reasons
  if (
    [
      "ai_engineer",
      "software_engineer",
      "frontend_dev",
      "cyber_security",
      "cloud_engineer",
    ].includes(careerId)
  ) {
    reasons.push("Suka memecahkan masalah dengan logika");
  }
  if (
    [
      "uiux_designer",
      "graphic_designer",
      "content_creator",
      "digital_marketing",
    ].includes(careerId)
  ) {
    reasons.push("Kreativitas jadi kekuatan utama");
  }
  if (["data_analyst", "accountant"].includes(careerId)) {
    reasons.push("_detail-oriented_ dan suka bekerja dengan angka");
  }
  if (["it_pm", "digital_marketing", "lawyer"].includes(careerId)) {
    reasons.push("Komunikasi & leadership jadi kekuatan");
  }

  return reasons.slice(0, 3);
}

/**
 * Calculate skill gap data for the top career.
 */
function calculateSkillGaps(
  answers: Map<number, number | number[]>,
  careerId: CareerId,
): SkillGapData[] {
  const rawGaps = CAREER_SKILL_GAPS[careerId] || [];

  // Estimate current skill level from answers
  const estimatedSkills = estimateSkillsFromAnswers(answers);

  return rawGaps.map((gap) => {
    const current = Math.min(estimatedSkills[gap.skill] || gap.current, 100);
    const required = gap.required;
    let level: "strong" | "learning" | "not_started" = "not_started";
    if (current >= required * 0.7) level = "strong";
    else if (current >= required * 0.3) level = "learning";

    return {
      skill: gap.skill,
      current,
      required,
      level,
    };
  });
}

/**
 * Estimate skill levels from questionnaire answers.
 */
function estimateSkillsFromAnswers(
  answers: Map<number, number | number[]>,
): Record<string, number> {
  const skills: Record<string, number> = {};

  // Question 5 (skills) directly maps
  const skillAnswer = answers.get(5);
  if (Array.isArray(skillAnswer)) {
    const skillLabels = [
      "Coding / Pemrograman",
      "Desain (Canva, Figma, Photoshop)",
      "Edit video / foto",
      "Public speaking / presentasi",
      "Analisis data / Excel",
      "Robotik / Arduino / elektronik",
      "Menulis / blogging",
      "AI Prompt / ChatGPT",
      "Networking / setting WiFi / router",
    ];
    const skillNames = [
      "Programming",
      "Design",
      "Video Editing",
      "Communication",
      "Data Analysis",
      "Electronics",
      "Writing",
      "AI Prompt",
      "Networking",
    ];
    skillAnswer.forEach((idx, i) => {
      if (idx < skillLabels.length) {
        skills[skillNames[idx]] = 40; // "pernah coba" = baseline 40
      }
    });
  }

  // Q4 (problem solving preference) boosts technical
  const q4 = answers.get(4);
  if (q4 === 0 || q4 === 3) {
    skills["Problem Solving"] = (skills["Problem Solving"] || 20) + 15;
  }

  return skills;
}

/**
 * Generate personalized roadmap based on top career.
 */
function generateRoadmap(careerId: CareerId): RoadmapStep[] {
  return CAREER_ROADMAPS[careerId] || [];
}

/**
 * Get program recommendations for the top career.
 */
function getProgramRecommendations(
  careerId: CareerId,
): ProgramRecommendation[] {
  const matches = CAREER_PROGRAM_MAP.filter((m) => m.career === careerId);

  return matches
    .map((match) => {
      const program = PROGRAMS.find((p) => p.code === match.programCode);
      const faculty = program
        ? FACULTIES.find((f) => f.id === program.facultyId)
        : null;
      if (!program || !faculty) return null;

      return {
        program,
        faculty,
        matchReason: match.reason,
        isPrimary: match.isPrimary,
      };
    })
    .filter(Boolean) as ProgramRecommendation[];
}

/**
 * Main scoring function - takes answers, returns complete result.
 */
export function calculateResult(
  answers: Map<number, number | number[]>,
): NavigatorResult {
  const { careerScores, radarScores } = aggregateScores(answers);
  const radar = normalizeRadarScores(radarScores);
  const careerMatches = calculateCareerMatches(careerScores, 3);
  const topCareer = careerMatches[0];

  // Get persona from top career
  const profile = CAREER_PROFILES.find((p) => p.id === topCareer.careerId);

  return {
    personaName: profile?.name || "Tech Explorer",
    personaDescription:
      profile?.description || "Kamu memiliki potensi di dunia teknologi!",
    radarScores: radar,
    topCareer,
    careerMatches,
    skillGaps: calculateSkillGaps(answers, topCareer.careerId),
    roadmap: generateRoadmap(topCareer.careerId),
    programs: getProgramRecommendations(topCareer.careerId),
  };
}
