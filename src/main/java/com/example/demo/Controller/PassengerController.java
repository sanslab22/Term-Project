package com.example.demo.Controller;

import com.example.demo.Model.Passenger;
import com.example.demo.Service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

    PassengerService passengerService;

    @Autowired
    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Passenger userCreateAccount(@RequestBody Passenger passenger){
            return passengerService.createUserAccount(passenger);
    }

    @GetMapping("/{passengerId}")
    public ResponseEntity<Passenger> getUserData(@PathVariable Long passengerId){
        Passenger passenger = passengerService.getPassengerData(passengerId);
        return ResponseEntity.ok(passenger);
    }

}
