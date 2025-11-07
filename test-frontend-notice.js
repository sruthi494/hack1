const axios = require('axios');
const FormData = require('form-data');

const API_URL = 'http://localhost:5000/api';

async function testFrontendNoticeCreation() {
  try {
    console.log('🧪 Testing Notice Creation (Frontend Style)\n');

    // Step 1: Login as Faculty
    console.log('1️⃣ Logging in as Faculty...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      loginId: '231FA04013',
      password: '231FA04013'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful!');

    // Step 2: Create FormData exactly like frontend
    console.log('\n2️⃣ Creating notice with FormData (like frontend)...');
    
    const formData = new FormData();
    formData.append('title', 'Frontend Test Notice - ' + new Date().toLocaleString());
    formData.append('content', 'This is a test notice created using FormData to mimic frontend behavior.');
    formData.append('category', 'general');
    formData.append('priority', 'medium');
    formData.append('targetAudience', JSON.stringify({
      roles: ['student', 'faculty'],
      departments: ['Computer Science Engineering'],
      years: []
    }));

    console.log('FormData created with fields:');
    console.log('  - title, content, category, priority, targetAudience');

    const noticeResponse = await axios.post(`${API_URL}/notices`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });

    console.log('\n✅ Notice created successfully!');
    console.log(`   Notice ID: ${noticeResponse.data._id}`);
    console.log(`   Title: ${noticeResponse.data.title}`);
    console.log(`   Author: ${noticeResponse.data.author.name}`);

    console.log('\n🎉 Frontend-style notice creation is working!');

  } catch (error) {
    console.log('\n❌ Test failed!');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data, null, 2)}`);
      console.log(`   Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
    } else {
      console.log(`   Error: ${error.message}`);
      console.log(`   Stack: ${error.stack}`);
    }
  }
}

testFrontendNoticeCreation();
