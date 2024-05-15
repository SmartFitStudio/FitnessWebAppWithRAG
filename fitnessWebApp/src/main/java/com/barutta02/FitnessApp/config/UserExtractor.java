package com.barutta02.FitnessApp.config;

import com.barutta02.FitnessApp.user.User;
import org.springframework.security.core.Authentication;

public class UserExtractor {
    public User getUserFromAuthentication(Authentication connectedUser) {
        return (User) connectedUser.getPrincipal();
    }
}