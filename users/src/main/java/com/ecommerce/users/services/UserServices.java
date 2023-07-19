package com.ecommerce.users.services;


import com.ecommerce.users.request.RequestLogin;
import com.ecommerce.users.entity.User;
import com.ecommerce.users.repository.UserRepository;
import com.ecommerce.users.response.ResponseLogin;
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
        String plainPassword =user.getPassword();
        user.setPassword( BCrypt.hashpw(plainPassword, BCrypt.gensalt()));
        userRepository.save(user);
    }

    public User getUserId(Long id) {
        return userRepository.getById(id);

    }
    public ResponseLogin loginUser(RequestLogin user) {

        //response login
        ResponseLogin responseLogin = new ResponseLogin();
        User responseUser =  userRepository.findByEmail(user.getEmail());

        if (responseUser != null) {
            if(BCrypt.checkpw(user.getPassword(), responseUser.getPassword())){
                responseLogin.setLogin(true);
                responseLogin.setRole(responseUser.getRole());
                responseLogin.setUserName(responseUser.getUserName());
                responseLogin.setEmail(responseUser.getEmail());
                return responseLogin;
            }
            else {
                responseLogin.setLogin(false);
                return responseLogin;
            }
        }
        responseLogin.setLogin(false);
        return responseLogin; // User not found


    }
}
