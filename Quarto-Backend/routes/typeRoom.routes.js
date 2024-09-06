import { Router } from "express";
import {
  createTypeRoom,
  getTypeRooms,
  updateTypeRoom,
  deleteTypeRoom,
} from "../controllers/typeRoom.controller.js";
import { typeRoomValidator } from "../middlewares/validatorTypeRoom.js";

const router = Router();

// POST api/v1/typeroom - Crear un nuevo tipo de habitación
// GET api/v1/typeroom - Obtener todos los tipos de habitación
// PUT api/v1/typeroom/:id - Actualizar un tipo de habitación existente
// DELETE api/v1/typeroom/:id - Eliminar un tipo de habitación existente

router.post("/", typeRoomValidator, createTypeRoom);
router.get("/", getTypeRooms);
router.patch("/:id", typeRoomValidator, updateTypeRoom);
router.delete("/:id", deleteTypeRoom);

export default router;
