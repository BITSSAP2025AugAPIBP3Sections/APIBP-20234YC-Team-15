package com.appointment.exception;

/**
 * Exception thrown when a requested resource is not found in the database
 * Examples: User not found, Appointment not found, etc.
 *
 * This exception is handled by GlobalExceptionHandler and returns HTTP 404
 */
public class ResourceNotFoundException extends RuntimeException {

  /**
   * Constructor with message
   * @param message Error message describing what resource was not found
   */
  public ResourceNotFoundException(String message) {
    super(message);
  }

  /**
   * Constructor with message and cause
   * @param message Error message
   * @param cause The underlying cause of the exception
   */
  public ResourceNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  /**
   * Constructor with resource type and ID
   * Creates a standardized error message
   * @param resourceName Name of the resource (e.g., "User", "Appointment")
   * @param fieldName Name of the field used for search (e.g., "id", "email")
   * @param fieldValue Value that was not found
   */
  public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
    super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
  }
}