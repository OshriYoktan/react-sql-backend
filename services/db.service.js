var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    // password: '1234',
    database: 'test'
});



pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    console.log('connected to SQL server');
});

function runSQL(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    })
}

module.exports = {
    runSQL
}