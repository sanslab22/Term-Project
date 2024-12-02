package com.example.demo.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;

@Component
public class JWTTokenUtil {

    @Value("${jwt.secret.key}")
    private String secretKey; // Automatically injects the value from application.properties

    private static final long EXPIRATION_TIME = 999999999; // 1 hour (in milliseconds)

    /**
     * Generate a JWT token for a user
     * @param username The username of the user (subject)
     * @return JWT token
     */
    public String generateToken(String username) {
        try {
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", "user");

            // Use UTC explicitly for issue and expiration times
            Instant now = Instant.now();
            Instant expirationTime = now.plusMillis(EXPIRATION_TIME);
            System.out.println(STR."Current time : \{Date.from(now)}");


            return Jwts.builder()
                    .setClaims(claims) // Custom claims
                    .setSubject(username) // Subject (e.g., username or user ID)
                    .setIssuedAt(Date.from(now)) // Issue time
                    .setExpiration(Date.from(expirationTime)) // Expiration time
                    .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // Signing algorithm
                    .compact(); // Generates the JWT string
        } catch (Exception e) {
            throw new RuntimeException("Error generating JWT token", e);
        }
    }
    /**
     * Validate the JWT token
     * @param token The JWT token
     * @param username The username of the user
     * @return true if the token is valid
     */
    public boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    /**
     * Extract username (subject) from the token
     * @param token The JWT token
     * @return Username (subject) from the token
     */
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
    /**
     * Validates a JWT token by checking its structure and expiration status.
     *
     * @param token The JWT token to validate.
     * @return true if the token is valid, false otherwise.
     */
    public boolean isTokenValid(String token) {
        try {
            // Use extractAllClaims to ensure the token is well-formed and signed correctly
            System.out.println("I am in the is token valid methid");
            Claims claims = extractAllClaims(token);
            System.out.println("i am coming here");

            // Check if the token is expired
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            // If any exception occurs (e.g., invalid token), return false
            System.out.println("some exception occureed token is not valid");
            e.printStackTrace();
            return false;
        }
    }


    /**
     * Check if the token has expired
     * @param token The JWT token
     * @return true if the token is expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extract expiration date from the token
     * @param token The JWT token
     * @return Expiration date of the token
     */
    private Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    /**
     * Extract all claims from the token
     * @param token The JWT token
     * @return Claims from the token
     */
    private Claims extractAllClaims(String token) {
        try {
            // Parse claims from the token
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey.getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            System.out.println(STR."claims are extracted \{claims.toString()}");
            // Adjust expiration to match the time zone (EST) and current time (EST)
            Date expiration = claims.getExpiration();
            if (expiration != null) {
                // Get current time in EST for validation
                TimeZone estTimeZone = TimeZone.getTimeZone("America/New_York"); // EST time zone
                Calendar calendar = Calendar.getInstance(estTimeZone);
                Date currentTimeInEst = calendar.getTime();

                // Compare the expiration date to current time (EST)
                if (expiration.before(currentTimeInEst)) {
                    throw new ExpiredJwtException(null, claims, "Token is expired.");
                }
            }

            // Return the claims if the token is valid
            return claims;
        } catch (ExpiredJwtException e) {
            System.out.println("The token is expired.");
            throw new RuntimeException("Token expired", e);
        } catch (SignatureException e) {
            System.out.println("Invalid token signature.");
            throw new RuntimeException("Invalid token signature", e);
        } catch (Exception e) {
            System.out.println("Error parsing token: " + e.getMessage());
            throw new RuntimeException("Invalid token", e);
        }
    }

}
