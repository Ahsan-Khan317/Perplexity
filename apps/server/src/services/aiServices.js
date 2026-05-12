import readline from "readline";
import { ChatMistralAI } from "@langchain/mistralai";

// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })

// rl.question("what is your name ?" , (name)=>{
//     console.log(`Hello ${name} !`)
// })

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
});

const reply = await model.invoke("Hello, world!");
console.log(reply);
