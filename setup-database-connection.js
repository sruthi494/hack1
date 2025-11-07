const mongoose = require('mongoose');
require('dotenv').config();

const setupDatabaseConnection = async () => {
  console.log('🚀 Setting up database connection...\n');
  
  // Check if MongoDB Atlas URI is configured
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv')) {
    console.log('📡 MongoDB Atlas URI detected');
    console.log('🔗 Testing Atlas connection...');
    
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 second timeout
      });
      
      console.log('✅ Successfully connected to MongoDB Atlas!');
      console.log('🌐 Using cloud database');
      
      // Test database operations
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('📊 Available collections:', collections.length > 0 ? collections.map(c => c.name) : 'None (new database)');
      
      await mongoose.disconnect();
      console.log('✅ Atlas connection verified and ready to use!');
      return 'atlas';
      
    } catch (error) {
      console.log('❌ MongoDB Atlas connection failed:', error.message);
      console.log('💡 Falling back to local MongoDB...\n');
    }
  }
  
  // Try local MongoDB connection
  console.log('🔗 Testing local MongoDB connection...');
  try {
    await mongoose.connect('mongodb://localhost:27017/scnbcp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000, // 3 second timeout
    });
    
    console.log('✅ Successfully connected to local MongoDB!');
    console.log('💻 Using local database');
    
    await mongoose.disconnect();
    console.log('✅ Local connection verified and ready to use!');
    return 'local';
    
  } catch (error) {
    console.log('❌ Local MongoDB connection failed:', error.message);
    console.log('\n🚨 No database connection available!');
    console.log('\n📋 Options:');
    console.log('1. Set up MongoDB Atlas (recommended):');
    console.log('   - Follow setup-mongodb-atlas.md guide');
    console.log('   - Update MONGODB_URI in .env file');
    console.log('2. Install local MongoDB:');
    console.log('   - Download from https://www.mongodb.com/try/download/community');
    console.log('   - Start MongoDB service');
    
    return 'none';
  }
};

setupDatabaseConnection().then(result => {
  if (result === 'none') {
    process.exit(1);
  } else {
    console.log('\n🎉 Database setup complete!');
    console.log('📝 Next steps:');
    console.log('1. Run: node seed.js (to populate database)');
    console.log('2. Run: node server.js (to start backend)');
    console.log('3. Run: cd client && npm start (to start frontend)');
    process.exit(0);
  }
});