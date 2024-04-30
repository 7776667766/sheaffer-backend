    const multer = require("multer");
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/'); // Set the destination folder for uploaded files
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname); // Use the original filename for uploaded files
        }
      });
      
      const upload = multer({ storage: storage });
      

    module.exports = upload;