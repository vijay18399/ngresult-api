const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result.controller");
const upload = require("../middlewares/upload");
router.get("/results", ResultController.getResults);
router.get("/result/:resultLink", ResultController.getResult);
router.post("/upload", upload.single("pdf"), ResultController.uploadFile);
router.get("/files", ResultController.getFiles);
router.post("/process", ResultController.processFile);
router.post("/result", ResultController.saveResult);
module.exports = router;
