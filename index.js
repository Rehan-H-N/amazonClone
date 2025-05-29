require('dotenv').config();
const express= require("express");

const app= express();

const port = process.env.port || 8080;
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

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI ;
    if (!MONGO_URI) throw new Error("MONGODB_URI is not defined in environment variables.");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
connectDB();

  app.use(
    session({
      secret: "secretKey",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions", }),
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
  
  app.listen(8080, () => console.log(`Server running on ${port}` ));
  
