import { TypeRoom } from "../../models/typeRoom.js";

const typeRooms = [
  {
    name: "Alojamiento entero",
    description: "espacio con diferentes habitaciones",
  },
  {
    name: "Una habitación",
    description: "una habitación para pasar la noche o unos dias",
  },
  {
    name: "Una habitación compartida",
    description: "una habitación para dos personas o mas",
  },
];

async function seed() {
  await TypeRoom.deleteMany();
  await TypeRoom.insertMany(typeRooms);
  console.log("Seed completado");
}

seed();
