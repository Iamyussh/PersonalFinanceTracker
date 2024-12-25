package com.example.personalfinancetracker.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.personalfinancetracker.model.Category;



public interface CategoryRepository extends JpaRepository<Category, Long> {
}
