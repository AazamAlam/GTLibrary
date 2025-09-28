import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },  // store hashed passwords only!
  employeeId: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "staff"], default: "staff" }
});

export default mongoose.model("Staff", staffSchema);