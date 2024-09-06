import mongoose from "mongoose";
const { Schema, model } = mongoose;

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  typeRoom: {
    type: Schema.Types.ObjectId,
    ref: "TypeRoom",
    required: true,
  },

  location: {
    latitud: {
      type: Number,
    },
    longitud: {
      type: Number,
    },
    direccion: {
      type: String,
    },
    description: {
      type: String,
    },
  },

  dataRoom: {
    type: Schema.Types.ObjectId,
    ref: "DataRoom",
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  benefits: [
    {
      type: Schema.Types.ObjectId,
      ref: "benefit",
    },
  ],

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true, min: 1, max: 5 },
    },
  ],

  averageRating: {
    type: Number,
    default: 0,
  },
});

export const Property = model("Property", propertySchema);
