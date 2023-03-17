const pool = require("../Model/index")
const Tool = require("../Tools/ToolsAuth")


const CategoryController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `Category`")
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
    getProductByCategory:async (req,res)=>{
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM `PRODUCT` WHERE ID_Category=?", [id])
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
        if(Tool.CheckRole(id_user)) {
        try {
            const { Category_Name} = req.body
            const sql = "INSERT INTO `Category`( `Category_Name`) VALUES (?)"
            const [rows, fields] = await pool.query(sql, [Category_Name])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }}
    },
    update: async (req, res) => {
        if(Tool.CheckRole(id_user)) {
        try {
            const { Category_Name} = req.body
            const { id } = req.params
            console.log(id)
            const sql = "UPDATE `Category` SET `Category_Name`=? WHERE `ID_Category`=?  "
            const [rows, fields] = await pool.query(sql, [ Category_Name,id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }}
    }, 
    delete: async (req, res) => {
        if(Tool.CheckRole(id_user)) {
        try {
            const { id } = req.params
            console.log(id)
            const sql = "DELETE FROM `Category` WHERE `ID_Category`=? "
            const [rows, fields] = await pool.query(sql, [  id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }}
    }, 
    SearchByCategoryAndName:async (req,res)=>{
        try {
            const { id,name } = req.body
            const [rows, fields] = await pool.query("SELECT * FROM `PRODUCT` WHERE ID_Category=? and  NAME_PRODUCT  LIKE ?  ", [id,"%"+name+"%"])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
     

    }


}

module.exports = CategoryController