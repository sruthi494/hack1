const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function fixStudentPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const student = await User.findOne({ studentId: '231FA04017' });
    
    if (student) {
      console.log('Found student:', student.name);
      
      // Reset password to 231FA04017
      student.password = '231FA04017';
      await student.save();
      
      console.log('✅ Password reset to: 231FA04017');
      
      // Verify it works
      const isValid = await student.comparePassword('231FA04017');
      console.log('✅ Password verification:', isValid ? 'SUCCESS' : 'FAILED');
      
    } else {
      console.log('❌ Student not found!');
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

fixStudentPassword();
