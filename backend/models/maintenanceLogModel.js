import mongoose from "mongoose";

const maintenanceLogSchema = new mongoose.Schema({
  equipmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Equipment", 
    required: true 
  },
  date: { type: Date, default: Date.now },
  action: { type: String, required: true },   // "Repaired", "Inspected", etc.
  performedBy: { type: String, ref: "Staff", required: True}, //alllows this to be populated by a staff object
  notes: { type: String },
  action: { type: String, enum: ["Repaired", "Inspected", "Checked", "Replaced"], required: true }
});

export default mongoose.model("MaintenanceLog", maintenanceLogSchema);
