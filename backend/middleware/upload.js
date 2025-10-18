const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'audioFile') {
    const allowedAudioTypes = /mp3|wav|flac|m4a|aac/;
    const extname = allowedAudioTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedAudioTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error('Only audio files are allowed (mp3, wav, flac, m4a, aac)'));
  }

  if (file.fieldname === 'coverImage') {
    const allowedImageTypes = /jpeg|jpg|png|webp/;
    const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedImageTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
  }

  cb(new Error('Unexpected field'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_AUDIO_SIZE) || 100 * 1024 * 1024
  }
});

module.exports = upload;

