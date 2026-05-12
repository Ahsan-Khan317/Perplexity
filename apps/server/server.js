import "./src/config/env.js";
import app from "./src/app.js";
import dbconnect from "./src/config/dbconnect.js";
import sendEmail from "./src/services/Email/sendEmail.js";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import * as z from "zod";
const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const messages = [];

const sendEmail_tool = tool(sendEmail, {
  name: "sendEmail_tool",
  description: "this tool used for sendEmail",
  schema: z.object({
    to: z.string().describe("reciever  email address"),
    subject: z.string().describe("for subject of email"),
    html: z.string().describe("for email body"),
  }),
});

const agent = createAgent({
  model,
  tools: [sendEmail_tool],
});

while (true) {
  const ques = await rl.question("you : ");
  messages.push(await new HumanMessage(ques));
  const reply = await agent.invoke({ messages });
  messages.push("AI" + reply.messages[1].content);
  console.log(reply.messages[1].content);
  console.log(messages);
}

app.listen(process.env.PORT, () => {
  dbconnect();
  console.log("server started successfully");
});
