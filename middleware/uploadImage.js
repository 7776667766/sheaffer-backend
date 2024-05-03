const multer = require("multer");
const storage = (path) => {
  console.log("path4", path);
  return multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Destination path:", path);
      console.log("Uploaded file:", file);
      cb(null, `uploads/${path}`);
    },
    filename: (req, file, cb) => {
      const sanitizedFileName = file.originalname.replace(/\s+/g, "_");
      const fullFileName = `${Date.now()}-${sanitizedFileName}`;
      cb(null, fullFileName);
    },
  });
};
const upload = (path) => {
  return multer({ storage: storage(path) ,limits: {
    fileSize: 10 * 1024 * 1024, 
  },});
};
module.exports = upload;