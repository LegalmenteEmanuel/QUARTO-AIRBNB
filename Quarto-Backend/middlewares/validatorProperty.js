import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const propertyValidator = [
  body("name", "El nombre es requerido y debe ser una cadena de caracteres")
    .trim()
    .isString()
    .notEmpty(),
  body("description", "La descripción es requerida y debe ser una cadena de caracteres")
    .trim()
    .isString()
    .notEmpty(),
  body("price", "El precio es requerido y debe ser un número")
    .isNumeric()
    .notEmpty(),
  body("category", "La categoría es requerida y debe ser un ObjectId válido")
    .isMongoId()
    .notEmpty(),
  body("typeRoom", "El tipo de habitación es requerido y debe ser un ObjectId válido")
    .isMongoId()
    .notEmpty(),
  validationResultExpress,
];
