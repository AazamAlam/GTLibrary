import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },  // store hashed passwords only!
  role: { type: String, enum: ["admin", "staff"], default: "staff" }
});

export default mongoose.model("Staff", staffSchema);