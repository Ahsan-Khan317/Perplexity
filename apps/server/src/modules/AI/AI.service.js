import { Groq_model, mistral_model, tvly } from "./models.config.js";

import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

import { groqPrompt, research_toolPrompt, generate_TitlePrompt } from "./prompt.js";
import { researchAgent } from "./agent.js";

import * as z from "zod";

//title_generator

export const generate_Title = async (content) => {
  try {
    const response = await mistral_model.invoke([
      new SystemMessage(generate_TitlePrompt),
      new HumanMessage(content),
    ]);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const generate_AI_Response = async (message) => {
  try {
    const formatted_msg = [
      new SystemMessage(groqPrompt),
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
