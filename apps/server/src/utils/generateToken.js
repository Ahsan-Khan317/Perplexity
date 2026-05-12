import jwt from "jsonwebtoken";

export const refreshToken = (userid) => {
  return jwt.sign({ userid }, process.env.Key, { expiresIn: "7d" });
};

export const accessToken = (userid, session) => {
  return jwt.sign({ userid, session }, process.env.Key, { expiresIn: "15m" });
};
