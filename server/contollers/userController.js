const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userReg = async (req, res) => {
  const { email, password ,role} = req.body;

  if (!email || !password || !role) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }

  try {
    // Check if user already exists
    let userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Return response
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      token,
      role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400).json({ message: "Please provide email and password" });
    return;
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate token
    const token = generateToken(user._id);

    // Return response
    res.json({
      _id: user._id,
      email: user.email,
      token,
      role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Middleware to get current user
const crntUser = async (req, res) => {
  const { _id, name, email } = req.user;
  res.json({
    id: _id,
    email,
    role
  });
};

// Generate JWT token
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = { userReg, userLogin, crntUser };
