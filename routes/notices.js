const express = require('express');
const multer = require('multer');
const path = require('path');
const Notice = require('../models/Notice');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all notices for current user
router.get('/', auth, async (req, res) => {
  try {
    const { category, department, page = 1, limit = 10 } = req.query;
    
    console.log('📋 Fetching notices for user:', req.user.name, '(', req.user.role, ')');
    
    // Simple query - show ALL active notices to ALL users
    let query = {
      isActive: true
    };

    // Apply filters if provided
    if (category) query.category = category;
    if (department) query['targetAudience.departments'] = department;

    const notices = await Notice.find(query)
      .populate('author', 'name role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notice.countDocuments(query);

    console.log('   ✅ Found', notices.length, 'notices');

    res.json({
      notices,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('❌ Error fetching notices:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create notice
router.post('/', auth, authorize('admin', 'faculty'), upload.array('attachments'), async (req, res) => {
  try {
    console.log('📝 Notice creation request received');
    console.log('   User:', req.user?.name, '(', req.user?.role, ')');
    console.log('   Body:', req.body);
    
    const { title, content, category, priority, targetAudience, scheduledDate, expiryDate } = req.body;
    
    if (!title || !content || !category || !priority || !targetAudience) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const attachments = req.files?.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      mimetype: file.mimetype
    })) || [];

    // Parse targetAudience if it's a string
    let parsedTargetAudience = targetAudience;
    if (typeof targetAudience === 'string') {
      try {
        parsedTargetAudience = JSON.parse(targetAudience);
      } catch (e) {
        console.log('❌ Invalid targetAudience format:', e.message);
        return res.status(400).json({ message: 'Invalid targetAudience format' });
      }
    }

    const notice = new Notice({
      title,
      content,
      category,
      priority,
      targetAudience: parsedTargetAudience,
      author: req.user._id,
      attachments,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      isScheduled: !!scheduledDate
    });

    await notice.save();
    await notice.populate('author', 'name role');

    console.log('✅ Notice created successfully:', notice._id);

    // Emit real-time notification
    const io = req.app.get('io');
    if (io) {
      io.emit('new-notice', notice);
    }

    res.status(201).json(notice);
  } catch (error) {
    console.error('❌ Notice creation error:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
});

// Get single notice
router.get('/:id', auth, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('author', 'name role')
      .populate('comments.user', 'name role');

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Add view if not already viewed
    const hasViewed = notice.views.some(view => view.user.toString() === req.user._id.toString());
    if (!hasViewed) {
      notice.views.push({ user: req.user._id });
      await notice.save();
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment to notice
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    notice.comments.push({
      user: req.user._id,
      content
    });

    await notice.save();
    await notice.populate('comments.user', 'name role');

    res.json(notice.comments[notice.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Acknowledge notice
router.post('/:id/acknowledge', auth, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const hasAcknowledged = notice.acknowledgments.some(ack => ack.user.toString() === req.user._id.toString());
    if (!hasAcknowledged) {
      notice.acknowledgments.push({ user: req.user._id });
      await notice.save();
    }

    res.json({ message: 'Notice acknowledged' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;