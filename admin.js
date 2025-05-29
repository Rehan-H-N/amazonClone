const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// Add a product
router.post("/add-product", async (req, res) => {
  const { name, description, price, image } = req.body;
  const product = new Product({ name, description, price, image });
  await product.save();
  res.redirect("/");
});

// Delete a product
router.delete("/delete-product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;


