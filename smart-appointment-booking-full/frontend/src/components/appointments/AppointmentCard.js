import React from 'react';
import { formatDateTime } from '../../utils/dateFormatter';

const AppointmentCard = ({ appointment, isServiceProvider, onCancel, onStatusChange }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'CONFIRMED': return 'status-confirmed';
      case 'COMPLETED': return 'status-completed';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  };

  const getServiceTypeIcon = (type) => {
    switch (type) {
      case 'DOCTOR': return '🏥';
      case 'DENTIST': return '🦷';
      case 'BARBER': return '✂️';
      case 'SALON': return '💇';
      case 'CONSULTANT': return '💼';
      case 'THERAPIST': return '🧘';
      case 'LAWYER': return '⚖️';
      case 'MECHANIC': return '🔧';
      default: return '📋';
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-card-header">
        <div className="service-type-icon">
          {getServiceTypeIcon(appointment.serviceType)}
        </div>
        <span className={`status-badge ${getStatusClass(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="appointment-card-body">
        <h3 className="appointment-title">{appointment.serviceTypeDisplayName}</h3>

        <div className="appointment-info">
          <div className="info-row">
            <span className="info-label">
              {isServiceProvider ? 'Customer:' : 'Provider:'}
            </span>
            <span className="info-value">
              {isServiceProvider ? appointment.customerName : appointment.serviceProviderName}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Date & Time:</span>
            <span className="info-value">
              {formatDateTime(appointment.appointmentDateTime)}
            </span>
          </div>

          {appointment.notes && (
            <div className="info-row">
              <span className="info-label">Notes:</span>
              <span className="info-value">{appointment.notes}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="appointment-card-footer">
        {isServiceProvider ? (
          // Service Provider Actions
          <>
            {appointment.status === 'PENDING' && (
              <>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onStatusChange(appointment.id, 'CONFIRMED')}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onStatusChange(appointment.id, 'CANCELLED')}
                >
                  Decline
                </button>
              </>
            )}
            {appointment.status === 'CONFIRMED' && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onStatusChange(appointment.id, 'COMPLETED')}
              >
                Mark Complete
              </button>
            )}
          </>
        ) : (
          // Customer Actions
          <>
            {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onCancel(appointment.id)}
              >
                Cancel Appointment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;