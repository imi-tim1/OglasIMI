package com.tim1.oglasimi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OglasimiApplication {
	public static final Logger LOGGER = LoggerFactory.getLogger(OglasimiApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(OglasimiApplication.class, args);
	}

}
