import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import appointmentService from '../../services/appointmentService';
import AppointmentCard from '../appointments/AppointmentCard';
import LoadingSpinner from '../common/LoadingSpinner';
import '../styles/Dashboard.css';

const UserDashboard = () => {
  const { user, isServiceProvider } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');

      let allAppointmentsResponse;
      let upcomingResponse;

      if (isServiceProvider) {
        // Fetch appointments for service provider
        allAppointmentsResponse = await appointmentService.getAppointmentsByProvider(user.id);
        upcomingResponse = allAppointmentsResponse; // Filter client-side
      } else {
        // Fetch appointments for customer
        allAppointmentsResponse = await appointmentService.getAppointmentsByCustomer(user.id);
        upcomingResponse = await appointmentService.getUpcomingAppointments(user.id);
      }

      if (allAppointmentsResponse.success) {
        setAppointments(allAppointmentsResponse.data || []);
      }

      if (upcomingResponse.success) {
        setUpcomingAppointments(upcomingResponse.data || []);
      }
    } catch (err) {
      setError('Failed to fetch appointments. Please try again.');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.updateAppointmentStatus(id, 'CANCELLED');
        fetchAppointments(); // Refresh the list
      } catch (err) {
        alert('Failed to cancel appointment');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentService.updateAppointmentStatus(id, newStatus);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      alert('Failed to update appointment status');
      console.error(err);
    }
  };

  const filteredAppointments = activeTab === 'upcoming'
    ? upcomingAppointments
    : appointments.filter(apt => {
        if (activeTab === 'pending') return apt.status === 'PENDING';
        if (activeTab === 'confirmed') return apt.status === 'CONFIRMED';
        if (activeTab === 'completed') return apt.status === 'COMPLETED';
        if (activeTab === 'cancelled') return apt.status === 'CANCELLED';
        return true;
      });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name}!</h1>
          <p className="dashboard-subtitle">
            {isServiceProvider
              ? 'Manage your appointments and schedule'
              : 'View and manage your bookings'}
          </p>
        </div>
        {!isServiceProvider && (
          <Link to="/appointments/new" className="btn btn-primary">
            + Book New Appointment
          </Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p className="stat-number">{appointments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming</h3>
          <p className="stat-number">{upcomingAppointments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">
            {appointments.filter(a => a.status === 'PENDING').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">
            {appointments.filter(a => a.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={`tab ${activeTab === 'confirmed' ? 'active' : ''}`}
          onClick={() => setActiveTab('confirmed')}
        >
          Confirmed
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button
          className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-section">
        <h2>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Appointments
        </h2>

        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <p>No appointments found.</p>
            {!isServiceProvider && activeTab === 'upcoming' && (
              <Link to="/appointments/new" className="btn btn-primary">
                Book Your First Appointment
              </Link>
            )}
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isServiceProvider={isServiceProvider}
                onCancel={handleCancelAppointment}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;