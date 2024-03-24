/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.Repository;

import com.example.backend.Model.Users;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author PC
 */
public interface UserRepository extends JpaRepository<Users, Integer> {
    public List<Users> findAll();
    public Users findByFirstName(String firstName);
}
