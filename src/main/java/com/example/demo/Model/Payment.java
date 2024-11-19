package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID", nullable = false)
    private Long paymentID;

    @Column (name = "cardType", nullable = false)
    private String cardType;

    @Column (name = "cardNumber",nullable = false)
    private String cardNumber;


    @Column (name = "cardCode",nullable = false)
    private String cardCode;

    @Column (name = "zipCode",nullable = false)
    private String zipCode;

    @ManyToMany(mappedBy = "payments")
    private List<Passenger> passengers = new ArrayList<>();

}
