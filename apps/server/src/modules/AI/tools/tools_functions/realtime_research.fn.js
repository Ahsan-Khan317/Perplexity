import { tvly } from "../../models.config.js";

export const real_time_research = async ({ question }) => {
  try {
    const response = await tvly.search(question);
    console.log("tavily called");

    return JSON.stringify(response.results);
  } catch (error) {
    console.log("server error ! sorry for not getting rea-time answer");
  }
};
