package com.genify.backend.controller;

import com.genify.backend.entity.RecruiterProfile;
import com.genify.backend.service.RecruiterProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterProfileController {

    private final RecruiterProfileService recruiterProfileService;

    public RecruiterProfileController(
            RecruiterProfileService recruiterProfileService
    ) {
        this.recruiterProfileService = recruiterProfileService;
    }

    // Create recruiter profile
    @PostMapping("/profile")
    public ResponseEntity<RecruiterProfile> createProfile(
            @RequestParam Long userId,
            @RequestParam String companyName,
            @RequestParam(required = false) String companyWebsite,
            @RequestParam(required = false) String designation
    ) {

        RecruiterProfile profile =
                recruiterProfileService.createProfile(
                        userId,
                        companyName,
                        companyWebsite,
                        designation
                );

        return ResponseEntity.ok(profile);
    }

    // Get profile by profile ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<RecruiterProfile> getProfile(
            @PathVariable Long id
    ) {

        return recruiterProfileService.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // Get profile by user ID
    @GetMapping("/profile/user/{userId}")
    public ResponseEntity<RecruiterProfile> getProfileByUser(
            @PathVariable Long userId
    ) {

        return recruiterProfileService.getProfileByUserId(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // Update recruiter profile
    @PutMapping("/profile/user/{userId}")
    public ResponseEntity<RecruiterProfile> updateProfile(
            @PathVariable Long userId,
            @RequestParam String companyName,
            @RequestParam(required = false) String companyWebsite,
            @RequestParam(required = false) String designation
    ) {

        RecruiterProfile profile =
                recruiterProfileService.updateProfile(
                        userId,
                        companyName,
                        companyWebsite,
                        designation
                );

        return ResponseEntity.ok(profile);
    }

    // Delete recruiter profile
    @DeleteMapping("/profile/user/{userId}")
    public ResponseEntity<Void> deleteProfile(
            @PathVariable Long userId
    ) {

        recruiterProfileService.deleteProfile(userId);

        return ResponseEntity.noContent().build();
    }
}