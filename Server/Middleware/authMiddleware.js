const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or Invalid Token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    } catch (error) {
      return res.status(401).json({ message: "Invalid or Expired Token" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
