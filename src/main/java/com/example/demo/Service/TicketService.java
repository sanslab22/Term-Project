package com.example.demo.Service;

import com.example.demo.Model.Reservation;
import com.example.demo.Model.Ticket;
import com.example.demo.Repository.ReservationRepository;
import com.example.demo.Repository.TicketRepository;
import com.example.demo.dto.TicketRequestDTO;
import com.example.demo.exception.ReservationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    public Long addTicket(TicketRequestDTO ticketRequestDTO) {

        // Find the reservation
        Reservation reservation = reservationRepository.findById(ticketRequestDTO.getReservationID())
                .orElseThrow(() -> new ReservationNotFoundException("Reservation ID not found"));

        // Create the ticket
        Ticket ticket = new Ticket();
        ticket.setReservation(reservation);
        ticket.setFirstName(ticketRequestDTO.getFirstName());
        ticket.setLastName(ticketRequestDTO.getLastName());
        ticket.setSeatNumber(ticketRequestDTO.getSeatNum());

        // Save the ticket and return the ticket ID
        Ticket savedTicket = ticketRepository.save(ticket);
        return savedTicket.getTicketId();
    }
}
