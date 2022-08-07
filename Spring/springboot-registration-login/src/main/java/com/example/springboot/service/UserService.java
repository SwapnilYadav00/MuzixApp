package com.example.springboot.service;

import java.io.ByteArrayOutputStream;
import java.util.Optional;
import java.util.zip.Deflater;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.example.springboot.exception.UserExistsException;
import com.example.springboot.exception.UserServicesException;
import com.example.springboot.model.User;
import com.example.springboot.model.UserHelper;
import com.example.springboot.repository.UserRepository;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepo;

    @Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void registerUser(User user) throws UserExistsException {
        Optional<User> optUser = userRepo.findById(user.getEmail());
        if (optUser.isPresent()) {
            throw new UserExistsException();
        }
        String hashpw =
                BCrypt.hashpw(user.getPassword(),
                        BCrypt.gensalt());
        System.out.println(hashpw);
        user.setPassword(hashpw);
        
        userRepo.save(user);
        
    }

    public User login(String email, String password) {
        Optional<User> userSearch =
                userRepo.findById(email);
        User user = null;
        if(userSearch.isPresent()) {
            user = userSearch.get();
            boolean matched = BCrypt.checkpw(password, user.getPassword());
            if(!matched) {
                user = null;
            }
        }
        return user;
    }
    

    public Optional<User> getregistrationbyemail(String email) {
        Optional<User> userSearch =
                userRepo.findById(email);
        User user = null;
        if(userSearch.isPresent()) {
            user = userSearch.get();
            
            return userSearch;
        }
        return Optional.ofNullable(user);
    }
    
    public String changePassword(UserHelper userHelper) throws UserServicesException {
    	//System.out.println("hello");
        User user = null;
        Optional<User> userSearch =
                userRepo.findById(userHelper.getEmail());
        if(userSearch.isPresent()) {
        user = userSearch.get();
        System.out.println(userHelper.getOldPassword()+"    "+user.getPassword());
        
        if(BCrypt.checkpw(userHelper.getOldPassword(), user.getPassword())){
        	
        	String hashpw =
                    BCrypt.hashpw(userHelper.getNewPassword(),
                            BCrypt.gensalt());
        	user.setPassword(hashpw);
        	userRepo.save(user);
        	 return "Password updated successfully";
        }
        
//        if(existingUser.getPassword().equals(userHelper.getOldPassword())){
//            existingUser.setPassword(userHelper.getNewPassword());
//            userRepo.save(existingUser);
//            return "Password updated successfully";
//        }
        return "Pls enter correct Old password";
    }
  
    
    return "error";
    }
}