const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Update notifications
exports.updateNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.notifications = { ...user.notifications, ...req.body };
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};

// Update security settings
exports.updateSecurity = async (req, res) => {
  try {
    const { currentPassword, newPassword, twoFactorEnabled } = req.body;

    const user = await User.findById(req.user._id);

    if (currentPassword && newPassword) {
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      user.password = newPassword;
    }

    if (twoFactorEnabled !== undefined) {
      user.twoFactorEnabled = twoFactorEnabled;
    }

    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update security settings' });
  }
};