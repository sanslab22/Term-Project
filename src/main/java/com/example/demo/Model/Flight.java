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

    public Long getFlightID() {
        return flightID;
    }

    public void setFlightID(Long flightID) {
        this.flightID = flightID;
    }

    public Airplane getAirplaneID() {
        return airplaneID;
    }

    public void setAirplaneID(Airplane airplaneID) {
        this.airplaneID = airplaneID;
    }

    public Airport getDeparture() {
        return departure;
    }

    public void setDeparture(Airport departure) {
        this.departure = departure;
    }

    public Airport getDestination() {
        return destination;
    }

    public void setDestination(Airport destination) {
        this.destination = destination;
    }

    public Timestamp getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Timestamp departureTime) {
        this.departureTime = departureTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public FlightStatus getFlightStatus() {
        return flightStatus;
    }

    public void setFlightStatus(FlightStatus flightStatus) {
        this.flightStatus = flightStatus;
    }
}
