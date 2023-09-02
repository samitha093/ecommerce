package com.ecommerce.gateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
public class config implements WebFluxConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Adjust the path pattern as needed
                .allowedOrigins("http://localhost:5173") // Add the allowed origin(s) for cross-origin requests
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Add the allowed HTTP methods
                .allowedHeaders("*") // Add the allowed request headers, including "Refresh-Token"
                .exposedHeaders("Refresh-Token", "Access-Token") // Expose both headers
                .allowCredentials(true); // Allow including credentials such as cookies (if needed)
    }
}
