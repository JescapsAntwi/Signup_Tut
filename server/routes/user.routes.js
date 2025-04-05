const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

//Public routes
router.post("/register", userController.register);

//Protected routes
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
