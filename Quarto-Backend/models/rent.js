import mongoose from "mongoose";
const { Schema, model } = mongoose;

const rent = new Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  initialDate: {
    type: String,
    required: true,
  },
  finalDate: {
    type: String,
    required: true,
  },
});

export const Rent = model("Rent", rent);
