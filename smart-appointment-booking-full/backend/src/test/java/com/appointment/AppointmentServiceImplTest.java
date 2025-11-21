package com.appointment;

import com.appointment.dto.AppointmentRequest;
import com.appointment.dto.AppointmentResponse;
import com.appointment.exception.ResourceNotFoundException;
import com.appointment.model.Appointment;
import com.appointment.model.User;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.UserRepository;
import com.appointment.service.impl.AppointmentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppointmentServiceImplTest {
  @Test
  void testCreateAppointment_InvalidProvider() {
    User notProvider = new User();
    notProvider.setId(2L);
    notProvider.setRole(com.appointment.model.User.Role.CUSTOMER);
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(userRepository.findById(2L)).thenReturn(Optional.of(notProvider));
    appointmentRequest.setServiceProviderId(2L);
    assertThrows(com.appointment.exception.AppointmentException.class, () -> appointmentService.createAppointment(appointmentRequest));
  }

  @Test
  void testCreateAppointment_PastDate() {
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    appointmentRequest.setAppointmentDateTime(LocalDateTime.now().minusDays(1));
    assertThrows(com.appointment.exception.AppointmentException.class, () -> appointmentService.createAppointment(appointmentRequest));
  }

  @Test
  void testUpdateAppointment_InvalidId() {
    when(appointmentRepository.findById(99L)).thenReturn(Optional.empty());
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> appointmentService.updateAppointment(99L, appointmentRequest));
  }

  @Test
  void testDeleteAppointment_InvalidId() {
    when(appointmentRepository.existsById(99L)).thenReturn(false);
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> appointmentService.deleteAppointment(99L));
  }

  @Test
  void testGetAppointmentsByCustomer_InvalidId() {
    when(userRepository.existsById(99L)).thenReturn(false);
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> appointmentService.getAppointmentsByCustomer(99L));
  }

  @Test
  void testGetAppointmentsByProvider_InvalidId() {
    when(userRepository.existsById(99L)).thenReturn(false);
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> appointmentService.getAppointmentsByProvider(99L));
  }

  @Mock
  private AppointmentRepository appointmentRepository;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private AppointmentServiceImpl appointmentService;

  private Appointment appointment;
  private AppointmentRequest appointmentRequest;
  private User user;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  user = new User();
  user.setId(1L);
  user.setName("John Doe");
  user.setEmail("john@example.com");
  // Ensure user is a service provider for test
  user.setRole(com.appointment.model.User.Role.SERVICE_PROVIDER);

    appointment = new Appointment();
    appointment.setId(1L);
    appointment.setCustomer(user);
    appointment.setServiceProvider(user);
    appointment.setServiceType(Appointment.ServiceType.DOCTOR);
    appointment.setAppointmentDateTime(LocalDateTime.now().plusDays(1));
    appointment.setStatus(Appointment.Status.PENDING);

    appointmentRequest = new AppointmentRequest();
    appointmentRequest.setCustomerId(1L);
    appointmentRequest.setServiceProviderId(1L);
    appointmentRequest.setServiceType(Appointment.ServiceType.DOCTOR);
    appointmentRequest.setAppointmentDateTime(LocalDateTime.now().plusDays(1));
  }

  @Test
  void testGetAllAppointments() {
    when(appointmentRepository.findAll()).thenReturn(Collections.singletonList(appointment));
    List<AppointmentResponse> responses = appointmentService.getAllAppointments();
    assertEquals(1, responses.size());
    assertEquals("John Doe", responses.get(0).getCustomerName());
  }

  @Test
  void testGetAppointmentById_Found() {
    when(appointmentRepository.findById(1L)).thenReturn(Optional.of(appointment));
    AppointmentResponse response = appointmentService.getAppointmentById(1L);
    assertEquals("John Doe", response.getCustomerName());
  }

  @Test
  void testGetAppointmentById_NotFound() {
    when(appointmentRepository.findById(2L)).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class, () -> appointmentService.getAppointmentById(2L));
  }

  @Test
  void testCreateAppointment_Success() {
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(appointmentRepository.save(any(Appointment.class))).thenReturn(appointment);
    AppointmentResponse response = appointmentService.createAppointment(appointmentRequest);
    assertEquals("John Doe", response.getCustomerName());
  }
}
