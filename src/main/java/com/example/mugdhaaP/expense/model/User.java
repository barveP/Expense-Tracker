package com.example.mugdhaaP.expense.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;


@AllArgsConstructor //Will create a constructor for the User class with all the private variables defined below
@NoArgsConstructor
@Entity //Lets JPA know that the intension is to create a table in the database
@Data
@Table(name="user")
public class User {
    @Id
    private Long id;
    private String name;
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    //    //One user can have expenses in many categories
//    @OneToMany
//    private Set<Category> category;

}
