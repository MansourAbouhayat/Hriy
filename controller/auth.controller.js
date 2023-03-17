const pool = require("../Model/index")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config(".env")
const authController = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body
            const [user, ] = await pool.query("SELECT * FROM `USERS`  where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })
            const hash = await bcrypt.hash(password, 10)
            const sql = "INSERT INTO `USERS`(`FullName`, `email`, `Role`, `PassWord`) VALUES (?, ?,'USER', ?)"
            const [rows, fields] = await pool.query(sql, [name,email, hash ])
            if (rows.affectedRows) {
                return res.json({ message: "Ok" })
            } else {
                return res.json({ error: "Error" })
            }
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const [user, ] = await pool.query("SELECT * FROM `USERS` where email = ?", [email])
            if (!user[0]) return res.json({ error: "Invalid email!" })            
            const { PassWord: hash, ID_USER, FullName } = user[0]

            const check = await bcrypt.compare(password, hash)

            if (check) {
                const accessToken = jwt.sign({ userId: ID_USER, }, process.env.ACCESS_TOKEN_SECRET);

// Retrieve the tokenre

                return res.json({ 
                    accessToken,
                    data: { 
                        userId: ID_USER,
                        FullName,
                        email
                    }
                 })

            }

            return res.json({ error: "Wrong password!" })
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    authenticateToken:(req, res, next) =>{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) return res.send("Inernet Error")
          req.user = user
          next()
        })}
    
    


}

module.exports = authController