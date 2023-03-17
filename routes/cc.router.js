const express = require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")

const CCardController = require("../controller/cc.controller")
router.get("/:id",authController.authenticateToken, CCardController.getById)
router.post("/",authController.authenticateToken, CCardController.create)
router.put("/",authController.authenticateToken, CCardController.update)
router.delete("/:id",authController.authenticateToken, CCardController.delete)







module.exports = router;