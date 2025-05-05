// const express = require("express");
// const Cart = require("../models/cart");

// const router = express.Router();

// // Get user cart
// router.get("/:userId", async (req, res) => {
//   const cart = await Cart.findOne({ userId: req.params.userId });
//   res.json(cart || { items: [] });
// });

// // Add item to cart
// router.post("/add", async (req, res) => {
//   const { userId, productId, quantity } = req.body;
//   let cart = await Cart.findOne({ userId });

//   if (!cart) {
//     cart = new Cart({ userId, items: [{ productId, quantity }] });
//   } else {
//     const item = cart.items.find(i => i.productId === productId);
//     if (item) {
//       item.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }
//   }

//   await cart.save();
//   res.json(cart);
// });

// // Remove item from cart
// router.post("/remove", async (req, res) => {
//   const { userId, productId } = req.body;
//   const cart = await Cart.findOne({ userId });

//   if (cart) {
//     cart.items = cart.items.filter(i => i.productId !== productId);
//     await cart.save();
//   }

//   res.json(cart);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Add to cart
router.post("/add/:id", async (req, res) => {
  const productId = req.params.id;
  const cart = req.session.cart || [];

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send("Product not found");
  }

  // Check if already in cart
  const existing = cart.find(item => item._id.toString() === productId);
  if (!existing) {
    cart.push({ ...product._doc, quantity: 1 });
  }

  req.session.cart = cart;
  res.redirect("/cart"); // Redirect to cart view
});
router.post("/remove/:id", (req, res) => {
  const productId = req.params.id;
  const cart = req.session.cart || [];

  // Remove item by filtering it out
  req.session.cart = cart.filter(item => item._id.toString() !== productId);

  res.redirect("/cart");
});

module.exports = router;
