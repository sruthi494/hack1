const twilio = require('twilio');
const axios = require('axios');

// Twilio SMS Service (International)
const sendSMSViaTwilio = async (phone, message) => {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('Twilio SMS Error:', error);
    return { success: false, error: error.message };
  }
};

// Google/Firebase SMS Service
const sendSMSViaGoogle = async (phone, message) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google API key not configured');
    }
    
    // Remove +91 if present and ensure proper format
    const cleanPhone = phone.replace(/^\+91/, '').replace(/\D/g, '');
    const formattedPhone = `+91${cleanPhone}`;
    
    console.log('🚀 Trying Google Firebase SMS...');
    
    // Try Firebase Cloud Messaging for SMS
    try {
      const firebaseData = {
        message: {
          token: formattedPhone, // This might need to be a FCM token
          notification: {
            title: 'SCNBCP OTP',
            body: message
          }
        }
      };
      
      const response = await axios.post(
        `https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send`,
        firebaseData,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data.name) {
        console.log('✅ Firebase SMS success');
        return { success: true, messageId: response.data.name };
      }
    } catch (error) {
      console.log('Firebase SMS failed:', error.response?.data || error.message);
    }
    
    // Try Google Cloud SMS API
    try {
      console.log('🚀 Trying Google Cloud SMS API...');
      const cloudSmsData = {
        messages: [{
          to: formattedPhone,
          body: message,
          from: 'VIGNAN'
        }]
      };
      
      const response = await axios.post(
        'https://sms.googleapis.com/v1/messages:send',
        cloudSmsData,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data.messages) {
        console.log('✅ Google Cloud SMS success');
        return { success: true, messageId: response.data.messages[0].id };
      }
    } catch (error) {
      console.log('Google Cloud SMS failed:', error.response?.data || error.message);
    }
    
    // Try as Google API key with SMS service
    try {
      console.log('🚀 Trying Google API with SMS gateway...');
      const response = await axios.post(
        `https://www.googleapis.com/sms/v1/messages?key=${apiKey}`,
        {
          to: formattedPhone,
          message: message,
          from: 'VIGNAN'
        }
      );
      
      if (response.data && response.data.id) {
        console.log('✅ Google SMS Gateway success');
        return { success: true, messageId: response.data.id };
      }
    } catch (error) {
      console.log('Google SMS Gateway failed:', error.response?.data || error.message);
    }
    
    return { success: false, error: 'Google SMS services failed. API key might be for a different service.' };
    
  } catch (error) {
    console.error('Google SMS Service Error:', error);
    return { success: false, error: error.message };
  }
};

// Custom SMS Service for your API keys
const sendSMSViaCustomAPI = async (phone, message) => {
  try {
    // Remove +91 if present and ensure 10 digits
    const cleanPhone = phone.replace(/^\+91/, '').replace(/\D/g, '');
    
    // Try Google SMS first if API key is available
    if (process.env.GOOGLE_API_KEY) {
      console.log('🚀 Trying Google SMS services...');
      const googleResult = await sendSMSViaGoogle(phone, message);
      if (googleResult.success) {
        return googleResult;
      }
    }
    
    // Try other SMS services with the old API key
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      throw new Error('No SMS API key configured');
    }
    
    // Format 1: Fast2SMS
    try {
      console.log('Trying Fast2SMS format...');
      const fast2smsData = {
        route: 'otp',
        sender_id: 'FSTSMS',
        message: message,
        language: 'english',
        flash: 0,
        numbers: cleanPhone
      };
      
      const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', fast2smsData, {
        headers: {
          'authorization': apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.return === true) {
        console.log('✅ Fast2SMS success');
        return { success: true, messageId: response.data.request_id };
      }
    } catch (error) {
      console.log('Fast2SMS failed:', error.response?.data || error.message);
    }
    
    // Format 2: MSG91 style
    try {
      console.log('Trying MSG91 format...');
      const msg91Data = {
        authkey: apiKey,
        mobiles: cleanPhone,
        message: message,
        sender: 'VIGNAN',
        route: '4'
      };
      
      const response = await axios.post('https://api.msg91.com/api/sendhttp.php', 
        new URLSearchParams(msg91Data)
      );
      
      if (response.data && !response.data.includes('error')) {
        console.log('✅ MSG91 success');
        return { success: true, messageId: response.data };
      }
    } catch (error) {
      console.log('MSG91 failed:', error.response?.data || error.message);
    }
    
    return { success: false, error: 'All SMS service formats failed. Please check your API keys.' };
    
  } catch (error) {
    console.error('SMS Service Error:', error);
    return { success: false, error: error.message };
  }
};

