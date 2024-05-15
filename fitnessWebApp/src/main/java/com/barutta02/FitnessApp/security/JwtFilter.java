package com.barutta02.FitnessApp.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter { // this filter will be executed once per request and it will check if the token is valid before the user and password authentication
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal( //oncePerRequestFilter has a doFilterInternal method that we need to override
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        if (request.getServletPath().contains("/api/v1/auth")) { // if the request path contains /api/v1/auth we do not need to check the token all we need to do is to pass the request to the next filter
            filterChain.doFilter(request, response);
            return;
        }
        final String authHeader = request.getHeader("Authorization"); // we get the authorization header from the request
        final String jwt;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) { // if the authorization header is null or does not start with Bearer we do not need to check the token all we need to do is to pass the request to the next filter
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7); // we get the token from the authorization header
        username = jwtService.extractUsername(jwt); // we extract the username from the token 
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) { 
            // if the username is not null and the user is not authenticated
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);  //expiration control also
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                ); // this token is used by spring in the security context to authenticate the user
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                ); // i need to set the details of the authentication token by the request
                SecurityContextHolder.getContext().setAuthentication(authToken); //update the security context with the authentication token
            }
        }
        filterChain.doFilter(request, response); // pass the request
    }
}
