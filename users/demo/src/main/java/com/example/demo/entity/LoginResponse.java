package com.example.demo.entity;

public class LoginResponse {
    private String email;
    private String userName;
    private String role;
    private boolean isLogin;

    public LoginResponse(String email, String userName, String role, boolean isLogin) {
        this.email = email;
        this.userName = userName;
        this.role = role;
        this.isLogin = isLogin;
    }

    public LoginResponse() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isLogin() {
        return isLogin;
    }

    public void setLogin(boolean login) {
        isLogin = login;
    }

    //json method
    public String toJson() {
        return "{" +
                "\"email\":\"" + email + "\"," +
                "\"userName\":\"" + userName + "\"," +
                "\"role\":\"" + role + "\"," +
                "\"isLogin\":" + isLogin +
                "}";
    }

}
