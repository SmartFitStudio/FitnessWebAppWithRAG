package com.barutta02.FitnessApp.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.user.DTO.UserRequest;
import com.barutta02.FitnessApp.user.DTO.UserResponse;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserExtractor userExtractor;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void updateUser(UserRequest request, Authentication connectedUser) {
        User current_user = userRepository.findById(userExtractor.getUserFromAuthentication(connectedUser).getId()).orElseThrow(() -> new EntityNotFoundException("Utente non trovato"));
        current_user.setFirstname(request.firstname());
        current_user.setLastname(request.lastname());
        current_user.setDateOfBirth(request.dateOfBirth());
        if(request.oldPassword()!=null && request.newPassword()!=null){
            if(passwordEncoder.matches(request.oldPassword(), current_user.getPassword())){
                current_user.setPassword(passwordEncoder.encode(request.newPassword()));
            } else {
                throw new OperationNotPermittedException("La vecchia password non corrisponde alla password attuale");
            }
        }
    }

    public UserResponse getUser(Authentication connectedUser) {
        return userMapper.toUserResponse(userExtractor.getUserFromAuthentication(connectedUser));
    }

}
