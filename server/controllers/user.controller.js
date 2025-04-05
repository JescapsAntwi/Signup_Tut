const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//Controller for handling user-related operations
const userController = {
  //Function to register a new user
  register: async (req, res) => {
    try {
      //Create a new user instance with the data from the request body
      const { firstname, lastname, email, password } = req.body;

      //Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      //Create a new user and save it to the database
      const newUser = new User({ firstname, lastname, email, password });

      //Save the new user to the database
      await newUser.save();
      //Generate a JWT token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      //Send the token and user data in the response
      res
        .status(201)
        .json({
          token,
          user: {
            id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
          },
        });
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      // Get user ID from token (assuming authentication middleware)
      const userId = req.userId;

      // Find user by ID (excluding password)
      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return user data
      res.status(200).json({ user });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = userController;
