const multer = require("multer");
const pdfFilter = (req, file, cb) => {
  if (file.mimetype.includes("pdf")) {
    cb(null, true);
  } else {
    return cb(new Error("Only pdfs are allowed"));
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-result-${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: pdfFilter });
module.exports = uploadFile;
