import asyncHandler from "../../shared/middleware/asyncHandler.js";
import ApiResponse from "../../shared/utils/apiResponse.js";
import UseCHatServices from "./services/chat.service.js";

const ChatServices = UseCHatServices();

export const Createchat = asyncHandler(async (req, res, next) => {
  let userid = req.user.userid;
  const { question, chatid = "" } = req.body;

  const chat = await ChatServices.Createchat(userid, question, chatid);

  res.send(
    new ApiResponse(201, "message fetched successfully", {
      chat,
    }),
  );
});

export const getAllMessage = asyncHandler(async (req, res, next) => {
  const { chatid } = req.params;

  const getchatservice = await ChatServices.getAllMessagesByCHatId(chatid);

  res.send(new ApiResponse(200, "chat data fetched successfully", getchatservice));
});

export const getAllChats = asyncHandler(async (req, res, next) => {
  const userid = req.user.userid;
  const chats = await ChatServices.getAllChats(userid);

  res.send(new ApiResponse(200, "chats data fetched successfully", chats));
});

export const deleteChat = asyncHandler(async (req, res, next) => {
  const { chatid } = req.params;

  const deleteChat_service = await ChatServices.deleteChat(chatid);

  res.send(new ApiResponse(200, "chat deleted successfully"));
});
