<<<<<<< HEAD
# hack1
=======
# Smart College Notice Board & Communication Portal (SCNBCP)

A comprehensive digital communication platform designed for Vignan University to streamline campus communication and information management.

## 🚀 Features

- **Real-time Notifications**: Instant updates using Socket.io
- **Role-based Access**: Different dashboards for Admin, Faculty, and Students
- **Notice Management**: Create, schedule, and manage notices with attachments
- **Smart Filtering**: Filter notices by category, department, and priority
- **Mobile Responsive**: Works seamlessly on all devices
- **File Attachments**: Support for PDFs, documents, and images
- **Comments & Acknowledgments**: Interactive communication features
- **Dashboard Analytics**: View engagement statistics and metrics

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Multer** - File upload handling
- **Bcrypt** - Password hashing

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **Socket.io Client** - Real-time updates
- **React Toastify** - Notifications
- **Lucide React** - Icons

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd scnbcp-app
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/scnbcp
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

### 5. Start MongoDB
Make sure MongoDB is running on your system.

### 6. Run the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

#### Backend Only
```bash
npm run server
```

#### Frontend Only
```bash
npm run client
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 👥 User Roles & Features

### Admin
- Create and manage all notices
- View user analytics and engagement metrics
- Manage user accounts and permissions
- Access to all system features

### Faculty
- Create department-specific notices
- Schedule notices for future publishing
- Track student acknowledgments
- Upload attachments and documents

### Student
- View personalized notices based on department/year
- Acknowledge important notices
- Comment on notices for clarification
- Receive real-time notifications

## 📱 Key Pages

1. **Home Page** - Landing page with role-based login options
2. **Login/Register** - Authentication with role selection
3. **Dashboard** - Personalized overview with statistics
4. **Notices** - Browse and filter all notices
5. **Notice Details** - Full notice view with comments
6. **Create Notice** - Form for creating new notices (Admin/Faculty)
7. **Forgot Password** - OTP-based password recovery

## 🔐 Authentication Flow

1. User registers with role (Student/Faculty/Admin)
2. JWT token generated upon successful login
3. Protected routes require valid authentication
4. Role-based access control for different features

## 📊 Database Schema

### Users Collection
- Personal information (name, email, department)
- Role-based fields (rollNumber for students, employeeId for faculty)
- Authentication credentials

### Notices Collection
- Notice content and metadata
- Target audience configuration
- Attachments and scheduling information
- Engagement tracking (views, acknowledgments, comments)

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Vercel, Netlify, or serve from backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and queries, contact the development team or create an issue in the repository.

## 📄 License

This project is developed for Vignan University and is intended for educational and institutional use.

---

**Developed for Vignan University Hackathon 2024**
>>>>>>> 535ab7b (Initial commit)
