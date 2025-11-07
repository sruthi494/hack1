const axios = require('axios');
require('dotenv').config();

const debugSMSService = async () => {
  console.log('🔍 Debugging SMS Service...\n');
  
  const apiKey = process.env.FAST2SMS_API_KEY;
  const phone = '8309261388';
  const message = 'Test OTP: 123456. This is a debug message from SCNBCP.';
  
  console.log('📋 API Key format:', apiKey.substring(0, 20) + '...');
  console.log('📱 Phone number:', phone);
  console.log('💬 Message:', message);
  console.log('\n🧪 Testing different SMS service APIs...\n');
  
  // Test 1: Fast2SMS
  console.log('1️⃣ Testing Fast2SMS...');
  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'otp',
      sender_id: 'FSTSMS',
      message: message,
      language: 'english',
      flash: 0,
      numbers: phone
    }, {
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Fast2SMS Response:', response.data);
  } catch (error) {
    console.log('❌ Fast2SMS Error:', error.response?.data || error.message);
  }
  
  // Test 2: MSG91
  console.log('\n2️⃣ Testing MSG91...');
  try {
    const response = await axios.post('https://api.msg91.com/api/sendhttp.php', 
      new URLSearchParams({
        authkey: apiKey,
        mobiles: phone,
        message: message,
        sender: 'VIGNAN',
        route: '4'
      })
    );
    
    console.log('✅ MSG91 Response:', response.data);
  } catch (error) {
    console.log('❌ MSG91 Error:', error.response?.data || error.message);
  }
  
  // Test 3: TextLocal
  console.log('\n3️⃣ Testing TextLocal...');
  try {
    const response = await axios.post('https://api.textlocal.in/send/', 
      new URLSearchParams({
        apikey: apiKey,
        numbers: phone,
        message: message,
        sender: 'VIGNAN'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    console.log('✅ TextLocal Response:', response.data);
  } catch (error) {
    console.log('❌ TextLocal Error:', error.response?.data || error.message);
  }
  
  // Test 4: 2Factor (common Indian SMS service)
  console.log('\n4️⃣ Testing 2Factor...');
  try {
    const response = await axios.get(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/123456`);
    console.log('✅ 2Factor Response:', response.data);
  } catch (error) {
    console.log('❌ 2Factor Error:', error.response?.data || error.message);
  }
  
  // Test 5: SMS4India
  console.log('\n5️⃣ Testing SMS4India...');
  try {
    const response = await axios.post('https://www.sms4india.com/api/v1/sendSMS', {
      apikey: apiKey,
      message: message,
      numbers: phone,
      sender: 'VIGNAN'
    });
    
    console.log('✅ SMS4India Response:', response.data);
  } catch (error) {
    console.log('❌ SMS4India Error:', error.response?.data || error.message);
  }
  
  console.log('\n🎯 Analysis complete. Check which service responded successfully.');
};

debugSMSService();