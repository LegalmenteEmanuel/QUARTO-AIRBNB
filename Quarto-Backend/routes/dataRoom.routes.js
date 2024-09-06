import { Router } from "express";
import {
  createDataRoom,
  getDataRooms,
  updateDataRoom,
  deleteDataRoom,
} from "../controllers/dataRoom.controller.js";
import { dataRoomValidator } from "../middlewares/validatorDataRoom.js";

const router = Router();

// POST api/v1/dataroom - Crear nuevos datos de habitación
// GET api/v1/dataroom - Obtener todos los datos de habitación
// PUT api/v1/dataroom/:id - Actualizar datos de habitación existentes
// DELETE api/v1/dataroom/:id - Eliminar datos de habitación existentes

router.post("/", dataRoomValidator, createDataRoom);
router.get("/", getDataRooms);
router.put("/:id", dataRoomValidator, updateDataRoom);
router.delete("/:id", deleteDataRoom);

export default router;
