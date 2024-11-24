package com.example.demo.Service;

import com.example.demo.Model.Passenger;
import com.example.demo.Model.Reservation;
import com.example.demo.Repository.PassengerRepository;
import com.example.demo.exception.PassengerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    PassengerRepository passengerRepository;

    @Autowired
    public PassengerService(PassengerRepository passengerRepository){
        this.passengerRepository = passengerRepository;
    }

    public Passenger getPassengerData(Long passengerId){
        return passengerRepository.findById(passengerId)
                .orElseThrow(() -> new PassengerNotFoundException("Passenger not found with id: " + passengerId));
    }

    public Passenger createUserAccount(Passenger passenger) {
        return passengerRepository.save(passenger);
    }
}
