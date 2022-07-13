const logger = require('../../services/logger.service')
const todoService = require('./todo.service')

async function getTodos(req, res) {
    try {
        const filterBy = req.query
        const todos = await todoService.query(filterBy)
        res.send(todos)
    } catch (err) {
        logger.error('Cannot get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
    }
}

async function getTodoById(req, res) {
    try {
        const todo = await todoService.getTodoById(req.params.id)
        res.send(todo)
    } catch (err) {
        logger.error('Cannot get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
    }
}

async function deleteTodo(req, res) {
    try {
        await todoService.removeTodo(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete todo', err)
        res.status(500).send({ err: 'Failed to delete todo' })
    }
}

async function addTodo(req, res) {
    try {
        var todo = req.body
        todo = await todoService.addTodo(todo)
        res.send(todo)
    } catch (err) {
        logger.error('Failed to add todo', err)
        res.status(500).send({ err: 'Failed to add todo' })
    }
}

async function updateTodo(req, res) {
    try {
        var todo = req.body
        todo = await todoService.updateTodo(todo)
        res.send(todo)
    } catch (err) {
        logger.error('Failed to update todo', err)
        res.status(500).send({ err: 'Failed to update todo' })
    }
}

module.exports = {
    getTodos,
    deleteTodo,
    getTodoById,
    addTodo,
    updateTodo,
}