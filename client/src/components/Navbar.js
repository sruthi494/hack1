import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bell, User, LogOut, Plus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-vignan-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SCNBCP</h1>
                <p className="text-xs text-gray-500">College Portal</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/notices"
              className="text-gray-700 hover:text-vignan-blue px-3 py-2 rounded-md text-sm font-medium"
            >
              Notices
            </Link>

            {(user?.role === 'admin' || user?.role === 'faculty') && (
              <Link
                to="/notices/create"
                className="bg-vignan-blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Create Notice</span>
              </Link>
            )}

            <button className="text-gray-700 hover:text-vignan-blue p-2 rounded-md">
              <Bell size={20} />
            </button>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-700" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 p-2 rounded-md"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;