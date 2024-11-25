import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { blacklistToken } from "../middleware/jwt.js";
import User from "../models/usermodel.js";



const refreshTokens = new Set();
const ACCESS_TOKEN_EXPIRATION = '15m'; // Short-lived access token
const REFRESH_TOKEN_EXPIRATION = '7d'; // Long-lived refresh token

// Generate tokens
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username},
        process.env.SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );
};

// Register
export const register=async(req,res)=>{
  const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


// Login
export const login=async(req,res)=>{
   const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        refreshTokens.add(refreshToken); // Store refresh token

        res.cookie('token', accessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRATION, sameSite: 'strict' ,secure:false});
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'strict' ,secure:false});

        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Refresh Token
export const refreshToken = async (req, res) => {
   const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    if (!refreshTokens.has(refreshToken)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_COOKIE_EXPIRATION);
        const user = { id: decoded.id };

        const newAccessToken = generateAccessToken(user);

        res.cookie('token', newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'strict' });

        res.json({ message: 'Token refreshed successfully' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}



// Logout
export const logout=async(req,res)=>{
  const accessToken = req.cookies?.token;
    const refreshToken = req.cookies?.refreshToken;

    if (accessToken) blacklistToken(accessToken); // Blacklist access token
    if (refreshToken) refreshTokens.delete(refreshToken); // Remove refresh token

    res.clearCookie('token', { httpOnly: true, sameSite: 'strict',secure:false });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict',secure:false });

    res.json({ message: 'Logged out successfully' });
}
// Protected Route
export const profile=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'This is a protected route', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
