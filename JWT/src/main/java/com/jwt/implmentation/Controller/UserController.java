package com.jwt.implmentation.Controller;

import com.jwt.implmentation.JWTservice.JWTService;
import com.jwt.implmentation.dto.LoginDTO;
import com.jwt.implmentation.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.jwt.implmentation.response.LoginResponse;
import com.jwt.implmentation.service.UserService;

import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/auth/signup")
    public ResponseEntity<User> postMethodName(@RequestBody User user) {
        User user1 = userService.signup(user);
        return ResponseEntity.ok(user1);
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/auth/signin")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDTO loginDTO) {
        User user2 = userService.LoginUser(loginDTO);
        String jwttoken = jwtService.generateToken(new HashMap<>(), user2);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwttoken);
        loginResponse.setTokenExpireTime(jwtService.getExpireTime());
        return ResponseEntity.ok(loginResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users1 = userService.getAllUsers();
        return ResponseEntity.ok(users1);
    }

    // New endpoint to get the profile of the currently authenticated user
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String authorizationHeader) {
        // Extract JWT token from Authorization header
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);  // Extract username from token

        // Get user details from the database
        User user = userService.getUserByUsername(username);

        // Return the user profile details
        return ResponseEntity.ok(user);
    }


}
