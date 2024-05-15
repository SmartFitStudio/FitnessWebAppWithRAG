package com.barutta02.FitnessApp.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/*
 * The response object that will be returned to the client after a successful authentication.
 Contains the token that the client will use to authenticate itself in the future.
 
 */
@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
}
