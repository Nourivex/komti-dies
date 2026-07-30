/**
 * Question lookup table for scoring engine.
 * Maps question IDs to their options with career scores.
 */
import type { CareerId } from "./navigator-data";
import type { InterestCluster } from "./navigator-engine";

type OptionEntry = {
  scores: Partial<Record<CareerId, number>>;
  cluster: InterestCluster;
};

type QuestionEntry = {
  options: OptionEntry[];
};

// Phase 1 questions
export const PHASE_1_LOOKUP: Map<string, QuestionEntry> = new Map([
  [
    "p1_identitas",
    {
      options: [
        {
          scores: {
            software_engineer: 2,
            frontend_dev: 2,
            robotics_engineer: 3,
          },
          cluster: "tech_logic",
        },
        {
          scores: { uiux_designer: 3, graphic_designer: 3, content_creator: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { it_pm: 3, digital_marketing: 2, user_researcher: 2 },
          cluster: "people_leadership",
        },
        {
          scores: { data_analyst: 3, ai_engineer: 2, lawyer: 2 },
          cluster: "data_analysis",
        },
      ],
    },
  ],
  [
    "p1_activation",
    {
      options: [
        {
          scores: { frontend_dev: 4, uiux_designer: 3, software_engineer: 2 },
          cluster: "tech_logic",
        },
        {
          scores: { graphic_designer: 4, content_creator: 3, uiux_designer: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { it_pm: 3, user_researcher: 3, lawyer: 2, edtech_dev: 2 },
          cluster: "people_leadership",
        },
        {
          scores: { ai_engineer: 3, cyber_security: 3, data_analyst: 2 },
          cluster: "data_analysis",
        },
      ],
    },
  ],
  [
    "p1_pride",
    {
      options: [
        {
          scores: { software_engineer: 3, frontend_dev: 4, cloud_engineer: 1 },
          cluster: "tech_logic",
        },
        {
          scores: { uiux_designer: 4, graphic_designer: 4, content_creator: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { it_pm: 3, edtech_dev: 3, user_researcher: 2 },
          cluster: "people_leadership",
        },
        {
          scores: { data_analyst: 4, ai_engineer: 3, accountant: 2 },
          cluster: "data_analysis",
        },
      ],
    },
  ],
  [
    "p1_problem",
    {
      options: [
        {
          scores: { software_engineer: 3, it_support: 3, cyber_security: 2 },
          cluster: "tech_logic",
        },
        {
          scores: { it_support: 4, cloud_engineer: 1 },
          cluster: "tech_logic",
        },
        {
          scores: { it_pm: 2, digital_marketing: 2, content_creator: 1 },
          cluster: "people_leadership",
        },
        {
          scores: { digital_marketing: 2, content_creator: 3 },
          cluster: "creative_visual",
        },
      ],
    },
  ],
  [
    "p1_goal",
    {
      options: [
        {
          scores: { software_engineer: 4, ai_engineer: 3, frontend_dev: 2 },
          cluster: "tech_logic",
        },
        {
          scores: { uiux_designer: 4, graphic_designer: 3, content_creator: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { it_pm: 4, digital_marketing: 2, lawyer: 1 },
          cluster: "people_leadership",
        },
        {
          scores: { data_analyst: 4, ai_engineer: 3, cyber_security: 2 },
          cluster: "data_analysis",
        },
      ],
    },
  ],
]);

// Phase 2 questions
export const PHASE_2_LOOKUP: Map<string, QuestionEntry> = new Map([
  // Tech & Logic
  [
    "p2_tech_1",
    {
      options: [
        {
          scores: { software_engineer: 3, frontend_dev: 3 },
          cluster: "tech_logic",
        },
        {
          scores: { frontend_dev: 4, uiux_designer: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { cyber_security: 4, cloud_engineer: 2 },
          cluster: "tech_logic",
        },
      ],
    },
  ],
  [
    "p2_tech_2",
    {
      options: [
        {
          scores: { frontend_dev: 4, software_engineer: 2 },
          cluster: "tech_logic",
        },
        {
          scores: { ai_engineer: 3, data_analyst: 3, software_engineer: 2 },
          cluster: "data_analysis",
        },
        {
          scores: { software_engineer: 2, it_support: 2 },
          cluster: "tech_logic",
        },
      ],
    },
  ],
  [
    "p2_tech_3",
    {
      options: [
        {
          scores: { cyber_security: 3, cloud_engineer: 4, it_support: 2 },
          cluster: "tech_logic",
        },
        {
          scores: { it_pm: 4, cloud_engineer: 1 },
          cluster: "people_leadership",
        },
        {
          scores: { it_support: 3, software_engineer: 1 },
          cluster: "tech_logic",
        },
      ],
    },
  ],
  // Creative & Visual
  [
    "p2_creative_1",
    {
      options: [
        {
          scores: { uiux_designer: 5, frontend_dev: 1 },
          cluster: "creative_visual",
        },
        {
          scores: { graphic_designer: 5, content_creator: 1 },
          cluster: "creative_visual",
        },
        {
          scores: { content_creator: 5, digital_marketing: 2 },
          cluster: "creative_visual",
        },
      ],
    },
  ],
  [
    "p2_creative_2",
    {
      options: [
        {
          scores: { frontend_dev: 3, software_engineer: 2 },
          cluster: "tech_logic",
        },
        {
          scores: { uiux_designer: 3, graphic_designer: 4 },
          cluster: "creative_visual",
        },
        {
          scores: { content_creator: 4, edtech_dev: 2 },
          cluster: "creative_visual",
        },
      ],
    },
  ],
  [
    "p2_creative_3",
    {
      options: [
        {
          scores: { graphic_designer: 4, uiux_designer: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { content_creator: 3, digital_marketing: 2 },
          cluster: "creative_visual",
        },
        {
          scores: { it_pm: 2, digital_marketing: 3 },
          cluster: "people_leadership",
        },
      ],
    },
  ],
  // People & Leadership
  [
    "p2_people_1",
    {
      options: [
        {
          scores: { it_pm: 5, digital_marketing: 1 },
          cluster: "people_leadership",
        },
        {
          scores: { digital_marketing: 3, lawyer: 3, user_researcher: 2 },
          cluster: "people_leadership",
        },
        {
          scores: { data_analyst: 3, user_researcher: 3 },
          cluster: "data_analysis",
        },
        {
          scores: { uiux_designer: 3, graphic_designer: 2, content_creator: 2 },
          cluster: "creative_visual",
        },
      ],
    },
  ],
  [
    "p2_people_2",
    {
      options: [
        {
          scores: { edtech_dev: 4, user_researcher: 2 },
          cluster: "people_leadership",
        },
        {
          scores: { lawyer: 4, user_researcher: 2 },
          cluster: "people_leadership",
        },
        {
          scores: { digital_marketing: 4, it_pm: 2 },
          cluster: "people_leadership",
        },
      ],
    },
  ],
  [
    "p2_people_3",
    {
      options: [
        {
          scores: { data_analyst: 3, lawyer: 3, accountant: 2 },
          cluster: "data_analysis",
        },
        {
          scores: {
            content_creator: 3,
            digital_marketing: 3,
            user_researcher: 2,
          },
          cluster: "creative_visual",
        },
        { scores: { it_pm: 4, software_engineer: 2 }, cluster: "tech_logic" },
      ],
    },
  ],
  // Data & Analysis
  [
    "p2_data_1",
    {
      options: [
        {
          scores: { uiux_designer: 2, data_analyst: 4, user_researcher: 3 },
          cluster: "data_analysis",
        },
        {
          scores: { accountant: 4, it_pm: 2, data_analyst: 2 },
          cluster: "data_analysis",
        },
        {
          scores: { ai_engineer: 3, data_analyst: 4, digital_marketing: 2 },
          cluster: "data_analysis",
        },
      ],
    },
  ],
  [
    "p2_data_2",
    {
      options: [
        {
          scores: { accountant: 3, data_analyst: 3, it_pm: 2 },
          cluster: "data_analysis",
        },
        {
          scores: { data_analyst: 4, ai_engineer: 3 },
          cluster: "data_analysis",
        },
        {
          scores: { data_analyst: 4, digital_marketing: 2 },
          cluster: "data_analysis",
        },
      ],
    },
  ],
  [
    "p2_data_3",
    {
      options: [
        {
          scores: { ai_engineer: 4, data_analyst: 3 },
          cluster: "data_analysis",
        },
        {
          scores: { software_engineer: 3, ai_engineer: 3, it_support: 1 },
          cluster: "tech_logic",
        },
        {
          scores: { content_creator: 3, ai_engineer: 2, graphic_designer: 2 },
          cluster: "creative_visual",
        },
      ],
    },
  ],
]);
