package com.barutta02.FitnessApp.user;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.user.DTO.UserResponse;

@Service
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
            .firstname(user.getFirstname())
            .lastname(user.getLastname())
            .email(user.getEmail())
            .username(user.getUsername())
            .dateOfBirth(user.getDateOfBirth())
            .build();
    }

}
