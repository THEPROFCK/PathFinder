// src/lib/prompts.ts

import { UserResponses } from '@/types/career';

export function buildCareerAnalysisPrompt(responses: UserResponses): string {
  return `You are an expert career strategist, labor market analyst, and career counselor with deep knowledge across ALL industries - technical, creative, professional services, trades, and entrepreneurship.

ANALYZE THE FOLLOWING USER PROFILE AND PROVIDE COMPREHENSIVE CAREER RECOMMENDATIONS:

USER PROFILE:
-------------
Thinking & Work Style: ${responses.thinkingStyles.join(', ')}${responses.customThinkingStyle ? ` + ${responses.customThinkingStyle}` : ''}

Interest Areas: ${responses.interests.join(', ')}${responses.customInterest ? ` + ${responses.customInterest}` : ''}

Current Skills: ${responses.skills.join(', ')}${responses.customSkills ? ` + ${responses.customSkills}` : ''}

Education:
- University: ${responses.hasUniversity ? 'Yes' : 'No'}
${responses.degrees ? `- Degrees: ${responses.degrees}` : ''}
${responses.certifications ? `- Certifications: ${responses.certifications}` : ''}
- Education Use: ${responses.educationUse}

Work Environment Preferences: ${responses.workEnvironments.join(', ')}

Top Priorities: ${responses.priorities.join(', ')}${responses.customPriority ? ` + ${responses.customPriority}` : ''}

Constraints & Context:
${responses.location ? `- Location: ${responses.location}` : ''}
${responses.learningHours ? `- Available Learning Hours: ${responses.learningHours}` : ''}
${responses.financialConstraints ? `- Financial Constraints: ${responses.financialConstraints}` : ''}
- Willing to Retrain: ${responses.willingToRetrain ? 'Yes' : 'No'}
${responses.otherConstraints ? `- Other: ${responses.otherConstraints}` : ''}

INSTRUCTIONS:
-------------
1. DO NOT default to tech careers unless interests clearly indicate technology
2. Consider careers across ALL industries including:
   - Creative fields (design, media, arts, content)
   - Professional services (finance, consulting, law)
   - Healthcare and life sciences
   - Education and training
   - Trades and skilled work
   - Business and entrepreneurship
   - Social impact and nonprofit
   - Sports and fitness
   - Engineering (all types)
   - Research and academia

3. If user selected MULTIPLE interest areas:
   - Suggest hybrid roles or interdisciplinary careers
   - Recommend exploratory career paths
   - Suggest phased specialization

4. Match thinking style to career culture and work structure

5. Respect work environment preferences (remote, office, field, entrepreneurial)

6. Consider education realistically - don't require degrees unless truly necessary

PROVIDE YOUR RESPONSE IN THIS EXACT JSON FORMAT:
{
  "primaryCareers": [
    {
      "title": "Career Title",
      "description": "Clear 2-3 sentence description",
      "fitReason": "Why this matches the user's profile",
      "requiredSkills": ["skill1", "skill2", "skill3"],
      "requiredEducation": ["education requirement or 'None'"],
      "tools": ["tool1", "tool2"],
      "dailyRoutine": {
        "morning": ["activity1", "activity2"],
        "afternoon": ["activity1", "activity2"],
        "evening": ["activity1", "activity2"]
      },
      "weeklyRoutine": {
        "learning": "Description of weekly learning activities",
        "practice": "Description of practice/project work",
        "networking": "Description of networking activities",
        "reflection": "Description of reflection and planning"
      },
      "salaryRange": "$XX,XXX - $XXX,XXX (adjust for location)",
      "growthPotential": "Description of career growth"
    }
  ],
  "alternativeCareers": [
    {
      "title": "Alternative Career Title",
      "description": "Description",
      "fitReason": "Why this could work",
      "requiredSkills": ["skill1"],
      "requiredEducation": ["requirement"],
      "tools": ["tool1"],
      "dailyRoutine": {
        "morning": ["activity"],
        "afternoon": ["activity"],
        "evening": ["activity"]
      },
      "weeklyRoutine": {
        "learning": "Learning activities",
        "practice": "Practice activities",
        "networking": "Networking",
        "reflection": "Reflection"
      },
      "salaryRange": "$XX,XXX - $XXX,XXX",
      "growthPotential": "Growth description"
    }
  ],
  "explanation": "2-3 paragraph explanation of why these careers fit this person's unique profile, thinking style, and goals. Be specific and personalized.",
  "actionPlan": {
    "next90Days": [
      "Specific action item 1",
      "Specific action item 2",
      "Specific action item 3",
      "Specific action item 4",
      "Specific action item 5"
    ],
    "next6Months": [
      "Milestone 1",
      "Milestone 2",
      "Milestone 3",
      "Milestone 4"
    ]
  },
  "positioningStrategy": {
    "localJobs": ["Strategy for finding local opportunities"],
    "remoteJobs": ["Strategy for remote opportunities"],
    "internships": ["How to find internships or entry-level positions"],
    "freelancing": ["How to start freelancing if applicable"],
    "entrepreneurship": ["Entrepreneurial options if applicable"],
    "portfolio": ["What to include in portfolio or proof of work"],
    "onlinePresence": ["LinkedIn, GitHub, personal website, etc."]
  }
}

Provide ONLY the JSON object, no additional text before or after.`;
}