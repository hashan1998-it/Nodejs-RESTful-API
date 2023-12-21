const express = require("express");
const app = express();
const productRoutes = require("./api/routes/product");
const userRoutes = require("./api/routes/user");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const notFound = require("./api/errors/notFoundHandler");
const errorHandler = require("./api/errors/errorHandler");
const CORS = require("./api/middlewares/cors");

//Database connection
require("./api/config/db");

//Handling CORS errors
app.use(CORS);

//body parser and morgan logger
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling these routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use(express.static(__dirname));

//If these routes are not handled by above routes
app.use(notFound);

//Handling all the errors
app.use(errorHandler);

module.exports = app;
