import Api from "../../shared/Api/axiosInstance.js";

const chatApi = {
  // VITE_SEND_MESSAGE=/perplexity/chat/message
  // VITE_GET_CHATS_BY_ID=/perplexity/chat/
  // VITE_GET_ALL_CHATS=/perplexity/chat
  // VITE_DELETE_CHAT_BY_ID=/perplexity/chat/

  allchat: async () => {
    const response = await Api.get(import.meta.env.VITE_GET_ALL_CHATS);
    return response.data;
  },
  getMessage: async (chatid) => {
    const response = await Api.get(`${import.meta.env.VITE_GET_CHATS_BY_ID}${chatid}/message`);

    return response.data;
  },
  sendMessage: async (data) => {
    const response = await Api.post(import.meta.env.VITE_SEND_MESSAGE, data);
    return response.data;
  },
  deletechat: async (id) => {
    const response = await Api.delete(`${import.meta.env.VITE_DELETE_CHAT_BY_ID}${id}/delete`);
    return response.data;
  },
};

export default chatApi;
