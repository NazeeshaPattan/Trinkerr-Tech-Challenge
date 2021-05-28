const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  mobile: {
    type: String,
  },
  otp: {
    type: String,
    default: "0000",
  },
  username: {},
});
//Export our schema, this reference will be used in other models
const User = mongoose.model("User", Userschema);

module.exports = User;
