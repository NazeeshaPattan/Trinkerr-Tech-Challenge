const express = require("express");
const router = express.Router();
const vonage = require("../services/venoj_config");
const config = require("../services/config.json");
const User = require("../models/user");

router.post("/signup", (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  vonage.message.sendSms(
    config.from,
    mobile,
    config.smsText + " " + otp,
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          const user = new User({
            mobile: mobile,
            otp: otp,
          });
          user.save().then((response) => {
            res.status(202).json({
              message: "Please check your inbox and signin to your account.",
              otp: otp,
            });
          });
        } else {
          res.status(400).json({
            message: `Message failed with error: ${responseData.messages[0]["error-text"]}`,
          });
        }
      }
    }
  );
});

router.post("/signin", (req, res) => {
  const { otp, mobile } = req.body;
  User.findOne({ mobile: mobile }).then((user) => {
    if (user && user.otp === otp) {
      res.status(202).json({ message: "login successful" });
    } else {
      res.status(400).json({ message: "invalid" });
    }
  });
});
module.exports = router;
