const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

// ✅ LOGIN FUNCTION
const login = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
};

// ✅ GET CURRENT USER
const getCurrentUser = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] }, // Do not return the password
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
};

// ✅ CHANGE PASSWORD
const changePassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    // ✅ Extract user ID from the authenticated JWT
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Assuming `id` is stored in the JWT payload

    // ✅ Fetch the user from the database
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // ✅ Compare the old password with the hashed password in DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password" });
    }

    // ✅ Hash the new password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // ✅ Update the password in the database
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    return res.status(200).json({ message: "Password changed successfully" });

}

// ✅ FORGOT PASSWORD
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // ✅ Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Reset password URL (frontend link)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // ✅ Send Email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
        message: "Password reset email sent successfully",
        resetToken: resetToken
    });
};

// ✅ RESET PASSWORD
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
        return res.status(404).json({ message: "Invalid token or user not found" });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update password
    await User.update({ password: hashedPassword }, { where: { id: user.id } });

    return res.status(200).json({ message: "Password reset successfully" });
};

module.exports = { login, getCurrentUser, changePassword, forgotPassword, resetPassword};
