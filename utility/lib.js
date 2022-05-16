const moment = require("moment");
exports.cleanRows = function (rows) {
  rrcollection = [];
  for (i = 1; i < rows.length; i += 1) {
    if (rows[i].length == 5) {
      if (
        rows[i][3].trim() == "O" ||
        rows[i][3].trim() == "S" ||
        rows[i][3].trim() == "A" ||
        rows[i][3].trim() == "B" ||
        rows[i][3].trim() == "C" ||
        rows[i][3].trim() == "D" ||
        rows[i][3].trim() == "F" ||
        rows[i][3].trim() == "ABSENT"
      ) {
        resultrecord = {
          htno: rows[i][0],
          subcode: rows[i][1],
          subname: rows[i][2],
          grade: rows[i][3],
          credits: rows[i][4],
        };
        rrcollection.push(resultrecord);
      }
    }
  }
  return rrcollection;
};

exports.generateLink = function (reg, sem, category) {
  return (
    reg +
    "-" +
    sem +
    "-" +
    category +
    "-" +
    "Result" +
    "-" +
    moment().format("DD-MM-YYYY")
  );
};
