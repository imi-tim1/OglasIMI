package com.tim1.oglasimi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;

@ControllerAdvice
public class ControllerExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ControllerExceptionHandler.class);

    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e, HttpServletRequest request ) {
        LOGGER.warn( "handleConstraintViolationException | {}", e.getMessage() );


        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, request.getHeader(JWT_CUSTOM_HTTP_HEADER));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .headers(responseHeaders)
                .body(null);
    }
}
