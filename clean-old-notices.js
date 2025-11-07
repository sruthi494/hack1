const mongoose = require('mongoose');
const Notice = require('./models/Notice');
require('dotenv').config();

async function cleanOldNotices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Delete all old notices
    const result = await Notice.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} old notices`);

    console.log('\n✅ Database cleaned! You can now create fresh notices.');
    console.log('\nNext steps:');
    console.log('1. Refresh your browser (Ctrl + F5)');
    console.log('2. Login as Faculty');
    console.log('3. Create a new notice');
    console.log('4. Select who should see it');
    console.log('5. Test with different users');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

cleanOldNotices();
