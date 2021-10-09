const multer = require('multer');
// import path from 'path'

// const imageFilter = (req, file, cb) => {
//   console.log("FILE",file)
//   if (file.mimetype.startsWith("imagen")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.",file, false);
//   }
// };

var storage = multer.diskStorage({
	destination:'Uploads',
  // default-src: 'self',
	filename: (req, file, cb) => {
    console.log("storage",file,file.fieldname,"+++++",file.originalname)
          // cb(null,path.extname(file.originalname));

	  cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});



// var multerUpload = multer({ storage: storage, fileFilter: imageFilter });
var multerUpload = multer({ storage: storage});

module.exports = multerUpload;
