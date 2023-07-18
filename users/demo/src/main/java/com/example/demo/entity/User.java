package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.mindrot.jbcrypt.BCrypt;


@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Column(name = "userName")
    private String userName;
    @Column(name = "email")

    private String email;
    @Column(name = "role")

    private String role;
    @Column(name = "address")

    private String address;
    @Column(name = "passwordHash")

    private String passwordHash;


    public User() {
        // Default constructor
    }

    public User(Long id, String userName, String email, String role, String address, String passwordHash) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.address = address;
        this.setPasswordHash(passwordHash);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String password) {
        // Generate and set the password hash using BCrypt
        this.passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