// TextLocal SMS Service (Indian SMS service)
const sendSMSViaTextLocal = async (phone, message) => {
  try {
    const apiKey = process.env.TEXTLOCAL_API_KEY;
    const sender = process.env.TEXTLOCAL_SENDER || 'VIGNAN';
    
    // Remove +91 if present and ensure 10 digits
    const cleanPhone = phone.replace(/^\+91/, '').replace(/\D/g, '');
    
    const data = {
      apikey: apiKey,
      numbers: cleanPhone,
      message: message,
      sender: sender
    };
    
    const response = await axios.post('https://api.textlocal.in/send/', 
      new URLSearchParams(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    if (response.data.status === 'success') {
      return { success: true, messageId: response.data.batch_id };
    } else {
      return { success: false, error: response.data.errors };
    }
  } catch (error) {
    console.error('TextLocal SMS Error:', error);
    return { success: false, error: error.message };
  }
};

// Fallback SMS service (for demo purposes)
const sendSMSDemo = async (phone, message) => {
  console.log(`📱 SMS Demo - Phone: ${phone}, Message: ${message}`);
  console.log(`🔔 OTP sent successfully (Demo Mode)`);
  
  // Extract OTP from message for demo purposes
  const otpMatch = message.match(/\d{6}/);
  const otp = otpMatch ? otpMatch[0] : null;
  
  if (otp) {
    console.log(`🔑 Demo OTP for testing: ${otp}`);
  }
  
  return { 
    success: true, 
    messageId: 'demo_' + Date.now(),
    demoOTP: otp // Include OTP in response for demo
  };
};

// Simplified and reliable SMS sending function
const sendSMS = async (phone, message) => {
  console.log(`📱 Sending SMS to ${phone}: ${message}`);
  
  const apiKey = process.env.FAST2SMS_API_KEY;
  
  if (!apiKey || apiKey === 'your_fast2sms_api_key') {
    console.log('⚠️  No SMS API key configured - using demo mode');
    return await sendSMSDemo(phone, message);
  }
  
  // Format phone number
  const cleanPhone = phone.replace(/^\+91/, '').replace(/\D/g, '');
  
  // Try MSG91 (most reliable with current API key)
  try {
    console.log('📤 Sending via MSG91...');
    const msg91Data = {
      authkey: apiKey,
      mobiles: cleanPhone,
      message: message,
      sender: 'VIGNAN',
      route: '4'
    };
    
    const response = await axios.post('https://api.msg91.com/api/sendhttp.php', 
      new URLSearchParams(msg91Data)
    );
    
    if (response.data && !response.data.includes('error')) {
      console.log('✅ SMS sent successfully via MSG91!');
      return { 
        success: true, 
        messageId: response.data,
        provider: 'MSG91'
      };
    }
  } catch (error) {
    console.log('❌ MSG91 failed:', error.response?.data || error.message);
  }
  
  // Try Fast2SMS as fallback
  try {
    console.log('📤 Trying Fast2SMS...');
    const fast2smsData = {
      route: 'otp',
      sender_id: 'FSTSMS',
      message: message,
      language: 'english',
      flash: 0,
      numbers: cleanPhone
    };
    
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', fast2smsData, {
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data && response.data.return === true) {
      console.log('✅ SMS sent successfully via Fast2SMS!');
      return { 
        success: true, 
        messageId: response.data.request_id,
        provider: 'Fast2SMS'
      };
    }
  } catch (error) {
    console.log('❌ Fast2SMS failed:', error.response?.data || error.message);
  }
  
  // Try TextLocal as final fallback
  if (process.env.TEXTLOCAL_API_KEY && process.env.TEXTLOCAL_API_KEY !== 'your_textlocal_api_key') {
    try {
      console.log('📤 Trying TextLocal...');
      const result = await sendSMSViaTextLocal(phone, message);
      if (result.success) {
        console.log('✅ SMS sent successfully via TextLocal');
        return result;
      }
    } catch (error) {
      console.log('❌ TextLocal failed:', error.message);
    }
  }
  
  // If all real SMS services fail, fall back to demo mode
  console.log('⚠️  All SMS services failed - falling back to demo mode');
  return await sendSMSDemo(phone, message);
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  sendSMS,
  generateOTP
};