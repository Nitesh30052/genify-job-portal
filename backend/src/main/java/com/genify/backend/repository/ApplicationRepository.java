package com.genify.backend.repository;

import com.genify.backend.entity.Application;
import com.genify.backend.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserId(Long userId);

    List<Application> findByJobId(Long jobId);

    List<Application> findByUserIdAndStatus(
            Long userId,
            ApplicationStatus status
    );

    List<Application> findByStatus(ApplicationStatus status);
}