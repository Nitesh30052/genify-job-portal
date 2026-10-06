package com.genify.backend.controller;

import com.genify.backend.dto.LoginRequest;
import com.genify.backend.dto.LoginResponse;
import com.genify.backend.dto.RegisterRequest;
import com.genify.backend.entity.User;
import com.genify.backend.security.JwtService;
import com.genify.backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> createUser(
            @RequestBody RegisterRequest request
    ) {

        try {

            // Validate name
            if (request.getName() == null ||
                    request.getName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Name is required");
            }

            // Validate email
            if (request.getEmail() == null ||
                    request.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }

            // Validate password
            if (request.getPassword() == null ||
                    request.getPassword().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Password is required");
            }

            // Validate role
            if (request.getRole() == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Role is required");
            }

            // Check duplicate email
            if (userService.emailExists(request.getEmail())) {

                return ResponseEntity
                        .badRequest()
                        .body("Email already registered");
            }

            // Create user manually
            User user = new User();

            user.setName(
                    request.getName().trim()
            );

            user.setEmail(
                    request.getEmail().trim()
            );

            // IMPORTANT:
            // Explicitly set password
            user.setPassword(
                    request.getPassword()
            );

            user.setRole(
                    request.getRole()
            );

            // Save user
            User savedUser =
                    userService.createUser(user);

            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Registration failed: "
                                    + e.getMessage()
                    );
        }
    }

    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        Optional<User> user =
                userService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        if (user.isEmpty()) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        User loggedInUser =
                user.get();

        String token =
                jwtService.generateToken(
                        loggedInUser.getEmail()
                );

        LoginResponse response =
                new LoginResponse(
                        "Login successful",
                        loggedInUser.getId(),
                        loggedInUser.getName(),
                        loggedInUser.getEmail(),
                        loggedInUser.getRole().toString(),
                        token
                );

        return ResponseEntity.ok(response);
    }

    // =====================================================
    // GET USER BY EMAIL
    // =====================================================

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(
            @PathVariable String email
    ) {

        Optional<User> user =
                userService.getUserByEmail(email);

        return user
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity
                                .notFound()
                                .build()
                );
    }

    // =====================================================
    // CHECK IF EMAIL EXISTS
    // =====================================================

    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> emailExists(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                userService.emailExists(email)
        );
    }
}