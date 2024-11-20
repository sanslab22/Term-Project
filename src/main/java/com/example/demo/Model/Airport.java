package com.example.demo.Model;

import jakarta.persistence.*;

import javax.print.DocFlavor;

@Entity
//@Data
@Table(name="Airport")
public class Airport {
    @Id
    @Column(name = "airportCode", nullable = false, unique = true)
    private String airportCode;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;
}