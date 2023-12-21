const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.find({ email })
        .exec()
        .then((result) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: "Email already exists",
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email,
                            password: hash,
                        });

                        user
                            .save()
                            .then((result) => {
                                res.status(201).json({
                                    message: "User created",
                                    result: {
                                        _id: result._id,
                                        email: result.email,
                                        password: result.password,
                                    },
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err,
                                });
                            });
                    }
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

exports.logIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).exec().then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "Auth failed"
            })
        }
        else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Auth successful",
                        token
                    })
                }
                else {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }

            })
        }
    }).catch((err) => { res.status(500).json({ error: err }) });
};