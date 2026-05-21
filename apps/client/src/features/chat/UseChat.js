import { useDispatch, useSelector } from "react-redux";
import chatThunk from "./chat.thunk.js";
import toast from "react-hot-toast";
import { addMessage, newchat } from "./chat.slice.js";

const UseChat = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.Chat);

  // const navigate = useNavigate()

  const getAllChat = async () => {
    try {
      const response = await dispatch(chatThunk.allchat()).unwrap();
      //  toast.success(response)
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async (chatid) => {
    try {
      const response = await dispatch(chatThunk.getMessage(chatid)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (data) => {
    try {
      const chatid = data.chatid || " ";

      const you = {
        chat: chatid,
        content: data.question,
        createdAt: new Date().toISOString(),
        role: "you",
      };
      console.log(you);

      dispatch(addMessage(you));

      const response = await dispatch(chatThunk.sendMessage(data)).unwrap();

      const Ai = response?.data?.chat?.AI;

      if (chatid == "" && Ai) {
        await getAllChat();
      }

      if (Ai) {
        console.log(Ai);

        dispatch(addMessage(Ai));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChat = async (id) => {
    try {
      const response = await dispatch(chatThunk.deletechat(id)).unwrap();
      if (response) {
        await getAllChat();
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const newChat = () => {
    dispatch(newchat());

    return true;
  };

  return { getAllChat, deleteChat, getMessage, sendMessage, newChat };
};

export default UseChat;
