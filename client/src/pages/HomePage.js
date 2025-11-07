import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Shield, Clock } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Smart College Notice Board & Communication Portal
                </h1>
                <p className="text-vignan-orange font-semibold">Vignan University</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/vignan-logo.png" 
              alt="Vignan University Logo" 
              className="w-auto object-contain"
              style={{ width: '500px', maxWidth: '90%' }}
            />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Campus Communication
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay connected with real-time notices, announcements, and updates. 
            Never miss important information from your university again.
          </p>

        </div>
      </section>

      {/* Login Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Role</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/student-login"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-vignan-blue"
            >
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-xl font-semibold mb-2">Student Login</h4>
              <p className="text-gray-600">Access your notices and assignments</p>
            </Link>
            <Link
              to="/faculty-login"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-vignan-blue"
            >
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h4 className="text-xl font-semibold mb-2">Faculty Login</h4>
              <p className="text-gray-600">Manage notices and communications</p>
            </Link>
            <Link
              to="/admin-login"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-vignan-blue"
            >
              <div className="text-4xl mb-4">⚙️</div>
              <h4 className="text-xl font-semibold mb-2">Admin Login</h4>
              <p className="text-gray-600">System administration and management</p>
            </Link>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SCNBCP?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-vignan-blue" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Real-time Notifications</h4>
              <p className="text-gray-600">Get instant updates on your phone and desktop</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-vignan-blue" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Role-based Access</h4>
              <p className="text-gray-600">Customized experience for students, faculty, and admin</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-vignan-blue" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure Platform</h4>
              <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-vignan-blue" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">24/7 Access</h4>
              <p className="text-gray-600">Access notices anytime, anywhere from any device</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">About SCNBCP</h3>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              The Smart College Notice Board & Communication Portal (SCNBCP) is a revolutionary 
              digital platform designed specifically for Vignan University to streamline campus 
              communication and information management.
            </p>
            <p>
              Our platform addresses the common challenges faced by educational institutions in 
              managing and distributing important notices, announcements, and updates to students, 
              faculty, and staff members.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h4>
                <ul className="space-y-2">
                  <li>✅ Instant notification delivery</li>
                  <li>✅ Centralized information hub</li>
                  <li>✅ Role-based content filtering</li>
                  <li>✅ Mobile-responsive design</li>
                  <li>✅ Secure user authentication</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">For Everyone</h4>
                <ul className="space-y-2">
                  <li>📚 Students: Stay updated with academic notices</li>
                  <li>👨‍🏫 Faculty: Share departmental announcements</li>
                  <li>⚙️ Admin: Manage university-wide communications</li>
                  <li>🏢 Staff: Access relevant administrative updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-vignan-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <div>
              <h4 className="font-bold">SCNBCP</h4>
              <p className="text-sm text-gray-400">Vignan University</p>
            </div>
          </div>
          <p className="text-gray-400">
            © 2024 Smart College Notice Board & Communication Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;