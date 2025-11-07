const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkStudent() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const student = await User.findOne({ studentId: '231FA04017' });
    
    if (student) {
      console.log('Student found:');
      console.log('  Name:', student.name);
      console.log('  Email:', student.email);
      console.log('  StudentId:', student.studentId);
      console.log('  Role:', student.role);
      console.log('  Department:', student.department);
      console.log('  Password (hashed):', student.password.substring(0, 20) + '...');
      
      // Test password
      const isValid = await student.comparePassword('231FA04017');
      console.log('\n  Password "231FA04017" valid?', isValid);
      
    } else {
      console.log('❌ Student not found!');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkStudent();
