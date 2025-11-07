const mongoose = require('mongoose');
const User = require('./models/User');
const { connectDB, disconnectDB } = require('./database-setup');
require('dotenv').config();

const checkUsers = async () => {
  try {
    await connectDB();
    
    const users = await User.find({});
    console.log('📊 Users in database:');
    console.log('===================');
    
    users.forEach(user => {
      console.log(`👤 ${user.name}`);
      console.log(`   Student ID: ${user.studentId}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Phone: ${user.phone}`);
      console.log(`   Department: ${user.department}`);
      console.log('   ---');
    });
    
    console.log(`\n📈 Total users: ${users.length}`);
    
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking users:', error);
    await disconnectDB();
    process.exit(1);
  }
};

checkUsers();