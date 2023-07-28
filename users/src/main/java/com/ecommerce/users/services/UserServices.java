package com.ecommerce.users.services;

import org.springframework.beans.factory.annotation.Value;
import com.ecommerce.users.request.RequestLogin;
import com.ecommerce.users.entity.User;
import com.ecommerce.users.repository.UserRepository;
import com.ecommerce.users.response.ResponseLogin;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserServices {
    @Value("${myapp.password.pepper}")
    private String passwordPepper;
    private final UserRepository userRepository;

    @Autowired

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean addNewUser(User user) {

        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        // Check if the user already exists in the database
        if (userRepository.findByEmail(user.getEmail()) == null) {
            user.setPassword(hashedPassword);
            userRepository.save(user);
            System.out.println(user);
            return true; // User registered successfully
        }
        else {
            return false;
        }


    }

    public User getUserId(Long id) {
        return userRepository.getById(id);

    }


    public ResponseLogin loginUser(RequestLogin requestLogin) {
        ResponseLogin responseLogin = new ResponseLogin();
        User storedUser = userRepository.findByEmail(requestLogin.getEmail());

        if (storedUser != null) {
            String plainPassword = requestLogin.getPassword();

            // Retrieve hashed password from the database
            String storedHashedPassword = storedUser.getPassword();

            // Verify the entered password with the stored hashed password
            if (BCrypt.checkpw(plainPassword, storedHashedPassword)) {
                responseLogin.setLogin(true); // Login successful
                responseLogin.setRole(storedUser.getRole());
                responseLogin.setUserName(storedUser.getUserName());
                responseLogin.setEmail(storedUser.getEmail());
                System.out.println(responseLogin);
            } else {
                responseLogin.setLogin(false); // Invalid credentials
            }
        } else {
            responseLogin.setLogin(false); // User not found
        }

        return responseLogin;
    }


    //testing
    public void addTestData() {
        // Sample static user data
        String username = "testuser";
        String email = "testuser@example.com";
        String plainPassword = "testpassword";
        String hashedPassword = BCrypt.hashpw(plainPassword, BCrypt.gensalt());

        // Check if the user already exists in the database
        if (userRepository.findByEmail(email) == null) {
            User user = new User();
            user.setUserName(username);
            user.setEmail(email);
            user.setPassword(hashedPassword);

            userRepository.save(user);
        }
    }
}
