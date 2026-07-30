/**
 * Adaptive scoring - menghitung hasil dari adaptive question path
 */
import {
  CAREER_PROFILES,
  PROGRAMS,
  FACULTIES,
  CAREER_PROGRAM_MAP,
  CAREER_SKILL_GAPS,
  CAREER_ROADMAPS,
  RADAR_AXES,
  type CareerId,
} from "./navigator-data";
import type { NavigatorState, InterestCluster } from "./navigator-engine";

export interface RadarScore {
  axis: string;
  score: number;
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
  program: (typeof PROGRAMS)[number];
  faculty: (typeof FACULTIES)[number];
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
  roadmap: { title: string; items: string[] }[];
  programs: ProgramRecommendation[];
}

/**
 * Convert adaptive answers to career scores
 */
function aggregateCareerScores(
  state: NavigatorState,
): Partial<Record<CareerId, number>> {
  const scores: Partial<Record<CareerId, number>> = {};

  for (const [questionId, answerIndex] of state.answers) {
    // Find question in all questions
    const allQuestions = [
      // Import dynamically not needed - we search by id
    ];

    // We need to search through the engine's questions
    // Since we can't import them directly, we reconstruct from the state
    const question = findQuestionById(questionId, state);
    if (!question) continue;

    const option = question.options[answerIndex];
    if (!option) continue;

    for (const [careerId, score] of Object.entries(option.scores)) {
      scores[careerId as CareerId] =
        (scores[careerId as CareerId] || 0) + (score || 0);
    }
  }

  return scores;
}

/**
 * Find question by ID from state's questions or the known question banks
 */
function findQuestionById(
  id: string,
  _state: NavigatorState,
): {
  options: {
    scores: Partial<Record<CareerId, number>>;
    cluster: InterestCluster;
  }[];
} | null {
  // All questions are defined in navigator-engine.ts
  // We reconstruct the lookup here
  const ALL_QUESTIONS = getAllQuestions();
  return ALL_QUESTIONS.find((q) => q.id === id) || null;
}

/**
 * Get all questions from the engine
 */
function getAllQuestions() {
  // Dynamic import not needed - we inline the question data reference
  // The questions are stable, so we can reconstruct the lookup
  const questions: Array<{
    id: string;
    options: {
      scores: Partial<Record<CareerId, number>>;
      cluster: InterestCluster;
    }[];
  }> = [];

  // We'll use a different approach: pass the questions map from the state
  return questions;
}

/**
 * Main scoring function - takes adaptive state, returns result
 */
export function calculateAdaptiveResult(
  state: NavigatorState,
  questionsMap: Map<
    string,
    {
      options: {
        scores: Partial<Record<CareerId, number>>;
        cluster: InterestCluster;
      }[];
    }
  >,
): NavigatorResult {
  // Aggregate career scores from all answers
  const careerScores: Partial<Record<CareerId, number>> = {};

  for (const [questionId, answerIndex] of state.answers) {
    const question = questionsMap.get(questionId);
    if (!question) continue;
    const option = question.options[answerIndex];
    if (!option) continue;

    for (const [careerId, score] of Object.entries(option.scores)) {
      careerScores[careerId as CareerId] =
        (careerScores[careerId as CareerId] || 0) + (score || 0);
    }
  }

  // Calculate radar scores from cluster scores
  const radarScores = calculateRadarScores(state.clusterScores);

  // Calculate career matches
  const careerMatches = calculateCareerMatches(careerScores, 3);
  const topCareer = careerMatches[0];

  const profile = CAREER_PROFILES.find((p) => p.id === topCareer.careerId);

  return {
    personaName: profile?.name || "Tech Explorer",
    personaDescription:
      profile?.description || "Kamu memiliki potensi di dunia teknologi!",
    radarScores,
    topCareer,
    careerMatches,
    skillGaps: calculateSkillGaps(state, topCareer.careerId),
    roadmap: CAREER_ROADMAPS[topCareer.careerId] || [],
    programs: getProgramRecommendations(topCareer.careerId),
  };
}

