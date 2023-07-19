package com.example.demo.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseLogin {
    private String email;
    private String userName;
    private String role;
    private boolean isLogin;

    public String toJson() {
        return "{" +
                "\"email\":\"" + email + "\"," +
                "\"userName\":\"" + userName + "\"," +
                "\"role\":\"" + role + "\"," +
                "\"isLogin\":" + isLogin +
                "}";
    }


}
