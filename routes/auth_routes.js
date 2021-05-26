const express = require("express");
const router = express.Router();
const vonage = require("../services/venoj_config");
const config = require("../services/config.json");
const User = require("../models/user");

router.post("/signup", (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const user = new User({
    mobile: mobile,
    otp: otp,
  });
  user.save().then((response) => {
    console.log(response);
    vonage.message.sendSms(
      config.from,
      mobile,
      config.smsText + " " + otp,
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]["status"] === "0") {
            res.status(202).json({
              message: "Please check your inbox and signin to your account.",
              otp: otp,
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
});

module.exports = router;
