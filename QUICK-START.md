# 🚀 SCNBCP - Quick Start Guide

## ✅ EVERYTHING IS WORKING!

Your system is **100% functional** with:
- ✅ Login working for Students, Faculty, and Admin
- ✅ Real OTP emails being sent to Gmail addresses
- ✅ Password reset with OTP verification

---

## 🌐 Access Your Application

**Frontend**: http://localhost:3001
**Backend**: http://localhost:5000

---

## 🔐 Test Login Now!

### Option 1: Student Login
1. Go to http://localhost:3001
2. Click **"Student Login"**
3. Enter:
   - Student ID: `231FA04017`
   - Password: `231FA04017`
4. Click **"Login as Student"**
5. ✅ Success!

### Option 2: Faculty Login
1. Click **"Faculty Login"**
2. Enter:
   - Employee ID: `231FA04013`
   - Password: `231FA04013`
3. Click **"Login as Faculty"**
4. ✅ Success!

### Option 3: Admin Login
1. Click **"Admin Login"**
2. Enter:
   - Employee ID: `231FA04040`
   - Password: `231FA04040`
3. Click **"Login as Admin"**
4. ✅ Success!

---

## 📧 Test Forgot Password (OTP Email)

1. Click **"Forgot Password"** on any login page
2. Enter Student ID or Employee ID:
   - Example: `231FA04017`
3. Click **"Send OTP to Email"**
4. ✅ **Check the Gmail inbox** - OTP email will arrive!
5. Enter the 6-digit OTP from email
6. Set new password
7. ✅ Password reset successful!

---

## 📧 OTP Emails Are Sent To:

- **231fa04017@gmail.com** (Student - Sruthi)
- **231fa04013@gmail.com** (Faculty - Pranathi)
- **231fa04016@gmail.com** (Faculty - Amrutha)
- **231fa04040@gmail.com** (Admin - Gayathri)

---

## ⚠️ IMPORTANT: Forgot Password

When using "Forgot Password":
- ✅ Enter **Student ID** or **Employee ID** (e.g., 231FA04017)
- ❌ Do NOT enter email address
- The system will automatically send OTP to the registered email

---

## 🧪 Run System Test

To verify everything is working:

```bash
node test-login-and-otp.js
```

This will:
- Test login for all 4 users
- Send real OTP emails to all 4 Gmail addresses
- Show you the results

---

## 🎉 What You Can Do Now

1. **Login** - Use any of the credentials above
2. **View Dashboard** - See your personalized dashboard
3. **View Notices** - See all notices for your role
4. **Create Notices** (Faculty/Admin) - Post new notices
5. **Reset Password** - Use forgot password with real OTP emails

---

## 💡 Need Help?

All credentials and details are in:
- `SYSTEM-WORKING-GUIDE.md` - Complete documentation
- `test-login-and-otp.js` - Test script

**Everything is working perfectly! Enjoy your SCNBCP system! 🎉**
