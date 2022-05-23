const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result.controller");
const upload = require("../middlewares/upload");
var timeout = require("connect-timeout");
router.get("/results", ResultController.getResults);
router.get("/result/:resultLink", ResultController.getResult);
router.post(
  "/result",
  timeout("60s"),
  upload.single("pdf"),
  ResultController.postResult
);
module.exports = router;
