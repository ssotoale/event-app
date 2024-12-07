//Backend functions
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserTask } = require("./models/users");

function generateAccessToken(username) {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET environment variable is not set.");
  }
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

// Example in the registerUser function:
function registerUser(req, res) {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ error: "Bad request: Invalid input data." }); // Changed to .json()
  }

  console.log("Attempting to register user:", username);

  User.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        console.log("Username already taken:", username);
        return res.status(409).json({ error: "Username already taken." }); // Changed to .json()
      }

      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          const newUser = new User({ username, password: hashedPassword });
          return newUser.save();
        })
        .then(() => {
          const token = generateAccessToken(username);
          console.log("User created successfully:", username);
          return res.status(201).json({ token }); // Consistent JSON response
        })
        .catch((error) => {
          console.error("Error during password hashing or saving user:", error);
          return res.status(500).json({ error: "Internal server error." }); // Changed to .json()
        });
    })
    .catch((error) => {
      console.error("Error checking existing user:", error);
      return res.status(500).json({ error: "Internal server error." }); // Changed to .json()
    });
}

// Middleware to authenticate user via JWT token using async/await
async function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "No token received" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded; // Attach decoded user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("JWT error:", error);
    return res.status(401).send({ message: "Invalid token" });
  }
}

// Function to log in the user using async/await
function loginUser(req, res) {
  const { username, password } = req.body;

  // Fetch the user from the database
  User.findOne({ username })
    .then((retrievedUser) => {
      if (!retrievedUser) {
        // Send response and return to prevent further execution
        return res
          .status(401)
          .send({ message: "Invalid username or password" });
      }

      // Compare the password with the hashed password in the database
      return bcrypt.compare(password, retrievedUser.password);
    })
    .then((matched) => {
      if (matched) {
        // Generate a JWT token for the user
        const token = generateAccessToken(username);
        console.log("Token created successfully:", token);

        // Send response and return to prevent further execution
        return res.status(200).send({ token });
      } else {
        // Invalid password, send response and return
        return res
          .status(401)
          .send({ message: "Invalid username or password" });
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);

      // Send response and return to prevent further execution
      return res.status(500).send({ message: "Internal server error" });
    });
}

function userTask(req, res) {
  const { username, task } = req.body; // Only the username and task are provided by the user

  // Validate input
  if (!username || !task) {
    return res.status(400).send({ message: "Username and task are required" });
  }

  const newTask = {
    task: task,
    completed: false, // Default value
    xp: 5, // Default XP for each task
    date: new Date().toISOString().split("T")[0], // Current date in "YYYY-MM-DD" format
  };

  // Find user task record by username (or create a new one if not found)
  UserTask.findOneAndUpdate(
    { username: username },
    { $push: { tasks: newTask } }, // Add the new task to the user's task array
    { upsert: true, new: true }, // Create new record if user not found
    (err, updatedUserTask) => {
      if (err) {
        console.error("Error adding task:", err);
        return res.status(500).send({ message: "Internal server error" });
      }
      return res.status(200).send({
        message: "Task added successfully",
        tasks: updatedUserTask.tasks,
      });
    },
  );
}

// Export the functions using CommonJS syntax
module.exports = {
  registerUser,
  authenticateUser,
  loginUser,
  userTask,
  generateAccessToken,
};
