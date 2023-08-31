package com.ecommerce.notification.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class notificationService {

    @Autowired private JavaMailSender javaMailSender;

    public void sendEmail(String email, String subject, String body) {
         System.out.println(email);
            System.out.println(subject);
            System.out.println(body);

        // try {
        //     SimpleMailMessage msg = new SimpleMailMessage();
        //     msg.setTo("slakshanpathiraja@gmail.com");
        //     msg.setSubject("subject");
        //     msg.setText("body");
        //     msg.setFrom("notificationecommerce91@gmail.com");
        //     javaMailSender.send(msg);
        //     System.out.println("Email Sent");
        // } catch (Exception e) {
        //     e.printStackTrace();
        //     System.out.println("Error while Sending Mail"); 
        // }
        
    }
    
}
