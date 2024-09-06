import { Rent } from "../models/rent.js";
import { User } from "../models/user.js";

// Crea un nuevo alquiler
export const createRent = async (req, res) => {
  const { propertyId, userId, initialDate, finalDate } = req.body;

  try {
    const rent = new Rent({
      propertyId,
      userId,
      initialDate,
      finalDate,
    });
    const rentUpload = await rent.save();

    return res
      .status(201)
      .json({ msg: "Alquiler creado con éxito", rent: rentUpload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

// Obtiene una lista de todos los alquileres
export const getRents = async (req, res) => {
  const userId = req.params.userId;

  try {
    const rents = await Rent.find({ userId: userId }).populate({
      path: "propertyId",
      populate: {
        path: "images",
      },
    });
    return res.status(200).json({ rents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

export const getHostings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
      path: "propertiesCreated",
      populate: [
        { path: "category" },
        { path: "benefits" },
        { path: "images" },
        { path: "typeRoom" },
        { path: "dataRoom" },
      ],
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return res.status(200).json({ hostings: user.propertiesCreated });
  } catch (error) {
    console.error("Error al buscar propiedades creadas por el usuario:", error);
    throw error;
  }
};

// Actualiza los datos de un alquiler
export const updateRent = async (req, res) => {
  const { id } = req.params;
  const { propertyId, userId, initialDate, finalDate } = req.body;

  try {
    const updatedRent = await Rent.findByIdAndUpdate(
      id,
      { propertyId, userId, initialDate, finalDate },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "Alquiler actualizado", rent: updatedRent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

// Elimina el alquiler por el id
export const deleteRent = async (req, res) => {
  const { id } = req.params;

  try {
    await Rent.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Alquiler eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};
