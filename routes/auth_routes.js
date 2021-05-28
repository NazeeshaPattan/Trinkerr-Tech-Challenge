const express = require("express");
const router = express.Router();
const vonage = require("../services/venoj_config");
const config = require("../services/config.json");
const User = require("../models/user");
const { EncodeToken } = require("../services/jwt");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000) + "";
  let saltRounds = await bcrypt.genSalt(10);
  let hashedotp = await bcrypt.hash(otp, saltRounds);
  User.findOne({ mobile: mobile }).then((user) => {
    if (!user) {
      const user = new User({
        mobile: mobile,
        otp: hashedotp,
      });
      user.save().then((response) => {
        res.status(202).json({
          success: true,
          message: "Check your mobile and enter otp",
          otp: otp,
        });
      });
    } else {
      res
        .status(202)
        .json({ success: false, message: `User already exits with ${mobile}` });
    }
  });
});

router.post("/signin", async (req, res) => {
  const { otp, mobile } = req.body;
  User.findOne({ mobile: mobile }).then(async (user) => {
    if (!user) res.status(400).json({ message: "no user found" });
    const otpMatched = await bcrypt.compare(otp, user.otp);
    if (otpMatched) {
      const token = EncodeToken(mobile);
      res
        .status(202)
        .json({ success: true, message: "login successful", token });
    } else {
      res.status(202).json({ success: false, message: "invalid otp" });
    }
  });
});
module.exports = router;
