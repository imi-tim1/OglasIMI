package com.tim1.oglasimi.security;

import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;

public class ResultPair {
    private Claims claims;
    private HttpStatus httpStatus;

    public ResultPair() {
    }

    public ResultPair(Claims claims, HttpStatus httpStatus) {
        this.claims = claims;
        this.httpStatus = httpStatus;
    }

    public Claims getClaims() {
        return claims;
    }

    public void setClaims(Claims claims) {
        this.claims = claims;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
}
