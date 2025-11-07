# 📱 Real SMS Setup Guide - SCNBCP

## 🎯 **Goal: Send OTP to Your Real Phone Number**

Follow these steps to configure real SMS services so OTP will be sent to your actual phone.

## 🚀 **Option 1: Fast2SMS (Recommended for India)**

### **Step 1: Create Fast2SMS Account**
1. Go to https://www.fast2sms.com/
2. Sign up for a free account
3. Verify your phone number
4. You'll get **FREE credits** to start with

### **Step 2: Get API Key**
1. Login to your Fast2SMS dashboard
2. Go to "API Keys" section
3. Copy your API key

### **Step 3: Configure in .env**
```env
FAST2SMS_API_KEY=your_actual_api_key_here
```

### **Step 4: Update Your Phone Number**
Update your phone number in the database:
```javascript
// In student-data.json, update your phone number
{
  "name": "Sruthi",
  "studentId": "231FA04017",
  "password": "231FA04017",
  "phone": "8309261388", // Your actual phone number
  "role": "student",
  "department": "Computer Science",
  "year": "3rd Year"
}
```

## 🚀 **Option 2: TextLocal (Alternative for India)**

### **Step 1: Create TextLocal Account**
1. Go to https://www.textlocal.in/
2. Sign up for account
3. Get free credits

### **Step 2: Get API Key**
1. Login to TextLocal dashboard
2. Go to Settings > API Keys
3. Copy your API key

### **Step 3: Configure in .env**
```env
TEXTLOCAL_API_KEY=your_textlocal_api_key
TEXTLOCAL_SENDER=VIGNAN
```

## 🚀 **Option 3: Twilio (International)**

### **Step 1: Create Twilio Account**
1. Go to https://www.twilio.com/
2. Sign up for free trial
3. Get $15 free credits

### **Step 2: Get Credentials**
1. From Twilio Console, get:
   - Account SID
   - Auth Token
   - Phone Number

### **Step 3: Configure in .env**
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

## 🔧 **Quick Setup Script**

I'll create a script to help you configure this easily:

```bash
node setup-real-sms.js
```

## ⚡ **Test Real SMS**

After configuration, test with:
```bash
node test-real-sms.js
```

## 📱 **Expected Result**

After setup:
1. Go to forgot password page
2. Enter your login ID
3. Click "Send OTP"
4. **Check your phone messages** - you should receive SMS with 6-digit OTP
5. Enter the OTP from your phone
6. Reset your password

## 🎉 **Benefits of Real SMS**

- ✅ **Real Security**: OTP sent to actual phone
- ✅ **Production Ready**: Works like real applications
- ✅ **User Experience**: Professional SMS delivery
- ✅ **No Demo Mode**: Clean user interface

Would you like me to help you set up any of these SMS services?