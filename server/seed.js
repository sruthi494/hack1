const mongoose = require('mongoose');
const User = require('./models/User');
const studentData = require('./student-data.json');
const { connectDB, disconnectDB } = require('./database-setup');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Insert users
    console.log('📚 Creating users...');
    
    for (const userData of studentData.students) {
      console.log('📝 Processing user data:', JSON.stringify(userData, null, 2));
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created ${user.role}: ${user.name} (${user.studentId || user.employeeId}) - Email: ${user.email}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📊 Total users created: ${studentData.students.length}`);
    
    console.log('\n📋 Login Credentials (Student ID / Password):');
    console.log('👨‍💼 Admin: ADM001 / admin123');
    console.log('👨‍🏫 Faculty: FAC001 / faculty123');
    console.log('🎓 Students: STU001, STU002, STU003... / student123');
    
    console.log('\n📱 SMS-enabled forgot password available for all users!');
    console.log('🔐 All students use password: student123');
    console.log('🔐 All faculty use password: faculty123');
    console.log('🔐 Admin uses password: admin123');
    
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    await disconnectDB();
    process.exit(1);
  }
};

seedUsers();