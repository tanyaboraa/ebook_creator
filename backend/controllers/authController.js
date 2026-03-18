const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Validation: Ensure all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 2. Check if user already exists in the database
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Create user
        // Note: Password hashing happens au tomatically in the User model pre-save middleware
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            // 4. Return success response with generated token
            res.status(201).json({
                message: "User registered successfully",
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Find user by email and include password (which is usually hidden by default)
      const user = await User.findOne({ email }).select("+password");
  
      // 2. Check if user exists and if the password matches
      if (user && (await user.matchPassword(password))) {
        res.json({
          message: "Login successful",
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        // 3. If either fails, return 401 Unauthorized
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
// @desc    Get current logged-in user
// @route   GET /api/auth/profile
// @access  Private
// @desc    Get current logged-in user
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        // Find user by ID (retrieved from the protect middleware)
        const user = await User.findById(req.user.id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isPro: user.isPro,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
      // 1. Find the user by ID (provided by the protect middleware)
      const user = await User.findById(req.user.id);
  
      if (user) {
        // 2. Update fields if they are provided in the request body, otherwise keep existing
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
  
        // 3. Handle password update separately to ensure it gets re-hashed
        if (req.body.password) {
          user.password = req.body.password;
        }
  
        // 4. Save the updated user (this triggers the .pre('save') hashing middleware)
        const updatedUser = await user.save();
  
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };