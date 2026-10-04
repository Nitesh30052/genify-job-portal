package com.genify.backend.service;

import com.genify.backend.entity.Application;
import com.genify.backend.entity.ApplicationStatus;
import com.genify.backend.entity.Job;
import com.genify.backend.entity.User;
import com.genify.backend.repository.ApplicationRepository;
import com.genify.backend.repository.JobRepository;
import com.genify.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    // Create a new application
    public Application createApplication(
            Long userId,
            Long jobId,
            String notes
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = new Application(
                user,
                job,
                ApplicationStatus.APPLIED,
                notes
        );

        return applicationRepository.save(application);
    }

    // Get application by ID
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    // Get all applications of a user
    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    // Get applications for a job
    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // Get applications by status
    public List<Application> getApplicationsByStatus(
            Long userId,
            ApplicationStatus status
    ) {
        return applicationRepository.findByUserIdAndStatus(
                userId,
                status
        );
    }

    // Update application status
    public Application updateStatus(
            Long applicationId,
            ApplicationStatus status
    ) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    // Update notes
    public Application updateNotes(
            Long applicationId,
            String notes
    ) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setNotes(notes);

        return applicationRepository.save(application);
    }

    // Delete application
    public void deleteApplication(Long id) {

        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException("Application not found");
        }

        applicationRepository.deleteById(id);
    }
}