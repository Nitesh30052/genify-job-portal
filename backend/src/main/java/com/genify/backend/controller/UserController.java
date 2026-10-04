package com.genify.backend.controller;

import com.genify.backend.dto.LoginRequest;
import com.genify.backend.dto.LoginResponse;
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
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User savedUser = userService.createUser(user);

        return ResponseEntity.ok(savedUser);
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<User> user = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        if (user.isEmpty()) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        User loggedInUser = user.get();

        // Generate JWT token
        String token = jwtService.generateToken(
                loggedInUser.getEmail()
        );

        LoginResponse response = new LoginResponse(
                "Login successful",
                loggedInUser.getId(),
                loggedInUser.getName(),
                loggedInUser.getEmail(),
                loggedInUser.getRole().toString(),
                token
        );

        return ResponseEntity.ok(response);
    }

    // =========================
    // GET USER BY EMAIL
    // =========================

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(
            @PathVariable String email) {

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

    // =========================
    // CHECK EMAIL
    // =========================

    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> emailExists(
            @PathVariable String email) {

        return ResponseEntity.ok(
                userService.emailExists(email)
        );
    }
}