const mongoose = require('mongoose');
const Notice = require('./models/Notice');
require('dotenv').config();

async function clearAllNotices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const result = await Notice.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} notices from database`);
    console.log('✅ Database is now clean - ready for manual notice creation!\n');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

clearAllNotices();
