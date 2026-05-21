import { useDispatch } from "react-redux";
import authThunk from "./auth.thunk.js";
import toast from "react-hot-toast";
import { SetAccessToken } from "../../shared/Api/axiosInstance.js";

const UseAuth = () => {
  const dispatch = useDispatch();

  const get_me = async () => {
    try {
      const get_me = await dispatch(authThunk?.get_me()).unwrap();
      console.log(get_me?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (data) => {
    try {
      const register = await dispatch(authThunk?.signup(data)).unwrap();

      toast.success(register?.message || "signup successfull");
      return register;
    } catch (err) {
      toast.error(err || "signup failed");
    }
  };

  const login = async (data) => {
    try {
      const login = await dispatch(authThunk?.login(data)).unwrap();

      SetAccessToken(login?.data?.accessToken);
      // console.log(login?.data?.accessToken)
      await get_me();

      toast.success(login?.message || "login successfull");
      return login;
    } catch (err) {
      toast.error(err || "login failed");
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = await dispatch(authThunk.refreshToken()).unwrap();
      return refreshToken;
    } catch (err) {
      toast.error("Server Error! Try after some time");
    }
  };

  const logout = async () => {
    try {
      const response = await dispatch(authThunk.logout()).unwrap();
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, login, get_me, refreshToken, logout };
};

export default UseAuth;
