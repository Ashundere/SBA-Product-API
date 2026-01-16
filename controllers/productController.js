const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(400)
      .json({ error: "Failed to add product", details: error.message });
  }
};

const displayAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOptions = {};
    if (sortBy === "price_asc") {
      sortOptions.price = 1;
    } else if (sortBy === "price_desc") {
      sortOptions.price = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    res.json(products);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const displayById = async (req, res) => {
  try {
    const {id} = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    console.error("Error displaying product:", error);
    res
      .status(400)
      .json({ error: "Failed to display product", details: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const editedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!editedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(editedProduct);
  } catch (error) {
    console.error("Error updating product)");
    res
      .status(400)
      .json({ error: "Failed to update product", details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = await Product.findByIdAndDelete(req.params.id);
    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: `Deleted product` });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(400)
      .json({ error: "Failed to delete product", details: error.message });
  }
};

module.exports = {
  addProduct,
  displayAllProducts,
  displayById,
  updateProduct,
  deleteProduct,
};
