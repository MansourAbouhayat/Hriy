const pool = require("../Model/index")


const CreditCardController = {

    getById: async (req, res) => {
        try {
            const { id } = req.params
            const id_user=req.body.user.id

            const [rows, fields] = await pool.query("SELECT * FROM `CreditCard` where `ID_Card`= ? AND ID_USER= ?", [id,id_user])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        const id_user=req.body.user.id
        try {
            const {  CardNumber, cvv, DateExpiration} = req.body
            const sql = "INSERT INTO `CreditCard`( `ID_USER`, `CardNumber`, `cvv`, `DateExpiration`) VALUES (?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [ id_user,CardNumber, cvv, DateExpiration])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        const id_user=req.body.user.id

        try {
            const { CardNumber, cvv, DateExpiration } = req.body
            console.log(id)
            const sql = "UPDATE `CreditCard` SET `CardNumber`=?,`cvv`=?,`DateExpiration`=? WHERE `ID_Card`=?  and ID_USER= ?"
            const [rows, fields] = await pool.query(sql, [ CardNumber, cvv, DateExpiration,id_user])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const id_user=req.body.user.id

            const { id } = req.params
            const sql = "DELETE FROM `CreditCard` WHERE `ID_Card`=? and ID_USER= ?"
            const [rows, fields] = await pool.query(sql, [  id],id_user)
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 

}

module.exports = CreditCardController