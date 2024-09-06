import { Router } from "express";
import { getReviews, createReview, updateReview, deleteReview } from "../controllers/review.controller.js";

const router = Router();

// POST api/v1/category - Crear una nueva categoría
// GET api/v1/category - Obtener todas las categorías
// PUT api/v1/category/:id - Actualizar una categoría existente
// DELETE api/v1/category/:id - Eliminar una categoría existente

router.post("/", createReview);
router.get("/:propertyId", getReviews);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
