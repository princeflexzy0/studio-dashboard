const Request = require('../models/Request');
const Upload = require('../models/Upload');
const User = require('../models/User');

// Get dashboard overview stats
exports.getOverviewStats = async (req, res) => {
  try {
    const uploads = await Upload.countDocuments({ uploadedBy: req.user._id });
    const requests = await Request.countDocuments({ 
      status: 'pending',
      submittedBy: req.user._id 
    });
    const users = await User.countDocuments();

    res.json({
      uploads,
      requests,
      users: req.user.role === 'admin' ? users : 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const query = req.user.role === 'admin' 
      ? {} 
      : { submittedBy: req.user._id };

    const requests = await Request.find(query)
      .populate('submittedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    // Only admin/editor can approve/reject
    if (!['admin', 'editor'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = action === 'approve' ? 'approved' : 'rejected';
    request.updatedAt = Date.now();
    await request.save();

    res.json({ 
      success: true, 
      message: `Request ${action}d successfully` 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request' });
  }
};