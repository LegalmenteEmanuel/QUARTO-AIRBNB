import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  comment: {
    type: String,
  },
  propertyId: {
    type: String,
  },
  userName: {
    type: String,
  },
});

export const Review = model("Review", reviewSchema);