/**
 * Map cluster scores to radar dimensions
 */
function calculateRadarScores(
  clusterScores: Record<InterestCluster, number>,
): RadarScore[] {
  const maxScore = Math.max(...Object.values(clusterScores), 1);

  // Map clusters to radar axes
  const axisMap: Record<string, number> = {
    Kreativitas: clusterScores.creative_visual,
    Analitis: clusterScores.data_analysis,
    Komunikasi: clusterScores.people_leadership,
    Kolaborasi:
      (clusterScores.people_leadership + clusterScores.creative_visual) / 2,
    Teknologi: clusterScores.tech_logic,
  };

  return RADAR_AXES.map((axis) => ({
    axis: axis.label,
    score: Math.round(((axisMap[axis.label] || 0) / maxScore) * 100),
  }));
}

/**
 * Calculate career match percentages
 */
function calculateCareerMatches(
  careerScores: Partial<Record<CareerId, number>>,
  topN: number,
): CareerMatch[] {
  const maxScore = Math.max(...Object.values(careerScores).map(Number), 1);

  const matches = Object.entries(careerScores)
    .map(([id, score]) => {
      const profile = CAREER_PROFILES.find((p) => p.id === id);
      if (!profile) return null;

      const matchPercent = Math.round((score / maxScore) * 100);
      const reasons = generateReasons(id as CareerId);

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
 * Generate reasons why a career matches
 */
function generateReasons(careerId: CareerId): string[] {
  const reasons: string[] = [];

  if (
    [
      "ai_engineer",
      "software_engineer",
      "frontend_dev",
      "cyber_security",
    ].includes(careerId)
  ) {
    reasons.push("Minat kuat di pemecahan masalah teknis");
  }
  if (
    ["uiux_designer", "graphic_designer", "content_creator"].includes(careerId)
  ) {
    reasons.push("Kreativitas jadi kekuatan utama");
  }
  if (["data_analyst", "accountant"].includes(careerId)) {
    reasons.push("Detail-oriented dan suka bekerja dengan data");
  }
  if (["it_pm", "digital_marketing", "lawyer"].includes(careerId)) {
    reasons.push("Komunikasi & leadership jadi kekuatan");
  }
  if (["edtech_dev", "user_researcher"].includes(careerId)) {
    reasons.push("Peduli dengan dampak sosial");
  }

  return reasons.slice(0, 3);
}

/**
 * Calculate skill gaps
 */
function calculateSkillGaps(
  state: NavigatorState,
  careerId: CareerId,
): SkillGapData[] {
  const rawGaps = CAREER_SKILL_GAPS[careerId] || [];

  // Estimate current skills from cluster scores
  const techLevel = Math.min(state.clusterScores.tech_logic * 10, 50);
  const creativeLevel = Math.min(state.clusterScores.creative_visual * 10, 50);
  const dataLevel = Math.min(state.clusterScores.data_analysis * 10, 50);
  const peopleLevel = Math.min(state.clusterScores.people_leadership * 10, 50);

  return rawGaps.map((gap) => {
    let current = gap.current;
    // Boost based on relevant cluster
    if (
      ["Python", "JavaScript", "HTML/CSS", "React", "Networking"].includes(
        gap.skill,
      )
    ) {
      current = Math.min(current + techLevel, 100);
    }
    if (["Figma", "Design", "Prototyping"].includes(gap.skill)) {
      current = Math.min(current + creativeLevel, 100);
    }
    if (
      ["SQL", "Excel", "Statistics", "Data Visualization"].includes(gap.skill)
    ) {
      current = Math.min(current + dataLevel, 100);
    }
    if (["Communication", "Leadership", "Interview"].includes(gap.skill)) {
      current = Math.min(current + peopleLevel, 100);
    }

    let level: "strong" | "learning" | "not_started" = "not_started";
    if (current >= gap.required * 0.7) level = "strong";
    else if (current >= gap.required * 0.3) level = "learning";

    return { skill: gap.skill, current, required: gap.required, level };
  });
}

/**
 * Get program recommendations
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
