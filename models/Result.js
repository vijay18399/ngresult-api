const mongoose = require("mongoose");
const ResultSchema = mongoose.Schema({
  link: String,
  semester: String,
  category: String,
  creditsum: Number,
  date: Date,
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
