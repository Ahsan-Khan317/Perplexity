import { END, StateGraph, StateSchema, MessagesValue, START } from "@langchain/langgraph";
import { z } from "zod";
import { Groq_model, mistral_model, gemini_model } from "../AI/models.config.js";
import { HumanMessage, SystemMessage } from "langchain";
import { askAI_prompt,evaluate_prompt } from "./system_prompt.js";

const scoreSchema = z.object({
  Accuracy: z.number().min(0).max(10).default(0),
  Relevance: z.number().min(0).max(10).default(0),
  Clarity: z.number().min(0).max(10).default(0),
  Completeness: z.number().min(0).max(10).default(0),
});

const judge_state = z.object({
  solution_1_score: scoreSchema,
  solution_2_score: scoreSchema,
  solution_1_reasoning: z.string().default("solution_1_reasoning"),
  solution_2_reasoning: z.string().default("solution_2_reasoning"),
  winner: z.enum(["solution_1", "solution_2"]),
});
const solution_schema = z.object({
    content:z.string().default("answer"),
    timeTaken:z.string().default("time"),
    token:z.string().default("tota token used")
})

const Ai_Battle_state = new StateSchema({
  messages: MessagesValue,
  question:z.string().default("user question"),
  solution_1: solution_schema,
  solution_2:solution_schema,
  judgement: judge_state,
});

//nodes

const askAI = async (state) => {
    const timeStart =  Date.now()
 
  const [groq,gemini] = await Promise.allSettled([
    Groq_model.invoke([new SystemMessage(askAI_prompt),new HumanMessage(state.question)]).then((response)=>{
        return {response, groqTime:(Date.now()-timeStart)/1000}
    }),
     gemini_model.invoke([new SystemMessage(askAI_prompt),new HumanMessage(state.question)]).then((response)=>{
        return {response, geminiTime:(Date.now()-timeStart)/1000}
    })

  ])
 
    // content:     ,
    // timeTaken:      ,
    // token:

  let sol1,sol2;

if(groq.status === "fulfilled"){
    sol1 = {
     content: groq?.value?.response?.content,
    timeTaken:`${groq?.value?.groqTime }s`,
    token:`${groq?.value?.response?.response_metadata?.tokenUsage?.totalTokens}`
  }
}else{
    sol1 = {
     content:"groq model failed due to heavy traffic.",
    timeTaken: "0s" ,
    token:"0"
  }
}
if(gemini.status === "fulfilled"){
    sol2 = {
     content: gemini?.value?.response?.content,
    timeTaken:`${gemini?.value?.geminiTime}s`,
    token:`${gemini?.value?.response?.response_metadata?.tokenUsage?.total_tokens}`
  }
}else{
    sol2 = {
     content:"gemini model failed due to heavy traffic.",
    timeTaken: "0s" ,
    token:"0"
  }
}









  
 return {

    solution_1:sol1,
     solution_2:sol2
 }
 
 



}


const askAI_key = "askai";

const judge =async (state)=>{
  

  if (
        state.solution_1.content &&
        state.solution_2.content.includes("failed")
    ) {
        return {
            judgement:{
                solution_1_score:{
                    Accuracy:10,
                    Relevance:10,
                    Clarity:10,
                    Completeness:10
                },
                solution_2_score:{
                    Accuracy:0,
                    Relevance:0,
                    Clarity:0,
                    Completeness:0
                },
                solution_1_reasoning:"Only available answer because the second AI model failed.",
                solution_2_reasoning:"Model unavailable.",
                winner:"solution_1"
            }
        };
    }


    
    if (
        state.solution_2.content &&
        state.solution_1.content.includes("failed")
    ) {
        return {
            judgement:{
                solution_1_score:{
                    Accuracy:0,
                    Relevance:0,
                    Clarity:0,
                    Completeness:0
                },
                solution_2_score:{
                    Accuracy:10,
                    Relevance:10,
                    Clarity:10,
                    Completeness:10
                },
                solution_1_reasoning:"Model unavailable.",
                solution_2_reasoning:"Only available answer because the first AI model failed.",
                winner:"solution_2"
            }
        };
    }








console.log(state)
 
    const result = await mistral_model.withStructuredOutput(judge_state).
    invoke([ new SystemMessage(evaluate_prompt),
        new HumanMessage(`solution 1: ${state.solution_1.content} timeTaken:${state.solution_1.timeTaken} token exhaust:${state.solution_1.token} ,
            solution 2: ${state.solution_2.content} timeTaken:${state.solution_2.timeTaken} token exhaust:${state.solution_2.token}
            `) ])












            return{
               judgement:{ solution_1_score: { Accuracy: result?.solution_1_score?.Accuracy, Relevance:result?.solution_1_score?.Relevance, Clarity: result?.solution_1_score?.Clarity, Completeness: result?.solution_1_score?.Completeness},
                solution_2_score: { Accuracy: result?.solution_2_score?.Accuracy, Relevance: result?.solution_2_score?.Relevance, Clarity:result?.solution_2_score?.Clarity, Completeness: result?.solution_2_score?.Completeness },
                solution_1_reasoning:result?.solution_1_reasoning ,
                solution_2_reasoning: result?.solution_2_reasoning,
                winner: result?.winner}
            }




}
const evolution_judge_key = "evolution_judge"




const doneAI = async (state) => {
  return state
};
const doneAI_key = "doneai";

const graph = new StateGraph(Ai_Battle_state)
  .addNode(askAI_key, askAI)
  .addNode(doneAI_key, doneAI)
  .addNode(evolution_judge_key,judge)
  .addEdge(START, askAI_key)
  .addEdge(askAI_key,evolution_judge_key)
  .addEdge(evolution_judge_key,doneAI_key)
  .addEdge( doneAI_key,END);

const final = graph.compile();

export default final
