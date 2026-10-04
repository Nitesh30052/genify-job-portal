package com.genify.backend.controller;

import com.genify.backend.entity.Application;
import com.genify.backend.entity.ApplicationStatus;
import com.genify.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Create application
    @PostMapping
    public ResponseEntity<Application> createApplication(
            @RequestParam Long userId,
            @RequestParam Long jobId,
            @RequestParam(required = false) String notes
    ) {

        Application application =
                applicationService.createApplication(
                        userId,
                        jobId,
                        notes
                );

        return ResponseEntity.ok(application);
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(
            @PathVariable Long id
    ) {

        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // Get all applications of a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getUserApplications(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByUser(userId)
        );
    }

    // Get applications for a job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getJobApplications(
            @PathVariable Long jobId
    ) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByJob(jobId)
        );
    }

    // Get user's applications by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(
            @PathVariable Long userId,
            @PathVariable ApplicationStatus status
    ) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByStatus(
                        userId,
                        status
                )
        );
    }

    // Update application status
    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {

        return ResponseEntity.ok(
                applicationService.updateStatus(id, status)
        );
    }

    // Update application notes
    @PutMapping("/{id}/notes")
    public ResponseEntity<Application> updateNotes(
            @PathVariable Long id,
            @RequestParam String notes
    ) {

        return ResponseEntity.ok(
                applicationService.updateNotes(id, notes)
        );
    }

    // Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id
    ) {

        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }
}