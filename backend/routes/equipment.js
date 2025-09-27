import express from "express";
import {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from "../controllers/equipmentController.js";

const router = express.Router();

// GET all equipment
router.get("/", getAllEquipment);

// GET single equipment by ID
router.get("/:id", getEquipmentById);

// POST new equipment
router.post("/", createEquipment);

// PUT update existing equipment by ID
router.put("/:id", updateEquipment);

// DELETE equipment by ID
router.delete("/:id", deleteEquipment);

export default router;