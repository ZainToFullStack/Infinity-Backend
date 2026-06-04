import JWT from "jsonwebtoken";
import Admin from "../model/admin.model.js";
import bcrypt from "bcrypt"
import tokenBlacklist from "../utils/tokenBlacklist.js"; // ADD THIS IMPORT
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check the email is exist in the db or not!!!
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            })

        }
        //compare password with hash password
        const ispassword = await bcrypt.compare(password, admin.password)
        if (!ispassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })

        }

        //now we need to create the token 
        const token = JWT.sign(
            {
                id: admin._id, email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )


        // return success status
        res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        })
        console.log(`🚪 Admin ${email} logged In successfully`);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Login failed Server Error",
            error: error.message
        })
    }
}
// controllers/logout.controller.js
// controllers/logout.controller.js


const logoutController = (req, res) => {
    try {
        // Get token from header (already verified by middleware)
        const token = req.token; // From middleware

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No token found for logout"
            });
        }

        // Get token expiration
        const decoded = JWT.decode(token);
        let expiresAt = Date.now() + (24 * 60 * 60 * 1000); // Default 24h

        if (decoded && decoded.exp) {
            expiresAt = decoded.exp * 1000; // Convert to milliseconds
        }

        // Add token to blacklist
        tokenBlacklist.add(token, expiresAt);

        console.log(`🚪 Admin ${req.admin?.email} logged out successfully`);

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
            details: {
                action: "Token invalidated on server",
                cannotBeUsedUntil: new Date(expiresAt).toLocaleString(),
                admin: req.admin.email
            }
        });

    } catch (error) {
        console.error("❌ Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};

export default logoutController;

export { logincontroller, logoutController }