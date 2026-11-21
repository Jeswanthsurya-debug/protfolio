// All facts come from the resume. Phone stays hidden unless you flip this.
export const SHOW_PHONE = false;
export const PHONE = "+917569994975";
export const EMAIL = "jeswanthsurya2005@gmail.com";

export const hero = {
  name: "Jeswanth Surya",
  role: "CS Engineering Student · AI & Cloud",
  bio: "Third-year B.Tech student building practical AI, cloud and web projects.",
  bio2: "Python, GenAI and Google Cloud. Open to internships in 2026.",
  city: "Chennai",
  stats: [
    { v: "6,171", l: "Google Skills points" },
    { v: "14", l: "Google Skills badges" },
    { v: "23", l: "Hack2skill initiatives" },
  ],
};

export const workStats = [
  { v: "4", l: "Projects built" },
  { v: "17", l: "Tools & languages" },
  { v: "2028", l: "Graduating" },
];

const GH = "https://github.com/Jeswanthsurya-debug";
export const projects = [
  { title: "Context Flow-AI", tags: ["Python", "Prompt Engineering"], code: `${GH}/ContextFlow-AI`,
    points: ["Contextual AI workflow that structures and routes prompts through a modular processing pipeline.", "Context-aware generation techniques to improve the relevance of AI responses."] },
  { title: "Google GenAI DevOps Assistant", tags: ["Python", "Google GenAI", "ADK", "Vertex AI"], code: GH,
    points: ["AI assistant concept that interprets DevOps-related queries and gives workflow-aware answers.", "Built with Google Generative AI and Agent Development Kit (ADK) concepts."] },
  { title: "Stadium Buddy", tags: ["Python"], code: GH,
    points: ["Smart-assistant concept for stadium navigation and fan-service use cases.", "Planned guidance to seating, amenities and event information."] },
  { title: "Chess Game", tags: ["HTML", "CSS", "JavaScript"], code: `${GH}/Chessgame-`,
    points: ["Interactive browser-based chess game with turn-based play.", "Legal piece-movement validation and a responsive board interface."] },
];

export const stack = ["Python","Java","C","C++","JavaScript","HTML","CSS","Generative AI","Prompt Engineering","Google Cloud","Vertex AI","BigQuery","Dataplex","AI Agents (ADK)","Git","GitHub","VS Code"];

export const record = [
  { when: "Jun – Aug 2026", kind: "Experience", title: "Data Analyst Intern", org: "Bluestock Fintech (Remote)",
    points: ["Worked with business data in a fintech environment.", "Applied data-driven problem solving to structure information for practical insights."] },
  { when: "2026", kind: "Hackathon", title: "Nebius x NVIDIA Hackathon", org: "3 AI agents that fix bugs", points: ["Walkthrough published on my YouTube channel."] },
  { when: "2026", kind: "Hackathon", title: "Agentic AI Hackathon by Product Space", org: "MeetingMind", points: ["A meeting-to-execution agent. Demo on YouTube."] },
  { when: "Google Cloud", kind: "Achievement", title: "Google Cloud Arcade Participant", org: "6,171 Google Skills points · 14 badges",
    points: ["Engineer AI Agents with ADK (Intermediate)", "Build a Data Warehouse with BigQuery (Intermediate)", "Security Command Center (Intermediate)", "Data Mesh with Dataplex (Intro) · MLOps for GenAI (Completion)"] },
  { when: "2026", kind: "Hackathon", title: "Hack2skill Innovator", org: "23 active initiatives · 14 submitted", points: ["Registered for and took part in AI hackathons and challenges."] },
  { when: "Nov 2026", kind: "Community", title: "Google Developer Groups", org: "Google Builders Hub", points: ["Gemini Agent Ready badge", "GDG Setif and GDG Vijayawada member badges", "Google Developer Group on Campus badges"] },
  { when: "2024 – 2028", kind: "Education", title: "B.Tech, Computer Science Engineering", org: "Dr. M.G.R. Educational and Research Institute, Chennai", points: ["Currently in third year"] },
];

export const skills = [
  { g: "Programming", items: ["Python", "Java", "C", "C++", "JavaScript", "HTML", "CSS"] },
  { g: "AI & Cloud", items: ["Generative AI", "Prompt Engineering", "Google Cloud", "Vertex AI", "BigQuery", "Dataplex", "AI Agents (ADK)"] },
  { g: "Tools", items: ["Git", "GitHub", "VS Code"] },
];

export const principles = [
  ["Practical first", "Build things that solve a real problem before chasing novelty."],
  ["Structure the pipeline", "Clear stages make AI workflows easier to trust and debug."],
  ["Learn in public", "Badges, repos and videos. The work stays visible."],
  ["Ship, then refine", "Get a working version out, then improve it."],
];

export const socials = [
  { n: "LinkedIn", h: "https://www.linkedin.com/in/jeswanth-surya-98517b339" },
  { n: "GitHub", h: GH },
  { n: "LeetCode", h: "https://leetcode.com/u/Jeswanth_surya/" },
  { n: "YouTube", h: "https://www.youtube.com/@SuryaBulids" },
  { n: "X", h: "https://x.com/Jesw1012Surya" },
  { n: "Telegram", h: "https://t.me/Weedy_2005" },
  { n: "Google Developers", h: "https://me.developers.google.com/u/me" },
  { n: "Hack2skill", h: "https://hack2skill.com/innovator-dashboard" },
];
