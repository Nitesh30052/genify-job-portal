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

    // =========================
    // CREATE APPLICATION
    // =========================

    public Application createApplication(
            Long userId,
            Long jobId,
            String applicantName,
            String applicantEmail,
            String phone,
            String degree,
            String department,
            String college,
            String graduationYear,
            String skills,
            String experience,
            String resumeUrl,
            String linkedinUrl,
            String githubUrl,
            String notes
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        Job job = jobRepository.findById(jobId)
                .orElseThrow(
                        () -> new RuntimeException("Job not found")
                );

        // Basic validation
        if (applicantName == null || applicantName.isBlank()) {
            throw new RuntimeException("Full name is required");
        }

        if (applicantEmail == null || applicantEmail.isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (phone == null || phone.isBlank()) {
            throw new RuntimeException("Phone number is required");
        }

        if (degree == null || degree.isBlank()) {
            throw new RuntimeException("Degree is required");
        }

        if (department == null || department.isBlank()) {
            throw new RuntimeException("Department / Stream is required");
        }

        if (college == null || college.isBlank()) {
            throw new RuntimeException("College / University is required");
        }

        if (graduationYear == null || graduationYear.isBlank()) {
            throw new RuntimeException("Graduation year is required");
        }

        if (skills == null || skills.isBlank()) {
            throw new RuntimeException("Skills are required");
        }

        if (resumeUrl == null || resumeUrl.isBlank()) {
            throw new RuntimeException("Resume URL is required");
        }

        Application application = new Application(
                user,
                job,
                ApplicationStatus.APPLIED,
                notes
        );

        application.setApplicantName(applicantName);
        application.setApplicantEmail(applicantEmail);
        application.setPhone(phone);
        application.setDegree(degree);
        application.setDepartment(department);
        application.setCollege(college);
        application.setGraduationYear(graduationYear);
        application.setSkills(skills);
        application.setExperience(experience);
        application.setResumeUrl(resumeUrl);
        application.setLinkedinUrl(linkedinUrl);
        application.setGithubUrl(githubUrl);

        return applicationRepository.save(application);
    }

    // =========================
    // GET APPLICATION
    // =========================

    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    // =========================
    // USER APPLICATIONS
    // =========================

    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    // =========================
    // JOB APPLICATIONS
    // =========================

    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // =========================
    // APPLICATIONS BY STATUS
    // =========================

    public List<Application> getApplicationsByStatus(
            Long userId,
            ApplicationStatus status
    ) {
        return applicationRepository.findByUserIdAndStatus(
                userId,
                status
        );
    }

    // =========================
    // UPDATE STATUS
    // =========================

    public Application updateStatus(
            Long applicationId,
            ApplicationStatus status
    ) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Application not found"
                                )
                        );

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    // =========================
    // UPDATE NOTES
    // =========================

    public Application updateNotes(
            Long applicationId,
            String notes
    ) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Application not found"
                                )
                        );

        application.setNotes(notes);

        return applicationRepository.save(application);
    }

    // =========================
    // DELETE APPLICATION
    // =========================

    public void deleteApplication(Long id) {

        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException(
                    "Application not found"
            );
        }

        applicationRepository.deleteById(id);
    }
}