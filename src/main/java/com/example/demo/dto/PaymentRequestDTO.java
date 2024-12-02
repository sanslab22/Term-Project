package com.example.demo.dto;

import java.util.List;

public class PaymentRequestDTO {
    private Long reservationID;
    private Long passengerID;
    private List<Long> ticketIDs;
    private Double totalPrice;

    // Getters and Setters
    public Long getReservationID() {
        return reservationID;
    }

    public void setReservationID(Long reservationID) {
        this.reservationID = reservationID;
    }

    public Long getPassengerID() {
        return passengerID;
    }

    public void setPassengerID(Long passengerID) {
        this.passengerID = passengerID;
    }

    public List<Long> getTicketIDs() {
        return ticketIDs;
    }

    public void setTicketIDs(List<Long> ticketIDs) {
        this.ticketIDs = ticketIDs;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
