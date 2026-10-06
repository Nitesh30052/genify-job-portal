package com.genify.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DatabaseInitializer {

    @Bean
    CommandLineRunner initializeApplicationColumns(
            JdbcTemplate jdbcTemplate
    ) {

        return args -> {

            System.out.println(
                    "=== Checking applications table columns ==="
            );

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS applicant_name TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS applicant_email TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS phone TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS degree TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS department TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS college TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS graduation_year TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS skills TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS experience TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS resume_url TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS linkedin_url TEXT
            """);

            jdbcTemplate.execute("""
                ALTER TABLE applications
                ADD COLUMN IF NOT EXISTS github_url TEXT
            """);

            System.out.println(
                    "=== Applications table columns checked successfully ==="
            );
        };
    }
}