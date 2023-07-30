package com.ecommerce.products.security;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Component
public class TokenValidate {

    private String jwtSecret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    public boolean isTokenValid(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(jwtSecret.getBytes())
                    .parseClaimsJws(token);
            return true; // Token is valid.
        } catch (JwtException e) {
            return false; // Token is invalid or has expired.
        }
    }
    
}
