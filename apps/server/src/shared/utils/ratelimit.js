import rateLimit from "express-rate-limit";

export const Loginlimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many request ! Try After 1 hour.",
  },
});
