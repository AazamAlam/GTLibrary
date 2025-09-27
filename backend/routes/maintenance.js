import express from "express";
import {
  createLog,
  getAllLogs,
  getLogById,
  updateLog,
  deleteLog
} from "../controllers/maintenanceController.js";

// Create a new router instance
const router = express.Router();

// Define routes relative to this router
router.post("/", createLog);
router.get("/", getAllLogs);
router.get("/:id", getLogById);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);

// Export the router
export default router;
