import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Authorization header or Bearer missing");
      return res.json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Token is empty");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    console.log("TOKEN RECEIVED:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    req.user = await User.findById(userId).select("-password");

    if (!req.user) {
      return res.json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.json({ success: false, message: "Not authorized" });
  }
};

export default protect;
