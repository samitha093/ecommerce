package com.ecommerce.notification.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import java.nio.charset.StandardCharsets;

@Service
public class notificationService {

    @Autowired private JavaMailSender javaMailSender;

    public String sendEmail(String email, String subject, String emailBody) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            String htmlContent = loadHtmlFromResource("email.html", emailBody);
            helper.setText(htmlContent, true);

            helper.setTo(email);
            helper.setSubject(subject);
            helper.setFrom("Notification Ecommerce <notificationecommerce91@gmail.com>");

            javaMailSender.send(message);
            return "Mail Sent Successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while Sending Mail";
        }
    }

    public String otpGenarator(){
        String otp = "";
        int randomPin   =(int)(Math.random()*9000)+1000;
        otp  = String.valueOf(randomPin);
        return otp;
    }

    public String sendotp(String email){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            String emailBody1 = "Your Activation Link is: ";
            String emailBody2 = "Please do not share this activation link with anyone.";
            String myotp = otpGenarator();
            String OTP = "http://localhost:8081/api/v1/auth/verify-user/"+email+"/"+myotp;


            String htmlContent = loadHtmlFromResource("email.html", emailBody1, emailBody2, OTP);
            helper.setText(htmlContent, true);

            helper.setTo(email);
            helper.setSubject("Verification Code");
            helper.setFrom("Notification Ecommerce <notificationecommerce91@gmail.com>");

            javaMailSender.send(message);
            return myotp;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while Sending Mail";
        }
    }

    private String loadHtmlFromResource(String templatePath, String emailBody) throws java.io.IOException {
        ClassPathResource resource = new ClassPathResource(templatePath);
        String templateContent = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

        String htmlContent = templateContent
            .replace("#EMAIL_BODY1#", emailBody)
            .replace("#EMAIL_BODY2#", "")
            .replace("#EMAIL_OTP#", "");


        return htmlContent;
    }

    private String loadHtmlFromResource(String templatePath, String emailBody1,String emailBody2) throws java.io.IOException {
        ClassPathResource resource = new ClassPathResource(templatePath);
        String templateContent = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

        String htmlContent = templateContent
            .replace("#EMAIL_BODY1#", emailBody1)
            .replace("#EMAIL_BODY2#", emailBody2)
            .replace("#EMAIL_OTP#", "");


        return htmlContent;
    }
    
    private String loadHtmlFromResource(String templatePath, String emailBody1,String emailBody2, String OTP) throws java.io.IOException {
        ClassPathResource resource = new ClassPathResource(templatePath);
        String templateContent = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

        String htmlContent = templateContent
            .replace("#EMAIL_BODY1#", emailBody1)
            .replace("#EMAIL_BODY2#", emailBody2)
            .replace("#EMAIL_OTP#", OTP);


        return htmlContent;
    }
    
}
