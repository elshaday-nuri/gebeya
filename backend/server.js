const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const cartRoutes = require("./routes/cartRoutes");

const orderRoutes=require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req,res)=>{
    res.json({
        message:"Welcome to Gebeya API 🚀"
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});