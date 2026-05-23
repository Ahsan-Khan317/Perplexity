import { real_time_research } from "./tools_functions/realtime_research.fn.js";

import { research_toolPrompt } from "../prompt.js";
import { tool } from "langchain";
import * as z from "zod";
//tools

export const real_time_research_tool = tool(real_time_research, {
  name: "real-time-research",
  description: research_toolPrompt,
  schema: z.object({
    question: z.string().describe("real time question"),
  }),
});
