const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
require("dotenv/config");
const resultRoute = require("./routes/result");
var port = process.env.PORT || 3000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(
  multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("pdf")
);

app.use("/", resultRoute);

app.use((error, req, res, next) => {
  console.log(error);
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
