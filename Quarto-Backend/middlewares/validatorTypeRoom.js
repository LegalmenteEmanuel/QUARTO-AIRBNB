import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const typeRoomValidator = [
  body("name", "El nombre es requerido y debe ser una cadena de caracteres")
    .trim()
    .isString()
    .notEmpty(),
  body("description", "La descripción es requerida y debe ser una cadena de caracteres")
    .trim()
    .isString()
    .notEmpty(),
  validationResultExpress,
];
