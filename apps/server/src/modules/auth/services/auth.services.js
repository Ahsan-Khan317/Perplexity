import { authdao } from "../auth.dao.js";
import ApiError from "../../../shared/utils/apiError.js";
import { Token } from "../utils/generateToken.js";
import sendEmail from "./Email/sendEmail.js";
import { verify_emailmsg, emailVerifiedmsg } from "./Email/email_msg.js";
import { verify_link } from "../../../constants/index.js";
import ApiResponse from "../../../shared/utils/apiResponse.js";

export const AuthServices = {
  //register

  registerUser: async (username, email, password) => {
    const IsUser = await authdao.findUserByEmail(email);

    if (IsUser) throw new ApiError(409, "user already exist");

    const newUser = await authdao.createUser(username, email, password);

    if (!newUser) throw new ApiError(400, "registeration unsuccessfull");

    let link;
    try {
      const token = Token.refreshToken(newUser._id);
      link = verify_link + token;
    } catch (err) {
      throw new ApiError(400, "invalid token");
    }

    const postedemail = await sendEmail({
      to: newUser.email,
      subject: "Verify Your Account",
      html: verify_emailmsg(link),
    });
    console.log(postedemail);

    return newUser;
  },

  //verify_email

  verify_email: async (token) => {
    const isToken_valid = Token.verify_refreshToken(token);
    if (!isToken_valid) throw new ApiError(401, "invalid Token");

    const id = isToken_valid.userid;

    const isUser = await authdao.findUserById(id);

    if (!isUser) throw new ApiError(404, "user not found");

    if (isUser.isverify) {
      return { userverified: true, isUser };
    }

    const isUserVerify = await authdao.VerifyUser(id);

    return { userverified: false, isUser: isUserVerify };
  },

  //login

  login: async (identifier, password) => {
    const isuser = await authdao.finduser(identifier);
    if (!isuser) throw new ApiError(403, "invalid credential");

    const ispassword = await isuser.comparePassword(password);
    if (!ispassword) throw new ApiError(403, "invalid credential");

    if (!isuser.isverify) throw new ApiError(403, "User not Verified! Login Failed");

    const refreshToken = Token.refreshToken(isuser._id);
    const accessToken = Token.accessToken(isuser._id);

    return { isuser, refreshToken, accessToken };
  },

  //get_me

  get_me: async (id) => {
    const isuser = await authdao.findUserById(id);

    if (!isuser) throw new ApiError(403, "user not found ");

    return isuser;
  },

  //get-accessToken

  get_accessToken: async (refreshToken) => {
    const verifytoken = Token.verify_refreshToken(refreshToken);
    const id = verifytoken.userid;

    const accessToken = Token.accessToken(id);
    return accessToken;
  },

  //logout
  logout: async (authorization) => {
    const token = authorization.split(" ")[1];

    const blacklist_token = authdao.Blacklist_Token(token);
    if (!blacklist_token) throw new ApiError(400, "logout failed");
  },
};
