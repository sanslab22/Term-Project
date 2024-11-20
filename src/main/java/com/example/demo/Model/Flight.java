package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
//@Data
@Table(name="Flight")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flightID", nullable = false)
    private Long flightID;

    @ManyToOne
    @JoinColumn(name = "airplaneID", nullable = false)
    private Airplane airplaneID;


    @ManyToOne
    @JoinColumn(name = "departureAirportCode", nullable = false)
    private Airport departure;

    @ManyToOne
    @JoinColumn(name = "destinationAirportCode", nullable = false)
    private Airport destination;

    @Column(name = "departureTime", nullable = false)
    private Timestamp departureTime;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "flightStatus", nullable = true)
    private FlightStatus flightStatus = FlightStatus.SCHEDULED;
}
