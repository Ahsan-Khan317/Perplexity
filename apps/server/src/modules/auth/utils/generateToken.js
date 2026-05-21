import jwt from "jsonwebtoken";

export const Token = {
  refreshToken: (userid) => {
    return jwt.sign({ userid }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "15d" });
  },

  accessToken: (userid) => {
    return jwt.sign({ userid }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
  },

  verify_refreshToken: (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
  },
  verify_accessToken: (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  },
};
