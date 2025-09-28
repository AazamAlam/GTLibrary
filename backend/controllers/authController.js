import Student from "../models/studentModel.js";
import Staff from "../models/staffModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ----------------- STUDENT REGISTRATION -----------------
export const registerStudent = async (req, res) => {
  const { studentId, name, email, password, year } = req.body;

  try {
    const studentExists = await Student.findOne({ email });
    if (studentExists) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); //encrypts pwd in database

    const student = await Student.create({
      studentId,
      name,
      email,
      passwordHash: hashedPassword,
      department,
      year
    }); //creates a new obj in mongodb

    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id, "student"),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- STAFF REGISTRATION -----------------
export const registerStaff = async (req, res) => {
  const { firstName, lastName, email, password, employeeId, role } = req.body;

  try {
    const staffExists = await Staff.findOne({ email });
    if (staffExists) return res.status(400).json({ message: "Staff already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      employeeId,
      role: role || "staff"
    });

    res.status(201).json({
      _id: staff._id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      employeeId: staff.employeeId,
      role: staff.role,
      token: generateToken(staff._id, staff.role),
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  const { type } = req.body; // "student" or "staff"

  try {
    if (type === "student") {
      const { email, password } = req.body;
      const student = await Student.findOne({ email });
      if (!student) return res.status(401).json({ message: "Invalid email or password" });

  const passwordMatch = await bcrypt.compare(password, student.passwordHash);
      if (!passwordMatch) return res.status(401).json({ message: "Invalid email or password" });

      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: "student",
        token: generateToken(student._id, "student"),
      });

    } else if (type === "staff") {
      const { email, password } = req.body;
      const staff = await Staff.findOne({ email });
      if (!staff) return res.status(401).json({ message: "Invalid email or password" });

      const passwordMatch = await bcrypt.compare(password, staff.passwordHash);
      if (!passwordMatch) return res.status(401).json({ message: "Invalid email or password" });

      res.json({
        _id: staff._id,
        email: staff.email,
        role: staff.role,
        token: generateToken(staff._id, staff.role),
      });
    } else {
      res.status(400).json({ message: "Invalid login type" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
