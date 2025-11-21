package com.appointment;

import com.appointment.dto.UserRequest;
import com.appointment.dto.UserResponse;
import com.appointment.exception.AppointmentException;
import com.appointment.exception.ResourceNotFoundException;
import com.appointment.model.User;
import com.appointment.repository.UserRepository;
import com.appointment.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {
  @Test
  void testUpdateUser_InvalidId() {
    when(userRepository.findById(99L)).thenReturn(Optional.empty());
    UserRequest req = new UserRequest();
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> userService.updateUser(99L, req));
  }

  @Test
  void testUpdateUser_EmailExists() {
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(userRepository.existsByEmail("new@example.com")).thenReturn(true);
    UserRequest req = new UserRequest();
    req.setEmail("new@example.com");
    assertThrows(com.appointment.exception.AppointmentException.class, () -> userService.updateUser(1L, req));
  }

  @Test
  void testDeleteUser_InvalidId() {
    when(userRepository.existsById(99L)).thenReturn(false);
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> userService.deleteUser(99L));
  }

  @Test
  void testGetAllServiceProviders_Empty() {
    when(userRepository.findAllActiveServiceProviders()).thenReturn(Collections.emptyList());
    List<UserResponse> providers = userService.getAllServiceProviders();
    assertTrue(providers.isEmpty());
  }

  @Test
  void testGetUserByEmail_NotFound() {
    when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());
    assertThrows(com.appointment.exception.ResourceNotFoundException.class, () -> userService.getUserByEmail("notfound@example.com"));
  }

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserServiceImpl userService;

  private User user;
  private UserRequest userRequest;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    user = new User();
    user.setId(1L);
    user.setName("Alice");
    user.setEmail("alice@example.com");
    user.setPhone("1234567890");
    user.setPassword("password");

    userRequest = new UserRequest();
    userRequest.setName("Alice");
    userRequest.setEmail("alice@example.com");
    userRequest.setPassword("password");
    userRequest.setPhone("1234567890");
  }

  @Test
  void testGetAllUsers() {
    when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
    List<UserResponse> responses = userService.getAllUsers();
    assertEquals(1, responses.size());
    assertEquals("Alice", responses.get(0).getName());
  }

  @Test
  void testGetUserById_Found() {
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    UserResponse response = userService.getUserById(1L);
    assertEquals("Alice", response.getName());
  }

  @Test
  void testGetUserById_NotFound() {
    when(userRepository.findById(2L)).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(2L));
  }

  @Test
  void testCreateUser_EmailExists() {
    when(userRepository.existsByEmail("alice@example.com")).thenReturn(true);
    assertThrows(AppointmentException.class, () -> userService.createUser(userRequest));
  }

  @Test
  void testCreateUser_Success() {
    when(userRepository.existsByEmail("alice@example.com")).thenReturn(false);
    when(userRepository.save(any(User.class))).thenReturn(user);
    UserResponse response = userService.createUser(userRequest);
    assertEquals("Alice", response.getName());
  }
}
