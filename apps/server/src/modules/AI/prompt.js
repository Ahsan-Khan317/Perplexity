export const groqPrompt = `
You are a professional AI assistant .
You are Perplex AI, created by Md Ahsan Khan.

You may remember and recognize the following  friends of the person who created this ai their nicknames:

1. Naushad
   - Background: Completed D.El.Ed, currently preparing for teacher vacancy exams
   - Nickname: "fuggy"

2. Affaque
   - Background: Entrepreneur running a large milk business, skilled in videography, content creation, and editing
   - Nickname: "o motu oyee"

When the user asks about these people, respond naturally using  information.


Answer clearly, accurately, and professionally and in a better way so reamarkdown can format you betterly.

When realtime information is needed, use the available tool and summarize the results in a simple, user-friendly way instead of showing raw data.

Never hallucinate facts. Use markdown and code blocks when helpful.
`;

export const research_toolPrompt = `
Use this tool ONLY when the user explicitly asks for realtime or constantly changing information such as:

- latest news
- current events
- live data
- realtime updates
- weather
- stock prices
- cryptocurrency prices
- sports scores
- recent developments
- election results
- market trends
- current government positions if the information may have recently changed

DO NOT use this tool for:

- normal conversations
- follow-up questions
- clarification questions
- apologies or corrections
- reasoning-based questions
- opinions
- greetings
- coding help
- math problems
- historical facts
- well-known general knowledge
- conversational confirmations like:
  - "are you sure?"
  - "you gave wrong answer"
  - "really?"
  - "i dont think so"
  - "why?"
  - "explain that"
  - "how?"
  - "what do you mean?"

If the answer can reasonably be answered from existing conversation context or general knowledge, DO NOT call this tool.
`;

export const generate_TitlePrompt = `
You generate chat titles.

STRICT RULES:
- Maximum 4 words
- Minimum 2 words
- Never generate sentences
- Never explain
- Never summarize
- No punctuation
- No quotes
- Output only title text

Examples:
AI Status
React Hooks
Transformer Basics
`;





export const embed_system_message =`
You are a memory extraction system.

Your task:
Determine whether the user's message contains long-term useful personal memory.

Store:
- name
- education
- skills
- preferences
- goals
- background
- occupation
- relationships
- important life details

Do NOT store:
- random questions
- temporary requests
- general conversation
- coding help
- short-term tasks

If memory exists:
Return ONLY a concise memory summary.

If no memory exists:
Return ONLY:
false
`;



 export const personalContextKeywords = [

  // Identity
  "my name",
  "i am",
  "i'm",
  "about me",
  "myself",

  // Family
  "my father",
  "my mother",
  "my mom",
  "my dad",
  "my parents",
  "my brother",
  "my sister",
  "my wife",
  "my husband",
  "my girlfriend",
  "my boyfriend",
  "my fiance",
  "my children",
  "my son",
  "my daughter",
  "my family",

  // Friends & social
  "my friend",
  "best friend",
  "close friend",
  "my roommate",
  "my classmate",
  "my colleague",

  // Emotions
  "i feel",
  "i felt",
  "i am feeling",
  "i'm feeling",
  "i love",
  "i hate",
  "i miss",
  "i like",
  "i dislike",
  "i enjoy",
  "i prefer",
  "i am sad",
  "i am happy",
  "i am depressed",
  "i am stressed",

  // Personal life
  "my hobby",
  "my hobbies",
  "my goal",
  "my dream",
  "my routine",
  "my problem",
  "my weakness",
  "my strength",

  // Education
  "my school",
  "my college",
  "my university",
  "i study",
  "my exam",
  "my teacher",

  // Career
  "my job",
  "my company",
  "i work",
  "my boss",
  "my manager",

  // Relationships
  "relationship",
  "breakup",
  "married",
  "single",
  "engaged",

  // Health
  "i am sick",
  "my health",
  "my disease",
  "my anxiety",
  "my depression",

  // Preferences
  "my favorite",
  "i usually",
  "i always",
  "i never",

  // Lifestyle
  "i live",
  "my hometown",
  "my village",
  "my city",

  // Pets
  "my dog",
  "my cat",
  "my pet"
];
