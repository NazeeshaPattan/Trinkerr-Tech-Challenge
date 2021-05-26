const express = require("express");
const app = express();
const cors = require("cors");
const authroutes = require("./routes/auth_routes");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/user", authroutes);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
