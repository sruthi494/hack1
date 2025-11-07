# 📧 Send REAL OTP to Email - Complete Setup Guide

## 🎯 Current Status
- ✅ System is working and ready
- ✅ Database seeded with users and email addresses
- ✅ Email service configured
- ⏳ Needs Gmail credentials to send REAL emails

## 📧 Email Addresses in System
- **Student**: 231fa04017@gmail.com
- **Faculty**: 231fa04013@gmail.com, 231fa04016@gmail.com
- **Admin**: 231fa04040@gmail.com

## 🔧 To Send REAL Emails to These Addresses:

### **Step 1: Get Gmail App Password**

1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left sidebar
3. Enable "2-Step Verification" (if not already enabled)
4. After enabling 2-Step, go back to Security
5. Click "App passwords"
6. Select "Mail" and "Other (Custom name)"
7. Enter name: "SCNBCP"
8. Click "Generate"
9. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### **Step 2: Update .env File**

Open `.env` file and update these lines:

```env
SMTP_USER=231fa04017@gmail.com
SMTP_PASS=abcdefghijklmnop
```

Replace `abcdefghijklmnop` with your actual 16-character app password (remove spaces).

### **Step 3: Restart Server**

```bash
# Stop current server (Ctrl+C or kill process)
# Then start:
node server.js
```

### **Step 4: Test Forgot Password**

1. Go to http://localhost:3002
2. Click "Forgot Password" on student login
3. Enter: `231FA04017`
4. Click "Send OTP to Email"
5. **Check your Gmail inbox at 231fa04017@gmail.com**
6. You should receive a professional email with the OTP!

## 🎉 What Happens After Setup

Once configured, when users click "Forgot Password":
1. They enter their Login ID
2. System finds their email from database
3. **REAL email is sent** to their Gmail address
4. They receive professional HTML email with OTP
5. They enter OTP and reset password

## 📧 Email Template

Users will receive:
- **Subject**: SCNBCP - Password Reset OTP
- **From**: SCNBCP <noreply@vignan.ac.in>
- **Content**: Professional HTML email with:
  - Large, bold OTP number
  - 10-minute expiration warning
  - Vignan University branding
  - Security reminders

## 🔄 Current Behavior (Demo Mode)

Without Gmail credentials:
- ✅ OTP is generated and saved to database
- ✅ OTP is shown in API response for testing
- ✅ Email content is logged to console
- ❌ No real email is sent to Gmail inbox

## ✅ After Gmail Configuration

With Gmail credentials:
- ✅ OTP is generated and saved to database
- ✅ **REAL email is sent to Gmail inbox**
- ✅ Professional HTML email delivered
- ✅ Production-ready system

## 💡 Alternative: Use Different Gmail

If you don't want to use 231fa04017@gmail.com as sender:

1. Create new Gmail: scnbcp.notifications@gmail.com
2. Enable 2-Step Verification
3. Generate App Password
4. Update .env:
   ```env
   SMTP_USER=scnbcp.notifications@gmail.com
   SMTP_PASS=your_app_password
   ```

Emails will be sent FROM scnbcp.notifications@gmail.com TO 231fa04017@gmail.com

## 🚀 Ready to Go!

The system is fully configured and ready. Just add Gmail credentials to send real emails!