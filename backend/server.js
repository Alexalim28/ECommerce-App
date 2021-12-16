const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");
require("dotenv").config();

const connectDB = require("./config/connectDB");
const productsRoutes = require("./routes/productsRoutes");
const accountsRoutes = require("./routes/accountsRoutes");
const cartsRoutes = require("./routes/cartsRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Products Routes
app.use("/api/products", productsRoutes);

// Acounts Routes
app.use("/api/accounts", accountsRoutes);

// Carts Routes
app.use("/api/carts", authMiddleware, cartsRoutes);

// Errors Handling
app.use(errorHandlerMiddleware);

// Not Found

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
