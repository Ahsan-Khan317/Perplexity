import { body } from "express-validator";
import validator from "validator";

const login_validator = [
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
    .withMessage(
      "Password must include uppercase, lowercase, number & special character",
    ),
];

export default login_validator;
