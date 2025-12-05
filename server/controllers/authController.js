// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const registerUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashed, role });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ message: "User not found" });
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.json({ token, role: user.role });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (giver or taker)
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password, role, username } = req.body;

    if (!email || !password || !role || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate username format
    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(username.toLowerCase())) {
      return res.status(400).json({ 
        message: "Username can only contain lowercase letters, numbers, hyphens, and underscores" 
      });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ 
        message: "Username must be between 3 and 30 characters" 
      });
    }

    // Check if email or username already exists
    const existing = await User.findOne({ 
      $or: [{ email }, { username: username.toLowerCase() }] 
    });
    
    if (existing) {
      if (existing.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existing.username === username.toLowerCase()) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashed,
      role,
      username: username.toLowerCase().trim(),
    });

    await newUser.save();

    // Generate JWT token for automatic login
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "Username or email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return token + user details
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: err.message });
  }
};
