// middleware/auth.middleware.js - UPDATED WITH BLACKLIST
import JWT from "jsonwebtoken";
import tokenBlacklist from "../utils/tokenBlacklist.js"; // ADD THIS IMPORT

const requireAuth = (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // ✅ CHECK IF TOKEN IS BLACKLISTED (NEW CODE)
        if (tokenBlacklist.isBlacklisted(token)) {
            return res.status(401).json({
                success: false,
                message: "Session terminated. Please login again.",
                action: "This token was invalidated by logout"
            });
        }

        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Attach admin info to request object
        req.admin = decoded;
        req.token = token; // Attach token for logout use

        next(); // Continue to the route handler

    } catch (error) {
        // Handle different JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

export default requireAuth;