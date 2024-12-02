package com.example.demo.Service;

import com.example.demo.Model.Passenger;
import com.example.demo.Model.Payment;
import com.example.demo.Model.Reservation;
import com.example.demo.Model.Ticket;
import com.example.demo.Repository.PassengerRepository;
import com.example.demo.Repository.PaymentRepository;
import com.example.demo.Repository.ReservationRepository;
import com.example.demo.Repository.TicketRepository;
import com.example.demo.dto.PaymentRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PassengerRepository passengerRepository;

    private final PaymentRepository paymentRepository;

    private final ReservationRepository reservationRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, PassengerRepository passengerRepository, ReservationRepository reservationRepository) {
        this.paymentRepository = paymentRepository;
        this.passengerRepository = passengerRepository;
        this.reservationRepository = reservationRepository;
    }

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }


    public Payment confirmPayment(PaymentRequestDTO paymentRequestDTO) {
        // Validate Reservation
        Optional<Reservation> optionalReservation = reservationRepository.findById(paymentRequestDTO.getReservationID());
        if (optionalReservation.isEmpty()) {
            throw new IllegalArgumentException("Invalid Reservation ID");
        }
        Reservation reservation = optionalReservation.get();

        // Validate Passenger
        Optional<Passenger> optionalPassenger = passengerRepository.findById(paymentRequestDTO.getPassengerID());
        if (optionalPassenger.isEmpty()) {
            throw new IllegalArgumentException("Invalid Passenger ID");
        }
        Passenger passenger = optionalPassenger.get();

        // Generate a comma-separated string of ticket IDs
        String ticketIDs = String.join(",", paymentRequestDTO.getTicketIDs()
                .stream()
                .map(String::valueOf)
                .toList());
    return  null;

    }


}
