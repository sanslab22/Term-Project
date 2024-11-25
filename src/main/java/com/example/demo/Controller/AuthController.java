package com.example.demo.Controller;

import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.security.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    /**
     * User login and JWT token generation
     * POST /auth/login
     * Request Body: { "email": "john.doe@example.com", "password": "hashedPassword" }
     * Response: { "token": "<generated JWT token here>" }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        String token = authService.authenticateUser(loginRequest.getEmail(),loginRequest.getPassword());
        return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
    }

}
