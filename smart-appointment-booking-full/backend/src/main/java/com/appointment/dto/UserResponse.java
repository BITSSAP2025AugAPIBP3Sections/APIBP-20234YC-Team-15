package com.appointment.dto;

import com.appointment.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for User responses
 * Used when sending user data to clients
 * Note: Password is never included in response for security
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

  private Long id;

  private String name;

  private String email;

  private String phone;

  private User.Role role;

  private String roleDisplayName;

  private Boolean active;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime createdAt;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime updatedAt;

  /**
   * Set role and automatically set display name
   * @param role User role
   */
  public void setRole(User.Role role) {
    this.role = role;
    this.roleDisplayName = role != null ? role.name().replace("_", " ") : null;
  }

  /**
   * Check if user is a service provider
   * @return true if user role is SERVICE_PROVIDER
   */
  @JsonIgnore
  public boolean isServiceProvider() {
    return role == User.Role.SERVICE_PROVIDER;
  }

  /**
   * Check if user is a customer
   * @return true if user role is CUSTOMER
   */
  @JsonIgnore
  public boolean isCustomer() {
    return role == User.Role.CUSTOMER;
  }

  /**
   * Check if user is an admin
   * @return true if user role is ADMIN
   */
  @JsonIgnore
  public boolean isAdmin() {
    return role == User.Role.ADMIN;
  }

  /**
   * Get masked email for privacy (optional)
   * e.g., j***@example.com
   * @return Masked email
   */
  @JsonIgnore
  public String getMaskedEmail() {
    if (email == null || !email.contains("@")) {
      return email;
    }
    String[] parts = email.split("@");
    String localPart = parts[0];
    String maskedLocal = localPart.charAt(0) + "***";
    return maskedLocal + "@" + parts[1];
  }
}