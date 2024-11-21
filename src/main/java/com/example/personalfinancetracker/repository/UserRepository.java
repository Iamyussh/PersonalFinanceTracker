package com.example.personalfinancetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.personalfinancetracker.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
