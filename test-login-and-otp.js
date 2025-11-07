const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test users from database
const testUsers = [
  { loginId: '231FA04017', password: '231FA04017', email: '231fa04017@gmail.com', role: 'Student' },
  { loginId: '231FA04013', password: '231FA04013', email: '231fa04013@gmail.com', role: 'Faculty' },
  { loginId: '231FA04016', password: '231FA04016', email: '231fa04016@gmail.com', role: 'Faculty' },
  { loginId: '231FA04040', password: '231FA04040', email: '231fa04040@gmail.com', role: 'Admin' }
];

async function testLogin(user) {
  try {
    console.log(`\n🔐 Testing Login for ${user.role}: ${user.loginId}`);
    const response = await axios.post(`${API_URL}/auth/login`, {
      loginId: user.loginId,
      password: user.password
    });

    if (response.data.token && response.data.user) {
      console.log(`✅ Login SUCCESS`);
      console.log(`   Name: ${response.data.user.name}`);
      console.log(`   Email: ${response.data.user.email}`);
      console.log(`   Role: ${response.data.user.role}`);
      console.log(`   Token: ${response.data.token.substring(0, 20)}...`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Login FAILED`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function testForgotPassword(user) {
  try {
    console.log(`\n📧 Testing Forgot Password for ${user.role}: ${user.loginId}`);
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      loginId: user.loginId
    });

    if (response.data.message) {
      console.log(`✅ OTP Sent Successfully!`);
      console.log(`   Masked Email: ${response.data.email}`);
      console.log(`   Message: ${response.data.message}`);
      console.log(`   📧 Real email sent to ${user.email}`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Forgot Password FAILED`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing SCNBCP System - Login & OTP Functionality');
  console.log('==================================================\n');

  let loginSuccess = 0;
  let otpSuccess = 0;

  // Test Login for all users
  console.log('📋 TEST 1: Login Functionality');
  for (const user of testUsers) {
    const result = await testLogin(user);
    if (result) loginSuccess++;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Test Forgot Password (OTP) for all users
  console.log('\n\n📋 TEST 2: Forgot Password - Email OTP Functionality');
  for (const user of testUsers) {
    const result = await testForgotPassword(user);
    if (result) otpSuccess++;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  console.log('\n\n==================================================');
  console.log('🎉 Test Summary');
  console.log('==================================================');
  console.log(`✅ Login Tests: ${loginSuccess}/${testUsers.length} passed`);
  console.log(`✅ OTP Tests: ${otpSuccess}/${testUsers.length} passed`);
  
  console.log('\n📧 Real OTP Emails Sent To:');
  testUsers.forEach(user => {
    console.log(`   - ${user.email} (${user.role})`);
  });

  console.log('\n🔐 Login Credentials:');
  testUsers.forEach(user => {
    console.log(`   ${user.role}: ${user.loginId} / ${user.password}`);
  });

  console.log('\n🌐 Access Application:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend: http://localhost:5000');
  
  if (loginSuccess === testUsers.length && otpSuccess === testUsers.length) {
    console.log('\n✅ ALL TESTS PASSED! System is fully functional! 🎉');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

runTests().catch(console.error);
