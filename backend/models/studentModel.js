import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },


  department: { type: String },
  year: { type: Number },
  requests: [
    {
      equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },
      description: { type: String },   // e.g. "Monitor flickering in Room A"
      status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
      requestedAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Student", studentSchema);