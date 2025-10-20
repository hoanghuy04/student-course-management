import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { courseService } from '../services/courseService';
import dayjs from 'dayjs';

// Enhanced alert notification function
const showMessage = (type, content) => {
  // Remove any existing notifications first
  const existingNotifications = document.querySelectorAll('.alert-notification');
  existingNotifications.forEach(notification => notification.remove());

  const notificationDiv = document.createElement('div');
  notificationDiv.className = 'alert-notification';
  
  // Create the notification content
  notificationDiv.innerHTML = `
    <div class="alert-content">
      <div class="alert-icon">
        ${type === 'success' ? '✅' : '❌'}
      </div>
      <div class="alert-text">
        <div class="alert-title">${type === 'success' ? 'Success!' : 'Error!'}</div>
        <div class="alert-message">${content}</div>
      </div>
      <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .alert-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 350px;
      max-width: 500px;
      animation: slideInRight 0.3s ease-out;
    }
    
    .alert-content {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(10px);
      ${type === 'success' 
        ? 'background: linear-gradient(135deg, #10b981, #059669);' 
        : 'background: linear-gradient(135deg, #ef4444, #dc2626);'
      }
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .alert-icon {
      font-size: 24px;
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .alert-text {
      flex: 1;
    }
    
    .alert-title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 4px;
    }
    
    .alert-message {
      font-size: 14px;
      opacity: 0.95;
      line-height: 1.4;
    }
    
    .alert-close {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      margin-left: 12px;
      opacity: 0.8;
      transition: opacity 0.2s ease;
      flex-shrink: 0;
    }
    
    .alert-close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .alert-notification.removing {
      animation: slideOutRight 0.3s ease-in;
    }
  `;
  
  // Add styles to document if not already added
  if (!document.querySelector('#alert-notification-styles')) {
    style.id = 'alert-notification-styles';
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notificationDiv);
  
  // Auto-remove after 5 seconds with animation
  setTimeout(() => {
    if (notificationDiv.parentNode) {
      notificationDiv.classList.add('removing');
      setTimeout(() => {
        if (notificationDiv.parentNode) {
          notificationDiv.remove();
        }
      }, 300);
    }
  }, 5000);
  
  // Add click outside to close functionality
  const closeNotification = () => {
    if (notificationDiv.parentNode) {
      notificationDiv.classList.add('removing');
      setTimeout(() => {
        if (notificationDiv.parentNode) {
          notificationDiv.remove();
        }
      }, 300);
    }
  };
  
  // Store close function for manual close button
  notificationDiv.closeNotification = closeNotification;
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    additional: 0
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    courseId: '',
    enrollmentDate: '',
    status: true
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchStatistics();
    fetchCourses();
  }, [pagination.current, pagination.pageSize, searchText, sortField, sortOrder]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current - 1,
        size: pagination.pageSize,
        sortBy: sortField,
        sortDirection: sortOrder,
        search: searchText || undefined,
      };
      
      const response = await studentService.getAll(params);
      setStudents(response.data.content);
      setPagination({
        ...pagination,
        total: response.data.totalItems,
      });
    } catch (error) {
      showMessage('error', 'Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await studentService.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll({ page: 0, size: 100 });
      setCourses(response.data.content);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
    
    if (sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  // Form validation functions
  const validateForm = () => {
    const errors = {};
    
    // First Name validation
    if (!formData.firstName) {
      errors.firstName = 'FirstName cannot be empty';
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = 'FirstName must follow the format [A-Za-z]';
    }
    
    // Last Name validation
    if (!formData.lastName) {
      errors.lastName = 'LastName cannot be empty';
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = 'Lastname must follow the format [A-Za-z]';
    }
    
    // Age validation
    if (!formData.age) {
      errors.age = 'Age cannot be empty';
    } else if (!Number.isInteger(Number(formData.age)) || Number(formData.age) < 1) {
      errors.age = 'Age must be a positive integer';
    }
    
    // Gender validation
    if (!formData.gender) {
      errors.gender = 'Gender must be selected';
    }
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email cannot be empty';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email must be in the correct format';
    }
    
    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Phone cannot be empty';
    } else if (!/^[0-9]{10,12}$/.test(formData.phone)) {
      errors.phone = 'Phone must be 10-12 digits and in the range [0-9]';
    }
    
    // Course validation
    if (!formData.courseId) {
      errors.courseId = 'Course must be selected';
    }
    
    // Enrollment Date validation
    if (!formData.enrollmentDate) {
      errors.enrollmentDate = 'Enrollment Date must be selected';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const showModal = (mode, student = null) => {
    setModalMode(mode);
    setSelectedStudent(student);
    setIsModalVisible(true);
    
    if (mode === 'edit' && student) {
      setFormData({
        ...student,
        enrollmentDate: student.enrollmentDate,
        status: student.status === 'Active',
      });
    } else if (mode === 'view' && student) {
      setFormData({
        ...student,
        enrollmentDate: student.enrollmentDate,
        status: student.status === 'Active',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        courseId: '',
        enrollmentDate: '',
        status: true
      });
    }
    setFormErrors({});
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      courseId: '',
      enrollmentDate: '',
      status: true
    });
    setFormErrors({});
    setSelectedStudent(null);
  };

  const handleModalOk = async () => {
    if (modalMode === 'view') {
      handleModalCancel();
      return;
    }

    if (!validateForm()) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    try {
      const studentData = {
        ...formData,
        enrollmentDate: formData.enrollmentDate,
        status: formData.status ? 'Active' : 'Inactive',
      };

      if (modalMode === 'add') {
        await studentService.create(studentData);
        showMessage('success', 'Add student successful');
      } else if (modalMode === 'edit') {
        await studentService.update(selectedStudent.id, studentData);
        showMessage('success', 'Add student successful');
      }

      handleModalCancel();
      fetchStudents();
      fetchStatistics();
    } catch (error) {
      showMessage('error', `Failed to ${modalMode} student`);
        console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
    try {
      await studentService.delete(id);
        showMessage('success', 'Student deleted successfully');
      fetchStudents();
      fetchStatistics();
    } catch (error) {
        showMessage('error', 'Failed to delete student');
      console.error('Error deleting student:', error);
      }
    }
  };

  // Helper function to get course name by ID
  const getCourseName = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.courseName : 'N/A';
  };

  // Helper function to format date
  const formatDate = (date) => {
    return dayjs(date).format('MMM DD, YYYY');
  };

  // Helper function to format phone number (remove + sign)
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    // Remove + sign from phone number
    return phone.startsWith('+') ? phone.substring(1) : phone;
  };

  // Form input handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="py-6 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
            👨‍🎓
          </div>
          <h1 id="students-page-title" className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent m-0">
            Students Management
          </h1>
        </div>
        <p className="text-gray-600 ml-15">Manage and track student information with ease</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg">
              👥
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{statistics.total}</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg">
              ✅
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">{statistics.active}</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Active Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 hover:border-red-200 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg">
              ❌
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">{statistics.inactive}</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Inactive Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 cursor-pointer">
              <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg">
              📈
                </div>
                <div className="flex-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">{statistics.additional}</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Students This Month</div>
            </div>
          </div>
                </div>
              </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <input
              id="student-search-input"
              type="text"
            placeholder="Search by name, email, or student ID..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">
              🔍
            </div>
          </div>
          <button
            id="add-student-btn"
              onClick={() => showModal('add')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
            <span className="text-xl">➕</span>
              Add New Student
          </button>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table id="students-table" className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">ID</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">First Name</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Last Name</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Age</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Gender</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Email</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Phone</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Course</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Enrollment Date</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Status</th>
                <th className="border-b-2 border-gray-200 px-6 py-4 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="11" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.id} className="hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{student.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{student.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{student.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{student.gender}</td>
                    <td className="px-6 py-4 text-sm text-blue-600">{student.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatPhoneNumber(student.phone)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getCourseName(student.courseId)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(student.enrollmentDate)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'Active' 
                          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm' 
                          : 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-sm'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          id={`view-student-btn-${student.id}`}
                          onClick={() => showModal('view', student)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1"
                        >
                          👁️ View
                        </button>
                        <button
                          id={`edit-student-btn-${student.id}`}
                          onClick={() => showModal('edit', student)}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          id={`delete-student-btn-${student.id}`}
                          onClick={() => handleDelete(student.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" id="student-modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b-2 border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg">
                  {modalMode === 'add' ? '➕' : modalMode === 'edit' ? '✏️' : '👁️'}
                </div>
                <h2 id="modal-title" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {modalMode === 'add' 
            ? 'Add New Student' 
            : modalMode === 'edit' 
            ? 'Edit Student' 
            : 'Student Details'
        }
                </h2>
              </div>
              <button
                id="modal-close-btn"
                onClick={handleModalCancel}
                className="w-10 h-10 rounded-xl hover:bg-red-100 text-gray-500 hover:text-red-600 text-3xl flex items-center justify-center transition-all duration-200"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="md:col-span-1">
                  <label htmlFor="modal-first-name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="modal-first-name"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="md:col-span-1">
                  <label htmlFor="modal-last-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="modal-last-name"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Enter last name"
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                  )}
                </div>

                {/* Age */}
                <div className="md:col-span-1">
                  <label htmlFor="modal-age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    id="modal-age"
                    type="number"
                    min="1"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="Enter age" 
                  />
                  {formErrors.age && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        id="modal-gender-male"
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        id="modal-gender-female"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="mr-2"
                      />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input
                        id="modal-gender-other"
                        type="radio"
                name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={modalMode === 'view'}
                        className="mr-2"
                      />
                      Other
                    </label>
                  </div>
                  {formErrors.gender && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Enter email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    id="modal-phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Enter phone number"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Course */}
                <div className="md:col-span-2">
                  <label htmlFor="modal-course" className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>
                  <select
                    id="modal-course"
                    value={formData.courseId}
                    onChange={(e) => handleInputChange('courseId', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">Select a course</option>
              {courses.map(course => (
                      <option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                      </option>
                    ))}
                  </select>
                  {formErrors.courseId && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.courseId}</p>
                  )}
                </div>

                {/* Enrollment Date */}
                <div className="md:col-span-2">
                  <label htmlFor="modal-enrollment-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Enrollment Date
                  </label>
                  <input
                    id="modal-enrollment-date"
                    type="date"
                    value={formData.enrollmentDate}
                    onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  />
                  {formErrors.enrollmentDate && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.enrollmentDate}</p>
                  )}
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      id="modal-status"
                      type="checkbox"
                      checked={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.checked)}
                      disabled={modalMode === 'view'}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                id="modal-cancel-btn"
                onClick={handleModalCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                id="modal-ok-btn"
                onClick={handleModalOk}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                {modalMode === 'view' ? 'Close' : modalMode === 'add' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;

