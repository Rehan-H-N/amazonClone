const express= require("express");
const app= express();
require('dotenv').config();
const port=8080;
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path= require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname ,"views"));
app.use(express.static(path.join(__dirname , "public")));

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));

mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.use(
    session({
      secret: "secretKey",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/ecommerce" }),
    })
  );
  
  // Routes
  const authRoutes = require("./routes/auth");
  const productRoutes = require("./routes/products");
  const cartRoutes = require("./routes/cart");
  const adminRoutes = require("./routes/admin");
  const product = require("./models/product");

  
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/admin", adminRoutes);
  
  // View routes
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });
  
  app.get("/",async (req, res) => {
    const products= await product.find({});
    res.render("index", { user: req.session.user || null,products });
  });
  
  app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  
  app.get("/cart", (req, res) => {
    const cart = req.session.cart || [];
    res.render("cart", { user: req.session.user || null, cart : cart });
  });
  
  app.listen(8080, () => console.log("Server running on port 8080"));
  
