const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testCompleteFlow() {
  console.log('🧪 Testing Complete User Flow\n');
  console.log('==================================================\n');

  try {
    // STEP 1: Login as Faculty
    console.log('STEP 1: Faculty Login');
    console.log('   LoginId: 231FA04013');
    console.log('   Password: 231FA04013');
    
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04013',
      password: '231FA04013'
    });

    if (!loginResponse.data.token) {
      console.log('❌ Login failed - no token received');
      return;
    }

    const facultyToken = loginResponse.data.token;
    const facultyUser = loginResponse.data.user;
    
    console.log('✅ Login successful!');
    console.log(`   Name: ${facultyUser.name}`);
    console.log(`   Role: ${facultyUser.role}`);
    console.log(`   Token: ${facultyToken.substring(0, 30)}...`);

    // STEP 2: Create Notice as Faculty
    console.log('\n\nSTEP 2: Create Notice (Faculty)');
    const noticeData = {
      title: 'Important Announcement - ' + new Date().toLocaleString(),
      content: 'This is an important notice for all students, faculty, and admin. Please read carefully.',
      category: 'general',
      priority: 'high',
      targetAudience: JSON.stringify({
        roles: ['student', 'faculty', 'admin'],
        departments: ['Computer Science Engineering'],
        years: []
      })
    };

    console.log('   Creating notice with:');
    console.log(`   - Title: ${noticeData.title}`);
    console.log(`   - Category: ${noticeData.category}`);
    console.log(`   - Priority: ${noticeData.priority}`);
    console.log(`   - Target: Students, Faculty, Admin`);

    const noticeResponse = await axios.post(`${API_URL}/notices`, noticeData, {
      headers: {
        'Authorization': `Bearer ${facultyToken}`,
        'Content-Type': 'application/json'
      }
    });

    const createdNotice = noticeResponse.data;
    console.log('✅ Notice created successfully!');
    console.log(`   Notice ID: ${createdNotice._id}`);
    console.log(`   Author: ${createdNotice.author.name}`);

    // STEP 3: Login as Student and view notice
    console.log('\n\nSTEP 3: Student Login & View Notice');
    console.log('   LoginId: 231FA04017');
    
    const studentLoginResponse = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04017',
      password: '231FA04017'
    });

    const studentToken = studentLoginResponse.data.token;
    const studentUser = studentLoginResponse.data.user;
    
    console.log('✅ Student login successful!');
    console.log(`   Name: ${studentUser.name}`);

    // View the notice as student
    const studentNoticeResponse = await axios.get(`${API_URL}/notices/${createdNotice._id}`, {
      headers: {
        'Authorization': `Bearer ${studentToken}`
      }
    });

    console.log('✅ Student can view the notice!');
    console.log(`   Title: ${studentNoticeResponse.data.title}`);
    console.log(`   Views: ${studentNoticeResponse.data.views.length}`);

    // STEP 4: Login as Admin and view notice
    console.log('\n\nSTEP 4: Admin Login & View Notice');
    console.log('   LoginId: 231FA04040');
    
    const adminLoginResponse = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04040',
      password: '231FA04040'
    });

    const adminToken = adminLoginResponse.data.token;
    const adminUser = adminLoginResponse.data.user;
    
    console.log('✅ Admin login successful!');
    console.log(`   Name: ${adminUser.name}`);

    // View the notice as admin
    const adminNoticeResponse = await axios.get(`${API_URL}/notices/${createdNotice._id}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    console.log('✅ Admin can view the notice!');
    console.log(`   Title: ${adminNoticeResponse.data.title}`);
    console.log(`   Views: ${adminNoticeResponse.data.views.length}`);

    // STEP 5: Get notice list for all users
    console.log('\n\nSTEP 5: Notice List for All Users');
    
    const studentNoticesResponse = await axios.get(`${API_URL}/notices`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    console.log(`✅ Student can see ${studentNoticesResponse.data.notices.length} notices`);

    const facultyNoticesResponse = await axios.get(`${API_URL}/notices`, {
      headers: { 'Authorization': `Bearer ${facultyToken}` }
    });
    console.log(`✅ Faculty can see ${facultyNoticesResponse.data.notices.length} notices`);

    const adminNoticesResponse = await axios.get(`${API_URL}/notices`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    console.log(`✅ Admin can see ${adminNoticesResponse.data.notices.length} notices`);

    // Summary
    console.log('\n\n==================================================');
    console.log('🎉 COMPLETE FLOW TEST - ALL PASSED!');
    console.log('==================================================');
    console.log('✅ Faculty Login: SUCCESS');
    console.log('✅ Notice Creation: SUCCESS');
    console.log('✅ Student Login: SUCCESS');
    console.log('✅ Student View Notice: SUCCESS');
    console.log('✅ Admin Login: SUCCESS');
    console.log('✅ Admin View Notice: SUCCESS');
    console.log('✅ Notice Lists: SUCCESS');
    console.log('\n📝 Created Notice Details:');
    console.log(`   ID: ${createdNotice._id}`);
    console.log(`   Title: ${createdNotice.title}`);
    console.log(`   Author: ${createdNotice.author.name}`);
    console.log(`   Visible to: Students, Faculty, Admin`);
    console.log('\n🌐 Access Application: http://localhost:3001');
    console.log('\n✅ Everything is working perfectly! 🎉');

  } catch (error) {
    console.log('\n❌ Test failed!');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
  }
}

testCompleteFlow();
