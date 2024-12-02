package com.example.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTTokenUtil jwtTokenUtil;

    // Constructor to inject JWTTokenUtil
    public JWTAuthenticationFilter(JWTTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * The main filter logic is implemented here.
     * This method processes every request and checks for the JWT token.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Step 1: Extract the JWT token from the request header
        String token = extractJwtToken(request);
        System.out.println(token);

        if (token != null && jwtTokenUtil.isTokenValid(token)) {
            String username = jwtTokenUtil.extractUsername(token);
            System.out.println(username);

            // Step 2: If the token is valid, set the authentication in the SecurityContextHolder
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Proceed with further authentication setup if needed
                // For instance, setting up authentication based on the username and roles
            }
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }

    /**
     * Extract the JWT token from the request header
     */
    private String extractJwtToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            System.out.println(header);
            return header.substring(7); // Extract token without "Bearer "
        }

        return null;
    }
}
