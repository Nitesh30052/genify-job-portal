package com.genify.backend.service;

import com.genify.backend.entity.User;
import com.genify.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // CREATE USER
    // =========================

    public User createUser(User user) {
        return userRepository.save(user);
    }

    // =========================
    // GET USER BY EMAIL
    // =========================

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // =========================
    // GET USER BY ID
    // =========================

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // =========================
    // CHECK EMAIL
    // =========================

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // =========================
    // LOGIN
    // =========================

    public Optional<User> login(
            String email,
            String password
    ) {

        Optional<User> user =
                userRepository.findByEmail(email);

        if (
                user.isPresent()
                        &&
                user.get()
                        .getPassword()
                        .equals(password)
        ) {
            return user;
        }

        return Optional.empty();
    }

    // =========================
    // UPDATE PROFILE
    // =========================

    public Optional<User> updateProfile(
            Long id,
            User profileData
    ) {

        Optional<User> existingUser =
                userRepository.findById(id);

        if (existingUser.isEmpty()) {
            return Optional.empty();
        }

        User user = existingUser.get();

        // Update basic profile information
        if (profileData.getName() != null) {
            user.setName(profileData.getName());
        }

        user.setPhone(profileData.getPhone());
        user.setLocation(profileData.getLocation());
        user.setEducation(profileData.getEducation());
        user.setSkills(profileData.getSkills());
        user.setExperience(profileData.getExperience());
        user.setResumeUrl(profileData.getResumeUrl());
        user.setLinkedinUrl(profileData.getLinkedinUrl());
        user.setGithubUrl(profileData.getGithubUrl());

        return Optional.of(
                userRepository.save(user)
        );
    }
}