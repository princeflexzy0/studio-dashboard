const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getOverviewStats,
  getRequests,
  updateRequestStatus,
} = require('../controllers/studioController');

router.get('/overview', protect, getOverviewStats);
router.get('/requests', protect, getRequests);
router.post('/request/:id/action', protect, updateRequestStatus);

module.exports = router;