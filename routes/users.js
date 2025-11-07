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

    if (req.user.role === 'admin') {
      stats.totalUsers = await User.countDocuments();
      stats.totalNotices = await Notice.countDocuments();
      stats.activeNotices = await Notice.countDocuments({ isActive: true });
      stats.recentNotices = await Notice.find()
        .populate('author', 'name')
        .sort({ createdAt: -1 })
        .limit(5);
    } else {
      const userNoticesQuery = {
        isActive: true,
        $or: [
          { 'targetAudience.roles': req.user.role },
          { 'targetAudience.departments': req.user.department }
        ]
      };
      
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