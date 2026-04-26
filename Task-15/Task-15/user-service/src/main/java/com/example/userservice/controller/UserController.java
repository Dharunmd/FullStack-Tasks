package com.example.userservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/users")
    public Map<String, String> getUsers() {
        return Map.of("user1", "Alice", "user2", "Bob");
    }
}
