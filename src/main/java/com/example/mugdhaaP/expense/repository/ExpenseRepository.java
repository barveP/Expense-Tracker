package com.example.mugdhaaP.expense.repository;
import com.example.mugdhaaP.expense.model.Category;
import com.example.mugdhaaP.expense.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
