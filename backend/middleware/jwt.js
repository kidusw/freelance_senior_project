import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
// Blacklist for invalidated tokens
export const tokenBlacklist = new Set();

// Middleware to verify the access token
export const verifyToken = async(req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    // Check blacklist
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token has been invalidated' });
    }
    console.log("token from jwt",token);
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
         req.userId = decoded.id;
          const user = await User.findById(req.userId);
          
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user data to the request
    req.userData = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Blacklist a token
export const blacklistToken = (token) => {
    tokenBlacklist.add(token);
};