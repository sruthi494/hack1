const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function fixUserDepartments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find();
    
    console.log('Current users and departments:');
    users.forEach(user => {
      console.log(`  ${user.name} (${user.role}): ${user.department}`);
    });

    // Update all users to have consistent department name
    const updates = [
      { studentId: '231FA04017', department: 'Computer Science Engineering' },
      { employeeId: '231FA04013', department: 'Computer Science Engineering' },
      { employeeId: '231FA04016', department: 'Computer Science Engineering' },
      { employeeId: '231FA04040', department: 'Computer Science Engineering' }
    ];

    console.log('\nUpdating departments...');
    for (const update of updates) {
      const query = update.studentId ? { studentId: update.studentId } : { employeeId: update.employeeId };
      const user = await User.findOne(query);
      if (user) {
        user.department = update.department;
        await user.save();
        console.log(`✅ Updated ${user.name}: ${user.department}`);
      }
    }

    console.log('\n✅ All departments updated!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

fixUserDepartments();
