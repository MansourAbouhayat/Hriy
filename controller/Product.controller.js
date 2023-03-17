const pool = require("../Model/index")
const Tool = require("../Tools/ToolsAuth")



const postsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from PRODUCT")
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
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from PRODUCT where ID_PRODUCT = ?", [id])
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
        console.log(JSON.stringify(req.user))

        if(Tool.CheckRole(id_user)) {
        try {
            const { NAME_PRODUCT,Category,DESCRIPTION,PRIX ,MARQUE,Quantity_Product } = req.body
            const sql = "INSERT INTO `PRODUCT`( `NAME_PRODUCT`, `Category`, `DESCRIPTION`, `PRIX`, `MARQUE`, `Quantity_Product`) VALUES (?,?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [NAME_PRODUCT,Category,DESCRIPTION,PRIX ,MARQUE,Quantity_Product])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }}
        else{ res.send("Eroor Auth")}
    },
    update: async (req, res) => {
        const id_user=req.user.UserId

        if(Tool.CheckRole(id_user)) {
        try {
            const { NAME_PRODUCT,Category,DESCRIPTION,PRIX ,MARQUE,Quantity_Product } = req.body
            const { id } = req.params
            console.log(id)
            const sql = "UPDATE `PRODUCT` SET `NAME_PRODUCT`=?,`Category`=?,`DESCRIPTION`=?,`PRIX`=?,`MARQUE`=?,`Quantity_Product`=? WHERE ID_PRODUCT=?"
            const [rows, fields] = await pool.query(sql, [NAME_PRODUCT,Category,DESCRIPTION,PRIX ,MARQUE,Quantity_Product,id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }}
        else {
            res.send("Error Auth")
        }
    }, 
    delete: async (req, res) => {
        const id_user=req.user.UserId

        if(Tool.CheckRole(id_user)) {
        try {
            const { id } = req.params
            const id_user=req.user.id
           
            const [rows, fields] = await pool.query("DELETE FROM `PRODUCT` WHERE ID_PRODUCT=?", [id])
            res.json({
                data: rows
            })
          
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }}
        else{
            res.send("Error Auth")
        }
    },
    upload:async (req,url)=>{
        const id_user=req.body.user.id

        if(Tool.CheckRole(id_user)) {
        try {
            
            const id = req.params.id
            const sql = "INSERT INTO `Images`(`ID_Product`, `Path`) VALUES (?,?)"
            const [rows, fields] = await pool.query(sql, [id,url])
           
        } catch (error) {
            console.log(error)
          
        }}
     
        

    },
    SearchByName:async (req,res)=>{
        try {
            const { name } = req.body
            const [rows, fields] = await pool.query("SELECT * FROM `PRODUCT` WHERE   NAME_PRODUCT  LIKE ?  ", ["%"+name+"%"])
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
    , 
    getShoppingCart: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `PRODUCT` WHERE `ID_PRODUCT`= (SELECT ID_Product  FROM `ligne_Commandes` WHERE ID_Commandes=(SELECT ID_Commandes FROM `Commandes`  where  Validation  = 'start'))")
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


module.exports = postsController