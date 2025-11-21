package com.appointment.repository;

import com.appointment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity
 * Provides database operations for users
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Find user by email (used for login)
   * @param email User's email address
   * @return Optional containing user if found
   */
  Optional<User> findByEmail(String email);

  /**
   * Check if email already exists in database
   * @param email Email to check
   * @return true if email exists, false otherwise
   */
  boolean existsByEmail(String email);

  /**
   * Find all users by role
   * @param role User role (CUSTOMER, SERVICE_PROVIDER, ADMIN)
   * @return List of users with specified role
   */
  List<User> findByRole(User.Role role);

  /**
   * Find all active service providers
   * @return List of active service providers
   */
  @Query("SELECT u FROM User u WHERE u.role = 'SERVICE_PROVIDER' AND u.active = true")
  List<User> findAllActiveServiceProviders();

  /**
   * Find all active users
   * @return List of active users
   */
  List<User> findByActiveTrue();

  /**
   * Find all inactive users
   * @return List of inactive users
   */
  List<User> findByActiveFalse();

  /**
   * Find users by name (partial match, case insensitive)
   * @param name Name or partial name to search
   * @return List of matching users
   */
  List<User> findByNameContainingIgnoreCase(String name);

  /**
   * Find users by role and active status
   * @param role User role
   * @param active Active status
   * @return List of users matching criteria
   */
  List<User> findByRoleAndActive(User.Role role, Boolean active);

  /**
   * Count users by role
   * @param role User role
   * @return Count of users with specified role
   */
  Long countByRole(User.Role role);

  /**
   * Search users by name or email
   * @param keyword Search keyword
   * @return List of matching users
   */
  @Query("SELECT u FROM User u WHERE " +
    "LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
  List<User> searchUsers(@Param("keyword") String keyword);

  /**
   * Find users by phone number
   * @param phone Phone number
   * @return Optional containing user if found
   */
  Optional<User> findByPhone(String phone);
}