package com.genify.backend.controller;

import com.genify.backend.entity.Job;
import com.genify.backend.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Create a normal job
    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        Job savedJob = jobService.createJob(job);
        return ResponseEntity.ok(savedJob);
    }

    // Create a job for a recruiter
    @PostMapping("/recruiter/{recruiterId}")
    public ResponseEntity<Job> createRecruiterJob(
            @PathVariable Long recruiterId,
            @RequestBody Job job) {

        Job savedJob =
                jobService.createRecruiterJob(job, recruiterId);

        return ResponseEntity.ok(savedJob);
    }

    // Get all jobs
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get jobs created by a recruiter
    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<List<Job>> getJobsByRecruiter(
            @PathVariable Long recruiterId) {

        return ResponseEntity.ok(
                jobService.getJobsByRecruiter(recruiterId)
        );
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(
            @PathVariable Long id) {

        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // Search by title
    @GetMapping("/search/title")
    public ResponseEntity<List<Job>> searchByTitle(
            @RequestParam String title) {

        return ResponseEntity.ok(
                jobService.searchByTitle(title)
        );
    }

    // Search by company
    @GetMapping("/search/company")
    public ResponseEntity<List<Job>> searchByCompany(
            @RequestParam String company) {

        return ResponseEntity.ok(
                jobService.searchByCompany(company)
        );
    }

    // Search by location
    @GetMapping("/search/location")
    public ResponseEntity<List<Job>> searchByLocation(
            @RequestParam String location) {

        return ResponseEntity.ok(
                jobService.searchByLocation(location)
        );
    }

    // Search by source
    @GetMapping("/search/source")
    public ResponseEntity<List<Job>> searchBySource(
            @RequestParam String source) {

        return ResponseEntity.ok(
                jobService.searchBySource(source)
        );
    }

    // Delete job
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long id) {

        if (jobService.getJobById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        jobService.deleteJob(id);

        return ResponseEntity.noContent().build();
    }
}