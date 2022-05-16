const Result = require("../models/Result");
var pdf2table = require("pdf2table");
var fs = require("fs").promises;
var utils = require("../utility/lib");

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
  if (!req.file) {
    const error = new Error("No Pdf is Provided");
    error.statusCode = 422;
    throw error;
  }
  pdfloc = "./public/" + req.file.originalname;
  fs.readFile(pdfloc)
    .then((buffer) => {
      return buffer;
    })
    .then((buffer) => {
      pdf2table.parse(buffer, function (err, rows, rowsdebug) {
        regulation = req.body.regulation;
        semester = req.body.semester;
        category = req.body.category;
        creditsum = req.body.creditsum;
        link = utils.generateLink(regulation, semester, category);
        resultrecords = utils.cleanRows(rows);
        if (resultrecords.length == 0) {
          const error = new Error(
            "Uploaded PDF is not Recognizable as JNTUK Result PDF, Please Upload Correct file"
          );
          error.statusCode = 422;
          throw error;
        }
        result = new Result({
          regulation: regulation,
          semester: semester,
          category: category,
          creditsum: creditsum,
          link: link,
          resultrecords: resultrecords,
          date: new Date(),
        });
        return result.save();
      });
    })
    .then(() => {
      var data = {
        message: "Result Added Succesfully",
        data: result,
      };
      res.status(201).json(data);
    })
    .catch((err) => {
      res.send(err);
    });
};
