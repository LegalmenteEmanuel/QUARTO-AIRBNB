import mongoose from "mongoose";

const { Schema, model } = mongoose;

const dataRoomSchema = new Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  numGuests: {
    type: Number,
    required: true,
  },
  numRooms: {
    type: Number,
    required: true,
  },
  numBeds: {
    type: Number,
    required: true,
  },
  numBath: {
    type: Number,
    required: true,
  },
});

export const DataRoom = model("DataRoom", dataRoomSchema);
