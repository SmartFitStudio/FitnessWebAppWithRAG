package com.barutta02.FitnessApp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;

import com.barutta02.FitnessApp.user.User;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor // Lombok will generate a constructor with all the required fields
public class BeansConfig {

    private final UserDetailsService userDetailsService;  //an implementation of UserDetailsService that retrieves user details from a JPA repository  

    @Value("${chatbot.base.url}")
    private String chatbotBaseUrl;

    @Value("${chatbot.api.key}")
    private String apiKey;
    

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(); // DaoAuthenticationProvider is a default implementation of AuthenticationProvider that retrieves user details from a UserDetailsService
        authProvider.setUserDetailsService(userDetailsService); // we need to set the user details service to the auth provider
        authProvider.setPasswordEncoder(passwordEncoder()); // we need to set the password encoder
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCryptPasswordEncoder is a password encoder that uses the BCrypt strong hashing function
    }

    @Bean
    public AuditorAware<Integer> auditorAware() {
        return new ApplicationAuditAware();
    }

    @Bean
    public UserExtractor userExtractor() {
        return new UserExtractor();
    }
    
    /*
     * This method is used to configure the CORS filter.
     * The CORS filter is used to allow cross-origin requests to the server.
     * Now the server will accept requests from the specified origin.
     */
    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        config.setAllowedHeaders(Arrays.asList(
                HttpHeaders.ORIGIN,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT,
                HttpHeaders.AUTHORIZATION
        ));
        config.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "DELETE",
                "PUT",
                "PATCH"
        ));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);

    }

    @Bean
    public WebClient webClient() {
        return WebClient.builder().baseUrl(chatbotBaseUrl).defaultHeader("Authorization", "Bearer " + apiKey).build();
    }

}
