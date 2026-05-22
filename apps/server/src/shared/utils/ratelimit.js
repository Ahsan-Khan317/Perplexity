import rateLimit from "express-rate-limit";

export const Loginlimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many request ! Try After 1 hour.",
  },
});

export const Ailimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Daily AI quota reached. Your next session will unlock in 1 hour.",
  },
});
