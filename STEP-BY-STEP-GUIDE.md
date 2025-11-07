# 📝 SCNBCP - Step-by-Step Guide to Create and View Notices

## ✅ System is Working - Backend Test Passed!

**Test Results:**
- ✅ Faculty can create notices
- ✅ Student can see notices (1 notice visible)
- ✅ Faculty can see notices (1 notice visible)
- ✅ Admin can see notices (1 notice visible)

---

## 🌐 Access Your Application

**Open Browser**: http://localhost:3000

---

## 📝 How to Create a Notice (Step-by-Step)

### Step 1: Login as Faculty
1. Open http://localhost:3000
2. Click **"Faculty Login"** button
3. Enter credentials:
   - **Employee ID**: `231FA04013`
   - **Password**: `231FA04013`
4. Click **"Login as Faculty"**
5. ✅ You should see the Dashboard

### Step 2: Go to Create Notice Page
1. From the Dashboard, look for **"Create Notice"** button
2. OR go to the Notices page and click **"Create Notice"**
3. You should see the Create Notice form

### Step 3: Fill in the Notice Form

**Required Fields:**

1. **Notice Title**
   - Example: "Important Exam Schedule"
   
2. **Category** (Select from dropdown)
   - Academic
   - Event
   - Exam
   - Placement
   - Circular
   - General

3. **Priority** (Select from dropdown)
   - Low
   - Medium
   - High
   - Urgent

4. **Notice Content** (Text area)
   - Example: "The final exams will be held from December 1st to December 15th. All students must attend."

5. **Target Audience** (Check boxes)
   - **Roles**: Check all three
     - ☑ Students
     - ☑ Faculty
     - ☑ Admin
   - **Departments**: Check at least one
     - ☑ Computer Science Engineering
   - **Years** (if targeting students): Optional

### Step 4: Create the Notice
1. Review all the information
2. Click **"Create Notice"** button at the bottom
3. ✅ Notice will be created and saved to database
4. You will be redirected to the notice details page

### Step 5: View the Notice
1. Go back to **"Notices"** page (click Notices in navigation)
2. ✅ You should see your newly created notice in the list!

---

## 👥 View Notice as Different Users

### As Student:
1. **Logout** (click logout button)
2. Go to home page
3. Click **"Student Login"**
4. Enter:
   - Student ID: `231FA04017`
   - Password: `231FA04017`
5. Click **"Login as Student"**
6. Go to **"Notices"** page
7. ✅ You can see the notice created by Faculty!

### As Admin:
1. **Logout**
2. Go to home page
3. Click **"Admin Login"**
4. Enter:
   - Employee ID: `231FA04040`
   - Password: `231FA04040`
5. Click **"Login as Admin"**
6. Go to **"Notices"** page
7. ✅ You can see the notice created by Faculty!

---

## 🔍 Troubleshooting

### If you don't see the notice after creating it:

1. **Check if you're on the Notices page**
   - Click "Notices" in the navigation menu

2. **Refresh the page**
   - Press F5 or Ctrl+R

3. **Check the browser console**
   - Press F12
   - Go to Console tab
   - Look for any errors

4. **Verify the notice was created**
   - Run this test: `node test-complete-flow.js`
   - It will show if notices are in the database

### If the page closes after creating notice:

This is normal! After creating a notice, you are redirected to the notice detail page. To see all notices:
1. Click **"Notices"** in the navigation menu
2. You will see the list of all notices

---

## 🧪 Test the System

Run this command to verify everything is working:

```bash
node test-complete-flow.js
```

**Expected Output:**
```
✅ Faculty Login: SUCCESS
✅ Notice Creation: SUCCESS
✅ Student can see 1 notices
✅ Faculty can see 1 notices
✅ Admin can see 1 notices
```

---

## 📊 What Should Happen

### When Faculty Creates a Notice:

1. **Fill form** → Click "Create Notice"
2. **Notice is saved** to MongoDB database
3. **Redirected** to notice detail page
4. **Notice appears** in Notices list for:
   - ✅ Students (if checked in target audience)
   - ✅ Faculty (if checked in target audience)
   - ✅ Admin (if checked in target audience)

### Target Audience Settings:

**To make notice visible to EVERYONE:**
- Check all roles: Student, Faculty, Admin
- Check department: Computer Science Engineering
- This ensures all users can see the notice

---

## 🎯 Quick Test

1. **Login as Faculty**: 231FA04013 / 231FA04013
2. **Create Notice**:
   - Title: "Test Notice"
   - Content: "This is a test"
   - Category: General
   - Priority: Medium
   - Target: Check Student, Faculty, Admin
   - Department: Check Computer Science Engineering
3. **Click "Create Notice"**
4. **Go to "Notices" page**
5. ✅ You should see your notice!
6. **Logout and login as Student**: 231FA04017 / 231FA04017
7. **Go to "Notices" page**
8. ✅ You should see the same notice!

---

## 🔐 All Login Credentials

| Role | ID | Password |
|------|-----|----------|
| Student | 231FA04017 | 231FA04017 |
| Faculty | 231FA04013 | 231FA04013 |
| Faculty | 231FA04016 | 231FA04016 |
| Admin | 231FA04040 | 231FA04040 |

---

## ✅ System Status

- ✅ Backend: Running on port 5000
- ✅ Frontend: Running on port 3000
- ✅ Database: MongoDB Atlas connected
- ✅ Notice Creation: Working
- ✅ Notice Viewing: Working for all users
- ✅ OTP Emails: Working

**Everything is working! Just follow the steps above to create and view notices!** 🎉
