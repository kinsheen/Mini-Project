const express = require('express');
require('express-async-errors');
const router = express.Router();
const {getToDos, getToDo, createToDo, updateToDo, deleteToDo, getToDoByField, getToDoByDate} = require('../controllers/to-do.controller');

router.get('/', getToDos);
router.get('/id/:id', getToDo);
router.get('/get/:field/:value', getToDoByField);
router.get('/date', getToDoByDate);
router.post('/', createToDo);
router.put('/:id', updateToDo);
router.delete('/:id', deleteToDo);

module.exports = router;