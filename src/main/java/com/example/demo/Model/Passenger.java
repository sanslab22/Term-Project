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

    @ManyToMany
    @JoinTable( name = "passenger_payment",
            joinColumns = @JoinColumn(name = "passengerID"),
            inverseJoinColumns = @JoinColumn(name = "paymentID") )
    private List<Payment> payments = new ArrayList<Payment>();

} // Passenger
