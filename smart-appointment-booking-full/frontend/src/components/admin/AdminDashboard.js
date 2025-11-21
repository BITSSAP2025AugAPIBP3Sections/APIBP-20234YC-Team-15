import React, { useState, useEffect } from 'react';
import appointmentService from '../../services/appointmentService';
import userService from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [statsRes, appointmentsRes, usersRes] = await Promise.all([
        appointmentService.getStatistics(),
        appointmentService.getAllAppointments(),
        userService.getAllUsers(),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (appointmentsRes.success) setAppointments(appointmentsRes.data || []);
      if (usersRes.success) setUsers(usersRes.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentService.deleteAppointment(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete appointment');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage users and appointments</p>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeView === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveView('appointments')}
        >
          All Appointments
        </button>
        <button
          className={`tab ${activeView === 'users' ? 'active' : ''}`}
          onClick={() => setActiveView('users')}
        >
          All Users
        </button>
      </div>

      {/* Overview Tab */}
      {activeView === 'overview' && stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Appointments</h3>
            <p className="stat-number">{stats.total || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Confirmed</h3>
            <p className="stat-number">{stats.confirmed || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">{stats.completed || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Cancelled</h3>
            <p className="stat-number">{stats.cancelled || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{users.length}</p>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeView === 'appointments' && (
        <div className="table-container">
          <h2>All Appointments</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Provider</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td>{apt.id}</td>
                  <td>{apt.customerName}</td>
                  <td>{apt.serviceProviderName}</td>
                  <td>{apt.serviceType}</td>
                  <td>{new Date(apt.appointmentDateTime).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteAppointment(apt.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Users Tab */}
      {activeView === 'users' && (
        <div className="table-container">
          <h2>All Users</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.active ? 'status-active' : 'status-inactive'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;