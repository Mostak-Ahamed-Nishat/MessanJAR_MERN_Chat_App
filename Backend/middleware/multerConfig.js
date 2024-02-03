// import Multer
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'uploads/'); // Uploads folder where files will be stored
        cb(null, '../Frontend/public/usersImg/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Only image files are allowed!';
        cb(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter
});


module.exports = upload;