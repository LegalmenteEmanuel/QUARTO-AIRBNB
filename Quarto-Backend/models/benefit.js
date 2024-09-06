import mongoose from "mongoose";
const { Schema, model } = mongoose;

const benefit = new Schema({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export const Benefit = model("benefit", benefit);
