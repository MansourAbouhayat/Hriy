const pool = require("../Model/index")
const Tool = require("../Tools/ToolsAuth")


const CommandesController = {
    getAll: async (req, res) => {
        const id_user=req.body.user.id
     
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `Commandes` where ID_USER  = ?",[id_user])
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
    getById: async (req, res) => {
    
        
        try {
            const id_user=req.body.user.id

            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM `Commandes`  where  ID_USER  = ? ", [id,id_user])
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
        try {
            const id_user=req.body.user.id
            const {  Date_Commandes, Time_Commandes, Total_Commandes} = req.body
            const sql = "INSERT INTO `Commandes`( `ID_USER`, `Date_Commandes`, `Time_Commandes`, `Total_Commandes`) VALUES (?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [id_user, Date_Commandes, Time_Commandes, Total_Commandes])
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

module.exports = CommandesController