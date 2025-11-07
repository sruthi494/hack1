const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const Notice = require('./models/Notice');
require('dotenv').config();

// Export database to JSON
const exportDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Export Users
    const users = await User.find({}).select('-password');
    const notices = await Notice.find({}).populate('author', 'name email role');

    const exportData = {
      exportDate: new Date().toISOString(),
      totalUsers: users.length,
      totalNotices: notices.length,
      users: users,
      notices: notices
    };

    // Write to file
    fs.writeFileSync('vignan-database-export.json', JSON.stringify(exportData, null, 2));
    console.log('📁 Database exported to vignan-database-export.json');
    console.log(`📊 Exported ${users.length} users and ${notices.length} notices`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Export error:', error);
    process.exit(1);
  }
};

// Import database from JSON
const importDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Read import file
    const importData = JSON.parse(fs.readFileSync('vignan-database-import.json', 'utf8'));
    
    // Clear existing data
    await User.deleteMany({});
    await Notice.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Import users
    for (const userData of importData.users) {
      const user = new User(userData);
      await user.save();
    }
    console.log(`✅ Imported ${importData.users.length} users`);

    // Import notices
    for (const noticeData of importData.notices) {
      const notice = new Notice(noticeData);
      await notice.save();
    }
    console.log(`✅ Imported ${importData.notices.length} notices`);

    console.log('🎉 Database import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import error:', error);
    process.exit(1);
  }
};

// Generate student data for different departments
const generateStudentData = () => {
  const departments = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology'
  ];

  const firstNames = [
    'Aarav', 'Priya', 'Arjun', 'Sneha', 'Rohit', 'Ananya', 'Karthik', 'Divya',
    'Vikram', 'Riya', 'Sai', 'Meera', 'Rajesh', 'Kavya', 'Harish', 'Pooja',
    'Venkat', 'Swathi', 'Anil', 'Lakshmi', 'Suresh', 'Ramya', 'Naveen', 'Deepika',
    'Mahesh', 'Sravani', 'Krishna', 'Bhavani', 'Chandra', 'Sowmya'
  ];

  const lastNames = [
    'Sharma', 'Reddy', 'Kumar', 'Patel', 'Singh', 'Gupta', 'Rao', 'Nair',
    'Joshi', 'Agarwal', 'Babu', 'Lakshmi', 'Chandra', 'Sree', 'Prasanna',
    'Devi', 'Ravi', 'Priya', 'Kiran', 'Vani'
  ];

  const students = [];
  let rollCounter = 1;
  let phoneCounter = 9876543210;

  departments.forEach((dept, deptIndex) => {
    const deptCode = dept.split(' ').map(word => word.charAt(0)).join('');
    
    // Generate 10 students per department
    for (let i = 0; i < 10; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const year = ['1st Year', '2nd Year', '3rd Year', '4th Year'][Math.floor(Math.random() * 4)];
      const yearCode = year.charAt(0) === '1' ? '23' : year.charAt(0) === '2' ? '22' : year.charAt(0) === '3' ? '21' : '20';
      
      students.push({
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@vignan.ac.in`,
        password: 'vignan123',
        phone: `+91${phoneCounter++}`,
        role: 'student',
        department: dept,
        year: year,
        rollNumber: `${yearCode}${deptCode}${String(rollCounter++).padStart(3, '0')}`
      });
    }
  });

  return students;
};

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'export':
    exportDatabase();
    break;
  case 'import':
    importDatabase();
    break;
  case 'generate':
    const students = generateStudentData();
    fs.writeFileSync('generated-students.json', JSON.stringify({ vignanStudents: students }, null, 2));
    console.log(`✅ Generated ${students.length} student records in generated-students.json`);
    break;
  default:
    console.log('Usage:');
    console.log('  node database-utils.js export   - Export database to JSON');
    console.log('  node database-utils.js import   - Import database from JSON');
    console.log('  node database-utils.js generate - Generate student data');
}

module.exports = { exportDatabase, importDatabase, generateStudentData };