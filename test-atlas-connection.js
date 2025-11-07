const mongoose = require('mongoose');
require('dotenv').config();

const testAtlasConnection = async () => {
  try {
    console.log('🔗 Testing MongoDB Atlas connection...');
    console.log('📍 Connection URI:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('🔌 Connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('💡 DNS resolution failed. Check your internet connection and cluster URL.');
    } else if (error.message.includes('authentication failed')) {
      console.log('💡 Authentication failed. Check your username and password.');
    } else if (error.message.includes('IP')) {
      console.log('💡 IP address not whitelisted. Add your IP to MongoDB Atlas Network Access.');
    }
    
    process.exit(1);
  }
};

testAtlasConnection();