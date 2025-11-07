const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testRoleFiltering() {
  console.log('🧪 Testing Role-Based Notice Filtering\n');

  try {
    // Step 1: Login as Faculty and create notice for STUDENTS ONLY
    console.log('STEP 1: Faculty Login');
    const facultyLogin = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04013',
      password: '231FA04013'
    });
    const facultyToken = facultyLogin.data.token;
    console.log('✅ Faculty logged in:', facultyLogin.data.user.name);

    // Step 2: Create notice for STUDENTS ONLY
    console.log('\nSTEP 2: Creating notice for STUDENTS ONLY');
    const noticeData = {
      title: 'Notice for Students Only - ' + new Date().toLocaleString(),
      content: 'This notice should ONLY be visible to students, NOT to faculty or admin',
      category: 'general',
      priority: 'high',
      targetAudience: JSON.stringify({
        roles: ['student'],  // ONLY STUDENTS
        departments: ['Computer Science Engineering'],
        years: []
      })
    };

    const createResponse = await axios.post(`${API_URL}/notices`, noticeData, {
      headers: { 'Authorization': `Bearer ${facultyToken}` }
    });
    console.log('✅ Notice created:', createResponse.data._id);
    console.log('   Target Audience:', createResponse.data.targetAudience);

    // Step 3: Check as Student
    console.log('\nSTEP 3: Checking as STUDENT');
    const studentLogin = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04017',
      password: '231FA04017'
    });
    const studentToken = studentLogin.data.token;

    const studentNotices = await axios.get(`${API_URL}/notices`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const studentCanSee = studentNotices.data.notices.some(n => n._id === createResponse.data._id);
    console.log(studentCanSee ? '✅ Student CAN see the notice (CORRECT!)' : '❌ Student CANNOT see the notice (WRONG!)');

    // Step 4: Check as Faculty
    console.log('\nSTEP 4: Checking as FACULTY');
    const facultyNotices = await axios.get(`${API_URL}/notices`, {
      headers: { 'Authorization': `Bearer ${facultyToken}` }
    });
    const facultyCanSee = facultyNotices.data.notices.some(n => n._id === createResponse.data._id);
    console.log(facultyCanSee ? '❌ Faculty CAN see the notice (WRONG!)' : '✅ Faculty CANNOT see the notice (CORRECT!)');

    // Step 5: Check as Admin
    console.log('\nSTEP 5: Checking as ADMIN');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04040',
      password: '231FA04040'
    });
    const adminToken = adminLogin.data.token;

    const adminNotices = await axios.get(`${API_URL}/notices`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminCanSee = adminNotices.data.notices.some(n => n._id === createResponse.data._id);
    console.log(adminCanSee ? '❌ Admin CAN see the notice (WRONG!)' : '✅ Admin CANNOT see the notice (CORRECT!)');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY:');
    console.log('='.repeat(50));
    console.log('Notice created for: STUDENTS ONLY');
    console.log('Student can see:', studentCanSee ? 'YES ✅' : 'NO ❌');
    console.log('Faculty can see:', facultyCanSee ? 'YES ❌' : 'NO ✅');
    console.log('Admin can see:', adminCanSee ? 'YES ❌' : 'NO ✅');
    
    if (studentCanSee && !facultyCanSee && !adminCanSee) {
      console.log('\n🎉 TEST PASSED! Role filtering is working correctly!');
    } else {
      console.log('\n❌ TEST FAILED! Role filtering is NOT working correctly!');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testRoleFiltering();
