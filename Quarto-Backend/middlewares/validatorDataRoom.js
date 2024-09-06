import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const dataRoomValidator = [
  body("numGuests", "El número de huéspedes debe ser un número entero mayor que 0")
    .isInt({ min: 1 }),
  body("numRooms", "El número de habitaciones debe ser un número entero mayor que 0")
    .isInt({ min: 1 }),
  body("numBeds", "El número de camas debe ser un número entero mayor que 0")
    .isInt({ min: 1 }),
  body("numBath", "El número de baños debe ser un número entero mayor que 0")
    .isInt({ min: 1 }),
  validationResultExpress,
];
