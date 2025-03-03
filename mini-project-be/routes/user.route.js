const express = require('express');
require('express-async-errors');
const router = express.Router();
const {getUsers, getUser, createUser, updateUser,deleteUser} = require('../controllers/user.controller');
const { isAdmin, protect } = require("../middlewares/auth.middleware");

// Protected Route/s
router.get("/", protect, isAdmin, getUsers);
router.get('/get' ,protect, isAdmin, getUser);
router.put('/update', protect, updateUser);
router.delete('/delete', protect, isAdmin, deleteUser);

// Public Route/s
router.post('/create', createUser);

module.exports = router;