import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      if (!user.isAdmin) {
        return res.status(403).json({
          message: "Access denied. Admin privileges required.",
        });
      }
  
      // Generate a short-lived access token
      const accessToken = jwt.sign(
        { id: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5m" } // Short-lived token
      );
  
      // Send the token in an httpOnly cookie
      res.cookie("adminToken", accessToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000, // 5 minutes
        sameSite: "strict"
      });
  
      res.json({ message: "Login successful", user });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  