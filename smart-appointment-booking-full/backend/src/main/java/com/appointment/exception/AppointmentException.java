package com.appointment.exception;

/**
 * Custom exception for appointment-related business logic errors
 * Examples: Double booking, invalid appointment time, cancelled appointment cannot be modified, etc.
 *
 * This exception is handled by GlobalExceptionHandler and returns HTTP 400
 */
public class AppointmentException extends RuntimeException {

  /**
   * Constructor with message
   * @param message Error message describing the appointment-related error
   */
  public AppointmentException(String message) {
    super(message);
  }

  /**
   * Constructor with message and cause
   * @param message Error message
   * @param cause The underlying cause of the exception
   */
  public AppointmentException(String message, Throwable cause) {
    super(message, cause);
  }

  /**
   * Create exception for double booking scenario
   * @param providerId ID of the service provider
   * @param appointmentTime The conflicting time
   * @return AppointmentException
   */
  public static AppointmentException doubleBooking(Long providerId, String appointmentTime) {
    return new AppointmentException(
      String.format("Service provider (ID: %d) already has an appointment at %s",
        providerId, appointmentTime)
    );
  }

  /**
   * Create exception for past appointment time
   * @return AppointmentException
   */
  public static AppointmentException pastAppointmentTime() {
    return new AppointmentException(
      "Appointment cannot be scheduled in the past. Please select a future date and time."
    );
  }

  /**
   * Create exception for invalid service provider
   * @param userId User ID
   * @return AppointmentException
   */
  public static AppointmentException notAServiceProvider(Long userId) {
    return new AppointmentException(
      String.format("User with ID %d is not registered as a service provider", userId)
    );
  }

  /**
   * Create exception for cancelled appointment modification
   * @param appointmentId Appointment ID
   * @return AppointmentException
   */
  public static AppointmentException cannotModifyCancelledAppointment(Long appointmentId) {
    return new AppointmentException(
      String.format("Cannot modify cancelled appointment (ID: %d)", appointmentId)
    );
  }

  /**
   * Create exception for appointment too close to current time
   * @param minimumHours Minimum hours required
   * @return AppointmentException
   */
  public static AppointmentException tooCloseToAppointmentTime(int minimumHours) {
    return new AppointmentException(
      String.format("Appointment must be scheduled at least %d hours in advance", minimumHours)
    );
  }
}