import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

// POST api/v1/category - Crear una nueva categoría
// GET api/v1/category - Obtener todas las categorías
// PUT api/v1/category/:id - Actualizar una categoría existente
// DELETE api/v1/category/:id - Eliminar una categoría existente

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
