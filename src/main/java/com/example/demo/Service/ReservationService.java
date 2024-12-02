package com.example.demo.Service;

import com.example.demo.Model.*;
import com.example.demo.Repository.*;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.exception.FlightNotFoundException;
import com.example.demo.exception.PassengerNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    TicketRepository ticketRepository;
    FlightRepository flightRepository;
    PassengerRepository passengerRepository;
    ReservationRepository reservationRepository;
    CardRepository cardRepository;

    @Autowired
    public ReservationService(TicketRepository ticketRepository
            ,FlightRepository flightRepository
            ,PassengerRepository passengerRepository
            ,ReservationRepository reservationRepository
            ,CardRepository cardRepository) {
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
        this.passengerRepository = passengerRepository;
        this.reservationRepository = reservationRepository;
        this.cardRepository = cardRepository;
    }

    public Boolean createReservation(ReservationRequestDTO reservationRequestDTO) {
        // Map DTO to Reservation entity
        Reservation reservation = new Reservation();
        reservation.setPassenger(new Passenger(reservationRequestDTO.getPassengerId()));
        reservation.setTotalPrice(calculateTotalPrice(reservationRequestDTO.getFlightId(), reservationRequestDTO.getSeatNums()));

        // Save reservation to get the ID
        reservation = reservationRepository.save(reservation);

        // Create and save Card entity
        Card card = new Card();
        card.setCardType(reservationRequestDTO.getCardType());
        card.setCardNumber(reservationRequestDTO.getCardNumber());
        card.setCardCode(reservationRequestDTO.getCardCode());
        card.setZipCode(reservationRequestDTO.getZipcode());
        card.setReservation(reservation);
        cardRepository.save(card);

        / Create Tickets associated with the Reservation
        List<Ticket> tickets = new ArrayList<>();
        for (String seatNum : seatNumbers) {
            Ticket ticket = new Ticket();
            ticket.setSeatNumber(seatNum);
            ticket.setReservation(reservation); // Associate ticket with the reservation
            tickets.add(ticket);
        }
        ticketRepository.saveAll(tickets);

        // Return the Reservation ID as the response
        return reservation.getReservationID();
    }

    }

    private Double calculateTotalPrice(Long flightId, List<String> seatNums) {
        // Example: Base price + seat count * seat multiplier
        return 100.0 + seatNums.size() * 20.0; // Replace with your calculation logic
    }

    private boolean checkFlightExist(Long flightId) {
        System.out.println("I am running");
        return flightRepository.existsById(flightId);
    }

    private  boolean checkPassengerExists(Long passengerId) {
        System.out.println("I am in checkPassengerExists");
        return passengerRepository.existsById(passengerId);
    }
    private Flight getFlightById(Long flightId) {
        // Using Optional to handle null
        return flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found with ID: " + flightId));
    }

    public List<Reservation> viewReservation(Long passengerId) {
        return reservationRepository.viewReservations(passengerId);
    }
}
