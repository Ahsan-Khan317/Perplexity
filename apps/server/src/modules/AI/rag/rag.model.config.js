//embeddingmodel
import { Pinecone } from '@pinecone-database/pinecone';



import { MistralAIEmbeddings } from "@langchain/mistralai";

export const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed"
});




  const apiKey = process.env.PINECONE_API_KEY;
  const indexName = process.env.PINECONE_INDEX;

  if (!apiKey || !indexName) {
    throw new Error("Missing Pinecone configuration");
  }

  const client = new Pinecone({ apiKey });
  export const index = client.index(indexName);
  
