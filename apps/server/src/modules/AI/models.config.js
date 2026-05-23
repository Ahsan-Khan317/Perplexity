import { ChatGroq } from "@langchain/groq";
import { ChatMistralAI } from "@langchain/mistralai";
import { tavily } from "@tavily/core";

export const Groq_model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

export const mistral_model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

export const tvly = tavily({ apiKey: process.env.TAVILY_API });
