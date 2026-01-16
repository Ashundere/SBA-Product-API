const connectMongoDB = require("./config/connection")
require("dotenv").config();
const express = require("express")
const app = express()
const productRouter = require("./routes/productRoutes");
PORT= process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())
app.use("/api", productRouter);

connectMongoDB()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
  })