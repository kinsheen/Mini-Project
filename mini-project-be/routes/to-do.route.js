const express = require('express');
require('express-async-errors');
const router = express.Router();
const {getToDos, getToDo, createToDo, updateToDo, deleteToDo, getToDoByField, getToDoByDate} = require('../controllers/to-do.controller');
const { protect } = require("../middlewares/auth.middleware");

router.get('/', protect, getToDos);
router.get('/get', protect, getToDo);
router.get('/find', protect, getToDoByField);
router.get('/date', protect, getToDoByDate);
router.post('/create', protect, createToDo);
router.put('/update', protect, updateToDo);
router.delete('/delete', protect, deleteToDo);

module.exports = router;