package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class BookingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingBackendApplication.class, args);
	}

}
