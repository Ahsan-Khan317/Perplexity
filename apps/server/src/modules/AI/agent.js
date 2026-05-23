import { Groq_model } from "./models.config.js";
import { real_time_research_tool } from "./tools/tools.js";

import { createAgent } from "langchain";

export const researchAgent = createAgent({
  model: Groq_model,
  tools: [real_time_research_tool],
});
