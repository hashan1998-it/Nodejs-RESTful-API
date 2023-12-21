const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multer");
const auth = require("../middlewares/auth");
const productController = require("../controllers/product");



//Get all the products
router.get("/", productController.getAllProducts);

//Post a product
router.post("/", auth, multerConfig.upload.single("productImage"), productController.postAProduct);

//Get a specific product
router.get("/:productId", productController.getAProduct);

//Update a specific product
router.patch("/:productId", auth, productController.updateAProduct);

//Delete a specific product
router.delete("/:productId", auth, productController.deleteAProduct);

module.exports = router;
