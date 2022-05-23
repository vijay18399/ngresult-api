const Result = require("../models/result.model");
var pdf2table = require("pdf2table");
var fs = require("fs").promises;
var utils = require("../utility/lib");
const { promisify } = require("util");

const parse = promisify(pdf2table.parse);
exports.getResults = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 4;
  let totalItems;
  Result.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Result.find({}, "-resultrecords")
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((results) => {
      res.status(200).json({ results: results, totalItems: totalItems });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getResult = (req, res, next) => {
  const resultLink = req.params.resultLink;
  Result.findOne({ link: resultLink })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.postResult = (req, res, next) => {
  console.log(req.timedout);
  console.log("Received File");
  console.log(req.file);
  console.log("Received Body");
  console.log(req.body);
  if (!req.file) {
    return res.status(422).send("No Pdf is Provided");
  }
  pdfloc = "./public/" + req.file.filename;
  fs.readFile(pdfloc)
    .then((buffer) => {
      console.log(req.timedout);
      console.log("Reading File Done");
      return buffer;
    })
    .then((buffer) => {
      console.log(req.timedout);
      console.log("Parsing File Started");
      return parse(buffer);
    })
    .then((rows) => {
      console.log(req.timedout);
      console.log("Received Rows ");
      console.log(rows);
      creditsum = req.body.creditsum;
      resultText = rows[1][0] ? rows[1][0].trim() : "";
      college = rows[1][1] ? rows[1][1].trim() : "";
      checkText = rows[0][0] ? rows[0][0].trim() : "";
      resultrecords = utils.cleanRows(rows);
      if (
        checkText != "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA" ||
        resultrecords.length == 0
      ) {
        console.log("Not Valid PDF ");
        throw new Error(
          "Uploaded PDF is not Recognizable as R16 JNTUK Result PDF, Please Upload Correct file"
        );
      } else {
        console.log("Processed PDF Result");
        result = new Result({
          creditsum: creditsum,
          link: Date.now(),
          resultText: resultText,
          resultrecords: resultrecords,
          collegeName: college,
          date: new Date(),
        });
        return result.save();
      }
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.uploadFile = (req, res, next) => {
  if (!req.file) {
    return res.status(422).send("No Pdf is Provided");
  }
  fileName = req.file.filename;
  res.status(201).json({
    fileName: fileName,
  });
};
exports.getFiles = (req, res, next) => {
  res.status(200).json(utils.getFiles("public"));
};

exports.processFile = (req, res, next) => {
  pdfloc = req.body.fileAddress;
  fs.readFile(pdfloc)
    .then((buffer) => {
      console.log(req.timedout);
      console.log("Reading File Done");
      return buffer;
    })
    .then((buffer) => {
      console.log(req.timedout);
      console.log("Parsing File Started");
      return parse(buffer);
    })
    .then((rows) => {
      res.status(200).json({
        message: "processed PDF successfully",
        data: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.saveResult = (req, res, next) => {
  result = new Result({
    creditsum: req.body.creditsum,
    link: Date.now(),
    resultText: req.body.resultText,
    resultrecords: req.body.resultrecords,
    collegeName: req.body.college,
    date: new Date(),
  });
  result
    .save()
    .then((data) => {
      res.status(200).json({
        message: " Result Saved successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
