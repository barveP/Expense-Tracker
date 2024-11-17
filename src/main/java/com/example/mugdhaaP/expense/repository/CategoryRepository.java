package com.example.mugdhaaP.expense.repository;

import com.example.mugdhaaP.expense.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

//Map 'Category' to the Database table
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Category findByName(String name);
}
