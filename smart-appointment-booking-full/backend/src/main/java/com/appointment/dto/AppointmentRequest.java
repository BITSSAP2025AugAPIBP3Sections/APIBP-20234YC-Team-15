package com.appointment.dto;

import com.appointment.model.Appointment;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Appointment creation and update requests
 * Used when clients send data to create or modify appointments
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {

  @NotNull(message = "Customer ID is required")
  private Long customerId;

  @NotNull(message = "Service provider ID is required")
  private Long serviceProviderId;

  @NotNull(message = "Service type is required")
  private Appointment.ServiceType serviceType;

  @NotNull(message = "Appointment date and time is required")
  @Future(message = "Appointment must be scheduled for a future date and time")
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime appointmentDateTime;

  private String notes;

  /**
   * Validate that the appointment time is at least 1 hour from now
   * @return true if valid, false otherwise
   */
  public boolean isValidAppointmentTime() {
    if (appointmentDateTime == null) {
      return false;
    }
    return appointmentDateTime.isAfter(LocalDateTime.now().plusHours(1));
  }

  /**
   * Check if notes exceed maximum length
   * @param maxLength Maximum allowed length
   * @return true if within limit, false otherwise
   */
  public boolean isNotesValid(int maxLength) {
    return notes == null || notes.length() <= maxLength;
  }
}