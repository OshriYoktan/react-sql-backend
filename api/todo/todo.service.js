var dbService = require('../../services/db.service.js')

module.exports = {
    removeTodo,
    getTodoById,
    query,
    addTodo,
    updateTodo,
}

async function query(filterBy) {
    try {
        var sql = `SELECT * FROM fruit`
        const todos = await dbService.runSQL(sql)
        if (filterBy.q) {
            return todos.filter((todo) => {
                return todo.title.toLowerCase().includes(filterBy.q.toLowerCase())
            })
        } else {
            return todos
        }
    } catch (err) {
        console.log('err:', err)
    }
}

async function getTodoById(todoId) {
    var sql = `SELECT * FROM fruit WHERE _id = '${todoId}'`;
    var todo = await dbService.runSQL(sql);
    if (todo.length === 1) {
        const todoToReturn = _readyForSend(todo[0])
        return todoToReturn;
    }
    else if (todo.length > 1) throw new Error(`multiple id found! ${todoId}`);
    throw new Error(`todo id ${todoId} not found`);
}

async function addTodo(todo) {
    try {
        // todo.id = makeId(20)
        todo._id = Math.floor(Math.random() * 100)
        var sql = `INSERT INTO fruit 
        (_id, title,price) VALUES 
        ('${todo._id}', '${todo.title}', '${todo.price}')`;
        await dbService.runSQL(sql);
        return todo
    } catch (err) {
        console.log('err:', err)
    }
}

async function updateTodo(todo) {
    try {
        var sql = `UPDATE fruit SET
        _id = '${todo._id}',
        title = '${todo.title}',
        price = '${todo.price}'
        WHERE fruit._id = '${todo._id}'`;
        var okPacket = await dbService.runSQL(sql);
        if (okPacket.affectedRows !== 0) return todo;
        throw new Error(`No todo updated - fruit id ${todo._id}`);
    } catch (err) {
        console.log('err:', err)
    }
}

async function removeTodo(todoId) {
    try {
        var sql = `DELETE FROM fruit WHERE _id = '${todoId}'`;
        const res = await dbService.runSQL(sql)
            .then(okPacket => okPacket.affectedRows === 1
                ? okPacket
                : Promise.reject(new Error(`No todo deleted - todo id ${todoId}`)));
    } catch (err) {
        console.log('err:', err)
    }
}

function _readyForSend(todo) {
    todo.title = JSON.parse(todo.title)
    return todo;
}

function makeId(length = 11) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}