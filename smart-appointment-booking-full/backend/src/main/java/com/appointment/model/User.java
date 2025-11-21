package com.appointment.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * User Entity - Represents users in the system
 * Can be CUSTOMER, SERVICE_PROVIDER, or ADMIN
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Name is required")
  @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
  @Column(nullable = false)
  private String name;

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid")
  @Column(nullable = false, unique = true)
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, message = "Password must be at least 6 characters")
  @Column(nullable = false)
  private String password;

  @Column(length = 15)
  private String phone;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role = Role.CUSTOMER;

  @Column(nullable = false)
  private Boolean active = true;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  /**
   * Enum for User Roles
   */
  public enum Role {
    CUSTOMER,           // Can book appointments
    SERVICE_PROVIDER,   // Provides services
    ADMIN              // System administrator
  }

  /**
   * Helper method to check if user is a service provider
   */
  public boolean isServiceProvider() {
    return this.role == Role.SERVICE_PROVIDER;
  }

  /**
   * Helper method to check if user is an admin
   */
  public boolean isAdmin() {
    return this.role == Role.ADMIN;
  }

  /**
   * Helper method to check if user is a customer
   */
  public boolean isCustomer() {
    return this.role == Role.CUSTOMER;
  }
}