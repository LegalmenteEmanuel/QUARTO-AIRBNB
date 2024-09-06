import { Review } from "../models/review.js";

// Obtener todas las revisiones de una propiedad específica
export const getReviews = async (req, res) => {
  try {
    const { propertyId } = req.params;
    if (!propertyId) {
      return res
        .status(400)
        .json({ error: "Se requiere el ID de la propiedad" });
    }

    const reviews = await Review.find();
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

// Crear una nueva revisión
export const createReview = async (req, res) => {
  try {
    const { comment, propertyId, userName } = req.body;
    const newReview = new Review({ comment, propertyId, userName });
    await newReview.save();
    return res
      .status(201)
      .json({ message: "Revisión creada con éxito", review: newReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

// Actualizar una revisión existente
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, propertyId, userName } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { comment, propertyId, userName },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Revisión no encontrada" });
    }
    return res
      .status(200)
      .json({
        message: "Revisión actualizada con éxito",
        review: updatedReview,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

// Eliminar una revisión
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Revisión no encontrada" });
    }
    return res.status(200).json({ message: "Revisión eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};
