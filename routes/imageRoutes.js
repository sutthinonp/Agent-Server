const express = require('express');
const { uploadImage, getImageById } = require('../controllers/imageController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/:id', getImageById);

module.exports = router;
