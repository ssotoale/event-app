require("dotenv").config(); // to use environment variables
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
app.use(cors()); 
const User = require("./models/users"); // Import the User model

const PORT = process.env.PORT;

const allowedOrigins = [
  "https://questlogger-epcdgcdvh9gga5cp.westus3-01.azurewebsites.net" // Your frontend domain
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow POST and other methods
  credentials: true, // Enable sending cookies and other credentials
};

app.use(cors(corsOptions));

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1); // Exit the application if the URI is missing
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes

// POST route to register a user (now using auth.js's registerUser)
app.post("/api/create-account", registerUser); // Use the imported registerUser function

// GET route to fetch all users
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users); // Send the users as a JSON response
    })
    .catch((error) => {
      res.status(500).send({ message: "Error retrieving users", error });
    });
});

// POST route to login user (now using auth.js's loginUser)
app.post("/api/login", loginUser); // Use the imported loginUser function
app.post("/tasks", userTask);

// GET route for user data (protected route using the authenticateUser middleware)
app.get("/api/user-data", authenticateUser);
// req.user is populated with the decoded JWT payload
app.get("/tasks", authenticateUser);
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
    res.status(500).json({ message: "Error deleting task", error });
  }
});

// start server
app.listen(process.env.PORT || PORT, () => {
  console.log("REST API is listening.");
});
