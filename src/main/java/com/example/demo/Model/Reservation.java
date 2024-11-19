package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservationID", nullable = false)
    private Long reservationID;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reservation")
    private List<Ticket> tickets = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "passengerID")
    private Passenger passenger;

    @Column(name = "toatlPrice", nullable = false)
    private Double totalPrice;
}

