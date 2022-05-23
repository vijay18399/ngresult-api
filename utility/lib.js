const moment = require("moment");
const fs = require("fs");
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

exports.getFiles = function (dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
};
exports.deleteFile = function (fileAddress) {
  fs.unlink(fileAddress, function (err) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
