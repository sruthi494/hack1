import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Upload, X, Calendar, Users, AlertCircle } from 'lucide-react';
import { storage } from '../utils/storage';

const CreateNoticePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    targetAudience: {
      roles: [],  // Empty - admin must select who sees it
      departments: ['Computer Science Engineering'],
      years: [],
      sections: []  // Add sections field
    },
    scheduledDate: '',
    expiryDate: ''
  });
  const [attachments, setAttachments] = useState([]);
  const [departmentSections, setDepartmentSections] = useState({});
  const [showAdvancedMapping, setShowAdvancedMapping] = useState(false);

  const categories = [
    { value: 'academic', label: 'Academic' },
    { value: 'event', label: 'Events' },
    { value: 'exam', label: 'Exams' },
    { value: 'placement', label: 'Placements' },
    { value: 'circular', label: 'Circulars' },
    { value: 'general', label: 'General' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  const roles = [
    { value: 'student', label: 'Students' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'admin', label: 'Admin' }
  ];

  const departments = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology',
    'Chemical Engineering',
    'Biotechnology',
    'Management Studies',
    'Sciences and Humanities'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const sections = ['SEC 1', 'SEC 2', 'SEC 3', 'SEC 4', 'SEC 5'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTargetAudienceChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [type]: prev.targetAudience[type].includes(value)
          ? prev.targetAudience[type].filter(item => item !== value)
          : [...prev.targetAudience[type], value]
      }
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleDepartmentSectionChange = (department, section) => {
    setDepartmentSections(prev => {
      const deptSections = prev[department] || [];
      const newSections = deptSections.includes(section)
        ? deptSections.filter(s => s !== section)
        : [...deptSections, section];
      
      if (newSections.length === 0) {
        const { [department]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [department]: newSections };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one role is selected
    if (formData.targetAudience.roles.length === 0) {
      alert('ERROR: Please select at least one audience!\n\nYou must check at least one: Students, Faculty, or Admin');
      toast.error('Please select who should see this notice');
      return;
    }
    
    setLoading(true);

    try {
      // Create FormData
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('category', formData.category);
      submitData.append('priority', formData.priority);
      
      // Include department-section mapping if advanced mode is used
      const targetAudienceData = {
        ...formData.targetAudience,
        departmentSections: showAdvancedMapping ? departmentSections : {}
      };
      submitData.append('targetAudience', JSON.stringify(targetAudienceData));
      
      if (formData.scheduledDate) {
        submitData.append('scheduledDate', formData.scheduledDate);
      }
      if (formData.expiryDate) {
        submitData.append('expiryDate', formData.expiryDate);
      }

      attachments.forEach(file => {
        submitData.append('attachments', file);
      });

      // Get token from storage
      const token = storage.getToken();
      
      console.log('=== CREATING NOTICE ===');
      console.log('Token found:', token ? 'YES ✅' : 'NO ❌');
      
      if (!token) {
        alert('ERROR: No token found!\n\nPlease login again.');
        toast.error('Please login again');
        navigate('/faculty-login');
        return;
      }

      console.log('Submitting notice to server...');

      // Send request with token
      const response = await axios.post('/api/notices', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Notice created successfully!', response.data);
      
      // Show success message
      toast.success('Notice created successfully!');
      alert(`SUCCESS!\n\nNotice "${formData.title}" has been created!\n\nYou will now see it in the notices list.`);
      
      // Redirect to notices page
      navigate('/notices');
      
    } catch (error) {
      console.error('❌ Error creating notice:', error);
      
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        
        if (error.response.status === 401) {
          alert('ERROR: Session expired!\n\nPlease login again.');
          toast.error('Session expired. Please login again');
          storage.removeToken();
          navigate('/faculty-login');
        } else {
          alert(`ERROR: ${error.response.data.message || 'Failed to create notice'}`);
          toast.error(error.response.data.message || 'Failed to create notice');
        }
      } else {
        alert(`ERROR: ${error.message}\n\nPlease check your internet connection.`);
        toast.error('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Notice</h1>
            <p className="text-gray-600 mt-1">Share important information with your audience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Notice Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="input-field mt-1"
                    placeholder="Enter notice title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="input-field mt-1"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    required
                    className="input-field mt-1"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Notice Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    required
                    rows={6}
                    className="input-field mt-1"
                    placeholder="Enter the detailed content of your notice..."
                    value={formData.content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Users className="mr-2" size={20} />
                Target Audience
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who should see this notice? * (Select at least one)
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {roles.map(role => (
                      <label key={role.value} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-vignan-blue focus:ring-vignan-blue h-5 w-5"
                          checked={formData.targetAudience.roles.includes(role.value)}
                          onChange={() => handleTargetAudienceChange('roles', role.value)}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">{role.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ✓ Check "Students" - Only students will see this notice<br/>
                    ✓ Check "Faculty" - Only faculty will see this notice<br/>
                    ✓ Check both - Both students and faculty will see this notice
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departments
                  </label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {departments.map(dept => (
                      <label key={dept} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-vignan-blue focus:ring-vignan-blue"
                          checked={formData.targetAudience.departments.includes(dept)}
                          onChange={() => handleTargetAudienceChange('departments', dept)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.targetAudience.roles.includes('student') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years (for students)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {years.map(year => (
                        <label key={year} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-vignan-blue focus:ring-vignan-blue"
                            checked={formData.targetAudience.years.includes(year)}
                            onChange={() => handleTargetAudienceChange('years', year)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Sections (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAdvancedMapping(!showAdvancedMapping)}
                      className="text-xs text-vignan-blue hover:text-blue-700 font-medium"
                    >
                      {showAdvancedMapping ? '← Simple Mode' : 'Advanced: Different sections per department →'}
                    </button>
                  </div>

                  {!showAdvancedMapping ? (
                    // Simple mode - same sections for all departments
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {sections.map(section => (
                          <label key={section} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-vignan-blue focus:ring-vignan-blue"
                              checked={formData.targetAudience.sections.includes(section)}
                              onChange={() => handleTargetAudienceChange('sections', section)}
                            />
                            <span className="ml-2 text-sm text-gray-700">{section}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Leave unchecked to send to all sections
                      </p>
                    </div>
                  ) : (
                    // Advanced mode - different sections per department
                    <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 mb-3">
                        Select specific sections for each department:
                      </p>
                      {formData.targetAudience.departments.map(dept => (
                        <div key={dept} className="bg-white p-3 rounded border border-blue-200">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">{dept}</h5>
                          <div className="flex flex-wrap gap-2">
                            {sections.map(section => (
                              <label key={section} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-vignan-blue focus:ring-vignan-blue"
                                  checked={departmentSections[dept]?.includes(section) || false}
                                  onChange={() => handleDepartmentSectionChange(dept, section)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{section}</span>
                              </label>
                            ))}
                          </div>
                          {(!departmentSections[dept] || departmentSections[dept].length === 0) && (
                            <p className="text-xs text-gray-500 mt-1">All sections</p>
                          )}
                        </div>
                      ))}
                      <p className="text-xs text-blue-600 mt-2">
                        💡 Example: CSE → SEC 1, SEC 2 | ECE → SEC 3
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2" size={20} />
                Scheduling (Optional)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
                    Schedule for later
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduledDate"
                    name="scheduledDate"
                    className="input-field mt-1"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to publish immediately
                  </p>
                </div>

                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="datetime-local"
                    id="expiryDate"
                    name="expiryDate"
                    className="input-field mt-1"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Notice will be hidden after this date
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2" size={20} />
                Attachments (Optional)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    id="attachments"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="attachments"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="mr-2" size={16} />
                    Choose Files
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
                  </p>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/notices')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} />
                    <span>Create Notice</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNoticePage;
