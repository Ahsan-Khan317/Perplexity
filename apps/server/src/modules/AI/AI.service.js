import { Groq_model, mistral_model, tvly } from "./models.config.js";

import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

import { groqPrompt, research_toolPrompt, generate_TitlePrompt } from "./prompt.js";
import { researchAgent } from "./agent.js";

import { embed_docs,embedquery ,upsertdata,retrieve_data } from "./rag/rag.services.js";
import { personalContextKeywords,embed_system_message } from "./prompt.js";


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
    console.error(error);
  }
};






export const generate_AI_Response = async (message,userid) => {
  try {
    


const lastMessage = message[message.length-1].content;
let embed_data ;

if(lastMessage.trim().length <30) {
embed_data = await embedquery(lastMessage)


}

const [search] = await Promise.all([
      retrieve_data(embed_data,userid),



//important data stores in vector db
 upsertdata(lastMessage,userid,embed_data)

    

])




    const formatted_msg = [
      new SystemMessage(`Retrieved memory about the user: ${search}   ${groqPrompt} `       ),
      ...message.map((msg) => {
        if (msg.role == "ai") {
          return new AIMessage(msg.content);
        }

        return new HumanMessage(msg.content);
      }),
    ];

    const response = await researchAgent.invoke({ messages: formatted_msg });
    console.log("stage 3")
    return { content: response.messages.at(-1)?.content };
  } catch (error) {
    console.log(error);
  }
};
