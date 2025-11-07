# 📧 Email OTP Setup Guide - SCNBCP

## ✅ **System Updated: OTP Now Sent to Email Instead of Phone**

The forgot password feature now sends OTP to email addresses instead of phone numbers.

## 📋 **What You Need to Do**

### **Step 1: Add Email Addresses to student-data.json**

Open `student-data.json` and add `email` field to each user:

```json
{
  "students": [
    {
      "name": "Sruthi",
      "studentId": "231FA04017",
      "password": "231FA04017",
      "phone": "8309261388",
      "email": "your-email@example.com",  // ADD THIS LINE
      "role": "student",
      "department": "Computer Science",
      "year": "3rd Year"
    }
  ]
}
```

### **Step 2: Re-seed the Database**

After adding emails, run:
```bash
node seed.js
```

### **Step 3: Configure Email Service (Optional)**

For real email sending, configure Gmail in `.env`:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

**To get Gmail App Password:**
1. Go to Google Account Settings
2. Security > 2-Step Verification (enable it)
3. App passwords > Generate new app password
4. Copy the 16-character password
5. Paste it in `.env` as `EMAIL_PASS`

## 🎯 **Demo Mode (Current)**

If email is not configured, the system runs in **Demo Mode**:
- ✅ OTP is generated and saved to database
- ✅ OTP is shown in the API response
- ✅ Full validation logic works
- 📧 Email content is logged to console
- 💡 Perfect for testing!

## 🧪 **Testing**

### Test Email Service:
```bash
node test-email-otp.js
```

### Test Forgot Password Flow:
1. Go to http://localhost:3000
2. Click "Forgot Password"
3. Enter your Login ID
4. Click "Send OTP to Email"
5. OTP will be shown in the success message (Demo Mode)
6. Enter the OTP and reset password

## 📧 **Email Template**

Users will receive a professional email with:
- ✅ 6-digit OTP in large, bold text
- ✅ 10-minute validity warning
- ✅ Security reminder
- ✅ Vignan University branding
- ✅ HTML formatted for all email clients

## 🔄 **Current Status**

- ✅ **User Model**: Updated with email field
- ✅ **Email Service**: Created and working
- ✅ **Auth Routes**: Updated to send email OTP
- ✅ **Frontend**: Updated UI text (phone → email)
- ✅ **Demo Mode**: Fully functional
- ⏳ **Your Action**: Add email addresses to student-data.json

## 📝 **Example student-data.json**

```json
{
  "students": [
    {
      "name": "Sruthi",
      "studentId": "231FA04017",
      "password": "231FA04017",
      "phone": "8309261388",
      "email": "sruthi@example.com",
      "role": "student",
      "department": "Computer Science",
      "year": "3rd Year"
    },
    {
      "name": "Pranathi",
      "employeeId": "231FA04013",
      "password": "231FA04013",
      "phone": "6303351811",
      "email": "pranathi@example.com",
      "role": "faculty",
      "department": "Computer Science"
    }
  ]
}
```

## 🎉 **Benefits of Email OTP**

- ✅ **More Reliable**: Email delivery is more consistent than SMS
- ✅ **Free**: No SMS service costs
- ✅ **Professional**: Branded email templates
- ✅ **Accessible**: Works anywhere with internet
- ✅ **Secure**: Standard OTP security practices

Once you add email addresses to your data and re-seed the database, the forgot password feature will work perfectly!