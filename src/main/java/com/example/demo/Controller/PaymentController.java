package com.example.demo.Controller;

import com.example.demo.Model.Card;
import com.example.demo.Service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {


    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public Payment addPaymentMethod(@RequestBody Payment payment) {
//        return paymentService.addPaymentMethod(payment);
//    }
}
