package com.example.mugdhaaP.expense.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.util.Set;

@Entity
@NoArgsConstructor
//@AllArgsConstructor
@Data
@CrossOrigin
@Table(name = "category")
public class Category {
    @Id
    private Long id;
    //Example: Travel, Groceries, Entertainment, etc ...4
    @NonNull //Spring makes sure that a valid Category name is received
    private String name;


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


    //    //Many categories can be connected to one user
//    @ManyToOne(cascade = CascadeType.PERSIST)
//    private User user;

}
