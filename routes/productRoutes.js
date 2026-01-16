const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");



  router.post("/products", productController.addProduct)

  router.get("/products", productController.displayAllProducts)

  router.get("/products/:id", productController.displayById)

  router.put("/products/:id", productController.updateProduct)

  router.delete("/products/:id", productController.deleteProduct)

module.exports = router