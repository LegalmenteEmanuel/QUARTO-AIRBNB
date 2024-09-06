import mongoose from "mongoose";
const { Schema, model } = mongoose;


const image = new Schema({
    image: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
});
  
export const Image = model("Image", image);