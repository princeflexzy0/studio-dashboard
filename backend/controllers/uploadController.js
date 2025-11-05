const Upload = require('../models/Upload');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP4 and WebM allowed.'));
    }
  },
});

exports.uploadMiddleware = upload.single('file');

// Get user's uploads
exports.getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ uploadedBy: req.user._id })
      .sort({ uploadedAt: -1 });

    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
};

// Upload new file
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newUpload = new Upload({
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      type: req.file.mimetype,
      uploadedBy: req.user._id,
    });

    await newUpload.save();
    res.json(newUpload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Delete upload
exports.deleteUpload = async (req, res) => {
  try {
    const upload = await Upload.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!upload) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    await upload.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete upload' });
  }
};