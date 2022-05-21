const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/result.controller");
const upload = require("../middlewares/upload");

router.get("/results", ResultController.getResults);
router.get("/result/:resultLink", ResultController.getResult);
router.post("/post-result", upload.single("pdf"), ResultController.postResult);
router.post("/dummy-post", upload.single("pdf"), ResultController.dummyPost);
module.exports = router;
