package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public SecurityConfig(JWTAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Security filter chain configuration.
     * This replaces the old WebSecurityConfigurerAdapter configuration.
     * @param http HttpSecurity object for configuring security settings.
     * @return SecurityFilterChain that holds the security settings.
     * @throws Exception If an error occurs during the configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()  // Disable CSRF for stateless authentication
                .authorizeHttpRequests()
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/flight/**").permitAll()
                .requestMatchers("/payment/**").permitAll()
                .requestMatchers("/reservation/**").permitAll()
                .requestMatchers("/passenger/register").permitAll()// Allow public access to login
                .requestMatchers("/passenger/{passengerId}").authenticated()  // Protect passenger data with JWT authentication
                .anyRequest().authenticated()  // Protect other endpoints
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter before the default security filter

        return http.build();  // Return the configured SecurityFilterChain
    }
}
