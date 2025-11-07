const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testNoticeCreation() {
  try {
    console.log('🧪 Testing Notice Creation\n');

    // Step 1: Login as Faculty
    console.log('1️⃣ Logging in as Faculty...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04013',
      password: '231FA04013'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful!');
    console.log(`   Token: ${token.substring(0, 20)}...`);

    // Step 2: Create a notice
    console.log('\n2️⃣ Creating a test notice...');
    const noticeData = {
      title: 'Test Notice - ' + new Date().toLocaleString(),
      content: 'This is a test notice to verify the notice creation functionality is working properly.',
      category: 'general',
      priority: 'medium',
      targetAudience: JSON.stringify({
        roles: ['student', 'faculty'],
        departments: ['Computer Science Engineering'],
        years: []
      })
    };

    const noticeResponse = await axios.post(`${API_URL}/notices`, noticeData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Notice created successfully!');
    console.log(`   Notice ID: ${noticeResponse.data._id}`);
    console.log(`   Title: ${noticeResponse.data.title}`);
    console.log(`   Category: ${noticeResponse.data.category}`);
    console.log(`   Priority: ${noticeResponse.data.priority}`);

    // Step 3: Fetch the notice
    console.log('\n3️⃣ Fetching the created notice...');
    const fetchResponse = await axios.get(`${API_URL}/notices/${noticeResponse.data._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ Notice fetched successfully!');
    console.log(`   Title: ${fetchResponse.data.title}`);
    console.log(`   Author: ${fetchResponse.data.author.name}`);

    console.log('\n🎉 All tests passed! Notice creation is working!');

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

testNoticeCreation();
