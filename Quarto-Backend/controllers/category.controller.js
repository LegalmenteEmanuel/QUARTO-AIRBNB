import { Category } from "../models/category.js";

//Crea una nueva categoria
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = new Category({
      name,
      description,
    });
    const categoryUpload = await category.save();

    return res
    .status(201)
    .json({ msg: "Categoría creada con éxito", category: categoryUpload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Obtiene una lista de todas las categorias
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Actualiza los datos de una catregoria
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    return res.status(200).json({ msg: "Categoría actualizada", category: updatedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Elimina la categoria por el id
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};
