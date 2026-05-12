import { query } from "express-validator";

const query_validator = [
  query("token")
    .notEmpty()
    .withMessage("token is required for authenticate")
    .isJWT()
    .withMessage("invalid jwt token"),
];
export default query_validator;
