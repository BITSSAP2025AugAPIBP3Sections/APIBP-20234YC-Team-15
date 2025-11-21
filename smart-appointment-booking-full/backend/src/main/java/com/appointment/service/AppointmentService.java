package com.appointment.service;

import com.appointment.dto.AppointmentRequest;
import com.appointment.dto.AppointmentResponse;
import com.appointment.model.Appointment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Service interface for Appointment operations
 */
public interface AppointmentService {

  List<AppointmentResponse> getAllAppointments();

  AppointmentResponse getAppointmentById(Long id);

  AppointmentResponse createAppointment(AppointmentRequest request);

  AppointmentResponse updateAppointment(Long id, AppointmentRequest request);

  void deleteAppointment(Long id);

  List<AppointmentResponse> getAppointmentsByCustomer(Long customerId);

  List<AppointmentResponse> getAppointmentsByProvider(Long providerId);

  List<AppointmentResponse> getUpcomingAppointmentsByCustomer(Long customerId);

  List<AppointmentResponse> getAppointmentsByStatus(Appointment.Status status);

  AppointmentResponse updateAppointmentStatus(Long id, Appointment.Status status);

  List<AppointmentResponse> searchAppointments(String keyword);

  List<AppointmentResponse> getAppointmentsByDateRange(LocalDateTime start, LocalDateTime end);

  Map<String, Object> getAppointmentStatistics();
}