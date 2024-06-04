package com.barutta02.FitnessApp.auth;

import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.barutta02.FitnessApp.email.EmailService;
import com.barutta02.FitnessApp.email.EmailTemplateName;
import com.barutta02.FitnessApp.exception.InvalidTokenException;
import com.barutta02.FitnessApp.exception.TokenNotFoundException;
import com.barutta02.FitnessApp.role.Role;
import com.barutta02.FitnessApp.role.RoleRepository;
import com.barutta02.FitnessApp.security.JwtService;
import com.barutta02.FitnessApp.user.Token;
import com.barutta02.FitnessApp.user.TokenRepository;
import com.barutta02.FitnessApp.user.User;
import com.barutta02.FitnessApp.user.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerShouldSaveUserAndSendValidationEmail() throws MessagingException {
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "john.doe@example.com", "john_doe", "password123", LocalDate.of(2002, 1, 1));
        Role userRole = Role.builder().name("USER").build();

        when(roleRepository.findByName("USER")).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded_password");

        authenticationService.register(request);

        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userArgumentCaptor.capture());
        User savedUser = userArgumentCaptor.getValue();

        assertEquals("John", savedUser.getFirstname());
        assertEquals("Doe", savedUser.getLastname());
        assertEquals("john.doe@example.com", savedUser.getEmail());
        assertFalse(savedUser.isEnabled());

        verify(emailService).sendEmail(
                eq("john.doe@example.com"),
                eq("John Doe"),
                eq(EmailTemplateName.ACTIVATE_ACCOUNT),
                any(),
                any(),
                eq("Account activation")
        );
    }

    @Test
    void authenticateShouldReturnJwtToken() {
        AuthenticationRequest request = new AuthenticationRequest("john_doe", "password");

        User user = new User();
        user.setFirstname("John");
        user.setLastname("Doe");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(user);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtService.generateToken(any(HashMap.class), any(User.class))).thenReturn("jwt_token");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertEquals("jwt_token", response.getToken());
    }

    @Test
    void activateAccountShouldEnableUserAndSaveValidatedToken() throws MessagingException {
        String tokenString = "valid_token";
        Token token = new Token();
        token.setToken(tokenString);
        token.setExpiresAt(LocalDateTime.now().plusMinutes(15));
        User user = new User();
        token.setUser(user);

        when(tokenRepository.findByToken(tokenString)).thenReturn(Optional.of(token));
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        authenticationService.activateAccount(tokenString);

        assertTrue(user.isEnabled());
        verify(userRepository).save(user);

        token.setValidatedAt(LocalDateTime.now());
        verify(tokenRepository).save(token);
    }

    @Test
    void activateAccountShouldThrowInvalidTokenExceptionIfTokenExpired() {
        String tokenString = "expired_token";
        Token token = new Token();
        token.setToken(tokenString);
        token.setExpiresAt(LocalDateTime.now().minusMinutes(1));
        User user = new User();
        token.setUser(user);

        when(tokenRepository.findByToken(tokenString)).thenReturn(Optional.of(token));

        assertThrows(InvalidTokenException.class, () -> authenticationService.activateAccount(tokenString));

        try {
            verify(emailService).sendEmail(
                    eq(user.getEmail()),
                    eq(user.getFullName()),
                    eq(EmailTemplateName.ACTIVATE_ACCOUNT),
                    any(),
                    any(),
                    eq("Account activation")
            );
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Test
    void activateAccountShouldThrowTokenNotFoundExceptionIfTokenNotFound() {
        String tokenString = "nonexistent_token";

        when(tokenRepository.findByToken(tokenString)).thenReturn(Optional.empty());

        assertThrows(TokenNotFoundException.class, () -> authenticationService.activateAccount(tokenString));
    }
}
