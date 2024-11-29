package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cardID", nullable = false)
    private Long cardID;

    @Column (name = "cardType", nullable = false)
    private String cardType;

    @Column (name = "cardNumber",nullable = false)
    private String cardNumber;

    @Column (name = "cardCode",nullable = false)
    private String cardCode;

    @Column (name = "zipCode",nullable = false)
    private String zipCode;

    @Column (name = "expirationDate",nullable = false)
    private String expirationDate;

    @ManyToOne @JoinColumn(name = "passengerID", nullable = false)
    private Passenger passenger;

}
