package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name="Ticket")
public class Ticket {
    public Ticket(Flight flight, Integer seatNumber, Long unitPrice, Passenger passenger) {
//        this.flight = flight;
        this.seatNumber = seatNumber;
        this.unitPrice = unitPrice;
//        this.passenger = passenger;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketID", nullable = false)
    private Long ticketId;

//    @ManyToOne
//    @JoinColumn(name = "flightID")
//    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "reservationID", nullable = true)
    private Reservation reservation;

    @Column(name = "seatNumber", nullable = false, columnDefinition = "VARCHAR(60) CHECK (seatNumber < 100 and seatNumber > 0)")
    private Integer seatNumber;

    @Column(nullable = false)
    private Long unitPrice = 50L;

    @Column(name = "firstName", nullable = false)
    private String firstName;
    @Column(name = "lastName", nullable = false)
    private String lastName;

//    @ManyToOne
//    @JoinColumn(name = "passengerID")
//    private Passenger passenger;

    public Ticket() {

    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

//    public Flight getFlight() {
//        return flight;
//    }
//
//    public void setFlight(Flight flight) {
//        this.flight = flight;
//    }

//    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Long getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Long unitPrice) {
        this.unitPrice = unitPrice;
    }

//    public Passenger getPassenger() {
//        return passenger;
//    }
//
//    public void setPassenger(Passenger passenger) {
//        this.passenger = passenger;
//    }
} // Ticket
