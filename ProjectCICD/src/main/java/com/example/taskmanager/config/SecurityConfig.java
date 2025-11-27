package com.example.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // 👈 Enables CORS
            .and()
            .csrf().disable() // disable CSRF for testing (safe in dev)
            .authorizeHttpRequests()
            .requestMatchers("/api/**").permitAll() // allow all /api/** routes
            .anyRequest().authenticated(); // everything else requires auth

        return http.build();
    }
}
