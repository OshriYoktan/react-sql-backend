var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'sql6.freesqldatabase.com',
    user: 'sql6583091',
    password: 'zifZV6kfFD',
    database: 'sql6583091'
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