import type { InterviewTopic } from "@/types/interview-resource";

export const PREPARATION_PLANS: Record<InterviewTopic, string[]> = {
  hirevue: [
    "Understand the format - it's recorded, with no live interviewer",
    "Test your camera, microphone, and lighting beforehand",
    "Practise your answers to common HireVue questions",
    "Practise the STAR method for behavioural prompts",
    "Do a dry run and watch it back before you submit",
  ],
  assessment_centre: [
    "Research the company's assessment centre format (group exercise, presentation, in-tray, etc.)",
    "Practise group exercises with friends or family",
    "Prepare a short personal introduction/pitch",
    "Read up on current industry news for group discussions",
    "Plan your outfit and logistics for the day",
  ],
  case_study: [
    "Learn a standard case interview framework",
    "Practise mental maths and structuring problems out loud",
    "Work through 2-3 practice cases",
    "Review your notes and identify weak areas",
    "Prepare clarifying questions to ask the interviewer",
  ],
  competency: [
    "Review the job description and identify key competencies",
    "Prepare 5-6 STAR stories covering teamwork, leadership, and failure",
    "Practise answering out loud, not just in your head",
    "Prepare questions to ask the interviewer",
    "Get feedback from someone else on your answers",
  ],
  technical: [
    "Review core technical concepts for the role",
    "Practise the technical questions tagged here",
    "Practise talking through your reasoning, not just the answer",
    "Revisit questions you got wrong and understand why",
    "Prepare 1-2 questions about the team's technical work",
  ],
  general: [
    "Research the company's recent news and values",
    "Prepare your \"tell me about yourself\" answer",
    "Prepare 3-5 questions to ask the interviewer",
    "Plan your route or tech setup and log on/arrive early",
    "Send a thank-you note after the interview",
  ],
  motivational: [
    "Write down your genuine reasons for wanting this role",
    "Research the company's mission and recent projects",
    "Connect your reasons to specific things about the company",
    "Practise answering \"why us\" and \"why this role\" out loud",
    "Prepare an answer for \"where do you see yourself in 5 years\"",
  ],
  strength_based: [
    "Identify your top 5 strengths and back each with an example",
    "Reflect on what energises you, not just what you're good at",
    "Practise answering quickly and naturally - these are meant to feel conversational",
    "Prepare for the \"what are your weaknesses\" flip-side questions",
    "Have a specific, recent example ready for each strength",
  ],
  basic: [
    "Prepare a concise \"tell me about yourself\" (60-90 seconds)",
    "Know your CV inside out - be ready to expand on anything on it",
    "Prepare your strengths and one honest weakness, with how you're improving",
    "Research the company's basics: what they do, size, recent news",
    "Plan logistics: what to wear, when to arrive, what to bring",
  ],
};
