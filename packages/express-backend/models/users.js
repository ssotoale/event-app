const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
  },
  password: {
    type: String,
    required: true,
  },
});
const userTaskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: "User", // Reference the User model by username
  },
  tasks: [
    {
      task: { type: String, required: true }, // Task name or description
      completed: { type: Boolean, required: false },
      xp: { type: Number, required: true }, // XP for the task
      date: { type: String, required: true }, // Date in string format (e.g., "YYYY-MM-DD")
    },
  ],
});

const UserTask = mongoose.model("UserTask", userTaskSchema);

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = { User, UserTask };
