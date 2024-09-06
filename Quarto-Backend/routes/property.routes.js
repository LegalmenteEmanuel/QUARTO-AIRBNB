import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  propertyBuy
} from "../controllers/property.controller.js";
import { propertyValidator } from "../middlewares/validatorProperty.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

// POST api/v1/property - Crear una nueva propiedad
// GET api/v1/property - Obtener todas las propiedades
// PUT api/v1/property/:id - Actualizar una propiedad existente
// DELETE api/v1/property/:id - Eliminar una propiedad existente

router.post("/:id", propertyValidator,requireToken, createProperty);
router.post("/buy/:propertyId",requireToken, propertyBuy)
router.get("/",requireToken, getProperties);
router.get("/:id",requireToken, getPropertyById);
router.put("/:id", propertyValidator,requireToken, updateProperty);
router.delete("/:id",requireToken, deleteProperty);

export default router;
