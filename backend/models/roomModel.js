import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
{
  name: { type: String, required: true, unique: true },
  building: { type: String },
  floor: { type: Number },
  capacity: { type: Number },
  equipment: [ { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" } ]
},
{ timestamps: true }
);

export default mongoose.model("Room", roomSchema);