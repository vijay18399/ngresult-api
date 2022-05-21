const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result.controller");
const upload = require("../middlewares/upload");

router.get("/results", ResultController.getResults);
router.get("/result/:resultLink", ResultController.getResult);
router.post("/process-pdf", upload.single("pdf"), ResultController.postResult);
router.post("/save-result", ResultController.saveResult);
module.exports = router;
