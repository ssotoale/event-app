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
app.use(express.json());
const User = require("./models/users"); // Import the User model

// to parse JSON
app.use(cors()); // enable CORS for all routes

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
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

// POST route to login user (now using auth.js's loginUser)
app.post("/api/login", loginUser); // Use the imported loginUser function
app.post("/api/tasks", userTask);

// GET route for user data (protected route using the authenticateUser middleware)
app.get("/api/user-data", authenticateUser);
// req.user is populated with the decoded JWT payload
app.get("/api/tasks", authenticateUser);
// app.delete("/Table/:username/:taskId", async (req, res) => {
//   const { username, taskId } = req.params;

//   try {
//     const userTask = await userTask.findOne({ username });
//     if (!userTask) {
//       return res.status(404).json({ message: "User tasks not found" });
//     }

//     const task = userTask.tasks.id(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     // Remove the task
//     task.remove();
//     await userTask.save();

//     res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting task", error });
//   }
// });

// start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`REST API is listening on port ${PORT}`);
});

// Export the app for testing
module.exports = { app, server };
