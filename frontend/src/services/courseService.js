import api from './api';

const COURSES_ENDPOINT = '/courses';
const ENROLLMENTS_ENDPOINT = '/enrollments';

export const courseService = {
  // Get all courses with pagination and filters
  getAll: async (params) => {
    const { page = 0, size = 10, sortBy = 'id', sortDirection = 'asc', search } = params;
    
    let url = COURSES_ENDPOINT;
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

  // Get course by ID
  getById: (id) => {
    return api.get(`${COURSES_ENDPOINT}/${id}`);
  },

  // Create new course
  create: async (courseData) => {
    const newCourse = { ...courseData, currentEnrollment: 0 };
    return api.post(COURSES_ENDPOINT, newCourse);
  },

  // Update course
  update: (id, courseData) => {
    return api.put(`${COURSES_ENDPOINT}/${id}`, courseData);
  },

  // Delete course
  delete: (id) => {
    return api.delete(`${COURSES_ENDPOINT}/${id}`);
  },

  // Get statistics
  getStatistics: async () => {
    const [coursesResponse, enrollmentsResponse] = await Promise.all([
      api.get(COURSES_ENDPOINT),
      api.get(ENROLLMENTS_ENDPOINT)
    ]);
    
    const courses = coursesResponse.data;
    const enrollments = enrollmentsResponse.data;
    
    const total = courses.length;
    const active = courses.filter(c => c.status === 'Active').length;
    const inactive = courses.filter(c => c.status === 'Inactive').length;
    const additional = enrollments.length; // Total enrollments
    
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

