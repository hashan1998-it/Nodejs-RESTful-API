const mongoose = require("mongoose");

const productSchemma = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchemma);
