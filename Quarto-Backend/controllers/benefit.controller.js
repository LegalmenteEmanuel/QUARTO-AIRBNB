import { Benefit } from "../models/benefit.js";

//Crear un nuevo beneficio
export const createBenefit = async (req, res) => {
  const { icon, name, description } = req.body;

  try {
    const benefit = new Benefit({
      icon,
      name,
      description
    });
    const benefitUpload = await benefit.save();

    return res
      .status(201)
      .json({ msg: "beneficio creado con éxito", benefit: benefitUpload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};

//Obtienen una lista de todos los beneficios
export const getBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find();
    return res.status(200).json({ benefits });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};


//Actualiza los datos de un beneficio
export const updateBenefit = async (req, res) => {
  const { id } = req.params;
  const { icon, name, description } = req.body;

  try {
    const updatedBenefit = await Benefit.findByIdAndUpdate(
      id,
      { icon, name, description },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "Beneficio actualizado", benefit: updatedBenefit });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};


//Elimina un beneficio por el id
export const deleteBenefit = async (req, res) => {
  const { id } = req.params;

  try {
    await Benefit.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Beneficio eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor", error });
  }
};
