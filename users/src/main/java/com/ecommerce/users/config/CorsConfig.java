package com.ecommerce.users.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Adjust the path pattern as needed
                .allowedOrigins("http://localhost:5173") // Add the allowed origin(s) for cross-origin requests
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Add the allowed HTTP methods
                .allowedHeaders("*") // Add the allowed request headers
                .allowCredentials(true); // Allow including credentials such as cookies (if needed)
    }
}