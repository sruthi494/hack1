const readline = require('readline');
const fs = require('fs');
const { connectDB, disconnectDB } = require('./database-setup');
const User = require('./models/User');
const studentData = require('./student-data.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const setupAtlasProduction = async () => {
  console.log('🌐 MongoDB Atlas Production Setup\n');
  
  console.log('📋 Before proceeding, make sure you have:');
  console.log('1. ✅ Created a MongoDB Atlas account');
  console.log('2. ✅ Created a cluster');
  console.log('3. ✅ Created a database user');
  console.log('4. ✅ Configured network access (IP whitelist)');
  console.log('5. ✅ Obtained your connection string\n');
  
  const proceed = await question('Do you want to continue? (y/n): ');
  if (proceed.toLowerCase() !== 'y') {
    console.log('Setup cancelled.');
    rl.close();
    return;
  }
  
  console.log('\n📝 Please enter your MongoDB Atlas connection string:');
  console.log('Format: mongodb+srv://username:password@cluster.xxxxx.mongodb.net/scnbcp?retryWrites=true&w=majority');
  const connectionString = await question('Connection String: ');
  
  if (!connectionString.includes('mongodb+srv://')) {
    console.log('❌ Invalid connection string format. Please use the Atlas connection string.');
    rl.close();
    return;
  }
  
  // Update .env file
  const envContent = fs.readFileSync('.env', 'utf8');
  const updatedEnv = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${connectionString}`
  );
  
  fs.writeFileSync('.env', updatedEnv);
  console.log('✅ Updated .env file with Atlas connection string');
  
  // Test connection
  console.log('\n🔗 Testing Atlas connection...');
  try {
    // Reload environment variables
    delete require.cache[require.resolve('dotenv')];
    require('dotenv').config();
    
    await connectDB();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Seed database
    console.log('\n📚 Seeding Atlas database...');
    await User.deleteMany({});
    
    for (const userData of studentData.students) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created ${user.role}: ${user.name}`);
    }
    
    console.log('\n🎉 Atlas database setup complete!');
    console.log('\n📋 Login Credentials:');
    console.log('🎓 Student: 231FA04017 / 231FA04017');
    console.log('👨‍🏫 Faculty: 231FA04013 / 231FA04013');
    console.log('👨‍🏫 Faculty: 231FA04016 / 231FA04016');
    console.log('👨‍💼 Admin: 231FA04040 / 231FA04040');
    
    await disconnectDB();
    
    console.log('\n🚀 Your application is now using MongoDB Atlas!');
    console.log('Restart your server: node server.js');
    
  } catch (error) {
    console.error('❌ Atlas connection failed:', error.message);
    console.log('\n💡 Common issues:');
    console.log('- Check username/password in connection string');
    console.log('- Verify IP address is whitelisted');
    console.log('- Ensure cluster is running');
  }
  
  rl.close();
};

setupAtlasProduction();