import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import appointmentService from '../../services/appointmentService';
import userService from '../../services/userService';
import '../styles/Dashboard.css';

const AppointmentForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    serviceProviderId: '',
    serviceType: 'DOCTOR',
    appointmentDateTime: '',
    notes: '',
  });

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProviders();
    if (isEditMode) {
      fetchAppointment();
    }
  }, [id]);

  const fetchProviders = async () => {
    try {
      const response = await userService.getAllServiceProviders();
      if (response.success) {
        setProviders(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching providers:', err);
    }
  };

  const fetchAppointment = async () => {
    try {
      const response = await appointmentService.getAppointmentById(id);
      if (response.success) {
        const apt = response.data;
        setFormData({
          serviceProviderId: apt.serviceProviderId,
          serviceType: apt.serviceType,
          appointmentDateTime: apt.appointmentDateTime,
          notes: apt.notes || '',
        });
      }
    } catch (err) {
      setError('Failed to fetch appointment details');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const appointmentData = {
        customerId: user.id,
        ...formData,
        serviceProviderId: parseInt(formData.serviceProviderId),
      };

      let response;
      if (isEditMode) {
        response = await appointmentService.updateAppointment(id, appointmentData);
      } else {
        response = await appointmentService.createAppointment(appointmentData);
      }

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Failed to save appointment');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error saving appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = [
    { value: 'DOCTOR', label: 'Medical Consultation' },
    { value: 'DENTIST', label: 'Dental Check-up' },
    { value: 'BARBER', label: 'Haircut & Styling' },
    { value: 'SALON', label: 'Beauty Services' },
    { value: 'CONSULTANT', label: 'Business Consultation' },
    { value: 'THERAPIST', label: 'Therapy Session' },
    { value: 'LAWYER', label: 'Legal Consultation' },
    { value: 'MECHANIC', label: 'Vehicle Service' },
    { value: 'OTHER', label: 'Other Services' },
  ];

  // Get minimum datetime (tomorrow at 9 AM)
  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{isEditMode ? 'Edit Appointment' : 'Book New Appointment'}</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="serviceProviderId">Service Provider *</label>
            <select
              id="serviceProviderId"
              name="serviceProviderId"
              value={formData.serviceProviderId}
              onChange={handleChange}
              required
            >
              <option value="">Select a provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.email}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Service Type *</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              {serviceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDateTime">Date & Time *</label>
            <input
              type="datetime-local"
              id="appointmentDateTime"
              name="appointmentDateTime"
              value={formData.appointmentDateTime}
              onChange={handleChange}
              min={getMinDateTime()}
              required
            />
            <small className="form-help">
              Appointment must be at least 24 hours in advance
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Add any additional information or special requirements"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Appointment' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;