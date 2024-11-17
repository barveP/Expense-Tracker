package com.example.mugdhaaP.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@CrossOrigin
@Table(name="expense")
public class Expense {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="native")
    private Long id;
    //for timestamp of expense
    private Instant expensedate;

    private String description;

    private String location;

    private Long amount;
    //At this point, we need to connect Expense to two things: User and Category
    //Example:
    //ID(Prim key)  ,  Date   , Description  ,  User ID  , Category
    //1000          , 6/16/2020, "Visiting NY",   1  ,      10

    //Multiple expenses can go into one category
    @ManyToOne
    private Category category;

    //Multiple expenses can belong to one user
    @JsonIgnore
    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getExpensedate() {
        return expensedate;
    }

    public void setExpensedate(Instant expensedate) {
        this.expensedate = expensedate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String descript) {
        this.description = descript;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
