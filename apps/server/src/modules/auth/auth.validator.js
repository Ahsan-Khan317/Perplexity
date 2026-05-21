import { body, param, query } from "express-validator";
import validator from "validator";

export const id_validator = [
  param("id").notEmpty("id should not be empty").isMongoId().withMessage("invalid mongoId"),
];

export const login_validator = [
  body("identifier")
    .notEmpty()
    .withMessage("Email/Username is required for login")
    .custom((value) => {
      if (validator.isEmail(value)) return true;
      if (value.length >= 4) return true;

      return false;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/)
    .withMessage("Password must include uppercase, lowercase, number & special character"),
];

export const query_validator = [
  query("token")
    .notEmpty()
    .withMessage("token is required for authenticate")
    .isJWT()
    .withMessage("invalid jwt token"),
];

export const signup_validator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/)
    .withMessage("Password must include uppercase, lowercase, number & special character"),
];
