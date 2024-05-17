package com.barutta02.FitnessApp.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barutta02.FitnessApp.user.DTO.UserRequest;
import com.barutta02.FitnessApp.user.DTO.UserResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    private final UserService service;

    @PutMapping
    public ResponseEntity<?> updateUser(
            @Valid @RequestBody UserRequest request,
            Authentication connectedUser
    ) {
        service.updateUser(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<UserResponse> getUser(
            Authentication connectedUser) {
        return ResponseEntity.ok(service.getUser(connectedUser));
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteUser(
            Authentication connectedUser) {
        service.deleteUser(connectedUser);
        return ResponseEntity.ok().build();
    }

}
