const pool = require("../Model/index")


const ToolsAuth = {
    CheckRole: async (id) => {
       
        try {
            const [rows, fields] = await pool.query("SELECT `Role` FROM `USERS` WHERE `ID_USER` = ?", [id])
            if(rows.Role=="admin"){
                return true
            }
            else false
        } catch (error) {
            
            res.json({
                status: "InterNetError"
            })
        }
    },

   
   
    }


module.exports = ToolsAuth 
