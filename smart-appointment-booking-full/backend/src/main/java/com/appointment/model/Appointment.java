package com.appointment.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Appointment Entity - Represents bookings in the system
 * Links customers with service providers
 */
@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull(message = "Customer is required")
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "customer_id", nullable = false)
  private User customer;

  @NotNull(message = "Service provider is required")
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "provider_id", nullable = false)
  private User serviceProvider;

  @NotNull(message = "Service type is required")
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ServiceType serviceType;

  @NotNull(message = "Appointment date and time is required")
  @Future(message = "Appointment must be in the future")
  @Column(name = "appointment_datetime", nullable = false)
  private LocalDateTime appointmentDateTime;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Status status = Status.PENDING;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  /**
   * Enum for Service Types
   */
  public enum ServiceType {
    DOCTOR("Medical Consultation"),
    DENTIST("Dental Check-up"),
    BARBER("Haircut & Styling"),
    SALON("Beauty Services"),
    CONSULTANT("Business Consultation"),
    THERAPIST("Therapy Session"),
    LAWYER("Legal Consultation"),
    MECHANIC("Vehicle Service"),
    OTHER("Other Services");

    private final String displayName;

    ServiceType(String displayName) {
      this.displayName = displayName;
    }

    public String getDisplayName() {
      return displayName;
    }
  }

  /**
   * Enum for Appointment Status
   */
  public enum Status {
    PENDING("Pending Confirmation"),
    CONFIRMED("Confirmed"),
    CANCELLED("Cancelled"),
    COMPLETED("Completed"),
    NO_SHOW("No Show");

    private final String displayName;

    Status(String displayName) {
      this.displayName = displayName;
    }

    public String getDisplayName() {
      return displayName;
    }
  }

  /**
   * Helper method to check if appointment is pending
   */
  public boolean isPending() {
    return this.status == Status.PENDING;
  }

  /**
   * Helper method to check if appointment is confirmed
   */
  public boolean isConfirmed() {
    return this.status == Status.CONFIRMED;
  }

  /**
   * Helper method to check if appointment can be cancelled
   */
  public boolean canBeCancelled() {
    return this.status == Status.PENDING || this.status == Status.CONFIRMED;
  }

  /**
   * Helper method to check if appointment is in the past
   */
  public boolean isInPast() {
    return this.appointmentDateTime.isBefore(LocalDateTime.now());
  }

  /**
   * Helper method to check if appointment is upcoming
   */
  public boolean isUpcoming() {
    return this.appointmentDateTime.isAfter(LocalDateTime.now()) &&
      (this.status == Status.PENDING || this.status == Status.CONFIRMED);
  }
}