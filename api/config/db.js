const mongoose = require("mongoose");
require("dotenv").config();

//Connecting to the database
mongoose
  .connect(
    "mongodb+srv://hashan:" +
      process.env.MONGO_ATLAS_PW +
      "@node-shop.zcu2knr.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("db.js:Connected to the database");
  })
  .catch((err) => {
    console.log("db.js:" + err);
  });

module.exports = mongoose;
