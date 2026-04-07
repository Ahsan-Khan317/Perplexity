import {param} from "express-validator"

const id_validator=[
    param("id").notEmpty("id should not be empty").isMongoId().withMessage("invalid mongoId")
]

export default id_validator