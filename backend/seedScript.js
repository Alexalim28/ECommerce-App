const connectDB = require("./config/connectDB");
const Product = require("./models/Product");
const products = require("./data/products");

connectDB();

const dataExport = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Data added to Mongo");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

dataExport();
