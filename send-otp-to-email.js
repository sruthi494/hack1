const { sendOTPEmail, generateOTP } = require('./utils/emailService');

const sendOTPToEmail = async () => {
  console.log('📧 Sending OTP to 231fa04017@gmail.com...\n');
  
  const email = '231fa04017@gmail.com';
  const otp = generateOTP();
  const userName = 'Sruthi';
  
  console.log(`🔑 Generated OTP: ${otp}`);
  console.log(`📧 Recipient: ${email}`);
  console.log(`👤 User: ${userName}\n`);
  
  try {
    console.log('📤 Sending OTP email...');
    const result = await sendOTPEmail(email, otp, userName);
    
    if (result.success) {
      console.log('\n✅ Email process completed successfully!');
      console.log(`📧 Message ID: ${result.messageId}`);
      
      if (result.isDemoMode) {
        console.log('\n🎯 DEMO MODE - Email Content Shown Above');
        console.log('📧 In production, this email would be sent to: 231fa04017@gmail.com');
        console.log('💡 The user would receive a professional HTML email with the OTP');
      } else {
        console.log('\n🎉 Real email sent to 231fa04017@gmail.com!');
        console.log('📧 Check the email inbox for the OTP');
      }
      
      console.log(`\n🔑 OTP for testing: ${otp}`);
      console.log('⏰ Valid for 10 minutes');
      
    } else {
      console.log('\n❌ Email sending failed!');
      console.log('Error:', result.error);
    }
    
  } catch (error) {
    console.log('\n❌ Error sending OTP email!');
    console.log('Error:', error.message);
  }
};

sendOTPToEmail();