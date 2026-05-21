import mongoose from "mongoose";
const blacklistSchema = new mongoose.Schema({
  blacklist_token: {
    type: String,
    required: true,
  },
});

const blacklist_model = mongoose.model("blacklist_model", blacklistSchema);
export default blacklist_model;
