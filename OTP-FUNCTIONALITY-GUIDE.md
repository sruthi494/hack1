# 📱 OTP Functionality Guide - SCNBCP

## ✅ **OTP Feature Status: WORKING**

The OTP (One-Time Password) functionality for password reset is now fully functional in demo mode.

## 🔐 **How to Use Forgot Password with OTP**

### **Step 1: Access Forgot Password**
1. Go to any login page (Student/Faculty/Admin)
2. Click "Forgot your password?" link
3. You'll be redirected to the forgot password page

### **Step 2: Enter Login ID**
- **Students**: Enter your Student ID (e.g., `231FA04017`)
- **Faculty**: Enter your Employee ID (e.g., `231FA04013`)
- **Admin**: Enter your Employee ID (e.g., `231FA04040`)

### **Step 3: Receive OTP**
- Click "Send OTP" button
- In **Demo Mode**, the OTP will be displayed in the success message
- Example: "OTP sent! Demo OTP: 123456"
- The phone number will be masked for security (e.g., "83****1388")

### **Step 4: Verify OTP**
- Enter the 6-digit OTP you received
- Click "Verify OTP"
- If valid, you'll proceed to password reset

### **Step 5: Reset Password**
- Enter your new password
- Confirm the new password
- Click "Reset Password"
- Your password will be updated successfully

## 🧪 **Demo Mode Features**

Since SMS services require paid API keys, the system runs in demo mode:

- ✅ **OTP Generation**: Real 6-digit OTPs are generated
- ✅ **Database Storage**: OTPs are stored with expiration (10 minutes)
- ✅ **Validation**: Full OTP validation logic works
- ✅ **Password Reset**: Complete password reset functionality
- 📱 **SMS Display**: OTP is shown in the response for testing

## 📋 **Test Credentials for OTP**

### **Student Account:**
- Login ID: `231FA04017`
- Phone: `8309261388` (masked as `83****1388`)

### **Faculty Accounts:**
- Login ID: `231FA04013` | Phone: `6303351811` (masked as `63****1811`)
- Login ID: `231FA04016` | Phone: `9876543212` (masked as `98****3212`)

### **Admin Account:**
- Login ID: `231FA04040` | Phone: `9876543213` (masked as `98****3213`)

## 🔧 **For Production Use**

To enable real SMS sending, configure one of these services in `.env`:

### **Option 1: Twilio (International)**
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### **Option 2: TextLocal (India)**
```env
TEXTLOCAL_API_KEY=your_api_key
TEXTLOCAL_SENDER=VIGNAN
```

## 🚀 **Testing the Feature**

1. **Frontend Testing**: Use the web interface at http://localhost:3000
2. **API Testing**: Use the test scripts:
   - `node test-otp-functionality.js` - Complete OTP flow test
   - `node test-faculty-otp.js` - Faculty-specific test

## 📱 **Current Status**

- ✅ **Backend API**: Fully functional
- ✅ **Frontend UI**: Complete forgot password flow
- ✅ **Database**: OTP storage and validation
- ✅ **Security**: OTP expiration (10 minutes)
- ✅ **Multi-user**: Works for Students, Faculty, and Admin
- 🔄 **SMS**: Demo mode (shows OTP in response)

The OTP functionality is production-ready and only needs real SMS service configuration for live deployment!