package com.example.demo.exceptionhandler;

import com.example.demo.Model.Passenger;
import com.example.demo.exception.PassengerNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.text.ParseException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PassengerNotFoundException.class)
    public ResponseEntity<String > handlePassengerNotFoundException(PassengerNotFoundException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> handleParseException(ParseException ex){
        return new ResponseEntity<>(ex.getMessage()+"Some proble with the date conversion", HttpStatus.BAD_REQUEST);
    }
}