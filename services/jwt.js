const jwt = require("jsonwebtoken");
const config = require("./config.json");

let EncodeToken = (mobile) => {
  let token = jwt.sign(
    {
      mobile: mobile,
    },
    config.jwtsecret,
    {
      expiresIn: "10h",
    }
  );
  return token;
};

exports.EncodeToken = EncodeToken;
