import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const benefitValidator = [
  body("icon", "El icono es requerido y debe ser una cadena de caracteres")
    .trim()
    .isString()
    .notEmpty(),
  body("name", "El nombre es requerido y debe ser una cadena de caracteres")
    .trim()
    .isString()
    .notEmpty(),
  validationResultExpress,
];
