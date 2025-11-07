import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const FacultyLoginPage = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.loginId, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">👨‍🏫</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Faculty Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage notices and student communications
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="loginId" className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <input
                id="loginId"
                name="loginId"
                type="text"
                required
                className="input-field mt-1"
                placeholder="Enter your Employee ID (e.g., 231FA04013)"
                value={formData.loginId}
                onChange={handleChange}
                style={{ textTransform: 'uppercase' }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-green-600 hover:text-green-700"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Login as Faculty'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sample Employee IDs: 231FA04013, 231FA04016
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Password: Same as Employee ID
            </p>
          </div>
        </form>

        <div className="mt-6">
          <Link
            to="/"
            className="w-full btn-secondary text-center block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyLoginPage;