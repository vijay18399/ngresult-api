const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result");

router.get("/results", ResultController.getResults);
router.get("/result/:resultLink", ResultController.getResult);
router.post("/result", ResultController.postResult);

module.exports = router;
