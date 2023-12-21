const mongoose = require("mongoose");

const emailValidationregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordValidationregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailValidationregex,
  },
  password: {
    type: String,
    required: true,
    match: passwordValidationregex,
  },
});

module.exports = mongoose.model("User", userSchema);
