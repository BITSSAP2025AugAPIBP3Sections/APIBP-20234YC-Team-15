import api from './api';

const appointmentService = {
  // Get all appointments
  getAllAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  // Get appointment by ID
  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  // Create new appointment
  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  // Update appointment
  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  // Delete appointment
  deleteAppointment: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },

  // Get appointments by customer ID
  getAppointmentsByCustomer: async (customerId) => {
    const response = await api.get(`/appointments/customer/${customerId}`);
    return response.data;
  },

  // Get appointments by provider ID
  getAppointmentsByProvider: async (providerId) => {
    const response = await api.get(`/appointments/provider/${providerId}`);
    return response.data;
  },

  // Get upcoming appointments
  getUpcomingAppointments: async (customerId) => {
    const response = await api.get(`/appointments/customer/${customerId}/upcoming`);
    return response.data;
  },

  // Get appointments by status
  getAppointmentsByStatus: async (status) => {
    const response = await api.get(`/appointments/status/${status}`);
    return response.data;
  },

  // Update appointment status
  updateAppointmentStatus: async (id, status) => {
    const response = await api.patch(`/appointments/${id}/status?status=${status}`);
    return response.data;
  },

  // Search appointments
  searchAppointments: async (keyword) => {
    const response = await api.get(`/appointments/search?keyword=${keyword}`);
    return response.data;
  },

  // Get appointment statistics
  getStatistics: async () => {
    const response = await api.get('/appointments/stats');
    return response.data;
  },
};

export default appointmentService;