import { Router } from "express";
import {
  createBenefit,
  getBenefits,
  updateBenefit,
  deleteBenefit,
} from "../controllers/benefit.controller.js";
import { benefitValidator } from "../middlewares/validatorBenefit.js";

const router = Router();

// POST api/v1/benefit - Crear un nuevo beneficio
// GET api/v1/benefit - Obtener todos los beneficios
// PUT api/v1/benefit/:id - Actualizar un beneficio existente
// DELETE api/v1/benefit/:id - Eliminar un beneficio existente

router.post("/", benefitValidator, createBenefit);
router.get("/", getBenefits);
router.patch("/:id", benefitValidator, updateBenefit);
router.delete("/:id", deleteBenefit);

export default router;
