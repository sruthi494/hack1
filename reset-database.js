const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('./database-setup');
require('dotenv').config();

const resetDatabase = async () => {
  try {
    await connectDB();
    
    // Drop the entire database
    await mongoose.connection.db.dropDatabase();
    console.log('🗑️  Database dropped successfully');
    
    await disconnectDB();
    console.log('✅ Database reset complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    await disconnectDB();
    process.exit(1);
  }
};

resetDatabase();