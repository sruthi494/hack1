# 📧 Gmail Setup Guide - Send Real OTP Emails

## 🎯 Goal: Send OTP to 231fa04017@gmail.com

To send real emails to your Gmail address, follow these steps:

## 📋 Step-by-Step Setup

### **Step 1: Enable 2-Step Verification**
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the prompts to enable it

### **Step 2: Generate App Password**
1. After enabling 2-Step Verification, go back to Security
2. Click "App passwords" (you'll see this option after enabling 2-Step)
3. Select "Mail" and "Other (Custom name)"
4. Enter name: "SCNBCP"
5. Click "Generate"
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### **Step 3: Update .env File**
Open `.env` file and update:

```env
EMAIL_USER=231fa04017@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

(Replace `abcdefghijklmnop` with your actual 16-character app password, remove spaces)

### **Step 4: Restart Server**
```bash
# Stop the current server (Ctrl+C)
# Then start again:
node server.js
```

### **Step 5: Test**
```bash
node send-otp-to-email.js
```

You should receive the OTP email at `231fa04017@gmail.com`!

## 🔧 Alternative: Use a Different Gmail Account

If you don't want to use `231fa04017@gmail.com` as the sender, you can:

1. Create a new Gmail account (e.g., `scnbcp.notifications@gmail.com`)
2. Enable 2-Step Verification on that account
3. Generate App Password
4. Update `.env`:
   ```env
   EMAIL_USER=scnbcp.notifications@gmail.com
   EMAIL_PASS=your_app_password_here
   ```

This way, OTP emails will be sent FROM `scnbcp.notifications@gmail.com` TO `231fa04017@gmail.com`

## ✅ Current Status

Right now, the system is using **Ethereal Email** (test service):
- ✅ Emails are being "sent" successfully
- ✅ OTP is generated and saved to database
- ✅ Full validation logic works
- ❌ Emails don't actually reach Gmail inbox

Once you configure Gmail credentials, emails will be sent to real Gmail addresses!

## 🎉 After Setup

Once configured, when users click "Forgot Password":
1. They enter their Login ID
2. System finds their email from database
3. **Real email is sent** to their Gmail address
4. They receive professional HTML email with OTP
5. They enter OTP and reset password

Perfect for production use!