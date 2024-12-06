require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  authenticateUser,
  registerUser,
  loginUser,
  userTask,
} = require("./auth"); // Import functions from auth.js

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if not defined

// Middleware
app.use(express.json());

// Configure CORS
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000"; // Frontend URL from environment variable
const allowedOrigins = [frontendURL, "https://questlogger-epcdgcdvh9gga5cp.westus3-01.azurewebsites.net"];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
  credentials: true, // Enable credentials (e.g., cookies, authentication headers)
};

app.use(cors(corsOptions));

// MongoDB connection
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1); // Exit if MongoDB URI is missing
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit on connection error
  });

// Import the User model
const User = require("./models/users");

// Routes
app.post("/api/create-account", registerUser); // Route to register a user
app.post("/api/login", loginUser); // Route to log in a user
app.post("/tasks", userTask); // Route to add a task

//testing get API
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Protected routes
app.get("/api/user-data", authenticateUser, (req, res) => {
  res.status(200).json({ message: "User authenticated successfully", user: req.user });
});

app.get("/tasks", authenticateUser, (req, res) => {
  res.status(200).json({ message: "Authenticated user tasks retrieved successfully" });
});

// DELETE task by ID
app.delete("/Table/:username/:taskId", async (req, res) => {
  const { username, taskId } = req.params;

  try {
    const userTask = await userTask.findOne({ username });
    if (!userTask) {
      return res.status(404).json({ message: "User tasks not found" });
    }

    const task = userTask.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task
    task.remove();
    await userTask.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`REST API is listening on port ${PORT}`);
});
