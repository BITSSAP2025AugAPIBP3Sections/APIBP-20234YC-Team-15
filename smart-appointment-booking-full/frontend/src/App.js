import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import AppointmentForm from './components/appointments/AppointmentForm';
import PrivateRoute from './components/auth/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/appointments/new"
                element={
                  <PrivateRoute>
                    <AppointmentForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/appointments/edit/:id"
                element={
                  <PrivateRoute>
                    <AppointmentForm />
                  </PrivateRoute>
                }
              />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Home Component
const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Smart Appointment Booking</h1>
        <p>Book appointments with service providers easily and efficiently</p>
        <div className="cta-buttons">
          <a href="/register" className="btn btn-primary">Get Started</a>
          <a href="/login" className="btn btn-secondary">Login</a>
        </div>
      </div>
      <div className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🏥 Medical Consultations</h3>
            <p>Book appointments with doctors and healthcare professionals</p>
          </div>
          <div className="feature-card">
            <h3>✂️ Salon & Barber</h3>
            <p>Schedule your haircut and styling appointments</p>
          </div>
          <div className="feature-card">
            <h3>💼 Business Consulting</h3>
            <p>Connect with business consultants and advisors</p>
          </div>
          <div className="feature-card">
            <h3>⚖️ Legal Services</h3>
            <p>Book consultations with legal professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  );
};

export default App;