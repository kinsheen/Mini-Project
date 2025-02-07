const express = require('express');
require('express-async-errors');
const router = express.Router();
const {getToDos, getToDo, createToDo, updateToDo, deleteToDo, getToDoByField} = require('../controllers/to-do.controller');

router.get('/', getToDos);
router.get('/:id', getToDo);
router.get('/:field/:value', getToDoByField);
router.post('/', createToDo);
router.put('/:id', updateToDo);
router.delete('/:id', deleteToDo);

module.exports = router;