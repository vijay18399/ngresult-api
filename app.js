const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const resultRoute = require("./routes/result.route");
var port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/", resultRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.DB_CONNECTION)
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
