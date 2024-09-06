import { TypeRoom } from "../models/typeRoom.js";

//Crea un nuevo tipo de propiedad
export const createTypeRoom = async (req, res) => {
  const { name, description } = req.body;

  try {
    const typeRoom = new TypeRoom({
      name,
      description,
    });
    const typeRoomUpload = await typeRoom.save();

    return res
    .status(201)
    .json({ msg: "Tipo de habitación creado con éxito", typeRoom: typeRoomUpload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Obtienen una lista de todos los tipos de propiedad
export const getTypeRooms = async (req, res) => {
  try {
    const typeRooms = await TypeRoom.find();
    return res.status(200).json({ typeRooms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Actualiza los datos de un tipo de propiedad
export const updateTypeRoom = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedTypeRoom = await TypeRoom.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    return res.status(200).json({ msg: "Tipo de habitación actualizado", typeRoom: updatedTypeRoom });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Elimina un tipo de propiedad
export const deleteTypeRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await TypeRoom.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Tipo de habitación eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};
