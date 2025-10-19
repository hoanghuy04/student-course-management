import api from './api';

const STUDENTS_ENDPOINT = '/students';

export const studentService = {
  // Get all students with pagination and filters
  getAll: async (params) => {
    const { page = 0, size = 10, sortBy = 'id', sortDirection = 'asc', search } = params;
    
    let url = STUDENTS_ENDPOINT;
    const queryParams = new URLSearchParams();
    
    // Add search if provided
    if (search) {
      queryParams.append('q', search);
    }
    
    // Add sorting
    queryParams.append('_sort', sortBy);
    queryParams.append('_order', sortDirection);
    
    // Add pagination
    const _page = page + 1; // json-server uses 1-based pagination
    queryParams.append('_page', _page);
    queryParams.append('_limit', size);
    
    const response = await api.get(`${url}?${queryParams.toString()}`);
    
    // Transform response to match expected format
    const total = parseInt(response.headers['x-total-count'] || '0');
    return {
      data: {
        content: response.data,
        currentPage: page,
        totalItems: total,
        totalPages: Math.ceil(total / size)
      }
    };
  },

  // Get student by ID
  getById: (id) => {
    return api.get(`${STUDENTS_ENDPOINT}/${id}`);
  },

  // Create new student
  create: (studentData) => {
    return api.post(STUDENTS_ENDPOINT, studentData);
  },

  // Update student
  update: (id, studentData) => {
    return api.put(`${STUDENTS_ENDPOINT}/${id}`, studentData);
  },

  // Delete student
  delete: (id) => {
    return api.delete(`${STUDENTS_ENDPOINT}/${id}`);
  },

  // Get statistics
  getStatistics: async () => {
    const response = await api.get(STUDENTS_ENDPOINT);
    const students = response.data;
    
    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;
    const inactive = students.filter(s => s.status === 'Inactive').length;
    
    // Students this month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const additional = students.filter(s => {
      const enrollmentDate = new Date(s.enrollmentDate);
      return enrollmentDate >= firstDayOfMonth;
    }).length;
    
    return {
      data: {
        total,
        active,
        inactive,
        additional
      }
    };
  },
};

