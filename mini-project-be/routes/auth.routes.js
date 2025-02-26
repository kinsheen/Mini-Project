const express = require("express");
const { login, getCurrentUser } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public Routes
router.post("/login", login);

// Protected Routes
router.get("/me", protect, getCurrentUser); // Get current user

module.exports = router;
