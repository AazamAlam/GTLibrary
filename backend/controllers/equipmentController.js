import Equipment from "../models/equipmentModel.js";

// GET all equipment
export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().populate("location"); //gets all equipments
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single equipment by ID
export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate("location"); //contains where the location of the device is 
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new equipment
export const createEquipment = async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const saved = await newEquipment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE equipment
export const updateEquipment = async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Equipment not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE equipment
export const deleteEquipment = async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Equipment not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//req.params attaches the different parts of the url as listed in the routes (which is used in fetch)
//req.body connects the post or get request information of the json using the express parser middleware