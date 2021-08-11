package com.tim1.oglasimi.model;

public class LoginResponse {
    private int userId;
    private boolean areCredsValid;
    private boolean isApproved;
    private String role;
    public String jwt;

    public LoginResponse() {}

    public LoginResponse( boolean isApproved) {
        this.isApproved = isApproved;
    }

    public LoginResponse(
            int userId,
            boolean areCredsValid,
            boolean isApproved,
            String role) {
        this(isApproved);
        this.userId = userId;
        this.areCredsValid = areCredsValid;
        this.role = role;
    }

    public boolean getAreCredsValid() {
        return areCredsValid;
    }

    public boolean getIsApproved() {
        return isApproved;
    }

    public String getRole() {
        return role;
    }

    public int getUserId() {
        return userId;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
