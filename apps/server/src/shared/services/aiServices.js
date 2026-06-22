import readline from "readline";
import { ChatMistralAI } from "@langchain/mistralai";


const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
});

const reply = await model.invoke("Hello, world!");
console.log(reply);
