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

    public ApplicationController(
            ApplicationService applicationService
    ) {
        this.applicationService = applicationService;
    }

    // =========================
    // CREATE APPLICATION
    // =========================

    @PostMapping
    public ResponseEntity<Application> createApplication(

            @RequestParam Long userId,

            @RequestParam Long jobId,

            @RequestParam String applicantName,

            @RequestParam String applicantEmail,

            @RequestParam String phone,

            @RequestParam String degree,

            @RequestParam String department,

            @RequestParam String college,

            @RequestParam String graduationYear,

            @RequestParam String skills,

            @RequestParam(required = false)
            String experience,

            @RequestParam String resumeUrl,

            @RequestParam(required = false)
            String linkedinUrl,

            @RequestParam(required = false)
            String githubUrl,

            @RequestParam(required = false)
            String notes
    ) {

        Application application =
                applicationService.createApplication(
                        userId,
                        jobId,
                        applicantName,
                        applicantEmail,
                        phone,
                        degree,
                        department,
                        college,
                        graduationYear,
                        skills,
                        experience,
                        resumeUrl,
                        linkedinUrl,
                        githubUrl,
                        notes
                );

        return ResponseEntity.ok(application);
    }

    // =========================
    // GET APPLICATION BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(
            @PathVariable Long id
    ) {

        return applicationService
                .getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity
                                .notFound()
                                .build()
                );
    }

    // =========================
    // USER APPLICATIONS
    // =========================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>>
    getUserApplications(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                applicationService
                        .getApplicationsByUser(userId)
        );
    }

    // =========================
    // JOB APPLICATIONS
    // =========================

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>>
    getJobApplications(
            @PathVariable Long jobId
    ) {

        return ResponseEntity.ok(
                applicationService
                        .getApplicationsByJob(jobId)
        );
    }

    // =========================
    // APPLICATIONS BY STATUS
    // =========================

    @GetMapping(
            "/user/{userId}/status/{status}"
    )
    public ResponseEntity<List<Application>>
    getApplicationsByStatus(
            @PathVariable Long userId,
            @PathVariable ApplicationStatus status
    ) {

        return ResponseEntity.ok(
                applicationService
                        .getApplicationsByStatus(
                                userId,
                                status
                        )
        );
    }

    // =========================
    // UPDATE STATUS
    // =========================

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        id,
                        status
                )
        );
    }

    // =========================
    // UPDATE NOTES
    // =========================

    @PutMapping("/{id}/notes")
    public ResponseEntity<Application> updateNotes(
            @PathVariable Long id,
            @RequestParam String notes
    ) {

        return ResponseEntity.ok(
                applicationService.updateNotes(
                        id,
                        notes
                )
        );
    }

    // =========================
    // DELETE APPLICATION
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id
    ) {

        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }
}