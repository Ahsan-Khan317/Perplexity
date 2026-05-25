import ApiError from "../../shared/utils/apiError.js";
import ChatDao from "./chat.dao.js";
import { generate_AI_Response, generate_Title } from "../AI/AI.service.js";

const UseChatServices = () => {
  const Createchat = async (userid, question, chatid = "") => {
    let createchat, title;

    if (!chatid) {
      const response = await generate_Title(question);
      if (!response) throw new ApiError(500, "AI model failed to generate response");

      title = response.content;
      createchat = await ChatDao.createChat(userid, title);
      if (!createchat) throw new ApiError(403, "title not stored in database");
    }

    const user_message = await ChatDao.createMessage(chatid || createchat._id, "you", question);
    if (!user_message) throw new ApiError(403, "user message not stored in database");

    const Allmessage = await ChatDao.findAllMessagesByCHatId(chatid || createchat._id);
    if (!Allmessage) throw new ApiError(403, " chat not fetched from database");

    const AIMessage = await generate_AI_Response(Allmessage,userid);
    if (!AIMessage) throw new ApiError(500, "AI model failed to generate response");

    const create_Ai_message = await ChatDao.createMessage(
      chatid || createchat._id,
      "ai",
      AIMessage.content,
    );
    if (!create_Ai_message) throw new ApiError(403, "AIMessage not stored in database");
    // console.log(AIMessage)

    return {
      AI: create_Ai_message,
    };
  };

  const getAllMessagesByCHatId = async (chatid) => {
    const chat_dao = await ChatDao.findAllMessagesByCHatId(chatid);
    if (!chat_dao) throw new ApiError(403, "Database error ! chat data not fetched");

    return chat_dao;
  };

  const deleteChat = async (chatid) => {
    const deleteChat_dao = await ChatDao.deleteChat(chatid);

    if (!deleteChat_dao) throw new ApiError(403, "chat not deleted");

    return deleteChat_dao;
  };

  const getAllChats = async (userid) => {
    const chats = await ChatDao.findAllChat(userid);
    if (!chats) throw new ApiError(403, "chats not found");
    return chats;
  };

  return { Createchat, getAllMessagesByCHatId, deleteChat, getAllChats };
};

export default UseChatServices;
