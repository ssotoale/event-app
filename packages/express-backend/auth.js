const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let creds = []; // In-memory "database" for testing

// Register a new user
async function registerUser(req, res) {
  const { username, pwd } = req.body;

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pwd, salt);
      const token = await generateAccessToken(username);
      console.log("Token:", token);
      creds.push({ username, hashedPassword }); // Save the user in the array
      res.status(201).send({ token: token });
    } catch (error) {
      res.status(500).send("Error during registration.");
    }
  }
}

// Generate JWT token
async function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

// Authenticate user with token
async function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  }

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded) {
      next();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    console.log("JWT error:", error);
    res.status(401).end();
  }
}

// Login user
async function loginUser(req, res) {
  const { username, pwd } = req.body;
  const retrievedUser = creds.find((c) => c.username === username);

  if (!retrievedUser) {
    res.status(401).send("Unauthorized");
  } else {
    try {
      const matched = await bcrypt.compare(pwd, retrievedUser.hashedPassword);
      if (matched) {
        const token = await generateAccessToken(username);
        res.status(200).send({ token: token });
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  }
}

module.exports = { registerUser, authenticateUser, loginUser };
