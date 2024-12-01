package com.example.demo.Controller;

import com.example.demo.Model.Reservation;
import com.example.demo.Service.PassengerService;
import com.example.demo.Service.ReservationService;
import com.example.demo.dto.ReservationRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final PassengerService passengerService;
    ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService, PassengerService passengerService) {
        this.reservationService = reservationService;
        this.passengerService = passengerService;
    }

    @PostMapping
    public ResponseEntity<String> bookFlight(@RequestBody ReservationRequestDTO reservationRequestDTO){
        if(reservationService.bookFlight(reservationRequestDTO))
            return ResponseEntity.ok("Success");
        else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("its getting some error");
    }

    @GetMapping("/{passengerId}")
    public ResponseEntity<List<Reservation>> viewReservation(@PathVariable Long passengerId){
        List<Reservation> reservations =reservationService.viewReservation(passengerId);
        return ResponseEntity.ok(reservations);
    }
}
