package com.genify.backend.service;

import com.genify.backend.entity.RecruiterProfile;
import com.genify.backend.entity.User;
import com.genify.backend.repository.RecruiterProfileRepository;
import com.genify.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecruiterProfileService {

    private final RecruiterProfileRepository recruiterProfileRepository;
    private final UserRepository userRepository;

    public RecruiterProfileService(
            RecruiterProfileRepository recruiterProfileRepository,
            UserRepository userRepository
    ) {
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.userRepository = userRepository;
    }

    // Create recruiter profile
    public RecruiterProfile createProfile(
            Long userId,
            String companyName,
            String companyWebsite,
            String designation
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (recruiterProfileRepository.existsByUserId(userId)) {
            throw new RuntimeException(
                    "Recruiter profile already exists for this user"
            );
        }

        RecruiterProfile profile = new RecruiterProfile(
                user,
                companyName,
                companyWebsite,
                designation
        );

        return recruiterProfileRepository.save(profile);
    }

    // Get recruiter profile by ID
    public Optional<RecruiterProfile> getProfileById(Long id) {
        return recruiterProfileRepository.findById(id);
    }

    // Get recruiter profile by user ID
    public Optional<RecruiterProfile> getProfileByUserId(Long userId) {
        return recruiterProfileRepository.findByUserId(userId);
    }

    // Update recruiter profile
    public RecruiterProfile updateProfile(
            Long userId,
            String companyName,
            String companyWebsite,
            String designation
    ) {

        RecruiterProfile profile =
                recruiterProfileRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException("Recruiter profile not found")
                        );

        profile.setCompanyName(companyName);
        profile.setCompanyWebsite(companyWebsite);
        profile.setDesignation(designation);

        return recruiterProfileRepository.save(profile);
    }

    // Delete recruiter profile
    public void deleteProfile(Long userId) {

        RecruiterProfile profile =
                recruiterProfileRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException("Recruiter profile not found")
                        );

        recruiterProfileRepository.delete(profile);
    }
}