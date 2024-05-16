package com.barutta02.FitnessApp.exception;

public class TokenNotFoundException  extends RuntimeException {
    public TokenNotFoundException(String message) {
        super(message);
    }
}
