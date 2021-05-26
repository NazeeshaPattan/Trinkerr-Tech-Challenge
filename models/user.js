const mongoose = require("mongoose");
const { isEmail } = require("validator");

const Userschema = new mongoose.Schema({
  mobile: {
    type: String,
  },
  otp: {
    type: String,
  },
});
