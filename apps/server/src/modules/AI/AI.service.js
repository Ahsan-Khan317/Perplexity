import { ChatGroq } from "@langchain/groq";
import { ChatMistralAI } from "@langchain/mistralai";
import { tavily } from "@tavily/core";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { createAgent, tool } from "langchain";
import * as z from "zod";

//models

const Groq_model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

const mistral_model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

const tvly = tavily({ apiKey: process.env.TAVILY_API });

//title_generator

export const generate_Title = async (content) => {
  try {
    const response = await mistral_model.invoke([
      new SystemMessage(`
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
`),
      new HumanMessage(content),
    ]);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const real_time_research = async ({ question }) => {
  try {
    const response = await tvly.search(question);
    console.log("tavily called");

    return JSON.stringify(response.results);
  } catch (error) {
    console.log("server error ! sorry for not getting rea-time answer");
  }
};

//tools

const real_time_research_tool = tool(real_time_research, {
  name: "real-time-research",
  description: `
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
`,
  schema: z.object({
    question: z.string().describe("real time question"),
  }),
});

//agent

const researchAgent = createAgent({
  model: Groq_model,
  tools: [real_time_research_tool],
});

export const generate_AI_Response = async (message) => {
  try {
    const formatted_msg = [
      new SystemMessage(`
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
`),
      ...message.map((msg) => {
        if (msg.role == "ai") {
          return new AIMessage(msg.content);
        }

        return new HumanMessage(msg.content);
      }),
    ];

    const response = await researchAgent.invoke({ messages: formatted_msg });
    return { content: response.messages.at(-1)?.content };
  } catch (error) {
    console.log(error);
  }
};
