package com.ecommerce.users.services;
import com.ecommerce.users.entity.User;
import com.ecommerce.users.repository.UserRepository;
import com.ecommerce.users.request.AuthenticationRequest;
import com.ecommerce.users.request.OptAddRequest;
import com.ecommerce.users.request.RegisterRequest;
import com.ecommerce.users.request.VerifyUserRequest;
import com.ecommerce.users.response.AuthenticationResponse;
import com.ecommerce.users.services.JwtService;
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
                .isVerified(false)
                .otp(0)
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        // saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .status("User registered successfully")
                .build();
    }
//login
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Optional<User> userOptional = repository.findByEmail(request.getEmail());
        System.out.println("userOptional: " + userOptional);
        if (userOptional.isPresent()) {
            // User found, continue with the authentication process
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            System.out.println("user is present");

            // User authentication is successful, continue with token generation and other steps
            User user = userOptional.get();
            var jwtToken = jwtService.generateAccessToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            // revokeAllUserTokens(user);
            // saveUserToken(user, jwtToken);

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
        System.out.println("userEmail access token: " + userEmail);
        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail)
                    .orElseThrow();
            System.out.println("user access token: " + user);
            if (jwtService.isTokenValid1(refreshToken, user)) {
                var accessToken = jwtService.generateAccessToken(user);
                System.out.println("is valid token True");
                response.setHeader("Access-Token", accessToken);
                response.setHeader("Refresh-Token", refreshToken);

                ObjectMapper objectMapper = new ObjectMapper();

                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");



//                response.getWriter().write("refresh token success");
                response.getWriter().write(accessToken);
            }
            else {
                System.out.println("is valid token False");
                response.getWriter().write("refresh token failed");
            }
        }
    }

    public AuthenticationResponse verifyUser(VerifyUserRequest request) {
        Optional<User> userOptional = repository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {

            User user = userOptional.get();
            if(user.getIsVerified() == true){
                return AuthenticationResponse.builder()
                        .status("User already verified")
                        .build();
            }
            user.setIsVerified(true);
            //update current user
            repository.save(user);
            return AuthenticationResponse.builder()
                    .status("User verified successfully")
                    .build();

        } else {
            // User not found, return a response indicating that the user doesn't exist
            return AuthenticationResponse.builder()
                    .status("User not verified")
                    .build();
        }
    }


    //otp add
    public AuthenticationResponse otpAdd(OptAddRequest request) {
        Optional<User> userOptional = repository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {

            User user = userOptional.get();
            if(user.getOtp() != 0){
                return AuthenticationResponse.builder()
                        .status("Otp already  verified")
                        .build();
            }
            user.setOtp(request.getOtp());
            //update current user
            repository.save(user);
            return AuthenticationResponse.builder()
                    .status("User otp added successfully")
                    .build();

        } else {
            // User not found, return a response indicating that the user doesn't exist
            return AuthenticationResponse.builder()
                    .status("User otp not added")
                    .build();
        }
    }

}
