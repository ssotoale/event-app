// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection setup
const uri = process.env.MONGODB_URI; // Your MongoDB connection string
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Consider hashing passwords in production
  uniqueId: { type: String, required: true, unique: true }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create User model
const User = mongoose.model('User', userSchema);

// Routes
// User registration
app.post('/api/register', async (req, res) => {
  const { username, email, password, uniqueId } = req.body;

  if (!username || !email || !password || !uniqueId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use.' });
    }

    const newUser = new User({ username, email, password, uniqueId });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

// Render users in HTML format (optional)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const html = `
      <html>
        <head><title>User List</title></head>
        <body>
          <h1>User List</h1>
          <ul>
            ${users.map(user => `<li>${user.username} - ${user.email}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving users', error });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the User Management API</h1>');
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
