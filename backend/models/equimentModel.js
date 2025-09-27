import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },   
  type: { type: String, required: true },   
  location: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room"     // connects to Room schema
  }, 
  status: { type: String, default: "working" }, 
  lastMaintenance: { type: Date, default: Date.now },
  notes: { type: String },
  specs: { type: mongoose.Schema.Types.Mixed, default: {} }
});

export default mongoose.model("Equipment", equipmentSchema);
