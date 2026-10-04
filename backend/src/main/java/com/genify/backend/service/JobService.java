package com.genify.backend.service;

import com.genify.backend.entity.Job;
import com.genify.backend.entity.User;
import com.genify.backend.repository.JobRepository;
import com.genify.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository
    ) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // Create a new job
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // Create a job for a recruiter
    public Job createRecruiterJob(Job job, Long recruiterId) {

        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (recruiter.getRole() == null ||
                !"RECRUITER".equals(recruiter.getRole().name())) {
            throw new RuntimeException(
                    "User is not a recruiter"
            );
        }

        job.setRecruiter(recruiter);

        return jobRepository.save(job);
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get job by ID
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Get jobs created by a recruiter
    public List<Job> getJobsByRecruiter(Long recruiterId) {
        return jobRepository.findByRecruiterId(recruiterId);
    }

    // Search jobs by title
    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

    // Search jobs by company
    public List<Job> searchByCompany(String company) {
        return jobRepository.findByCompanyContainingIgnoreCase(company);
    }

    // Search jobs by location
    public List<Job> searchByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    // Search jobs by source
    public List<Job> searchBySource(String source) {
        return jobRepository.findBySourceContainingIgnoreCase(source);
    }

    // Delete job
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}