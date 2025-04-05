const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define the user schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password must be at least 6 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Method to compare password for login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Create and export the user model
const User = mongoose.model("User", userSchema);
module.exports = User;
