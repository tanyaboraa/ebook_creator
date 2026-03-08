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
        // Note: Password hashing happens automatically in the User model pre-save middleware
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
exports.loginUser = async (req, res) => {
    try {
        // Logic for login will go here
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        // Logic for getting profile will go here
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
        // Logic for updating profile will go here
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};