const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/student.routes");

const connectDB = require("./config/database");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Portal Backend is running"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});