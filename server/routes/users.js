const express = require('express');
const User = require('../models/User');
const Notice = require('../models/Notice');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const stats = {};

    // Query to filter notices by user's role ONLY
    const userNoticesQuery = {
      isActive: true,
      'targetAudience.roles': req.user.role  // Only show if user's role is in target
    };

    if (req.user.role === 'admin') {
      stats.totalUsers = await User.countDocuments();
      stats.totalNotices = await Notice.countDocuments(userNoticesQuery);
      stats.activeNotices = await Notice.countDocuments(userNoticesQuery);
      stats.recentNotices = await Notice.find(userNoticesQuery)
        .populate('author', 'name')
        .sort({ createdAt: -1 })
        .limit(5);
    } else {
      stats.totalNotices = await Notice.countDocuments(userNoticesQuery);
      stats.unreadNotices = await Notice.countDocuments({
        ...userNoticesQuery,
        'views.user': { $ne: req.user._id }
      });
      stats.recentNotices = await Notice.find(userNoticesQuery)
        .populate('author', 'name')
        .sort({ createdAt: -1 })
        .limit(5);
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;