const express = require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")

const CommandesController = require("../controller/Commandes.controller")
router.get("/",authController.authenticateToken, CommandesController.getAll)
router.get("/:id",authController.authenticateToken, CommandesController.getById)
router.post("/",authController.authenticateToken, CommandesController.create)






module.exports = router;