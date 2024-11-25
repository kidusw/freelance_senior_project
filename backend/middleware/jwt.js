import jwt from "jsonwebtoken";

// Blacklist for invalidated tokens
export const tokenBlacklist = new Set();

// Middleware to verify the access token
export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    // Check blacklist
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token has been invalidated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Blacklist a token
export const blacklistToken = (token) => {
    tokenBlacklist.add(token);
};

