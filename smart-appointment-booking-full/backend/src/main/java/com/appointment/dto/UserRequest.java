package com.appointment.dto;

import com.appointment.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for User creation and update requests
 * Used when clients send data to create or modify users
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

  @NotBlank(message = "Name is required")
  @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
  private String name;

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid (e.g., user@example.com)")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
  private String password;

  @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be 10-15 digits")
  private String phone;

  private User.Role role;

  /**
   * Set default role to CUSTOMER if not specified
   * @return User role
   */
  public User.Role getRoleOrDefault() {
    return role != null ? role : User.Role.CUSTOMER;
  }

  /**
   * Validate password strength (optional custom validation)
   * @return true if password is strong enough
   */
  public boolean isPasswordStrong() {
    if (password == null || password.length() < 6) {
      return false;
    }
    // Add more password strength checks if needed
    return true;
  }

  /**
   * Sanitize email by converting to lowercase and trimming
   * @return Sanitized email
   */
  public String getSanitizedEmail() {
    return email != null ? email.toLowerCase().trim() : null;
  }
}