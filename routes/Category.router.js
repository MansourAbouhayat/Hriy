const express = require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")

const CategoryController = require("../controller/Category.Controller")
router.get("/", CategoryController.getAll)
router.get("/:id", CategoryController.getProductByCategory)
router.post("/search", CategoryController.SearchByCategoryAndName)
router.post("/",authController.authenticateToken, CategoryController.create)
router.put("/:id",authController.authenticateToken, CategoryController.update)
router.delete("/:id",authController.authenticateToken, CategoryController.delete)






module.exports = router;