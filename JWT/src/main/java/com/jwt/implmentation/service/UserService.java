package com.jwt.implmentation.service;

import com.jwt.implmentation.dto.LoginDTO;
import com.jwt.implmentation.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.jwt.implmentation.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public User signup(User userData) {
        // Encrypt password before saving
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        return userRepository.save(userData);
    }

    public User LoginUser(LoginDTO loginDTO) {
        // Authenticate the user with provided credentials
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        return userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // New method to fetch a user by their username (or email)
    public User getUserByUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> findByEmail(String email) {
        // This should return a user from the database based on the email
        return userRepository.findByEmail(email);  // Assuming you have a UserRepository
    }

    public User createNewUser(String email, String name) {
        // Create a new user and save them to the database
        User newUser = new User();
        newUser.setEmail(email);
        // Set other properties for the new user as needed
        return userRepository.save(newUser);  // Save the user to the database
    }
}
