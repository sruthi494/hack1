const { spawn } = require('child_process');
const { connectDB, disconnectDB } = require('./database-setup');
const User = require('./models/User');
const studentData = require('./student-data.json');
require('dotenv').config();

const runCommand = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { 
      stdio: 'inherit', 
      shell: true,
      ...options 
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
};

const setupComplete = async () => {
  console.log('🚀 Starting Complete SCNBCP Setup...\n');
  
  try {
    // Step 1: Test database connection
    console.log('📊 Step 1: Testing database connection...');
    await connectDB();
    console.log('✅ Database connection successful\n');
    
    // Step 2: Seed database
    console.log('📚 Step 2: Seeding database with users...');
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');
    
    for (const userData of studentData.students) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created ${user.role}: ${user.name} - Phone: ${user.phone}`);
    }
    
    console.log(`\n🎉 Database seeded with ${studentData.students.length} users!`);
    
    // Display login credentials
    console.log('\n📋 Login Credentials:');
    console.log('🎓 Student: 231FA04017 / 231FA04017');
    console.log('👨‍🏫 Faculty: 231FA04013 / 231FA04013');
    console.log('👨‍🏫 Faculty: 231FA04016 / 231FA04016');
    console.log('👨‍💼 Admin: 231FA04040 / 231FA04040');
    
    await disconnectDB();
    
    // Step 3: Install client dependencies if needed
    console.log('\n📦 Step 3: Checking client dependencies...');
    try {
      await runCommand('npm', ['list'], { cwd: './client', stdio: 'pipe' });
      console.log('✅ Client dependencies already installed');
    } catch {
      console.log('📥 Installing client dependencies...');
      await runCommand('npm', ['install'], { cwd: './client' });
      console.log('✅ Client dependencies installed');
    }
    
    console.log('\n🎉 Complete setup finished successfully!');
    console.log('\n🚀 To start the application:');
    console.log('1. Backend: node server.js');
    console.log('2. Frontend: cd client && npm start');
    console.log('3. Open: http://localhost:3000');
    
    console.log('\n💡 Or use the automated startup scripts:');
    console.log('- setup-complete.bat (Windows)');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    await disconnectDB();
    process.exit(1);
  }
};

setupComplete();