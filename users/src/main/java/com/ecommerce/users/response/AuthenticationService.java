package com.ecommerce.users.response;
import com.ecommerce.users.entity.User;
import com.ecommerce.users.repository.TokenRepository;
import com.ecommerce.users.repository.UserRepository;
import com.ecommerce.users.request.AuthenticationRequest;
import com.ecommerce.users.request.RegisterRequest;
import com.ecommerce.users.services.JwtService;
import com.ecommerce.users.token.Token;
import com.ecommerce.users.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Value("${application.security.jwt.expiration}")
    private long accessTokenExpiration;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    public AuthenticationResponse register(RegisterRequest request) {
        // Check if the email already exists in the repository
        if (repository.existsByEmail(request.getEmail())) {
            // Return a response indicating that the email already exists
            return AuthenticationResponse.builder()
                    .status("Email already exists")
                    .build();
        }
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .status("User registered successfully")
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Optional<User> userOptional = repository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            // User found, continue with the authentication process
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // User authentication is successful, continue with token generation and other steps
            User user = userOptional.get();
            var jwtToken = jwtService.generateAccessToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);

            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .status("User login Success")
                    .build();
        } else {
            // User not found, return a response indicating that the user doesn't exist
            return AuthenticationResponse.builder()
                    .status("User not found")
                    .build();
        }
    }


    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateAccessToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                // Set the new access token as a cookie in the response
                Cookie accessTokenCookie = new Cookie("Access-token", accessToken);
                accessTokenCookie.setHttpOnly(true); // This prevents JavaScript access to the cookie
                accessTokenCookie.setMaxAge((int) (accessTokenExpiration / 1000)); // Convert to seconds
                response.addCookie(accessTokenCookie);

                // Set the original refresh token as a cookie in the response
                Cookie refreshTokenCookie = new Cookie("Refresh-token", refreshToken);
                refreshTokenCookie.setHttpOnly(true);
                refreshTokenCookie.setMaxAge((int) (refreshTokenExpiration / 1000)); // Convert to seconds
                response.addCookie(refreshTokenCookie);

                // Create a response JSON object containing the access token and refresh token
                ObjectMapper objectMapper = new ObjectMapper();
                String responseBody = objectMapper.writeValueAsString(Map.of(
                        "access_token", accessToken,
                        "refresh_token", refreshToken
                ));
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                // Write the response JSON object to the response body
                response.getWriter().write(responseBody);
            }
        }
    }
}
