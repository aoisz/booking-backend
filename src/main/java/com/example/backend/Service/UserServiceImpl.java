package com.example.backend.Service;

import com.example.backend.Model.Users;
import com.example.backend.Repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository repository;
    @Override
    public List<Users> getAllUsers() {
        return repository.findAll();
    }
    
}
