package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.model.User;



@Repository
public interface UserRepository extends JpaRepository<User,String>
{
	User findByEmail(String email);
	
    User findByEmailAndPassword(String email,
            String password);
}