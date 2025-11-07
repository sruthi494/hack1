const { sendOTPEmail } = require('./utils/emailService');

const testRealGmail = async () => {
  console.log('📧 Testing REAL Gmail Email Delivery...\n');
  
  const email = '231fa04017@gmail.com';
  const otp = '123456';
  const userName = 'Sruthi';
  
  console.log(`📧 Sending OTP to: ${email}`);
  console.log(`🔑 OTP: ${otp}`);
  console.log(`👤 User: ${userName}\n`);
  
  try {
    const result = await sendOTPEmail(email, otp, userName);
    
    if (result.success && !result.isDemoMode) {
      console.log('\n🎉 SUCCESS! REAL EMAIL SENT!');
      console.log('📧 Check your Gmail inbox at 231fa04017@gmail.com');
      console.log('📧 Look for email with subject: "SCNBCP - Password Reset OTP"');
      console.log(`📧 Message ID: ${result.messageId}`);
    } else if (result.isDemoMode) {
      console.log('\n📧 Demo mode - Email not sent to real inbox');
      console.log(`🔑 OTP: ${result.otp}`);
    } else {
      console.log('\n❌ Email sending failed');
    }
    
  } catch (error) {
    console.log('\n❌ Error:', error.message);
  }
};

testRealGmail();