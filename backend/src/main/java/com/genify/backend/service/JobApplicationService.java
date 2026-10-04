package com.genify.backend.service;

import com.genify.backend.entity.Job;
import com.genify.backend.entity.JobApplication;
import com.genify.backend.entity.User;
import com.genify.backend.repository.JobApplicationRepository;
import com.genify.backend.repository.JobRepository;
import com.genify.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public JobApplicationService(
            JobApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public JobApplication applyForJob(
            Long userId,
            Long jobId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (applicationRepository
                .existsByUserIdAndJobId(userId, jobId)) {

            throw new RuntimeException(
                    "You have already applied for this job"
            );
        }

        JobApplication application =
                new JobApplication(
                        user,
                        job,
                        "APPLIED"
                );

        return applicationRepository.save(application);
    }

    public List<JobApplication> getApplicationsByUser(
            Long userId
    ) {
        return applicationRepository.findByUserId(userId);
    }

    public List<JobApplication> getApplicationsByJob(
            Long jobId
    ) {
        return applicationRepository.findByJobId(jobId);
    }
}