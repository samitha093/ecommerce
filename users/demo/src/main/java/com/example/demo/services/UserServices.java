package com.example.demo.services;


import com.example.demo.entity.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserServices {

    private final UserRepository userRepository;

    @Autowired

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addNewUser(User user) {
        userRepository.save(user);
    }

    public User getUserId(Long id) {
        return userRepository.getById(id);

    }
    public LoginResponse loginUser(String email, String passwordHash) {
        System.out.println("inside services");
        LoginResponse loginResponse = new LoginResponse();
        try {
            User user = userRepository.findByEmail(email);
            System.out.println("User found: " + user.getUserName());
            if (user != null) {
                // Retrieve the hashed password from the database for the user
                String storedPasswordHash = user.getPasswordHash();
                System.out.println("Stored password hash: " + storedPasswordHash);
                System.out.println("Provided password hash: " + passwordHash);

                // Check if the provided password hash matches the stored password hash
                if(BCrypt.checkpw(passwordHash, storedPasswordHash)){
                    loginResponse.setEmail(user.getEmail());
                    loginResponse.setUserName(user.getUserName());
                    loginResponse.setRole(user.getRole());
                    loginResponse.setLogin(true);
                    return loginResponse;
                }
            }

            // Return false if the user is not found (login failed)
            loginResponse.setLogin(false);
            return loginResponse ;
        } catch (Exception e) {
            System.out.println(e);
        }

        loginResponse.setLogin(false);
        return loginResponse;
    }
}
