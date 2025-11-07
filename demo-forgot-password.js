const axios = require('axios');

const demoForgotPassword = async () => {
  console.log('🎯 SCNBCP Forgot Password Demo\n');
  
  const testUsers = [
    { loginId: '231FA04017', role: 'Student', email: '231fa04017@gmail.com' },
    { loginId: '231FA04013', role: 'Faculty', email: '231fa04013@gmail.com' },
    { loginId: '231FA04040', role: 'Admin', email: '231fa04040@gmail.com' }
  ];
  
  for (const user of testUsers) {
    console.log(`📧 Testing ${user.role}: ${user.loginId}`);
    console.log(`📧 Email: ${user.email}`);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        loginId: user.loginId
      });
      
      console.log('✅ Success!');
      console.log(`🔑 OTP: ${response.data.demoOTP}`);
      console.log(`📧 Masked Email: ${response.data.email}`);
      console.log(`💬 Message: ${response.data.message}\n`);
      
    } catch (error) {
      console.log('❌ Failed!');
      console.log('Error:', error.response?.data?.message || error.message);
      console.log('');
    }
  }
  
  console.log('🎉 Demo Complete!');
  console.log('\n📋 How to test on website:');
  console.log('1. Go to: http://localhost:3002');
  console.log('2. Click "Forgot Password" on any login page');
  console.log('3. Enter Login ID (e.g., 231FA04017)');
  console.log('4. Click "Send OTP to Email"');
  console.log('5. Use the OTP shown in the success message');
  console.log('6. Reset your password');
  
  console.log('\n📧 Email Addresses in System:');
  testUsers.forEach(user => {
    console.log(`${user.role}: ${user.email}`);
  });
};

demoForgotPassword();