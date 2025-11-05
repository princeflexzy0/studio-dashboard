const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUploads,
  uploadFile,
  deleteUpload,
  uploadMiddleware,
} = require('../controllers/uploadController');

router.get('/', protect, getUploads);
router.post('/', protect, uploadMiddleware, uploadFile);
router.delete('/:id', protect, deleteUpload);

module.exports = router;