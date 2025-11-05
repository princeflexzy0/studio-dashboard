const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  updateNotifications,
  updateSecurity,
} = require('../controllers/userController');

router.get('/profile', protect, getProfile);
router.post('/update', protect, updateProfile);
router.post('/notifications', protect, updateNotifications);
router.post('/security', protect, updateSecurity);

module.exports = router;