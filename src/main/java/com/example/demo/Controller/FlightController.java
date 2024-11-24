package com.example.demo.Controller;

import com.example.demo.Model.Flight;
import com.example.demo.Service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FlightController {

    FlightService flightService;

    @Autowired
    public FlightController( FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/flight/search")
    public ResponseEntity<List<Flight>> retriveFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam String date) {
        List<Flight> flights = flightService.retriveFlights(origin,destination,date);
        if (flights.isEmpty())
                return ResponseEntity.notFound().build();
        return ResponseEntity.ok(flights);


    }


}
