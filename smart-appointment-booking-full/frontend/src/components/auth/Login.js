import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Alert, Card, CardContent, CircularProgress } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect based on user role
        if (result.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom align="center">
            Login
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
            Welcome back! Please login to your account.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              autoFocus
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, mb: 1 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </Box>
          <Box sx={{ mt: 3, background: '#f4f6f8', p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="secondary" gutterBottom>
              <strong>Demo Accounts:</strong>
            </Typography>
            <Typography variant="body2">Customer: john@example.com</Typography>
            <Typography variant="body2">Provider: dr.sarah@example.com</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;