const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/connectDB");
const productsRoutes = require("./routes/productsRoutes");
const accountsRoutes = require("./routes/accountsRoutes");
const cartsRoutes = require("./routes/cartsRoutes");

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Acounts Routes
app.use("/api/accounts", accountsRoutes);

// Products Routes
app.use("/api/products", productsRoutes);

// Carts Routes
app.use("/api/carts", cartsRoutes);

const PORT = process.env.PORT || 5000;

const start = () => {
  try {
    connectDB();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
