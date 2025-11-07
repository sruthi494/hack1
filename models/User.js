const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  studentId: {
    type: String,
    required: function() {
      return this.role === 'student';
    },
    unique: true,
    uppercase: true,
    sparse: true
  },
  employeeId: {
    type: String,
    required: function() {
      return this.role === 'faculty' || this.role === 'admin';
    },
    unique: true,
    uppercase: true,
    sparse: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['admin', 'faculty', 'student'],
    required: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: function() {
      return this.role === 'student';
    }
  },
  resetOTP: {
    type: String
  },
  resetOTPExpires: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);