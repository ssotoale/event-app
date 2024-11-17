// import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // to use environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// to parse JSON
app.use(express.json());
app.use(cors()); // enable CORS for all routes

// establish MongoDB connection
const uri = process.env.MONGODB_URI; // MongoDB connection string
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
});

// user model
const User = mongoose.model("User", userSchema);

// Routes

// POST route to register user
app.post("/api/register", async (req, res) => {
  const { username, email, password, uniqueId } = req.body;

  try {
    const newUser = new User({ username, email, password, uniqueId });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
});

// GET route to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error });
  }
});

// temporary (until front end is updated) - HTML page to display users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    const html = `
            <html>
                <head><title>User List</title></head>
                <body>
                    <h1>User List</h1>
                    <ul>
                        ${users.map((user) => `<li>${user.username} - ${user.email}</li>`).join("")}
                    </ul>
                </body>
            </html>
        `;
    res.send(html);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error });
  }
});

//User Task
const usertask = new mongoose.Schema({
  duedate: { type: String, required: true, unique: true },
  exp: { type: String, required: true, unique: true },
  taskId: { type: String, required: true },
  taskName: { type: String, required: true, unique: true },
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
