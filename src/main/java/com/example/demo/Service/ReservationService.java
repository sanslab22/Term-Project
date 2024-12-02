package com.example.demo.Service;

import com.example.demo.Model.Flight;
import com.example.demo.Model.Passenger;
import com.example.demo.Model.Reservation;
import com.example.demo.Model.Ticket;
import com.example.demo.Repository.FlightRepository;
import com.example.demo.Repository.PassengerRepository;
import com.example.demo.Repository.ReservationRepository;
import com.example.demo.Repository.TicketRepository;
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

    @Autowired
    public ReservationService(TicketRepository ticketRepository
            ,FlightRepository flightRepository
            ,PassengerRepository passengerRepository
            ,ReservationRepository reservationRepository) {
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
        this.passengerRepository = passengerRepository;
        this.reservationRepository = reservationRepository;
    }

    public Boolean bookFlight(ReservationRequestDTO reservationRequestDTO) {
        Double unitPrice = 50.0;

        // Validate passenger existence
        if (!checkPassengerExists(reservationRequestDTO.getPassengerId())) {
            throw new PassengerNotFoundException("Invalid Passenger ID");
        }

        // Validate flight existence
        if (!checkFlightExist(reservationRequestDTO.getFlightId())) {
            throw new FlightNotFoundException("Incorrect Flight ID");
        }

        // Calculate total ticket price
        Double ticketPrice = reservationRequestDTO.getSeatNumbers().size() * unitPrice;

        // Fetch the passenger
        Passenger passenger = passengerRepository.findById(reservationRequestDTO.getPassengerId())
                .orElseThrow(() -> new PassengerNotFoundException("Passenger not found"));

        // Fetch the flight
        Flight flight = getFlightById(reservationRequestDTO.getFlightId());

        // Create a reservation (placeholder, no tickets yet)
        Reservation reservation = new Reservation();
        reservation.setPassenger(passenger);
        reservation.setTotalPrice(ticketPrice);
        reservation = reservationRepository.save(reservation); // Save to generate reservation ID

        // Book tickets and associate with the reservation
        List<Ticket> ticketList = new ArrayList<>();
        for (Integer seat : reservationRequestDTO.getSeatNumbers()) {
            Ticket ticket = new Ticket(flight, seat, unitPrice.longValue(), passenger);
            ticket.setReservation(reservation); // Link ticket to reservation
            ticketRepository.save(ticket); // Persist ticket
            ticketList.add(ticket);
        }

        // Update reservation with ticket list
        reservation.setTickets(ticketList);
        reservationRepository.save(reservation); // Save updated reservation

        return true;
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



