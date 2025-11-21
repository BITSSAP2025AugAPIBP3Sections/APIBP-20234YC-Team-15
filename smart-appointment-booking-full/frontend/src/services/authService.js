import api from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/users', userData);
    if (response.data.success) {
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Login user (mock - implement based on your backend)
  login: async (email, password) => {
    // For now, we'll fetch user by email and check password
    // In production, implement proper authentication endpoint
    try {
      const response = await api.get(`/users/email/${email}`);
      if (response.data.success) {
        const user = response.data.data;
        // Store user data (in production, store JWT token)
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, data: user };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('user') !== null;
  },

  // Check if user is service provider
  isServiceProvider: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'SERVICE_PROVIDER';
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'ADMIN';
  },
};

export default authService;