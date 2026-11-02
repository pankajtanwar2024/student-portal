const express = require("express");

const bcrypt = require("bcrypt");

const Student = require("../models/Student");

const router = express.Router();


// CHECK EMAIL
router.post("/check-email", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const student = await Student.findOne({
            email: email.trim().toLowerCase()
        });

        res.json({
            registered: !!student
        });

    } catch (error) {
        console.error("Error checking email:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// REGISTER STUDENT
router.post("/register", async (req, res) => {
    try {
        const {
            email,
            password,
            name,
            age,
            course,
            year,
            semester,
            university
        } = req.body;

        // Check required fields
        if (
            !email ||
            !password ||
            !name ||
            !age ||
            !course ||
            !year ||
            !semester ||
            !university
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Check if email already exists
        const existingStudent = await Student.findOne({
            email: normalizedEmail
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create student
        const student = await Student.create({
            email: normalizedEmail,
            password: hashedPassword,
            name: name.trim(),
            age,
            course: course.trim(),
            year,
            semester,
            university: university.trim()
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                email: student.email,
                name: student.name,
                age: student.age,
                course: student.course,
                year: student.year,
                semester: student.semester,
                university: student.university
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// LOGIN STUDENT
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Find student
        const student = await Student.findOne({
            email: normalizedEmail
        });

        // Student doesn't exist
        if (!student) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            student.password
        );

        // Password is incorrect
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful
        res.json({
            message: "Login successful",
            student: {
                id: student._id,
                email: student.email,
                name: student.name,
                age: student.age,
                course: student.course,
                year: student.year,
                semester: student.semester,
                university: student.university
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;