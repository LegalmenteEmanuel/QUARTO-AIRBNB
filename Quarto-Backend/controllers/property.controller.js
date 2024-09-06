import { User } from "../models/user.js";
import { Property } from "../models/property.js";
import { Rent } from "../models/rent.js";
import { Image } from "../models/image.js";
import { uploadFile, deleteFile } from "./s3.controller.js";
import { createDataRoom, updateDataRoom } from "./dataRoom.controller.js";

export const createProperty = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    location,
    typeRoom,
    dataRoom,
    benefits,
  } = req.body;

  const { id } = req.params;
  const user = await User.findById(req.uid);

  try {
    const jsonLocation = JSON.parse(location);
    const jsonDataRoom = JSON.parse(dataRoom);
    const jsonBenefits = JSON.parse(benefits);

    const property = new Property({
      name,
      description,
      price,
      category,
      location: jsonLocation,
      typeRoom,
      benefits: jsonBenefits.map((benefit) => benefit._id),
      owner: id,
      reviews: [],
    });

    const propertyUpload = await property.save();

    const uploadedImages = [];
    if (req.files && req.files["image"]) {
      for (const file of req.files["image"]) {
        const uploadResult = await uploadFile(file);
        const image = new Image({
          image: uploadResult.objectUrl,
          fileName: uploadResult.fileName,
        });
        const savedImage = await image.save();
        uploadedImages.push(savedImage._id);
      }
      propertyUpload.images = uploadedImages;
    }

    const dataRoomUpload = await createDataRoom(
      jsonDataRoom,
      propertyUpload._id
    );
    propertyUpload.dataRoom = dataRoomUpload._id;
    await propertyUpload.save();

    user.propertiesCreated.push(propertyUpload._id);
    await user.save();
    console.log("jeje");
    return res
      .status(201)
      .json({ msg: "Propiedad creada con éxito", property: propertyUpload });
  } catch (error) {
    console.log("Error en el servidor:", error);
    return res
      .status(500)
      .json({ error: "Error del servidor", details: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    // Obtener el límite de la paginación desde la query, o establecerlo en 10 por defecto
    const properties = await Property.find()
      .populate("category")
      .populate("benefits")
      .populate("images")
      .populate("typeRoom")
      .populate("dataRoom")
      .populate("owner"); // Limitar el número de resultados
    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id; // Obtener el ID de la propiedad desde los parámetros de la solicitud
    const property = await Property.findById(propertyId)
      .populate("category")
      .populate("benefits")
      .populate("images")
      .populate("typeRoom")
      .populate("dataRoom")
      .populate("owner");

    if (!property) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    return res.status(200).json({ property });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category,
    location,
    benefits,
    typeRoom,
    dataRoom,
  } = req.body;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    const jsonLocation = JSON.parse(location);
    const jsonDataRoom = JSON.parse(dataRoom);
    const jsonBenefits = JSON.parse(benefits);

    property.name = name;
    property.description = description;
    property.price = price;
    property.category = category;
    property.location = jsonLocation;
    property.typeRoom = typeRoom;

    // Actualizar los beneficios
    if (benefits) {
      property.benefits = [];
      jsonBenefits.forEach(async (benefitId) => {
        property.benefits.push(benefitId._id);
      });
    }

    // Verificar si hay imágenes nuevas en la solicitud
    if (req.files["image"]) {
      // Subir las nuevas imágenes una por una
      const images = req.files["image"];
      const uploadedImages = [];
      for (let i = 0; i < images.length; i++) {
        const result = await uploadFile(images[i]);
        uploadedImages.push({
          image: result.objectUrl,
          fileName: result.fileName,
        });
      }

      // Guardar todas las nuevas imágenes en la base de datos
      const savedImages = await Image.insertMany(uploadedImages);

      // Obtener solo los IDs de las nuevas imágenes guardadas
      const imageIds = savedImages.map((image) => image._id);

      // Eliminar las imágenes antiguas de la propiedad de S3
      const oldImages = await Image.find({ _id: { $in: property.images } });
      for (let i = 0; i < oldImages.length; i++) {
        await deleteFile(oldImages[i].fileName);
      }

      // Eliminar las imágenes antiguas de la base de datos
      await Image.deleteMany({ _id: { $in: property.images } });

      // Actualizar la propiedad con los IDs de las nuevas imágenes subidas
      property.images = imageIds;
    }

    const updatedProperty = await property.save();
    await updateDataRoom(jsonDataRoom, property.dataRoom);

    return res
      .status(200)
      .json({ msg: "Propiedad actualizada", property: updatedProperty });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    // Eliminar las imágenes asociadas a la propiedad de S3
    const images = await Image.find({ _id: { $in: property.images } });
    for (let i = 0; i < images.length; i++) {
      await deleteFile(images[i].fileName);
    }

    // Eliminar las imágenes de la base de datos
    await Image.deleteMany({ _id: { $in: property.images } });

    // Eliminar la propiedad
    await Property.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Propiedad eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

export const propertyBuy = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { dates } = req.body;

    const property = await Property.findById(propertyId);
    const user = await User.findById(req.uid);

    if (!property || !user) {
      return res
        .status(404)
        .json({ error: "Propiedad o usuario no encontrado" });
    }

    // Agrega el curso a la lista de cursos comprados por el usuario
    user.properties.push(property._id);
    await user.save();
    const rent = new Rent({
      propertyId: property._id,
      userId: user._id,
      initialDate: dates.from,
      finalDate: dates.to,
    });
    await rent.save();

    res.json({ message: "Propiedad alquilada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
