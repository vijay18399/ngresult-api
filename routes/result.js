const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result");
const upload = require("../middlewares/upload");

router.get("/results", ResultController.getResults);
router.get("/result/:resultLink", ResultController.getResult);
router.post("/result", upload.single("pdf"), ResultController.postResult);

module.exports = router;
