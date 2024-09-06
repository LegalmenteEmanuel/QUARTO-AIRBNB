import mongoose from "mongoose";
import { Category } from "../../models/category.js";

const categories = [
  { name: "Casa", description: "Casa de alquiler" },
  { name: "Apartamento", description: "Apartamento en edifiico o condominios" },
];

async function seed() {
  await Category.deleteMany().maxTimeMS(60000);
  await Category.insertMany(categories);
  console.log("Seed completado");
}

seed();
