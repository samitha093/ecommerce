package com.ecommerce.users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan(basePackages = "com.ecommerce.users.config")
public class UsersApplication {
	public static void main(String[] args) {
		SpringApplication.run(UsersApplication.class, args);
		System.out.println("UsersApplication started");
	}
}
