package com.example.demo.Controller;

import com.example.demo.Model.Payment;
import com.example.demo.Model.Reservation;
import com.example.demo.Service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {


    /*private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment) {
        try{
            Payment savedPayment = paymentService.addPayment(payment);
            return new ResponseEntity<>(savedPayment, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<Reservation> confirmPayment(
            @RequestBody com.example.demo.Controller.PaymentRequestDTO paymentRequest) {
        try {
            Reservation reservation = paymentService.confirmPayment(
                    paymentRequest.getReservationID(),
                    paymentRequest.getPassengerID(),
                    paymentRequest.getTicketIDs(),
                    paymentRequest.getTotalPrice()
            );
            return new ResponseEntity<>(reservation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/confirm")
    public ResponseEntity<Payment> confirmPayment(@RequestBody com.example.demo.Controller.PaymentRequestDTO paymentRequestDTO) {
        Payment payment = paymentService.confirmPayment(paymentRequestDTO);
        return ResponseEntity.ok(payment);
    }
*/
}
