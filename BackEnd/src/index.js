// const path = require("path");
// const express = require("express");
// // const methodOverride = require("method-override");
// // const morgan = require("morgan");
// // const hbs = require("express-handlebars");
// // const app = express();
// // const port = 3000;
// // const route = require("./routes");
// // const db = require("./config/db");

// //CONNECT MONGO_DB
// db.connect();

// app.use(express.static(path.join(__dirname, "public")));
// //Middleware handle method POST
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(express.json());
// app.use(morgan("combined"));

// app.use(methodOverride("_method"));

// //TEMPLATE ENGINE
// app.engine(
//   "hbs",
//   hbs.engine({
//     extname: ".hbs",
//     helpers: {
//       sum: (a, b) => a + b,
//     },
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "resources", "views"));

// //ROUTE INIT
// route(app);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/Errors.js";
import productRoute from "./routes/ProductRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import ImportData from "./Seed.js";

dotenv.config();
//CONNECT MONGO_DB
connectDB();
const app = express();
app.use(express.json())

//LOAD PRODUCT FROM SERVER
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log("server running ", PORT));
