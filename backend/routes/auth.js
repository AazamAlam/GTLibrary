import express from "express";
import { registerStudent, registerStaff, login } from "../controllers/authController.js";

const router = express.Router();

// ----------------- REGISTRATION -----------------
router.post("/register/student", registerStudent);
router.post("/register/staff", registerStaff);

// ----------------- LOGIN -----------------
router.post("/login", login);

export default router;