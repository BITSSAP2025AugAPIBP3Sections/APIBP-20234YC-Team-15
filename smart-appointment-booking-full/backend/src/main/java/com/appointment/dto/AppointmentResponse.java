package com.appointment.dto;

import com.appointment.model.Appointment;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Appointment responses
 * Used when sending appointment data to clients
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {

  private Long id;

  // Customer information
  private Long customerId;
  private String customerName;
  private String customerEmail;
  private String customerPhone;

  // Service Provider information
  private Long serviceProviderId;
  private String serviceProviderName;
  private String serviceProviderEmail;
  private String serviceProviderPhone;

  // Appointment details
  private Appointment.ServiceType serviceType;
  private String serviceTypeDisplayName;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime appointmentDateTime;

  private String notes;

  // Status information
  private Appointment.Status status;
  private String statusDisplayName;

  // Metadata
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime createdAt;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime updatedAt;

  /**
   * Helper method to set display names from enums
   * @param serviceType Service type enum
   */
  public void setServiceType(Appointment.ServiceType serviceType) {
    this.serviceType = serviceType;
    this.serviceTypeDisplayName = serviceType != null ? serviceType.getDisplayName() : null;
  }

  /**
   * Helper method to set status display name
   * @param status Status enum
   */
  public void setStatus(Appointment.Status status) {
    this.status = status;
    this.statusDisplayName = status != null ? status.getDisplayName() : null;
  }

  /**
   * Check if appointment is upcoming
   * @return true if appointment is in future
   */
  public boolean isUpcoming() {
    return appointmentDateTime != null &&
      appointmentDateTime.isAfter(LocalDateTime.now()) &&
      (status == Appointment.Status.PENDING || status == Appointment.Status.CONFIRMED);
  }

  /**
   * Check if appointment is in the past
   * @return true if appointment date has passed
   */
  public boolean isPast() {
    return appointmentDateTime != null &&
      appointmentDateTime.isBefore(LocalDateTime.now());
  }
}