import * as multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    callback(
      null,
      `${new Date().getTime()}-${file.originalname}`,
    );
  },
});

export default multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});
