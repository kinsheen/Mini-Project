const express = require("express");
require('express-async-errors');
const { login, getCurrentUser, changePassword, forgotPassword, resetPassword} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public Routes
router.post("/login", login);

// Protected Routes
router.get("/me", protect, getCurrentUser); // Get current user
router.put("/change-password", protect, changePassword);
router.post("/forgot-password", protect, forgotPassword);
router.post("/reset-password", protect, resetPassword);

module.exports = router;
