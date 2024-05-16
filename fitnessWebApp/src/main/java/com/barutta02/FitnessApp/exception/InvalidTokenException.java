package com.barutta02.FitnessApp.exception;

public class InvalidTokenException   extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
}
