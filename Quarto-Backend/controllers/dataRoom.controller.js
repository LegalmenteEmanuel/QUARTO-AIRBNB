import { DataRoom } from "../models/dataRoom.js";

//Crea los datos de las habitaciones que tiene la propiedad
export const createDataRoom = async (data, id, res) => {
  const { numGuests, numRooms, numBeds, numBath } = data;

  try {
    const dataRoom = new DataRoom({
      propertyId: id,
      numGuests,
      numRooms,
      numBeds,
      numBath,
    });
    const dataRoomUpload = await dataRoom.save();

    return dataRoomUpload;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//obtienen los datos de las habitaciones de la propiedad
export const getDataRooms = async (req, res) => {
  const { id } = req.params;
  try {
    const dataRooms = await DataRoom.findById(id);
    return res.status(200).json({ dataRooms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//actualiza los datos de las habitaciones de la propiedad
export const updateDataRoom = async (data, id, res) => {
  const {propertyId, numGuests, numRooms, numBeds, numBath } = data;

  try {
    const updatedDataRoom = await DataRoom.findByIdAndUpdate(
      id,
      {propertyId, numGuests, numRooms, numBeds, numBath },
      { new: true }
    );
    return updatedDataRoom;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Elimina los datos de las habitaciones de una propiedad
export const deleteDataRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await DataRoom.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ msg: "Datos de la habitación eliminados correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};
