package com.oauth.google.Repository;

import com.oauth.google.Entity.GoogleUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<GoogleUser, Long> {
    boolean existsByEmail(String email);
}
