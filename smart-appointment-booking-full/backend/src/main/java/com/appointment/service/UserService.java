package com.appointment.service;

import com.appointment.dto.UserRequest;
import com.appointment.dto.UserResponse;

import java.util.List;

/**
 * Service interface for User operations
 */
public interface UserService {

  List<UserResponse> getAllUsers();

  UserResponse getUserById(Long id);

  UserResponse createUser(UserRequest request);

  UserResponse updateUser(Long id, UserRequest request);

  void deleteUser(Long id);

  List<UserResponse> getAllServiceProviders();

  UserResponse getUserByEmail(String email);

  List<UserResponse> searchUsersByName(String name);
}