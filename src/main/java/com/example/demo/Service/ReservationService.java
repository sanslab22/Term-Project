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
        Double unitprice = 50.0;
        if (checkPassengerExists(reservationRequestDTO.getPassengerId())){
            if(checkFlightExist(reservationRequestDTO.getFlightId())){
                Double ticketPrice = reservationRequestDTO.getSeatNumbers().size() * unitprice;
                Flight flight = getFlightById(reservationRequestDTO.getFlightId());

                Optional<Passenger> optionalPassenger = passengerRepository.findById(reservationRequestDTO.getPassengerId());
                if(optionalPassenger.isEmpty()){
                    throw new PassengerNotFoundException("Passenger not found");
                }else{
                Passenger passenger = optionalPassenger.get();

                List<Ticket> ticketList = new ArrayList<>();
                List<Integer> seatList = reservationRequestDTO.getSeatNumbers();
                    System.out.println(seatList);
                for (Integer seat : seatList) {
                    Ticket t = new Ticket(flight,seat, (long) 50L,passenger);
                    ticketRepository.save(t);
                    ticketList.add(t);
                }
                Reservation reservation = new Reservation(ticketList,passenger,ticketPrice);
                reservationRepository.save(reservation);
                return true;
                }
            }else{
                new FlightNotFoundException("Incorrect Flight Id");
            }
        }else{
            new PassengerNotFoundException("Invalid PassengerId");
        }
        return false;
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
