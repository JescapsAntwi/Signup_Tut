const jwt = require("jsonwebtoken");

// Middleware to authenticate user using JWT token
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    //Extract token from header
    const token = authHeader.split(" ")[1];

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Add user ID to request object
    req.userID = decoded.id;

    //Proceed to next middleware or controller
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
