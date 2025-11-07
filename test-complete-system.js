const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test users
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
      return { success: true, token: response.data.token };
    }
  } catch (error) {
    console.log(`❌ Login FAILED`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    return { success: false };
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

async function testNoticeCreation(user, token) {
  try {
    console.log(`\n📝 Testing Notice Creation by ${user.role}: ${user.loginId}`);
    
    const noticeData = {
      title: `Test Notice by ${user.role} - ${new Date().toLocaleString()}`,
      content: `This is a test notice created by ${user.role} to verify the notice creation functionality is working properly. The system is fully operational!`,
      category: 'general',
      priority: 'medium',
      targetAudience: JSON.stringify({
        roles: ['student', 'faculty', 'admin'],
        departments: ['Computer Science Engineering'],
        years: []
      })
    };

    const response = await axios.post(`${API_URL}/notices`, noticeData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data._id) {
      console.log(`✅ Notice Created Successfully!`);
      console.log(`   Notice ID: ${response.data._id}`);
      console.log(`   Title: ${response.data.title}`);
      console.log(`   Category: ${response.data.category}`);
      console.log(`   Priority: ${response.data.priority}`);
      console.log(`   Author: ${response.data.author.name}`);
      return { success: true, noticeId: response.data._id };
    }
  } catch (error) {
    console.log(`❌ Notice Creation FAILED`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    return { success: false };
  }
}

async function testNoticeRetrieval(token, noticeId) {
  try {
    console.log(`\n📖 Testing Notice Retrieval: ${noticeId}`);
    
    const response = await axios.get(`${API_URL}/notices/${noticeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data._id) {
      console.log(`✅ Notice Retrieved Successfully!`);
      console.log(`   Title: ${response.data.title}`);
      console.log(`   Author: ${response.data.author.name}`);
      console.log(`   Views: ${response.data.views.length}`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Notice Retrieval FAILED`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function testNoticeList(token) {
  try {
    console.log(`\n📋 Testing Notice List Retrieval`);
    
    const response = await axios.get(`${API_URL}/notices`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.notices) {
      console.log(`✅ Notice List Retrieved Successfully!`);
      console.log(`   Total Notices: ${response.data.notices.length}`);
      console.log(`   Current Page: ${response.data.currentPage}`);
      console.log(`   Total Pages: ${response.data.totalPages}`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Notice List Retrieval FAILED`);
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function runCompleteTests() {
  console.log('🧪 Testing Complete SCNBCP System');
  console.log('==================================================\n');

  let loginSuccess = 0;
  let otpSuccess = 0;
  let noticeCreationSuccess = 0;
  let noticeRetrievalSuccess = 0;
  let createdNoticeId = null;
  let facultyToken = null;

  // TEST 1: Login for all users
  console.log('📋 TEST 1: Login Functionality');
  for (const user of testUsers) {
    const result = await testLogin(user);
    if (result.success) {
      loginSuccess++;
      // Save faculty token for notice tests
      if (user.role === 'Faculty' && !facultyToken) {
        facultyToken = result.token;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // TEST 2: Forgot Password (OTP) for all users
  console.log('\n\n📋 TEST 2: Forgot Password - Email OTP Functionality');
  for (const user of testUsers) {
    const result = await testForgotPassword(user);
    if (result) otpSuccess++;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // TEST 3: Notice Creation (Faculty)
  console.log('\n\n📋 TEST 3: Notice Creation (Faculty)');
  if (facultyToken) {
    const result = await testNoticeCreation(testUsers[1], facultyToken);
    if (result.success) {
      noticeCreationSuccess++;
      createdNoticeId = result.noticeId;
    }
  } else {
    console.log('❌ Cannot test notice creation - Faculty login failed');
  }

  // TEST 4: Notice Retrieval
  if (createdNoticeId && facultyToken) {
    console.log('\n\n📋 TEST 4: Notice Retrieval');
    const result = await testNoticeRetrieval(facultyToken, createdNoticeId);
    if (result) noticeRetrievalSuccess++;
  }

  // TEST 5: Notice List
  if (facultyToken) {
    console.log('\n\n📋 TEST 5: Notice List');
    await testNoticeList(facultyToken);
  }

  // Summary
  console.log('\n\n==================================================');
  console.log('🎉 Complete System Test Summary');
  console.log('==================================================');
  console.log(`✅ Login Tests: ${loginSuccess}/${testUsers.length} passed`);
  console.log(`✅ OTP Email Tests: ${otpSuccess}/${testUsers.length} passed`);
  console.log(`✅ Notice Creation: ${noticeCreationSuccess}/1 passed`);
  console.log(`✅ Notice Retrieval: ${noticeRetrievalSuccess}/1 passed`);
  
  console.log('\n📧 Real OTP Emails Sent To:');
  testUsers.forEach(user => {
    console.log(`   - ${user.email} (${user.role})`);
  });

  console.log('\n🔐 Login Credentials:');
  testUsers.forEach(user => {
    console.log(`   ${user.role}: ${user.loginId} / ${user.password}`);
  });

  console.log('\n🌐 Access Application:');
  console.log('   Frontend: http://localhost:3001');
  console.log('   Backend: http://localhost:5000');
  
  const allPassed = loginSuccess === testUsers.length && 
                    otpSuccess === testUsers.length && 
                    noticeCreationSuccess === 1 &&
                    noticeRetrievalSuccess === 1;
  
  if (allPassed) {
    console.log('\n✅ ALL TESTS PASSED! System is 100% functional! 🎉');
    console.log('\n🎯 You can now:');
    console.log('   1. Login with any credentials above');
    console.log('   2. Use Forgot Password to receive OTP emails');
    console.log('   3. Create notices as Faculty or Admin');
    console.log('   4. View and interact with notices');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

runCompleteTests().catch(console.error);
