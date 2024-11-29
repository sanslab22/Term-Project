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
    @JoinColumn(name = "startAirportCode", nullable = false)
    private Airport startAirportCode;

    @ManyToOne
    @JoinColumn(name = "endAirportCode", nullable = false)
    private Airport endAirportCode;

    @Column(name = "departureTime", nullable = false)
    private Timestamp departureTime;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "flightStatus", nullable = true)
    private FlightStatus flightStatus = FlightStatus.SCHEDULED;
}
