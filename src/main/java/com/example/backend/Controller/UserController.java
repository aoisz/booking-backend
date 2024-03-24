package com.example.backend.Controller;

import com.example.backend.Model.Users;
import com.example.backend.Service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;
    
    @GetMapping("/getAll")
    public List<Users> getAllUsers() {
        return service.getAllUsers();
    }
}
