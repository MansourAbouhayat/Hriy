const express = require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")

const Commaneds_ligneController = require("../controller/Commaneds_ligne.controller")
router.get("/",authController.authenticateToken, Commaneds_ligneController.getAll)
router.get("/:id",authController.authenticateToken, Commaneds_ligneController.getById)
router.post("/",authController.authenticateToken, Commaneds_ligneController.create)
router.put("/:id", authController.authenticateToken,Commaneds_ligneController.update)





module.exports = router;