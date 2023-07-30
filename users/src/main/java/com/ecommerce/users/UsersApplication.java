package com.ecommerce.users;

import com.ecommerce.users.request.RegisterRequest;
import com.ecommerce.users.response.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.ecommerce.users.enums.Role.ADMIN;
import static com.ecommerce.users.enums.Role.MANAGER;

@SpringBootApplication
//@ComponentScan(basePackages = "com.ecommerce.users.config")
public class UsersApplication {
	public static void main(String[] args) {
		SpringApplication.run(UsersApplication.class, args);
		System.out.println("UsersApplication started");
	}
}
