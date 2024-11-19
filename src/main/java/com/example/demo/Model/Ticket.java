package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name="Ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketID", nullable = false)
    private Long ticketId;

    @ManyToOne
    @JoinColumn(name = "flightID")
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "reservationID", nullable = false)
    private Reservation reservation;

    @Column(name = "seatNumber", nullable = false, columnDefinition = "VARCHAR(60) CHECK (seatNumber < 100 and seatNumber > 0)")
    private Timestamp seatNumber;

    @Column(nullable = false)
    private Long unitPrice = 50L;

    @ManyToOne
    @JoinColumn(name = "passengerID")
    private Passenger passenger;

} // Ticket
