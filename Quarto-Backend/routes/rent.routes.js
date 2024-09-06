import { Router } from "express";
import {
  createRent,
  getRents,
  updateRent,
  deleteRent,
  getHostings,
} from "../controllers/rent.controller.js";

const router = Router();

// POST api/v1/rent - Crear un nuevo alquiler
// GET api/v1/rent/:userId - Obtener todas las rentas de un usuario
// PUT api/v1/rent/:id - Actualizar un alquiler existente
// DELETE api/v1/rent/:id - Eliminar un alquiler existente

router.post("/", createRent);
router.get("/:userId", getRents);
router.get("/hostings/:userId", getHostings);
router.put("/:id", updateRent);
router.delete("/:id", deleteRent);

export default router;
