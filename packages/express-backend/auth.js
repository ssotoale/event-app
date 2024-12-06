//Backend functions
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserTask } = require("./models/users");
// Your User model
// Function to generate JWT token
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
        console.log("Token created successfuly:", token);
        return res.status(200).send({ token });
      } else {
        return res
          .status(401)
          .send({ message: "Invalid username or password" });
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      return res.status(500).send({ message: "Internal server error" });
    });
}

async function userTask(req, res) {
  const { username, task } = req.body;

  // Validate request body
  if (!username || !task || !task.task || !task.xp || !task.date) {
    return res.status(400).json({
      message: "Invalid input: username, task, xp, and date are required",
    });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find or create the user's task document
    let userTask = await UserTask.findOne({ username });

    if (!userTask) {
      userTask = new UserTask({ username, tasks: [] });
    }

    // Check for duplicate tasks
    const isDuplicate = userTask.tasks.some(
      (t) => t.task === task.task && t.date === task.date,
    );
    if (isDuplicate) {
      return res.status(409).json({ message: "Task already exists" });
    }

    // Add the new task
    userTask.tasks.push(task);
    await userTask.save();

    res.status(201).json({ message: "Task added successfully", userTask });
  } catch (error) {
    console.error("Error adding task:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error", error });
  }
}

// Export the functions using CommonJS syntax
module.exports = {
  registerUser,
  authenticateUser,
  loginUser,
  userTask,
};
