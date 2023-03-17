const express = require("express")
const router = express.Router()
const authController = require("../controller/auth.controller")
const ProductController = require("../controller/Product.controller")
router.get("/", ProductController.getAll)
router.get("/:id", ProductController.getById)
router.post("/",authController.authenticateToken, ProductController.create)
router.put("/:id",authController.authenticateToken, ProductController.update)
router.delete("/:id",authController.authenticateToken, ProductController.delete)
router.delete("/getShoppingCart",authController.authenticateToken, ProductController.getShoppingCart)

const multer = require("multer");
const path = require("path");

// storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
})
router.use('/profile', express.static('upload/images'));
router.post("/upload/:id", upload.single('profile'), (req, res) => {
    url=`http://localhost:5001/api/v1/Product/profile/${req.file.filename}`
    ProductController.upload(req,url)

    res.json({
        success: 1,
        profile_url: url
    })
})







module.exports = router;