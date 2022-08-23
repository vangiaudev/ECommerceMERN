import express from "express";
import products from "../data/products.js";
import users from "../data/users.js";
import Product from "./app/models/ProductModel.js";
import User from "./app/models/UserModel.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);
ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProduct = await Product.insertMany(products);
    res.send({ importProduct });
  })
);

export default ImportData;
