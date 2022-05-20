const mongoose = require("mongoose");
const ResultSchema = mongoose.Schema({
  link: String,
  creditsum: Number,
  date: Date,
  resultText: String,
  collegeName: String,
  resultrecords: [
    {
      htno: String,
      subcode: String,
      subname: String,
      grade: String,
      credits: String,
    },
  ],
});

module.exports =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);
