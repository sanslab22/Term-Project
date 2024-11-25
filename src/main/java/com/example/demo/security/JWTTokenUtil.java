package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTTokenUtil {

    private static final String SECRET_KEY = "my_secure_secret_key";  // Use a secure key in production
    private static final long EXPIRATION_TIME = 3600000; // 1 hour

    /**
     * Generate a JWT token for a user
     * @param email: The email of the user (subject)
     * @return JWT token
     */
    public String generateToken(String username) {
        try {
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", "user"); // Example custom claim

            return Jwts.builder()
                    .setClaims(claims) // Custom claims
                    .setSubject(username) // Subject (e.g., username or user ID)
                    .setIssuedAt(new Date(System.currentTimeMillis())) // Issue time
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Expiration time
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Signing algorithm
                    .compact(); // Generates the JWT string
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error generating JWT token: " + e.getMessage());

    /**
     * Validate the JWT token
     * @param token: The JWT token
     * @param email: The email of the user
     * @return true if the token is valid
     */
    public boolean validateToken(String token, String email) {
        final String username = extractUsername(token);
        return (username.equals(email) && !isTokenExpired(token));
    }

    /**
     * Extract username (email) from the token
     * @param token: The JWT token
     * @return Email (subject) from the token
     */
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Check if the token has expired
     * @param token: The JWT token
     * @return true if the token is expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extract expiration date from the token
     * @param token: The JWT token
     * @return Expiration date of the token
     */
    private Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
}
