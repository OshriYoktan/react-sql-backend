const express = require('express')
const { addTodo, getTodos, deleteTodo, getTodoById, updateTodo } = require('./todo.controller')
const router = express.Router()

router.get('/:id', getTodoById)
router.get('/', getTodos)
router.put('/:id', updateTodo)
router.post('/', addTodo)
router.delete('/:id', deleteTodo)

module.exports = router