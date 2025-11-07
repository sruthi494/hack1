const mongoose = require('mongoose');
const User = require('./models/User');
const { connectDB, disconnectDB } = require('./database-setup');
require('dotenv').config();

const testUserCreation = async () => {
  try {
    await connectDB();
    
    // Test creating Pranathi (faculty)
    const facultyData = {
      "name": "Pranathi",
      "studentId": "231FA04013",
      "password": "231FA04013",
      "mail_id":231fa04013@gmail.com,
      "role": "faculty",
      "department": "Computer Science",
      "employeeId": "FAC231FA04013"
    };
    
    console.log('Testing faculty user creation...');
    console.log('Data:', JSON.stringify(facultyData, null, 2));
    
    const user = new User(facultyData);
    await user.save();
    
    console.log('✅ Faculty user created successfully!');
    console.log('Created user:', user);
    
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    await disconnectDB();
    process.exit(1);
  }
};

testUserCreation();