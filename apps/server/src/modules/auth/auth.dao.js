import { email } from "zod";
import userModel from "./models/auth.model.js";
import blacklist_model from "./models/blacklist.model.js";

export const authdao = {
  findUserByEmail: async (email) => {
    return await userModel.findOne({ email });
  },
  findUserById: async (id) => {
    return await userModel.findById(id);
  },

  createUser: async (username, email, password) => {
    return await userModel.create({
      username,
      email,
      password,
    });
  },

  VerifyUser: async (id) => {
    return await userModel.findByIdAndUpdate(
      id,
      { $set: { isverify: true } },
      { returnDocument: "after", runValidators: true },
    );
  },
  finduser: async (identifier) => {
    return await userModel
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .select("+password");
  },
  Blacklist_Token: async (token) => {
    return await blacklist_model.create({
      blacklist_token: token,
    });
  },
};
