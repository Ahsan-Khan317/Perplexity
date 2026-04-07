import { body } from "express-validator"

const signup_validator = [

  body("username")
    .trim()
    .notEmpty().withMessage("Username should not be empty")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email should not be empty")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password should not be empty")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/)
    .withMessage("Password must include uppercase, lowercase, number & special character")

]

export default signup_validator