package com.example.demo.Model;

import jakarta.persistence.*;

import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Passenger")
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "passengerID", nullable = false)
    private Long passengerID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;


    @Column(name = "email", nullable = false)
    @Email
    private String email;

//    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Card> cards;

} // Passenger
