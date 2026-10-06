package com.genify.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    private LocalDateTime appliedAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // =========================
    // CANDIDATE DETAILS
    // =========================

    @Column(nullable = false)
    private String applicantName;

    @Column(nullable = false)
    private String applicantEmail;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String college;

    @Column(nullable = false)
    private String graduationYear;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String experience;

    @Column(nullable = false)
    private String resumeUrl;

    private String linkedinUrl;

    private String githubUrl;

    // =========================
    // CONSTRUCTORS
    // =========================

    public Application() {
    }

    public Application(
            User user,
            Job job,
            ApplicationStatus status,
            String notes
    ) {
        this.user = user;
        this.job = job;
        this.status = status;
        this.notes = notes;
        this.appliedAt = LocalDateTime.now();
    }

    // =========================
    // PRE PERSIST
    // =========================

    @PrePersist
    protected void onCreate() {

        if (appliedAt == null) {
            appliedAt = LocalDateTime.now();
        }

        if (status == null) {
            status = ApplicationStatus.APPLIED;
        }
    }

    // =========================
    // GETTERS / SETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(String graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
}