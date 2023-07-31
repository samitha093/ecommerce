package com.ecommerce.users.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {


    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);

         // Clear the SecurityContextHolder, assuming you don't want to keep the authentication details after logout
        SecurityContextHolder.clearContext();

        // Set empty strings for access token and refresh token as cookies in the response
        Cookie accessTokenCookie = new Cookie("Access-token", "");
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setMaxAge(0); // Set maxAge to 0 to make the cookie expire immediately
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("Refresh-token", "");
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(0); // Set maxAge to 0 to make the cookie expire immediately
        response.addCookie(refreshTokenCookie);
    }
}
