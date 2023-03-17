const mysql = require('mysql2')
const db=require('./db.config')

const pool = mysql.createPool({
    host: db.HOST, 
    user: db.USER, 
    password: db.PASSWORD,
    database: db.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = pool.promise()