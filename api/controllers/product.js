const Product = require("../models/product");
const mongoose = require("mongoose");

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .select("name price _id")
        .exec()
        .then((result) => {
            if (result.length == 0) {
                res.status(404).json({
                    message: "No entries found",
                });
            } else {
                res.status(200).json({
                    count: result.length,
                    products: result.map((doc) => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/products/" + doc._id,
                            },
                        };
                    }),
                });
            }
        })
        .catch((err) => console.log(err));
};


exports.postAProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
    });

    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: product,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

exports.getAProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then((result) => {
            console.log(result);
            if (result) res.status(200).json(result);
            else res.status(404).json({ message: "No valid entry found for ID" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

exports.updateAProduct = (req, res, next) => {
    const id = req.params.productId;
    const name = req.body.name;
    const price = req.body.price;
    Product.updateOne(
        {
            _id: id,
        },
        {
            name: name,
            price: price,
        }
    )
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => console.log(err));
};

exports.deleteAProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({
        _id: id,
    })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => console.log(err));
};