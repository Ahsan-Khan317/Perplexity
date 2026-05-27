
import { embeddings } from "./rag.model.config.js";
import { mistral_model } from "../models.config.js";
import crypto from "crypto"
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { TokenTextSplitter } from "@langchain/textsplitters";
import { personalContextKeywords,embed_system_message } from "../prompt.js";
import {index} from "./rag.model.config.js"

//embedding
export const embedquery = async(content)=>{
   
    const embed_data = await embeddings.embedQuery(content)
    return embed_data
}



export const embed_docs = async(docs)=>{
    const embed_data = await embeddings.embedDocuments(docs)
    return embed_data
}





//text-splitter

const splitter = new TokenTextSplitter({ encodingName: "cl100k_base", chunkSize:30, chunkOverlap: 0 })






//upsert data



export const upsertdata = async(lastMessage,userid,embed_data)=>{
const isPersonalData = personalContextKeywords.some((keywords)=>lastMessage.toLowerCase().includes(keywords))

    let records=[] ;










   if(isPersonalData || lastMessage.trim().split(/\s+/).length >=150){

let content = [lastMessage] ;


if(lastMessage.trim().split(/\s+/).length >=150){


   const result =  await mistral_model.invoke([
  new SystemMessage(embed_system_message),
  new HumanMessage( lastMessage )
])


if(result?.content.toLowerCase() == "false") return
 
 content = await splitter.splitText(result?.content)


}


const embed =embed_data ?[embed_data] : await embed_docs(content);




if(embed.length >1){
for (let i = 0; i < embed.length; i++) {
  records.push({
    id: crypto.randomUUID(),
    values: embed[i],
    metadata: { userid, content: content[i] },
  });
}

}
else{


records.push({
    id: crypto.randomUUID(),
    values: embed,
    metadata: { userid, content: content[0] },
  });



}


 






 
}
     


























if (records.length === 0) {
    console.log("hello",records)
    return
};

await index.upsert({ records });

console.log("pinecone upsert ok", {
  count: records.length,
  ids: records.map((r) => r.id),
});





}





export const retrieve_data =async (embed_data,userid)=>{

    let search,result=[];

if(embed_data){

     search = await index?.query({
vector:embed_data,
topK:2,
includeMetadata:true,
includeValues:false,
filter:{
    userid:{$eq:userid}
}


    })



}

 search?.matches?.map((e,i)=>{
result.push(e?.metadata?.content)

 })

 return result?JSON.stringify(result) :"no memory found in vector db so reply with system prompt command only"



}