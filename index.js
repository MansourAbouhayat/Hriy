const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const ProductRouter = require('./routes/Product.router')
const authRouter = require('./routes/auth.router')
const CommanedsRouter = require('./routes/Commaneds.router')
const Commaneds_ligneRouter = require('./routes/Commaneds_ligne.router')
app.use("/api/v1/Commaneds_ligne", Commaneds_ligneRouter)
const CategoryRouter = require('./routes/Category.router')
app.use("/api/v1/Category", CategoryRouter)
const ccRouter = require('./routes/cc.router')
app.use("/api/v1/Category", ccRouter)



app.use("/api/v1/Commaned", CommanedsRouter)

app.use("/api/v1/Product", ProductRouter)
app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log("Server is running....")
})