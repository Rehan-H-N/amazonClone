const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try{
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("All fields are required.");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();
  res.redirect("/login");
} catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Internal server error");
  }

});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect("/");
  } else {
    res.render("login", { error: "Invalid credentials" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if(err){
      console.log(err);
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

module.exports = router;
