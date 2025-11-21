package com.appointment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Generic API Response wrapper
 * Standardizes all API responses across the application
 *
 * @param <T> Type of data being returned
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // Exclude null fields from JSON
public class ApiResponse<T> {

  /**
   * Indicates if the request was successful
   */
  private boolean success;

  /**
   * Human-readable message describing the result
   */
  private String message;

  /**
   * The actual data payload (can be any type)
   */
  private T data;

  /**
   * Timestamp of the response
   */
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime timestamp;

  /**
   * HTTP status code
   */
  private Integer statusCode;

  /**
   * Error details (only present when success = false)
   */
  private Object errors;

  /**
   * Constructor for successful response with data
   * @param success Success status
   * @param message Response message
   * @param data Response data
   */
  public ApiResponse(boolean success, String message, T data) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = LocalDateTime.now();
  }

  /**
   * Constructor for response without data
   * @param success Success status
   * @param message Response message
   */
  public ApiResponse(boolean success, String message) {
    this.success = success;
    this.message = message;
    this.timestamp = LocalDateTime.now();
  }

  /**
   * Static method to create success response
   * @param message Success message
   * @param data Response data
   * @param <T> Type of data
   * @return ApiResponse object
   */
  public static <T> ApiResponse<T> success(String message, T data) {
    return new ApiResponse<>(true, message, data);
  }

  /**
   * Static method to create success response without data
   * @param message Success message
   * @param <T> Type of data
   * @return ApiResponse object
   */
  public static <T> ApiResponse<T> success(String message) {
    return new ApiResponse<>(true, message);
  }

  /**
   * Static method to create error response
   * @param message Error message
   * @param <T> Type of data
   * @return ApiResponse object
   */
  public static <T> ApiResponse<T> error(String message) {
    ApiResponse<T> response = new ApiResponse<>(false, message);
    response.setTimestamp(LocalDateTime.now());
    return response;
  }

  /**
   * Static method to create error response with details
   * @param message Error message
   * @param errors Error details
   * @param <T> Type of data
   * @return ApiResponse object
   */
  public static <T> ApiResponse<T> error(String message, Object errors) {
    ApiResponse<T> response = new ApiResponse<>(false, message);
    response.setErrors(errors);
    response.setTimestamp(LocalDateTime.now());
    return response;
  }

  /**
   * Static method to create error response with status code
   * @param message Error message
   * @param statusCode HTTP status code
   * @param <T> Type of data
   * @return ApiResponse object
   */
  public static <T> ApiResponse<T> error(String message, Integer statusCode) {
    ApiResponse<T> response = new ApiResponse<>(false, message);
    response.setStatusCode(statusCode);
    response.setTimestamp(LocalDateTime.now());
    return response;
  }
}