import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 6, background: 'transparent', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        &copy; 2025 Smart Appointment Booking System. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mt: 1 }}>
        <MuiLink href="/about" color="primary" underline="hover">About</MuiLink>
        <MuiLink href="/privacy" color="primary" underline="hover">Privacy Policy</MuiLink>
        <MuiLink href="/terms" color="primary" underline="hover">Terms of Service</MuiLink>
        <MuiLink href="/contact" color="primary" underline="hover">Contact</MuiLink>
      </Box>
    </Box>
  );
};

export default Footer;