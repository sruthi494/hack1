import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Bell, Users, FileText, TrendingUp, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentNotices, setRecentNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/users/dashboard');
      setStats(response.data);
      setRecentNotices(response.data.recentNotices || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return '📚';
      case 'event': return '🎉';
      case 'exam': return '📝';
      case 'placement': return '💼';
      case 'circular': return '📋';
      default: return '📢';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-vignan-blue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gradient-to-r from-vignan-blue to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-3xl font-bold">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="text-blue-100 mt-2">
              Welcome to your {user?.role} dashboard. Stay updated with the latest notices and announcements.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {user?.role === 'admin' ? (
              <>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100">
                      <Users className="h-8 w-8 text-vignan-blue" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Notices</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalNotices || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100">
                      <Bell className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Notices</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeNotices || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Engagement</p>
                      <p className="text-2xl font-bold text-gray-900">85%</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100">
                      <FileText className="h-8 w-8 text-vignan-blue" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Notices</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalNotices || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100">
                      <Bell className="h-8 w-8 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Unread Notices</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.unreadNotices || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100">
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Recent</p>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="px-4 py-6 sm:px-0">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Notices</h3>
                <Link
                  to="/notices"
                  className="text-vignan-blue hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <Link
                    key={notice._id}
                    to={`/notices/${notice._id}`}
                    className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getCategoryIcon(notice.category)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {notice.title}
                          </h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                            {notice.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notice.content}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>By {notice.author?.name}</span>
                          <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                          <span className="capitalize">{notice.category}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <Bell className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No notices yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    New notices will appear here when they're posted.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/notices"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bell className="h-5 w-5 text-vignan-blue mr-3" />
                  <span className="text-sm font-medium text-gray-900">View All Notices</span>
                </Link>
                {(user?.role === 'admin' || user?.role === 'faculty') && (
                  <Link
                    to="/notices/create"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-vignan-blue mr-3" />
                    <span className="text-sm font-medium text-gray-900">Create Notice</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Department Info</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Department:</span> {user?.department}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Role:</span> <span className="capitalize">{user?.role}</span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;