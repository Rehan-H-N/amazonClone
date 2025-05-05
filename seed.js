const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: "Noise ColorFit Pro 4 Smartwatch",
    description: "Bluetooth Calling, 1.85'' Display, AI Voice Assistant",
    price: 2799,
    image: "/images/watch.jpg"
  },
  {
    name: "boAt Rockerz 450 Headphones",
    description: "Wireless Bluetooth Headphones with HD Sound",
    price: 1499,
    image: "/images/headphones.jpg"
  },
  {
    name: "HP Wireless Mouse X200",
    description: "2.4 GHz Wireless, Adjustable DPI, Ergonomic Design",
    price: 699,
    image: "/images/mouse.jpg"
  },
  {
    name: "Apple iPhone 14",
    price: 79999,
    image: "https://m.media-amazon.com/images/I/61cwywLZR-L._AC_UY327_FMwebp_QL65_.jpg",
    description: "Apple iPhone 14 with A15 Bionic chip and advanced dual-camera system."
  },
  {
    name: "Samsung Galaxy S23",
    price: 74999,
    image: "/images/s23.jpg",
    description: "Samsung Galaxy S23 5G with Snapdragon 8 Gen 2 and AMOLED display."
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 29999,
    image: "/images/OIP.jpeg",
    description: "Industry-leading noise cancellation wireless headphones."
  },
  {
    name: "HP Pavilion x360 Touchscreen Laptop",
    price: 65990,
    image: "/images/hp.jpg",
    description: "14-inch FHD touch display, 12th Gen Intel i5, 16GB RAM, 512GB SSD."
  },
  {
    name: "boAt Airdopes 141",
    price: 1299,
    image: "/images/bAD.jpg",
    description: "True wireless earbuds with 42-hour playback and ENx technology."
  },
  {
    name: "Canon EOS 200D II DSLR Camera",
    price: 58990,
    image: "/images/dslr.jpg",
    description: "Canon DSLR camera with 24.1 MP CMOS sensor and 4K video."
  },
  {
    name: "Echo Dot (5th Gen)",
    price: 4499,
    image: "/images/echodot.jpg",
    description: "Smart speaker with Alexa and better bass than previous generations."
  },
  {
    name: "Noise ColorFit Pro 4 Smartwatch",
    price: 2999,
    image: "/images/ncfp.jpeg",
    description: "1.72'' display, 60 sports modes, heart rate & SpO2 monitor."
  },
  {
    name: "AmazonBasics 7-in-1 Type-C Hub",
    price: 1999,
    image: "/images/AB.jpeg",
    description: "Multiport adapter with HDMI, USB 3.0, SD card reader & more."
  },
  {
    name: "Lenovo Legion 5 Pro Gaming Laptop",
    price: 124990,
    image: "/images/lenovo.jpeg",
    description: "16-inch WQXGA display, AMD Ryzen 7, RTX 3060, 16GB RAM, 1TB SSD."
  }
];

async function seedProducts() {
  try {
    await Product.deleteMany(); // Optional: clears existing products
    await Product.insertMany(products);
    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seed error:", err);
  }
}

seedProducts();
