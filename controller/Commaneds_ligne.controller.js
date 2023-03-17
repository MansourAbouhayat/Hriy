const pool = require("../Model/index")


const Commaneds_ligneController = {
    getAll: async (req, res) => {
        const id_user=req.body.user.id
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `ligne_Commandes` where `ID_USER`=?",[id_user])
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
        const id_user=req.body.user.id

        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT `ID_Commandes`,  `Total_Product`, `Product_Quantity` FROM `ligne_Commandes` WHERE ID_Commandes= ? and `ID_USER`=? ", [id,id_user])
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
            const { ID_Commandes, ID_Product, Total_Product, Product_Quantity} = req.body
            const sql = "INSERT INTO `ligne_Commandes`(`ID_Commandes`, `ID_Product`, `Total_Product`, `Product_Quantity`) VALUES (?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [ID_Commandes, ID_Product, Total_Product, Product_Quantity])
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
        try {
            const { ID_Commandes, Total_Product, Product_Quantity } = req.body
            const { id } = req.params
            console.log(id)
            const sql = "UPDATE `ligne_Commandes` SET `Total_Product`=?,`Product_Quantity`=? WHERE `ID_Commandes`=?,`ID_Product`=? "
            const [rows, fields] = await pool.query(sql, [ Total_Product, Product_Quantity,ID_Commandes, id])
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
            const { ID_Commandes} = req.body
            const { id } = req.params
            console.log(id)
            const sql = "DELETE FROM `ligne_Commandes` WHERE `ID_Commandes`=?,`ID_Product`=? "
            const [rows, fields] = await pool.query(sql, [ ID_Commandes, id])
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

module.exports = Commaneds_ligneController