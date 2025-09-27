import MaintenanceLog from "../models/maintenanceLogModel.js"
import Equipment from "../models/equimentModel.js";
import Staff from "../models/staffModel.js";

// ----------------- CREATE NEW LOG -----------------
export const createLog = async (req, res) => {
  const { equipmentId, action, performedBy, notes } = req.body;

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    let staff = null;
    if (performedBy) {
      staff = await Staff.findById(performedBy);
      if (!staff) return res.status(404).json({ message: "Staff not found" });
    }

    const log = await MaintenanceLog.create({
      equipmentId,
      action,
      performedBy: performedBy || null, // store staff ID if using reference
      notes
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- GET ALL LOGS -----------------
export const getAllLogs = async (req, res) => {
  try {
    const logs = await MaintenanceLog.find()
      .populate("equipmentId")       // populate equipment info
      .populate("performedBy");     // populate staff info if reference
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- GET SINGLE LOG -----------------
export const getLogById = async (req, res) => {
  try {
    const log = await MaintenanceLog.findById(req.params.id)
      .populate("equipmentId")
      .populate("performedBy");
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- UPDATE LOG -----------------
export const updateLog = async (req, res) => {
  try {
    const updatedLog = await MaintenanceLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLog) return res.status(404).json({ message: "Log not found" });
    res.json(updatedLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- DELETE LOG -----------------
export const deleteLog = async (req, res) => {
  try {
    const deletedLog = await MaintenanceLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: "Log not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};