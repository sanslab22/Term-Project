package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
//@Data
@Table(name="Airport")
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "airportCode", nullable = false)
    private Long airportCode;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;
}