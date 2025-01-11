package com.jwt.implmentation.response;

public class LoginResponse {
    private String token;
    private  long tokenExpireTime;

    public LoginResponse(){

    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getTokenExpireTime() {
        return tokenExpireTime;
    }

    public LoginResponse(long tokenExpireTime, String token) {
        this.tokenExpireTime = tokenExpireTime;
        this.token = token;
    }

    public void setTokenExpireTime(long tokenExpireTime) {
        this.tokenExpireTime = tokenExpireTime;
    }
}
