package com.genify.backend.repository;

import com.genify.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    // Existing search methods
    List<Job> findByTitleContainingIgnoreCase(String title);

    List<Job> findByCompanyContainingIgnoreCase(String company);

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findBySourceContainingIgnoreCase(String source);

    // Recruiter job management
    List<Job> findByRecruiterId(Long recruiterId);
}