import { promise } from "zod";
import chatModel from "./models/chat.model.js";
import messageModel from "./models/message.model.js";

const ChatDao = {
  createMessage: async (chatid, role, content) => {
    return await messageModel.create({
      chat: chatid,
      role,
      content,
    });
  },

  findAllMessagesByCHatId: async (chatid) => {
    return await messageModel.find({ chat: chatid });
  },
  createChat: async (userid, title) => {
    return await chatModel.create({
      user: userid,
      title,
    });
  },

  findAllChat: async (userid) => {
    return await chatModel.find({ user: userid });
  },

  deleteChat: async (chatid) => {
    const result = await Promise.all([
      messageModel.deleteMany({ chat: chatid }),
      chatModel.findByIdAndDelete(chatid),
    ]);

    return result;
  },
};

export default ChatDao;
